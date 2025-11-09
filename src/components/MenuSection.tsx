import { MenuItem } from "@/types/menu";
import { mainDishes, sideDishes, beverages, desserts, deals } from "@/data/menuData";
import MenuCard from "./MenuCard";
import SideCard from "./SideCard";

interface MenuSectionProps {
  onOrderClick: (item: MenuItem) => void;
}

const MenuSection = ({ onOrderClick }: MenuSectionProps) => {
  return (
    <section id="menu" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Main Dishes */}
        <div className="mb-20">
          <h2 
            className="heading-elegant text-4xl md:text-5xl text-center mb-4"
            data-aos="fade-up"
          >
            Our Signature Khauwsey
          </h2>
          <p className="text-center text-muted-foreground mb-12" data-aos="fade-up" data-aos-delay="100">
            Authentic curry noodles cooked to perfection
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainDishes.map((item) => (
              <MenuCard key={item.id} item={item} onOrder={onOrderClick} />
            ))}
          </div>
        </div>

        {/* Sides */}
        <div className="mb-20">
          <h2 
            className="heading-elegant text-4xl md:text-5xl text-center mb-12"
            data-aos="fade-up"
          >
            Sides
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {sideDishes.map((side) => (
              <SideCard key={side.id} side={side} />
            ))}
          </div>
        </div>

        {/* Beverages */}
        <div className="mb-20">
          <h2 
            className="heading-elegant text-4xl md:text-5xl text-center mb-12"
            data-aos="fade-up"
          >
            Beverages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {beverages.map((item) => (
              <MenuCard key={item.id} item={item} onOrder={onOrderClick} />
            ))}
          </div>
        </div>

        {/* Desserts */}
        <div className="mb-20">
          <h2 
            className="heading-elegant text-4xl md:text-5xl text-center mb-12"
            data-aos="fade-up"
          >
            Kheer (Desserts)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {desserts.map((item) => (
              <MenuCard key={item.id} item={item} onOrder={onOrderClick} />
            ))}
          </div>
        </div>

        {/* Deals */}
        <div>
          <h2 
            className="heading-elegant text-4xl md:text-5xl text-center mb-4"
            data-aos="fade-up"
          >
            Special Deals
          </h2>
          <p className="text-center text-muted-foreground mb-12" data-aos="fade-up" data-aos-delay="100">
            Great value combo meals for every occasion
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {deals.map((item) => (
              <MenuCard key={item.id} item={item} onOrder={onOrderClick} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
