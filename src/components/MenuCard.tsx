import { MenuItem } from "@/types/menu";
import { Button } from "@/components/ui/button";

interface MenuCardProps {
  item: MenuItem;
  onOrder: (item: MenuItem) => void;
}

const MenuCard = ({ item, onOrder }: MenuCardProps) => {
  return (
    <div 
      className="bg-card rounded-xl overflow-hidden shadow-lg card-hover-effect"
      data-aos="fade-up"
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="heading-elegant text-xl mb-2 text-card-foreground">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-muted-foreground text-sm mb-4">
            {item.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-caps text-2xl font-bold text-primary">
            Rs. {item.price}
          </span>
          <Button 
            onClick={() => onOrder(item)}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
