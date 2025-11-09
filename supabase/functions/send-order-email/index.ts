import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  itemName: string;
  quantity: number;
  selectedSides: string[];
  selectedDessert: string;
  specialInstructions: string;
  total: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const orderData: OrderEmailRequest = await req.json();

    const sidesText = orderData.selectedSides.length > 0 
      ? orderData.selectedSides.join(", ") 
      : "None";
    
    const dessertText = orderData.selectedDessert || "None";

    // Send email using Resend API directly
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Khauwsey House <onboarding@resend.dev>",
        to: ["syedazlan833@gmail.com"],
        subject: `New Order from ${orderData.customerName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <h1 style="color: #4a5568; font-family: 'Dancing Script', cursive;">New Order Received!</h1>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <h2 style="color: #334155; border-bottom: 2px solid #4a5568; padding-bottom: 10px;">Customer Details</h2>
              <p><strong>Name:</strong> ${orderData.customerName}</p>
              <p><strong>Phone:</strong> ${orderData.customerPhone}</p>
              <p><strong>Address:</strong> ${orderData.customerAddress}</p>
              
              <h2 style="color: #334155; border-bottom: 2px solid #4a5568; padding-bottom: 10px; margin-top: 30px;">Order Details</h2>
              <p><strong>Item:</strong> ${orderData.itemName}</p>
              <p><strong>Quantity:</strong> ${orderData.quantity}</p>
              <p><strong>Side Dishes:</strong> ${sidesText}</p>
              <p><strong>Dessert:</strong> ${dessertText}</p>
              <p><strong>Special Instructions:</strong> ${orderData.specialInstructions || "None"}</p>
              
              <h2 style="color: #334155; border-bottom: 2px solid #4a5568; padding-bottom: 10px; margin-top: 30px;">Total Amount</h2>
              <p style="font-size: 24px; color: #4a5568; font-weight: bold;">Rs. ${orderData.total}</p>
            </div>
            
            <p style="margin-top: 30px; color: #64748b; font-size: 14px;">
              This order was placed through your website. Please contact the customer to confirm delivery.
            </p>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Failed to send email:", errorData);
      throw new Error(`Email sending failed: ${errorData}`);
    }

    const emailData = await emailResponse.json();
    console.log("Order email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending order email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
