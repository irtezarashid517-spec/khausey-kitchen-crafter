import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";

const ContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all fields",
        confirmButtonColor: "hsl(var(--primary))",
      });
      return;
    }

    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
        body: { name, email, message }
      });

      if (emailError) {
        console.error('Failed to send contact email:', emailError);
        throw emailError;
      }

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "We'll get back to you soon.",
        confirmButtonColor: "hsl(var(--primary))",
      });

      // Reset form
      setName("");
      setEmail("");
      setMessage("");
      setIsOpen(false);
    } catch (error) {
      console.error('Contact form error:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send message. Please try again.",
        confirmButtonColor: "hsl(var(--primary))",
      });
    }
  };

  return (
    <>
      {/* Contact Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-accent text-accent-foreground p-4 rounded-full shadow-lg hover:scale-110 smooth-transition"
        aria-label="Contact us"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Contact Form */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-card rounded-xl shadow-2xl p-6 animate-slide-up">
          <h3 className="heading-elegant text-2xl mb-4">Contact Us</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={3}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Send Message
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default ContactButton;
