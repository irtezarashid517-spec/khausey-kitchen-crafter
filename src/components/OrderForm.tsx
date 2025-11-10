import { useState, useEffect } from "react";
import { MenuItem, SideDish, Order } from "@/types/menu";
import { sideDishes, desserts, mainDishes } from "@/data/menuData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Swal from "sweetalert2";
import { ShoppingCart, Plus, Minus } from "lucide-react";

interface OrderFormProps {
  preselectedItem?: MenuItem;
}

const OrderForm = ({ preselectedItem }: OrderFormProps) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | undefined>(preselectedItem);
  const [quantity, setQuantity] = useState(1);
  const [selectedSides, setSelectedSides] = useState<SideDish[]>([]);
  const [selectedDessert, setSelectedDessert] = useState<MenuItem | undefined>();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  useEffect(() => {
    if (preselectedItem) {
      setSelectedItem(preselectedItem);
    }
  }, [preselectedItem]);

  const toggleSide = (side: SideDish) => {
    setSelectedSides(prev => {
      const exists = prev.find(s => s.id === side.id);
      if (exists) {
        return prev.filter(s => s.id !== side.id);
      }
      return [...prev, side];
    });
  };

  const calculateTotal = () => {
    let total = 0;
    if (selectedItem) total += selectedItem.price * quantity;
    selectedSides.forEach(side => total += side.price);
    if (selectedDessert) total += selectedDessert.price;
    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedItem || !customerName || !customerPhone || !customerAddress) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all required fields",
        confirmButtonColor: "hsl(var(--primary))",
      });
      return;
    }

    const order: Order = {
      id: `order-${Date.now()}`,
      item: selectedItem,
      quantity,
      sides: selectedSides,
      dessert: selectedDessert,
      customerName,
      customerPhone,
      customerAddress,
      specialInstructions,
      totalPrice: calculateTotal(),
      status: 'pending',
      timestamp: Date.now(),
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));

    // Send email notification via edge function
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const { error: emailError } = await supabase.functions.invoke('send-order-email', {
        body: {
          customerName,
          customerPhone,
          customerAddress,
          itemName: selectedItem.name,
          quantity,
          selectedSides: selectedSides.map(s => s.name),
          selectedDessert: selectedDessert?.name || '',
          specialInstructions,
          total: calculateTotal()
        }
      });

      if (emailError) {
        console.error('Failed to send email notification:', emailError);
      }
    } catch (error) {
      console.error('Email error:', error);
    }

    // Show success message with WhatsApp link
    Swal.fire({
      icon: "success",
      title: "Order Placed Successfully!",
      html: `
        <div class="text-left space-y-4">
          <p><strong>Order Details:</strong></p>
          <p>Item: ${selectedItem.name} x${quantity}</p>
          ${selectedSides.length > 0 ? `<p>Sides: ${selectedSides.map(s => s.name).join(', ')}</p>` : ''}
          ${selectedDessert ? `<p>Dessert: ${selectedDessert.name}</p>` : ''}
          <p><strong>Total: Rs. ${calculateTotal()}</strong></p>
          <p class="text-sm mt-4">⏱️ Your order will be delivered in approximately 45 minutes</p>
          <p class="text-sm">📱 Contact us on WhatsApp: +92 370 9181625</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Contact on WhatsApp',
      cancelButtonText: 'Close',
      confirmButtonColor: "#25D366",
      cancelButtonColor: "hsl(var(--muted))",
    }).then((result) => {
      if (result.isConfirmed) {
        const message = encodeURIComponent(
          `Hi! I just placed an order:\n\nOrder ID: ${order.id}\nItem: ${selectedItem.name} x${quantity}\nTotal: Rs. ${calculateTotal()}`
        );
        window.open(`https://wa.me/923709181625?text=${message}`, '_blank');
      }
    });

    // Reset form
    setQuantity(1);
    setSelectedSides([]);
    setSelectedDessert(undefined);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    setSpecialInstructions("");
  };

  const total = calculateTotal();

  return (
    <section id="order" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 
          className="heading-elegant text-4xl md:text-5xl text-center mb-12"
          data-aos="fade-up"
        >
          Place Your Order
        </h2>

        <form onSubmit={handleSubmit} className="bg-card p-6 md:p-8 rounded-xl shadow-lg" data-aos="fade-up">
          {/* Dish Selection */}
          <div className="mb-6">
            <Label className="text-caps">Select Your Dish *</Label>
            <Select 
              value={selectedItem?.id} 
              onValueChange={(value) => {
                const dish = mainDishes.find(d => d.id === value);
                setSelectedItem(dish);
              }}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose a dish" />
              </SelectTrigger>
              <SelectContent>
                {mainDishes.map((dish) => (
                  <SelectItem key={dish.id} value={dish.id}>
                    {dish.name} - Rs. {dish.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          {selectedItem && (
            <div className="mb-6">
              <Label className="text-caps">Quantity</Label>
              <div className="flex items-center gap-4 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={16} />
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* Side Dishes */}
          <div className="mb-6">
            <Label className="text-caps mb-3 block">Add Sides (Optional)</Label>
            <div className="grid grid-cols-3 gap-3">
              {sideDishes.map((side) => (
                <button
                  key={side.id}
                  type="button"
                  onClick={() => toggleSide(side)}
                  className={`p-3 rounded-lg border-2 transition-all text-sm ${
                    selectedSides.find(s => s.id === side.id)
                      ? 'badge-active border-accent'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="font-semibold">{side.name}</div>
                  <div className="text-xs text-muted-foreground">Rs. {side.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Desserts */}
          <div className="mb-6">
            <Label className="text-caps mb-3 block">Add Dessert (Optional)</Label>
            <div className="grid grid-cols-2 gap-4">
              {desserts.map((dessert) => (
                <button
                  key={dessert.id}
                  type="button"
                  onClick={() => setSelectedDessert(
                    selectedDessert?.id === dessert.id ? undefined : dessert
                  )}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedDessert?.id === dessert.id
                      ? 'badge-active border-accent'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="font-semibold">{dessert.name}</div>
                  <div className="text-sm text-muted-foreground">Rs. {dessert.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="name" className="text-caps">Name *</Label>
              <Input
                id="name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-caps">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="address" className="text-caps">Delivery Address *</Label>
              <Textarea
                id="address"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                required
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="instructions" className="text-caps">Special Instructions (Optional)</Label>
              <Textarea
                id="instructions"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="mt-1"
                rows={2}
              />
            </div>
          </div>

          {/* Total */}
          <div className="mb-6 p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span className="text-caps text-sm">Total Amount:</span>
              <span className="text-primary text-xl">Rs. {total}</span>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-caps py-6"
            size="lg"
          >
            <ShoppingCart className="mr-2" />
            Place Order
          </Button>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;
