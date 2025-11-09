import { MenuItem, SideDish } from "@/types/menu";
import regularChicken from "@/assets/regular-chicken.jpg";
import largeChicken from "@/assets/large-chicken.jpg";
import regularBeef from "@/assets/regular-beef.jpg";
import largeBeef from "@/assets/large-beef.jpg";
import regularBbq from "@/assets/regular-bbq.jpg";
import largeBbq from "@/assets/large-bbq.jpg";
import papri from "@/assets/papri.jpg";
import lemon from "@/assets/lemon.jpg";
import slims from "@/assets/slims.jpg";
import onion from "@/assets/onion.jpg";
import chatni from "@/assets/chatni.jpg";
import spices from "@/assets/spices.jpg";
import beverage from "@/assets/beverage.jpg";
import badamiKheer from "@/assets/badami-kheer.jpg";
import pistaKheer from "@/assets/pista-kheer.jpg";
import deal1 from "@/assets/deal-1.jpg";
import deal2 from "@/assets/deal-2.jpg";
import deal3 from "@/assets/deal-3.jpg";
import deal4 from "@/assets/deal-4.jpg";

export const mainDishes: MenuItem[] = [
  {
    id: "regular-chicken",
    name: "Regular Chicken Khauwsey",
    price: 600,
    image: regularChicken,
    category: "main",
    description: "Authentic curry khauwsey with tender chicken pieces"
  },
  {
    id: "large-chicken",
    name: "Large Chicken Khauwsey",
    price: 850,
    image: largeChicken,
    category: "main",
    description: "Large portion of our signature chicken khauwsey"
  },
  {
    id: "regular-beef",
    name: "Regular Beef Khauwsey",
    price: 650,
    image: regularBeef,
    category: "main",
    description: "Rich beef curry khauwsey with aromatic spices"
  },
  {
    id: "large-beef",
    name: "Large Beef Khauwsey",
    price: 1050,
    image: largeBeef,
    category: "main",
    description: "Large portion of our delicious beef khauwsey"
  },
  {
    id: "regular-bbq",
    name: "Regular BBQ Khauwsey",
    price: 650,
    image: regularBbq,
    category: "main",
    description: "Smoky BBQ flavored khauwsey"
  },
  {
    id: "large-bbq",
    name: "Large BBQ Khauwsey",
    price: 910,
    image: largeBbq,
    category: "main",
    description: "Large portion of BBQ khauwsey"
  },
];

export const sideDishes: SideDish[] = [
  { id: "papri", name: "Papri", price: 50, image: papri },
  { id: "lemon", name: "Lemon", price: 50, image: lemon },
  { id: "slims", name: "Slims", price: 50, image: slims },
  { id: "onion", name: "Onion", price: 50, image: onion },
  { id: "chatni", name: "Chatni", price: 50, image: chatni },
  { id: "spices", name: "Spices", price: 50, image: spices },
];

export const beverages: MenuItem[] = [
  {
    id: "beverage-345",
    name: "345 ml",
    price: 120,
    image: beverage,
    category: "beverages",
  },
  {
    id: "beverage-500",
    name: "500 ml",
    price: 150,
    image: beverage,
    category: "beverages",
  },
  {
    id: "beverage-1000",
    name: "1 ltr",
    price: 200,
    image: beverage,
    category: "beverages",
  },
];

export const desserts: MenuItem[] = [
  {
    id: "badami-kheer",
    name: "Badami Kheer",
    price: 250,
    image: badamiKheer,
    category: "desserts",
    description: "Creamy rice pudding with almonds"
  },
  {
    id: "pista-kheer",
    name: "Pista Kheer",
    price: 250,
    image: pistaKheer,
    category: "desserts",
    description: "Creamy rice pudding with pistachios"
  },
];

export const deals: MenuItem[] = [
  {
    id: "deal-1",
    name: "Family Deal",
    price: 2500,
    image: deal1,
    category: "deals",
    description: "3 Large Khauwsey + 6 Sides + 3 Beverages"
  },
  {
    id: "deal-2",
    name: "Combo Deal",
    price: 1200,
    image: deal2,
    category: "deals",
    description: "1 Large Khauwsey + 2 Sides + 1 Beverage + 1 Kheer"
  },
  {
    id: "deal-3",
    name: "Dinner Special",
    price: 1800,
    image: deal3,
    category: "deals",
    description: "2 Large Khauwsey + 4 Sides + 2 Beverages"
  },
  {
    id: "deal-4",
    name: "Party Pack",
    price: 4500,
    image: deal4,
    category: "deals",
    description: "5 Large Khauwsey + 10 Sides + 5 Beverages + 2 Kheer"
  },
];
