import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  parent_name: string;
  email: string;
  phone?: string;
  student_name?: string;
  grade_level?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log("Received contact form submission:", formData);

    // Send notification email to admin
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Rise Learning Provision <onboarding@resend.dev>",
        to: ["riselearningprovision@gmail.com"],
        subject: `New Contact Form Submission from ${formData.parent_name}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <h2>Contact Details</h2>
          <ul>
            <li><strong>Parent/Guardian Name:</strong> ${formData.parent_name}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Phone:</strong> ${formData.phone || "Not provided"}</li>
            <li><strong>Student Name:</strong> ${formData.student_name || "Not provided"}</li>
            <li><strong>Grade Level:</strong> ${formData.grade_level || "Not provided"}</li>
          </ul>
          <h2>Message</h2>
          <p>${formData.message || "No message provided"}</p>
        `,
      }),
    });

    const adminResult = await adminEmailResponse.json();
    console.log("Admin notification sent:", adminResult);

    // Send confirmation email to parent
    const confirmationEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Rise Learning Provision <onboarding@resend.dev>",
        to: [formData.email],
        subject: "Thank you for contacting Rise Learning Provision",
        html: `
          <h1>Thank you for reaching out, ${formData.parent_name}!</h1>
          <p>We have received your inquiry and appreciate your interest in Rise Learning Provision.</p>
          <p>Our admissions team will review your message and get back to you within 24-48 hours.</p>
          <p>If you have any urgent questions, please don't hesitate to call us at +959895477771.</p>
          <br>
          <p>Best regards,</p>
          <p><strong>The Rise Learning Provision Team</strong></p>
        `,
      }),
    });

    const confirmationResult = await confirmationEmailResponse.json();
    console.log("Confirmation email sent:", confirmationResult);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail: adminResult,
        confirmationEmail: confirmationResult 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
