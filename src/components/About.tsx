const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="heading-elegant text-4xl md:text-5xl mb-8"
            data-aos="fade-up"
          >
            Our Story
          </h2>
          
          <div className="space-y-6 text-lg text-muted-foreground" data-aos="fade-up" data-aos-delay="100">
            <p>
              Welcome to <span className="text-primary font-semibold">Authentic Curry Khauwsey</span>, 
              where tradition meets flavor in every bowl. Our journey began with a passion for preserving 
              the authentic taste of Memon cuisine and sharing it with food lovers across Karachi.
            </p>
            
            <p>
              Each dish is crafted with care using time-honored recipes passed down through generations. 
              We use only the finest ingredients and authentic spices to create the rich, aromatic curry 
              that makes our khauwsey truly special.
            </p>
            
            <p>
              Located in Karachi's Scheme 33, near the Main Super Highway in the Alhira Hanging Garden Society, 
              we're proud to serve our community with fresh, homemade meals. Whether you're ordering through 
              us directly or via FoodPanda, you can trust that every bowl is prepared with the same love and 
              attention to detail.
            </p>
            
            <p className="text-primary text-xl font-semibold">
              From our kitchen to your table — experience authentic flavor, delivered fresh!
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="200">
            <div className="p-6 bg-card rounded-lg shadow-md">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="heading-elegant text-xl mb-2">Homemade Quality</h3>
              <p className="text-muted-foreground text-sm">
                Every dish prepared fresh with authentic ingredients
              </p>
            </div>
            
            <div className="p-6 bg-card rounded-lg shadow-md">
              <div className="text-4xl mb-4">🌶️</div>
              <h3 className="heading-elegant text-xl mb-2">Authentic Spices</h3>
              <p className="text-muted-foreground text-sm">
                Traditional Memon recipes with aromatic spices
              </p>
            </div>
            
            <div className="p-6 bg-card rounded-lg shadow-md">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="heading-elegant text-xl mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground text-sm">
                Fresh food delivered to your door in 45 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
