import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "MENU", href: "#menu" },
    { name: "ABOUT", href: "#about" },
    { name: "MY ORDERS", href: "/orders" },
    { name: "ORDER NOW", href: "#order" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 smooth-transition ${
      isScrolled 
        ? 'bg-background/70 backdrop-blur-lg border-b border-border/50' 
        : 'bg-primary/85 backdrop-blur-sm border-b border-primary-foreground/10'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className={`text-2xl md:text-3xl font-cursive font-bold hover:scale-105 smooth-transition flex items-center gap-2 ${
            isScrolled ? 'text-primary' : 'text-primary-foreground'
          }`}>
            <img src="/bowl-icon.png" alt="Bowl" className="w-8 h-8" />
            Khauwsey House
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-caps text-sm underline-effect ${
                  isScrolled ? 'text-foreground' : 'text-primary-foreground'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block text-caps text-sm py-2 ${
                  isScrolled ? 'text-foreground' : 'text-primary-foreground'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
