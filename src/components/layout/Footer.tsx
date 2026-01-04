import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Admissions", href: "/contact" },
  { name: "Facilities", href: "/facilities" },
  { name: "News & Events", href: "/news" },
  { name: "Contact", href: "/contact" },
];

const resourceLinks = [
  { name: "Student Portal", href: "#" },
  { name: "Parent Resources", href: "#" },
  { name: "Library", href: "#" },
  { name: "Career Services", href: "#" },
  { name: "Alumni Network", href: "#" },
  { name: "Support Services", href: "#" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/profile.php?id=100064026300886" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* School Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Rise Logo"
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="w-12 h-12 rounded-full bg-secondary hidden items-center justify-center text-secondary-foreground font-serif font-bold text-xl">
                R
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl">Rise Learning Provision</h3>
                <p className="text-sm text-primary-foreground/70">Excellence in Education</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Empowering students since 2020 with dual curriculum education, integrating international standards with Myanmar National Curriculum. Expanding to international school in 2026.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-secondary">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Campus */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-secondary">Campus</h4>
            <ul className="space-y-3">
              {[
                { name: "Campus 1", href: "#" },
                { name: "Campus 2", href: "#" }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-secondary">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <p className="text-primary-foreground/80 text-sm">
                  No. 2, Kanbawza lane, Yay Aye Kwin Quarter,<br />
                  Taunggyi, Shan State, Myanmar
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <a
                  href="tel:+959895477771"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                >
                  +959895477771
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <a
                  href="mailto:riselearningprovision@gmail.com"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                >
                  riselearningprovision@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Rise Learning Provision. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-primary-foreground/60 hover:text-secondary text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-secondary text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <Button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary-light shadow-large p-0"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </footer>
  );
}
