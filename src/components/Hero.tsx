import heroImage from "@/assets/hero-khauwsey.jpg";

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
        <h1 className="heading-elegant text-5xl md:text-7xl lg:text-8xl mb-6 animate-fade-in">
          Authentic Curry Khauwsey
        </h1>
        <p className="text-caps text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed mb-8">
          Experience the rich flavors of traditional Memon cuisine, crafted with love and authentic spices. 
          Fresh, homemade, and delivered straight to your door.
        </p>
        <p className="text-sm md:text-base mb-8 opacity-90">
          📍 Karachi, Scheme 33 • Near Main Super Highway • Alhira Hanging Garden Society
        </p>
        <p className="text-sm md:text-base mb-12 opacity-90">
          🍴 Also available on FoodPanda!
        </p>
        <a
          href="#menu"
          className="inline-block bg-accent text-accent-foreground px-8 py-4 rounded-lg text-caps font-semibold hover:scale-105 smooth-transition shadow-lg"
        >
          View Menu
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-foreground rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
