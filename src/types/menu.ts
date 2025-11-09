export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'main' | 'sides' | 'beverages' | 'desserts' | 'deals';
  description?: string;
}

export interface SideDish {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  item: MenuItem;
  quantity: number;
  sides: SideDish[];
  dessert?: MenuItem;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  specialInstructions?: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  timestamp: number;
}
