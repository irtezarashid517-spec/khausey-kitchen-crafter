import { useState, useEffect } from "react";
import { MenuItem } from "@/types/menu";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import About from "@/components/About";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";
import ContactButton from "@/components/ContactButton";

const Index = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | undefined>();

  const handleOrderClick = (item: MenuItem) => {
    setSelectedItem(item);
    // Smooth scroll to order section
    setTimeout(() => {
      document.getElementById('order')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <MenuSection onOrderClick={handleOrderClick} />
      <About />
      <OrderForm preselectedItem={selectedItem} />
      <Footer />
      <ContactButton />
    </div>
  );
};

export default Index;
