import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  CheckCircle,
  Mail,
  Calendar,
  MapPin,
  Package,
  Download,
  Printer,
} from "lucide-react";

interface OrderDetails {
  orderNumber: string;
  bookData: any;
  orderType: "digital" | "printed";
  shippingAddress: any;
  shippingCost: number;
  total: number;
  orderDate: string;
}

const OrderSuccess = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem("currentOrder");
    if (storedOrder) {
      setOrderDetails(JSON.parse(storedOrder));
    }
  }, []);

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>No order found. Please try again.</p>
          <Button asChild className="mt-4">
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getDeliveryInfo = () => {
    if (orderDetails.orderType === "digital") {
      return {
        method: "Digital Download",
        timeframe: "Available immediately",
        details: "Check your email for download link",
      };
    } else {
      const europeanCountries = [
        "france",
        "germany",
        "italy",
        "spain",
        "netherlands",
        "belgium",
        "austria",
        "portugal",
        "sweden",
        "denmark",
        "finland",
        "norway",
        "switzerland",
      ];
      const isEurope = europeanCountries.includes(
        orderDetails.shippingAddress?.country?.toLowerCase() || "",
      );

      return {
        method: "Printed Book Delivery",
        timeframe: isEurope ? "5-7 business days" : "10-14 business days",
        details: `Shipping to ${orderDetails.shippingAddress?.country}`,
      };
    }
  };

  const deliveryInfo = getDeliveryInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-adventure-yellow/20">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full adventure-gradient flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold adventure-text-gradient">
              Personalized Adventure Book
            </span>
          </Link>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-600">
            Order Confirmed!
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Thank you for your order! We're excited to create{" "}
            {orderDetails.bookData.childName}'s personalized adventure book.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Order Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="text-center mb-3">
                  <span className="text-sm text-foreground/70">
                    Order Number
                  </span>
                  <div className="text-2xl font-bold text-primary">
                    {orderDetails.orderNumber}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Book Title:</span>
                  <span className="font-medium">
                    {orderDetails.bookData.childName}'s Adventure
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Format:</span>
                  <span className="font-medium flex items-center space-x-1">
                    {orderDetails.orderType === "digital" ? (
                      <>
                        <Download className="w-4 h-4" />{" "}
                        <span>Digital PDF</span>
                      </>
                    ) : (
                      <>
                        <Printer className="w-4 h-4" />{" "}
                        <span>Printed Hardcover</span>
                      </>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Order Date:</span>
                  <span className="font-medium">
                    {new Date(orderDetails.orderDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Amount Paid:</span>
                  <span className="font-medium text-primary">
                    ${orderDetails.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {orderDetails.orderType === "digital" ? (
                  <Mail className="w-5 h-5" />
                ) : (
                  <MapPin className="w-5 h-5" />
                )}
                <span>Delivery Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Method:</span>
                  <span className="font-medium">{deliveryInfo.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Timeframe:</span>
                  <span className="font-medium">{deliveryInfo.timeframe}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Details:</span>
                  <span className="font-medium">{deliveryInfo.details}</span>
                </div>
              </div>

              {orderDetails.orderType === "printed" &&
                orderDetails.shippingAddress && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Shipping Address:</h4>
                    <div className="text-sm text-foreground/70 space-y-1">
                      <p>{orderDetails.shippingAddress.fullName}</p>
                      <p>{orderDetails.shippingAddress.street}</p>
                      <p>
                        {orderDetails.shippingAddress.city},{" "}
                        {orderDetails.shippingAddress.postalCode}
                      </p>
                      <p>{orderDetails.shippingAddress.country}</p>
                      {orderDetails.shippingAddress.phone && (
                        <p>Phone: {orderDetails.shippingAddress.phone}</p>
                      )}
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>
        </div>

        {/* Email Confirmation */}
        <Card className="border-0 shadow-lg mt-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Confirmation Email Sent</h3>
                <p className="text-sm text-foreground/70 mb-2">
                  A detailed confirmation email has been sent to{" "}
                  <strong>{orderDetails.bookData.parentEmail}</strong>
                </p>
                <p className="text-sm text-foreground/70">
                  The email contains your order details, tracking information
                  {orderDetails.orderType === "digital"
                    ? ", and download instructions."
                    : ", and delivery updates will be sent to this address."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>What's Next?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {orderDetails.orderType === "digital" ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                    1
                  </div>
                  <p className="text-sm">
                    Check your email for the download link
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                    2
                  </div>
                  <p className="text-sm">Download your personalized PDF book</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                    3
                  </div>
                  <p className="text-sm">
                    Enjoy reading with {orderDetails.bookData.childName}!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                    1
                  </div>
                  <p className="text-sm">
                    Your book is being printed and prepared
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                    2
                  </div>
                  <p className="text-sm">
                    You'll receive tracking information via email
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                    3
                  </div>
                  <p className="text-sm">
                    Your book will arrive in {deliveryInfo.timeframe}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg">
              <Link to="/">Create Another Book</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
          <p className="text-sm text-foreground/60">
            Need help? Contact our support team at
            support@personalizedadventurebook.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
