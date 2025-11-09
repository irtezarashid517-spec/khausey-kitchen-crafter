import { SideDish } from "@/types/menu";

interface SideCardProps {
  side: SideDish;
}

const SideCard = ({ side }: SideCardProps) => {
  return (
    <div 
      className="bg-card rounded-lg overflow-hidden shadow-md card-hover-effect"
      data-aos="zoom-in"
    >
      <div className="h-32 overflow-hidden">
        <img 
          src={side.image} 
          alt={side.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 text-center">
        <h4 className="text-caps text-sm font-semibold text-card-foreground mb-2">
          {side.name}
        </h4>
        <span className="text-primary font-bold">
          Rs. {side.price}
        </span>
      </div>
    </div>
  );
};

export default SideCard;
