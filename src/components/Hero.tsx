import heroImage from "@/assets/hero-khauwsey.jpg";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground" data-aos="fade-up">
        <h1 className="heading-elegant text-4xl md:text-6xl lg:text-7xl mb-6 animate-fade-in">
          Authentic Curry Khauwsey
        </h1>
        <p className="text-caps text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
          Experience the rich flavors of traditional Memon cuisine. Slow-cooked curries, perfectly spiced, 
          served with love. Every bowl tells a story of authentic home cooking.
        </p>
        <p className="text-sm md:text-base mb-4 opacity-90 flex items-center justify-center gap-2">
          <span>📍 Karachi, Scheme 33 • Near Main Super Highway • Alhira Hanging Garden Society</span>
        </p>
        <p className="text-sm md:text-base mb-12 opacity-90 flex items-center justify-center gap-2">
          <img src="/foodpanda-icon.png" alt="FoodPanda" className="w-5 h-5 inline-block" />
          <span>Also available on FoodPanda!</span>
        </p>
        <a
          href="#menu"
          className="inline-block bg-accent text-accent-foreground px-10 py-4 rounded-lg text-caps font-semibold hover:scale-105 hover:shadow-2xl smooth-transition shadow-lg tracking-wider"
        >
          Explore Our Menu
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-primary-foreground opacity-70" />
      </div>
    </section>
  );
};

export default Hero;
