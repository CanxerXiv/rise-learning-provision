import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contactInfo = [
  { icon: MapPin, title: "Address", content: "No. 2, Kanbawza lane, Yay Aye Kwin Quarter,\nTaunggyi, Shan State, Myanmar" },
  { icon: Phone, title: "Phone", content: "+959895477771" },
  { icon: Mail, title: "Email", content: "riselearningprovision@gmail.com" },
  { icon: Clock, title: "Hours", content: "Mon - Fri: 8:00 AM - 5:00 PM" },
];

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parent_name: "",
    email: "",
    phone: "",
    student_name: "",
    grade_level: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        parent_name: formData.parent_name,
        email: formData.email,
        phone: formData.phone || null,
        student_name: formData.student_name || null,
        grade_level: formData.grade_level || null,
        message: formData.message || null,
      });

      if (error) throw error;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke("send-contact-notification", {
        body: formData,
      });

      if (emailError) {
        console.error("Failed to send email notification:", emailError);
      }

      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      // Reset form after delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ parent_name: "", email: "", phone: "", student_name: "", grade_level: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-section-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-4">
            Contact Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Have questions about admissions, programs, or campus life? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 lg:p-10 shadow-soft border border-border/50">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. We'll respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="parent_name">Parent/Guardian Name *</Label>
                    <Input
                      id="parent_name"
                      name="parent_name"
                      value={formData.parent_name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student_name">Student Name</Label>
                    <Input
                      id="student_name"
                      name="student_name"
                      value={formData.student_name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade_level">Grade Level of Interest</Label>
                  <select
                    id="grade_level"
                    name="grade_level"
                    value={formData.grade_level}
                    onChange={handleChange}
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select a grade level</option>
                    <option value="pre-k">Pre-Kindergarten</option>
                    <option value="elementary">Elementary (K-5)</option>
                    <option value="middle">Middle School (6-8)</option>
                    <option value="high">High School (9-12)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you? Tell us about your child and what you're looking for in a school."
                    rows={5}
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary-light h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="bg-card rounded-xl p-6 shadow-soft border border-border/50 hover:shadow-medium transition-shadow"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{info.title}</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{info.content}</p>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-soft border border-border/50 h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle%20NYC!5e0!3m2!1sen!2sus!4v1635959282694!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rise Academy Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
