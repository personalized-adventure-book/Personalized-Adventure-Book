import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import {
  BookOpen,
  Download,
  Printer,
  ArrowLeft,
  Star,
  Heart,
  Sparkles,
  ShoppingCart,
} from "lucide-react";

interface BookData {
  parentName: string;
  parentEmail: string;
  childName: string;
  childAge: string;
  childGender: string;
  adventureType: string;
  location: string;
  activities: string[];
  characters: string;
  personalTouches: string;
  includeFriends: string;
  favoriteColor: string;
  petName: string;
  specialDetails: string;
}

const Preview = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [orderType, setOrderType] = useState<"digital" | "printed" | null>(
    null,
  );
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const [shippingCost, setShippingCost] = useState(0);

  const getShippingCost = (country: string) => {
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
    if (europeanCountries.includes(country.toLowerCase())) {
      return 0; // Free shipping in Europe
    } else if (
      country.toLowerCase() === "united states" ||
      country.toLowerCase() === "canada"
    ) {
      return 15;
    } else {
      return 25; // Rest of world
    }
  };

  const handleOrderClick = (type: "digital" | "printed") => {
    setOrderType(type);
    if (type === "printed") {
      setShowAddressForm(true);
    } else {
      setShowPayment(true);
    }
  };

  const handleAddressSubmit = () => {
    const cost = getShippingCost(shippingAddress.country);
    setShippingCost(cost);
    setShowAddressForm(false);
    setShowPayment(true);
  };

  const handlePaymentSubmit = () => {
    setShowPayment(false);
    setShowConfirmation(true);
  };

  const confirmOrder = () => {
    // Generate order number
    const orderNumber = "ADV" + Date.now().toString().slice(-6);

    // Store order details
    const orderDetails = {
      orderNumber,
      bookData,
      orderType,
      shippingAddress: orderType === "printed" ? shippingAddress : null,
      shippingCost,
      total: (orderType === "digital" ? 12.99 : 24.99) + shippingCost,
      orderDate: new Date().toISOString(),
    };

    localStorage.setItem("currentOrder", JSON.stringify(orderDetails));

    // Send confirmation email (simulate)
    sendConfirmationEmail(orderDetails);

    setShowConfirmation(false);
    navigate("/order-success");
  };

  const sendConfirmationEmail = (orderDetails: any) => {
    // In a real app, this would call your email service
    console.log("Sending confirmation email:", {
      to: orderDetails.bookData.parentEmail,
      subject: `Order Confirmation - ${orderDetails.orderNumber}`,
      orderDetails,
    });
  };

  useEffect(() => {
    const data = localStorage.getItem("adventureBookData");
    if (data) {
      setBookData(JSON.parse(data));
    } else {
      navigate("/create");
    }
  }, [navigate]);

  if (!bookData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading your adventure...</p>
        </div>
      </div>
    );
  }

  const adventureTypeNames: { [key: string]: string } = {
    space: "Space Mission",
    forest: "Enchanted Forest",
    castle: "Royal Castle",
    pirate: "Pirate Voyage",
    superhero: "Superhero Academy",
    underwater: "Underwater World",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-adventure-yellow/20">
      <Header showNavigation={false} />

      <div className="container mx-auto px-4 py-4">
        <Button variant="outline" asChild className="mb-6">
          <Link to="/create" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Edit Details</span>
          </Link>
        </Button>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Your Adventure Book is Ready!</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="adventure-text-gradient">
              {bookData.childName}'s{" "}
              {adventureTypeNames[bookData.adventureType]}
            </span>
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Here's a preview of your personalized adventure book. Your child
            will love seeing themselves as the hero!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Book Preview */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-adventure-purple to-adventure-pink p-8 text-white text-center">
                <h2 className="text-2xl font-bold mb-2">
                  {bookData.childName} and the{" "}
                  {adventureTypeNames[bookData.adventureType]}
                </h2>
                <p className="text-white/90">A Personalized Adventure</p>
              </div>
            </Card>

            {/* Dynamic Sample Pages */}
            <div className="grid gap-4">
              {/* First Page - Introduction to destination/adventure */}
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-adventure-blue/20 rounded-lg flex items-center justify-center">
                      <Heart className="w-8 h-8 text-adventure-blue" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">
                        Page 1: Welcome to {bookData.location}
                      </h3>
                      <p className="text-sm text-foreground/70">
                        "Once upon a time, there was a brave {bookData.childAge}
                        -year-old named {bookData.childName}
                        who loved{" "}
                        {bookData.favoriteColor
                          ? bookData.favoriteColor.toLowerCase()
                          : "colorful"}{" "}
                        things. Today, {bookData.childName} was about to embark
                        on an amazing adventure in {bookData.location}, a
                        magical place full of wonders and exciting
                        discoveries..."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Pages */}
              {bookData.activities.slice(0, 3).map((activity, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-16 h-16 bg-adventure-${["green", "purple", "orange"][index]}/20 rounded-lg flex items-center justify-center`}
                      >
                        <Sparkles
                          className={`w-8 h-8 text-adventure-${["green", "purple", "orange"][index]}`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">
                          Page {index + 2}: {activity}
                        </h3>
                        <p className="text-sm text-foreground/70">
                          "Here, {bookData.childName} will{" "}
                          {activity.toLowerCase()}. It was going to be{" "}
                          {bookData.childGender === "girl" ? "her" : "his"}
                          favorite part of the adventure in {bookData.location}.
                          {bookData.includeFriends &&
                            `Together with ${bookData.includeFriends}, `}
                          {bookData.childName} was ready for this exciting
                          challenge..."
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                );
              })}

              {/* Final Page - Adventure conclusion */}
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-adventure-yellow/20 rounded-lg flex items-center justify-center">
                      <Star className="w-8 h-8 text-adventure-yellow" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">
                        Final Page: The Adventure Complete
                      </h3>
                      <p className="text-sm text-foreground/70">
                        "After all the amazing adventures in {bookData.location}
                        ,{bookData.childName} had become a true hero.
                        {bookData.childGender === "girl" ? "She" : "He"} had
                        learned so much and made wonderful memories. As{" "}
                        {bookData.childName} looked back at{" "}
                        {bookData.childGender === "girl" ? "her" : "his"}
                        incredible journey,{" "}
                        {bookData.childGender === "girl" ? "she" : "he"} knew
                        this was just the beginning of many more adventures to
                        come..."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Purchase Options */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Get Your Book</CardTitle>
                <p className="text-center text-foreground/70">
                  Choose how you'd like to receive your personalized adventure
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card className="border-2 border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Download className="w-8 h-8 text-adventure-blue" />
                        <div>
                          <h3 className="font-semibold">Digital Download</h3>
                          <p className="text-sm text-foreground/70">
                            Instant PDF download
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          $12.99
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-foreground/70 mb-4">
                      <li className="flex items-center space-x-2">
                        <Star className="w-3 h-3 text-adventure-yellow" />
                        <span>20+ page personalized story</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Star className="w-3 h-3 text-adventure-yellow" />
                        <span>High-quality illustrations</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Star className="w-3 h-3 text-adventure-yellow" />
                        <span>Instant download</span>
                      </li>
                    </ul>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => handleOrderClick("digital")}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Buy Digital ($12.99)
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-primary relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                  <CardContent className="p-6 pt-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Printer className="w-8 h-8 text-adventure-green" />
                        <div>
                          <h3 className="font-semibold">Printed Hardcover</h3>
                          <p className="text-sm text-foreground/70">
                            Professional hardcover book
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          $24.99
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-foreground/70 mb-4">
                      <li className="flex items-center space-x-2">
                        <Star className="w-3 h-3 text-adventure-yellow" />
                        <span>Everything in Digital version</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Star className="w-3 h-3 text-adventure-yellow" />
                        <span>Premium hardcover binding</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Star className="w-3 h-3 text-adventure-yellow" />
                        <span>Professional printing</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Star className="w-3 h-3 text-adventure-yellow" />
                        <span>Free shipping (5-7 days)</span>
                      </li>
                    </ul>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => handleOrderClick("printed")}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Order Printed Book ($24.99)
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Book Details Summary */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Your Book Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Child's Name:</span>
                  <span className="font-medium">{bookData.childName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Age:</span>
                  <span className="font-medium">
                    {bookData.childAge} years old
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Adventure Type:</span>
                  <span className="font-medium">
                    {adventureTypeNames[bookData.adventureType]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Setting:</span>
                  <span className="font-medium">{bookData.location}</span>
                </div>
                {bookData.activities.length > 0 && (
                  <div>
                    <span className="text-foreground/70">Activities:</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {bookData.activities
                        .slice(0, 3)
                        .map((activity, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {activity}
                          </Badge>
                        ))}
                      {bookData.activities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{bookData.activities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 pt-8 border-t">
          <p className="text-foreground/70 mb-4">
            ✨ Your book will be delivered to:{" "}
            <strong>{bookData.parentEmail}</strong>
          </p>
          <p className="text-sm text-foreground/60">
            Questions? We're here to help! Contact our support team anytime.
          </p>
        </div>
      </div>

      {/* Address Form Dialog */}
      <Dialog open={showAddressForm} onOpenChange={setShowAddressForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Shipping Address</DialogTitle>
            <DialogDescription>
              Please enter your shipping address for the printed book.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={shippingAddress.fullName}
                onChange={(e) =>
                  setShippingAddress((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
                placeholder="Enter full name"
              />
            </div>
            <div>
              <Label htmlFor="street">Street Address *</Label>
              <Input
                id="street"
                value={shippingAddress.street}
                onChange={(e) =>
                  setShippingAddress((prev) => ({
                    ...prev,
                    street: e.target.value,
                  }))
                }
                placeholder="Enter street address"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  placeholder="Enter city"
                />
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input
                  id="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={(e) =>
                    setShippingAddress((prev) => ({
                      ...prev,
                      postalCode: e.target.value,
                    }))
                  }
                  placeholder="Enter postal code"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                value={shippingAddress.country}
                onChange={(e) => {
                  setShippingAddress((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }));
                }}
                placeholder="Enter country"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={shippingAddress.phone}
                onChange={(e) =>
                  setShippingAddress((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                placeholder="Enter phone number"
              />
            </div>
            {shippingAddress.country && (
              <div className="bg-secondary/50 p-3 rounded-lg">
                <p className="text-sm">
                  <strong>Shipping Cost:</strong> $
                  {getShippingCost(shippingAddress.country).toFixed(2)}
                  {getShippingCost(shippingAddress.country) === 0 &&
                    " (Free in Europe!)"}
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddressForm(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddressSubmit}
              disabled={
                !shippingAddress.fullName ||
                !shippingAddress.street ||
                !shippingAddress.city ||
                !shippingAddress.postalCode ||
                !shippingAddress.country
              }
            >
              Continue to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              Complete your payment to place the order.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-secondary/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Order Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>
                    {orderType === "digital" ? "Digital Book" : "Printed Book"}
                  </span>
                  <span>${orderType === "digital" ? "12.99" : "24.99"}</span>
                </div>
                {orderType === "printed" && shippingCost > 0 && (
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-1 font-semibold flex justify-between">
                  <span>Total</span>
                  <span>
                    $
                    {(
                      (orderType === "digital" ? 12.99 : 24.99) + shippingCost
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="cardNumber">Card Number *</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="expiry">Expiry Date *</Label>
                  <Input id="expiry" placeholder="MM/YY" maxLength={5} />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input id="cvv" placeholder="123" maxLength={4} />
                </div>
              </div>
              <div>
                <Label htmlFor="cardName">Cardholder Name *</Label>
                <Input id="cardName" placeholder="Enter cardholder name" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPayment(false)}>
              Cancel
            </Button>
            <Button onClick={handlePaymentSubmit}>Complete Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Confirm Your Order</DialogTitle>
            <DialogDescription>
              Please review your order details before confirming your{" "}
              {orderType} book order.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Order Details</h4>
                <p className="text-sm text-foreground/70">
                  Book: {bookData?.childName}'s Adventure
                </p>
                <p className="text-sm text-foreground/70">
                  Type:{" "}
                  {orderType === "digital"
                    ? "Digital PDF"
                    : "Printed Hardcover"}
                </p>
                <p className="text-sm text-foreground/70">
                  Price: {orderType === "digital" ? "$12.99" : "$24.99"}
                </p>
                {orderType === "printed" && (
                  <p className="text-sm text-foreground/70">
                    Delivery: Free in Europe (5-7 days)
                  </p>
                )}
              </div>
              <div>
                <h4 className="font-semibold mb-2">Delivery Information</h4>
                <p className="text-sm text-foreground/70">
                  Name: {bookData?.parentName}
                </p>
                <p className="text-sm text-foreground/70">
                  Email: {bookData?.parentEmail}
                </p>
                <p className="text-sm text-foreground/70">
                  Child: {bookData?.childName} ({bookData?.childAge} years old)
                </p>
              </div>
            </div>

            <div className="bg-secondary/50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Amount</span>
                <span className="font-bold text-lg text-primary">
                  {orderType === "digital" ? "$12.99" : "$24.99"}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmOrder}
              className="bg-primary hover:bg-primary/90"
            >
              Confirm Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Preview;