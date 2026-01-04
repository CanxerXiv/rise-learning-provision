import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, LogIn, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [{
  name: "Home",
  href: "/"
}, {
  name: "About",
  href: "/about"
}, {
  name: "Programs",
  href: "/programs"
}, {
  name: "News",
  href: "/news"
}, {
  name: "Facilities",
  href: "/facilities"
}, {
  name: "Contact",
  href: "/contact"
}];

export function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  const isHome = location.pathname === "/";
  const isScrolled = hasScrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleNavigation = (href: string) => {
    setIsMobileMenuOpen(false);
  };

  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "bg-background/95 backdrop-blur-md shadow-medium py-3" : "bg-transparent py-5")}>
    <div className="container mx-auto px-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 group">
        <img
          src="/logo.png"
          alt="Rise Learning Provision Logo"
          className="w-12 h-12 rounded-full object-cover shadow-soft group-hover:shadow-glow transition-shadow duration-300"
          onError={(e) => {
            // Fallback to letter if logo not found
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <div className="w-12 h-12 rounded-full bg-primary hidden items-center justify-center text-primary-foreground font-serif font-bold text-xl shadow-soft group-hover:shadow-glow transition-shadow duration-300">R</div>
        <div className="hidden sm:block">
          <h1 className={cn("font-serif font-bold text-xl transition-colors", isScrolled ? "text-primary" : "text-primary-foreground")}>RISE Learning Provision</h1>
          <p className={cn("text-xs transition-colors", isScrolled ? "text-muted-foreground" : "text-primary-foreground/80")}>
            Excellence in Education
          </p>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-1">
        {navLinks.map(link => (
          <Link
            key={link.name}
            to={link.href}
            className={cn("px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 hover:bg-primary/10", isScrolled ? "text-foreground hover:text-primary" : "text-primary-foreground hover:bg-primary-foreground/10")}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className={cn("rounded-full", isScrolled ? "" : "text-primary-foreground hover:bg-primary-foreground/10")}>
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        {user ? (
          isAdmin ? (
            <Link to="/admin">
              <Button variant="ghost" className={cn("hidden sm:flex gap-2", isScrolled ? "" : "text-primary-foreground hover:bg-primary-foreground/10")}>
                <LayoutDashboard className="h-4 w-4" />
                Admin
              </Button>
            </Link>
          ) : null
        ) : (
          <Link to="/auth">
            <Button variant="ghost" className={cn("hidden sm:flex gap-2", isScrolled ? "" : "text-primary-foreground hover:bg-primary-foreground/10")}>
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </Link>
        )}

        <Link to="/contact">
          <Button className={cn("hidden sm:flex font-semibold", isScrolled ? "bg-secondary text-secondary-foreground hover:bg-secondary-light" : "bg-secondary text-secondary-foreground hover:bg-secondary-light")}>
            Apply Now
          </Button>
        </Link>

        {/* Mobile Menu Toggle */}
        <Button variant="ghost" size="icon" className={cn("lg:hidden", isScrolled ? "" : "text-primary-foreground hover:bg-primary-foreground/10")} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
    </div>

    {/* Mobile Menu */}
    <div className={cn("lg:hidden absolute top-full left-0 right-0 bg-background shadow-large overflow-hidden transition-all duration-300", isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
      <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
        {navLinks.map(link => (
          <Link
            key={link.name}
            to={link.href}
            onClick={() => handleNavigation(link.href)}
            className="px-4 py-3 rounded-md font-medium text-foreground hover:bg-primary/10 hover:text-primary text-left transition-colors"
          >
            {link.name}
          </Link>
        ))}
        {user ? (
          isAdmin ? (
            <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Admin Dashboard
              </Button>
            </Link>
          ) : null
        ) : (
          <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </Link>
        )}
        <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
          <Button className="mt-2 w-full bg-secondary text-secondary-foreground hover:bg-secondary-light">
            Apply Now
          </Button>
        </Link>
      </nav>
    </div>
  </header>;
}