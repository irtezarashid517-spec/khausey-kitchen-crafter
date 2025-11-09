import { useState, useEffect } from "react";
import { Order } from "@/types/menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Swal from "sweetalert2";
import { ArrowLeft, X, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  };

  const handleCancelOrder = async (orderId: string) => {
    const result = await Swal.fire({
      title: 'Cancel Order?',
      text: "Are you sure you want to cancel this order?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'hsl(var(--destructive))',
      cancelButtonColor: 'hsl(var(--muted))',
      confirmButtonText: 'Yes, cancel it',
      cancelButtonText: 'No, keep it'
    });

    if (result.isConfirmed) {
      const updatedOrders = orders.map(order => 
        order.id === orderId ? { ...order, status: 'cancelled' as const } : order
      );
      
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrders(updatedOrders);

      // Send cancellation email notification
      try {
        await fetch('/api/cancel-order-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId }),
        });
      } catch (error) {
        console.error('Email error:', error);
      }

      Swal.fire({
        icon: 'success',
        title: 'Order Cancelled',
        text: 'Your order has been cancelled successfully.',
        confirmButtonColor: 'hsl(var(--primary))',
      });
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="outline" size="icon">
                <ArrowLeft />
              </Button>
            </Link>
            <h1 className="heading-elegant text-4xl md:text-5xl">My Orders</h1>
          </div>

          {orders.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground text-lg mb-4">No orders yet</p>
              <Link to="/">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Browse Menu
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid gap-6">
              {orders.map((order) => (
                <Card key={order.id} className="p-6" data-aos="fade-up">
                  <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                    <div>
                      <h3 className="heading-elegant text-xl mb-1">Order #{order.id.slice(-8)}</h3>
                      <p className="text-sm text-muted-foreground">{formatDate(order.timestamp)}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-lg text-sm font-semibold h-fit ${
                      order.status === 'pending' 
                        ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                        : order.status === 'confirmed'
                        ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                        : 'bg-red-500/20 text-red-700 dark:text-red-400'
                    }`}>
                      {order.status.toUpperCase()}
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="font-semibold">{order.item.name}</span>
                      <span>x{order.quantity}</span>
                    </div>

                    {order.sides.length > 0 && (
                      <div>
                        <span className="text-sm text-muted-foreground">Sides: </span>
                        <span className="text-sm">{order.sides.map(s => s.name).join(', ')}</span>
                      </div>
                    )}

                    {order.dessert && (
                      <div>
                        <span className="text-sm text-muted-foreground">Dessert: </span>
                        <span className="text-sm">{order.dessert.name}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t">
                      <p className="text-sm"><strong>Name:</strong> {order.customerName}</p>
                      <p className="text-sm"><strong>Phone:</strong> {order.customerPhone}</p>
                      <p className="text-sm"><strong>Address:</strong> {order.customerAddress}</p>
                      {order.specialInstructions && (
                        <p className="text-sm"><strong>Instructions:</strong> {order.specialInstructions}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="font-bold text-lg text-primary">
                        Total: Rs. {order.totalPrice}
                      </span>
                    </div>

                    {order.status === 'pending' && (
                      <div className="text-sm text-muted-foreground">
                        ⏱️ Estimated delivery: 45 minutes
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {order.status === 'pending' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelOrder(order.id)}
                        className="flex-1"
                      >
                        <X className="mr-2" size={16} />
                        Cancel Order
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const message = encodeURIComponent(
                          `Hi! Regarding Order #${order.id.slice(-8)}\n\nItem: ${order.item.name} x${order.quantity}\nTotal: Rs. ${order.totalPrice}`
                        );
                        window.open(`https://wa.me/923709181625?text=${message}`, '_blank');
                      }}
                      className="flex-1"
                    >
                      <Phone className="mr-2" size={16} />
                      Contact WhatsApp
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
