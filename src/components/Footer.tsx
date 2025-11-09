import { Phone, MapPin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="heading-elegant text-2xl mb-4">Khauwsey House</h3>
            <p className="text-sm opacity-90">
              Authentic Memon cuisine crafted with love. Fresh, delicious, and delivered to your door.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="heading-elegant text-2xl mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+923709181625" className="hover:underline">
                  +92 370 9181625
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:syedazlan833@gmail.com" className="hover:underline">
                  syedazlan833@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1" />
                <span>
                  Scheme 33, Near Main Super Highway<br />
                  Alhira Hanging Garden Society<br />
                  Backside of Prince Ali Society, Block A<br />
                  Karachi, Pakistan
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="heading-elegant text-2xl mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <a href="#menu" className="block hover:underline">Menu</a>
              <a href="#about" className="block hover:underline">About Us</a>
              <a href="#order" className="block hover:underline">Order Now</a>
              <a href="/orders" className="block hover:underline">My Orders</a>
              <p className="mt-4 opacity-90">🍴 Also available on FoodPanda!</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm">
          <p className="opacity-90">
            © {new Date().getFullYear()} Authentic Curry Khauwsey. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
