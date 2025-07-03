import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import { useTranslation } from "@/hooks/useTranslation";
import {
  countries,
  validatePhoneNumber,
  formatPhoneNumber,
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
} from "@/lib/countries";
import {
  BookOpen,
  Download,
  Printer,
  ArrowLeft,
  Star,
  Heart,
  Sparkles,
  ShoppingCart,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface ExperienceDetail {
  id: string;
  title: string;
  description: string;
  predefinedActivities: string[];
  customActivities: string[];
  activityDetails: any[];
  characters: string;
  images: any[];
  imageDescription: string;
}

interface BookData {
  parentName: string;
  parentEmail: string;
  childName: string;
  childAge: string;
  childGender: string;
  adventureType: string;
  customAdventureType: string;
  finalAdventureType: string;
  location: string;
  experiences: ExperienceDetail[];
  favoriteColor: string;
  petName: string;
  includeFriends: string;
  specialDetails: string;
}

interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  countryCode: string;
  phone: string;
}

interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

const Preview = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [showFormatChoice, setShowFormatChoice] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderType, setOrderType] = useState<"digital" | "printed" | null>(
    null,
  );
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
    countryCode: "",
    phone: "",
  });
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [shippingCost, setShippingCost] = useState(0);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedData = localStorage.getItem("adventureBookData");
    if (savedData) {
      setBookData(JSON.parse(savedData));
    } else {
      navigate("/create");
    }
  }, [navigate]);

  const getShippingCost = (countryCode: string) => {
    const europeanCountries = ["FR", "DE", "IT", "ES", "NL", "BE", "AT", "CH"];
    if (europeanCountries.includes(countryCode)) {
      return 0; // Free shipping in Europe
    } else if (countryCode === "US" || countryCode === "CA") {
      return 15;
    } else {
      return 25; // Rest of world
    }
  };

  const handleOrderClick = (type: "digital" | "printed") => {
    setOrderType(type);
    setShowFormatChoice(false);
    if (type === "printed") {
      setShowAddressForm(true);
    } else {
      setShowPayment(true);
    }
  };

  const validateAddressForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!shippingAddress.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!shippingAddress.street.trim()) {
      errors.street = "Street address is required";
    }
    if (!shippingAddress.city.trim()) {
      errors.city = "City is required";
    }
    if (!shippingAddress.postalCode.trim()) {
      errors.postalCode = "Postal code is required";
    }
    if (!shippingAddress.country) {
      errors.country = "Country is required";
    }
    if (!shippingAddress.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (
      !validatePhoneNumber(shippingAddress.phone, shippingAddress.countryCode)
    ) {
      errors.phone = t("order.phoneInvalid");
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePaymentForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!paymentDetails.cardNumber.trim()) {
      errors.cardNumber = "Card number is required";
    } else if (!validateCardNumber(paymentDetails.cardNumber)) {
      errors.cardNumber = t("order.cardNumberInvalid");
    }

    if (!paymentDetails.expiryDate.trim()) {
      errors.expiryDate = "Expiry date is required";
    } else if (!validateExpiryDate(paymentDetails.expiryDate)) {
      errors.expiryDate = t("order.expiryInvalid");
    }

    if (!paymentDetails.cvv.trim()) {
      errors.cvv = "CVV is required";
    } else if (!validateCVV(paymentDetails.cvv)) {
      errors.cvv = t("order.cvvInvalid");
    }

    if (!paymentDetails.cardholderName.trim()) {
      errors.cardholderName = "Cardholder name is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddressContinue = () => {
    if (validateAddressForm()) {
      setShowAddressForm(false);
      setShowPayment(true);
    }
  };

  const handlePaymentComplete = () => {
    if (validatePaymentForm()) {
      setShowPayment(false);
      setShowConfirmation(true);
    }
  };

  const handleCountryChange = (countryCode: string) => {
    const selectedCountry = countries.find(
      (country) => country.code === countryCode,
    );
    if (selectedCountry) {
      setShippingAddress((prev) => ({
        ...prev,
        country: selectedCountry.name,
        countryCode: countryCode,
      }));
      setShippingCost(getShippingCost(countryCode));
    }
  };

  const formatCardNumberDisplay = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();
    return formatted;
  };

  const formatExpiryDisplay = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  if (!bookData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-adventure-yellow/20 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Loading your adventure...</h2>
          <p className="text-foreground/70">
            Please wait while we prepare your personalized book preview.
          </p>
        </div>
      </div>
    );
  }

  const bookPrice = orderType === "digital" ? 12.99 : 24.99;
  const totalPrice = bookPrice + (orderType === "printed" ? shippingCost : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-adventure-yellow/20">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <Button
          variant="outline"
          asChild
          className="mb-6 flex items-center space-x-2"
        >
          <Link to="/create">
            <ArrowLeft className="w-4 h-4" />
            <span>{t("order.backToForm")}</span>
          </Link>
        </Button>

        {/* Book Preview */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview Pages */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold adventure-text-gradient">
              {bookData.childName}'s Adventure Preview
            </h1>

            {/* First Page - Introduction */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-adventure-purple to-adventure-pink p-8 text-white">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">
                    Welcome to {bookData.location}!
                  </h2>
                  <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
                    <Sparkles className="w-12 h-12" />
                  </div>
                  <p className="text-lg leading-relaxed">
                    Meet <strong>{bookData.childName}</strong>, a brave{" "}
                    {bookData.childAge}-year-old adventurer who is about to
                    embark on the most exciting{" "}
                    {bookData.finalAdventureType?.toLowerCase() || "adventure"}{" "}
                    ever!
                  </p>
                  {bookData.favoriteColor && (
                    <p className="mt-4 text-white/90">
                      Wearing their favorite {bookData.favoriteColor} outfit,{" "}
                      {bookData.childName} feels ready for anything!
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* Experience Pages */}
            {bookData.experiences.map((experience, index) => (
              <Card key={experience.id} className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-adventure-blue to-adventure-green text-white">
                  <CardTitle className="text-xl">
                    Chapter {index + 1}: {experience.title || "Great Adventure"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-lg leading-relaxed">
                      {experience.description ||
                        `In this exciting part of the adventure, ${bookData.childName} discovers amazing new things in ${bookData.location}!`}
                    </p>

                    {(experience.predefinedActivities.length > 0 ||
                      experience.customActivities.length > 0) && (
                      <div>
                        <h4 className="font-semibold mb-2">
                          Adventure Activities:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            ...experience.predefinedActivities,
                            ...experience.customActivities,
                          ].map((activity, actIndex) => (
                            <Badge
                              key={actIndex}
                              variant="secondary"
                              className="bg-adventure-yellow/20 text-adventure-orange"
                            >
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {experience.characters && (
                      <p className="text-foreground/80">
                        <strong>Adventure Companions:</strong>{" "}
                        {experience.characters}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Final Page */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-adventure-green to-adventure-yellow p-8 text-white">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">
                    The Adventure Continues!
                  </h2>
                  <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
                    <Heart className="w-12 h-12" />
                  </div>
                  <p className="text-lg leading-relaxed">
                    {bookData.childName} has completed an amazing adventure in{" "}
                    {bookData.location}! With courage, kindness, and a spirit of
                    discovery, they've shown that any dream is possible.
                  </p>
                  {bookData.includeFriends && (
                    <p className="mt-4 text-white/90">
                      Special thanks to {bookData.includeFriends} for being part
                      of this incredible journey!
                    </p>
                  )}
                  <p className="mt-4 font-bold">
                    What adventure will {bookData.childName} go on next?
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Section */}
          <div className="space-y-6">
            {/* Format Choice */}
            {showFormatChoice && (
              <Card className="border-2 border-primary">
                <CardHeader>
                  <CardTitle className="text-center">
                    {t("order.chooseFormat")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => handleOrderClick("digital")}
                    variant="outline"
                    className="w-full p-6 h-auto flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <Download className="w-8 h-8 text-adventure-blue" />
                      <div className="text-left">
                        <div className="font-semibold">
                          {t("pricing.digitalBook")}
                        </div>
                        <div className="text-sm text-foreground/70">
                          {t("pricing.digitalBookDesc")}
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold">$12.99</div>
                  </Button>

                  <Button
                    onClick={() => handleOrderClick("printed")}
                    variant="outline"
                    className="w-full p-6 h-auto flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <Printer className="w-8 h-8 text-adventure-green" />
                      <div className="text-left">
                        <div className="font-semibold">
                          {t("pricing.printedBook")}
                        </div>
                        <div className="text-sm text-foreground/70">
                          {t("pricing.printedBookDesc")}
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold">$24.99</div>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Order Summary */}
            {orderType && !showFormatChoice && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Order Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>
                      {orderType === "digital"
                        ? t("pricing.digitalBook")
                        : t("pricing.printedBook")}
                    </span>
                    <span>${bookPrice}</span>
                  </div>
                  {orderType === "printed" && shippingCost > 0 && (
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${shippingCost}</span>
                    </div>
                  )}
                  {orderType === "printed" && shippingCost === 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Shipping</span>
                      <span>FREE</span>
                    </div>
                  )}
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Address Form Dialog */}
        <Dialog open={showAddressForm} onOpenChange={setShowAddressForm}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{t("order.shippingAddress")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">{t("order.fullName")}</Label>
                <Input
                  id="fullName"
                  value={shippingAddress.fullName}
                  onChange={(e) =>
                    setShippingAddress((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  className={formErrors.fullName ? "border-red-500" : ""}
                />
                {formErrors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="street">{t("order.streetAddress")}</Label>
                <Input
                  id="street"
                  value={shippingAddress.street}
                  onChange={(e) =>
                    setShippingAddress((prev) => ({
                      ...prev,
                      street: e.target.value,
                    }))
                  }
                  className={formErrors.street ? "border-red-500" : ""}
                />
                {formErrors.street && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.street}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">{t("order.city")}</Label>
                  <Input
                    id="city"
                    value={shippingAddress.city}
                    onChange={(e) =>
                      setShippingAddress((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }))
                    }
                    className={formErrors.city ? "border-red-500" : ""}
                  />
                  {formErrors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.city}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="postalCode">{t("order.postalCode")}</Label>
                  <Input
                    id="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={(e) =>
                      setShippingAddress((prev) => ({
                        ...prev,
                        postalCode: e.target.value,
                      }))
                    }
                    className={formErrors.postalCode ? "border-red-500" : ""}
                  />
                  {formErrors.postalCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.postalCode}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label>{t("order.country")}</Label>
                <Select
                  value={shippingAddress.countryCode}
                  onValueChange={handleCountryChange}
                >
                  <SelectTrigger
                    className={formErrors.country ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder={t("order.selectCountry")} />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center space-x-2">
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.country}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">{t("order.phone")}</Label>
                <div className="flex space-x-2">
                  <Select
                    value={shippingAddress.countryCode}
                    onValueChange={(value) => {
                      const country = countries.find((c) => c.code === value);
                      if (country) {
                        setShippingAddress((prev) => ({
                          ...prev,
                          countryCode: value,
                        }));
                      }
                    }}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="+1" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.phoneCode}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    value={shippingAddress.phone}
                    onChange={(e) =>
                      setShippingAddress((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    placeholder="123-456-7890"
                    className={`flex-1 ${formErrors.phone ? "border-red-500" : ""}`}
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.phone}
                  </p>
                )}
              </div>

              {shippingAddress.countryCode && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm">
                    <strong>Shipping Cost:</strong>{" "}
                    {getShippingCost(shippingAddress.countryCode) === 0
                      ? "FREE"
                      : `$${getShippingCost(shippingAddress.countryCode)}`}
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowAddressForm(false)}
              >
                {t("order.cancel")}
              </Button>
              <Button onClick={handleAddressContinue}>{t("form.next")}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Payment Dialog */}
        <Dialog open={showPayment} onOpenChange={setShowPayment}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{t("order.paymentDetails")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">{t("order.cardNumber")}</Label>
                <Input
                  id="cardNumber"
                  value={formatCardNumberDisplay(paymentDetails.cardNumber)}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\s/g, "");
                    setPaymentDetails((prev) => ({
                      ...prev,
                      cardNumber: cleaned,
                    }));
                  }}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className={formErrors.cardNumber ? "border-red-500" : ""}
                />
                {formErrors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.cardNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">{t("order.expiryDate")}</Label>
                  <Input
                    id="expiryDate"
                    value={formatExpiryDisplay(paymentDetails.expiryDate)}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/\D/g, "");
                      setPaymentDetails((prev) => ({
                        ...prev,
                        expiryDate: cleaned,
                      }));
                    }}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={formErrors.expiryDate ? "border-red-500" : ""}
                  />
                  {formErrors.expiryDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.expiryDate}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="cvv">{t("order.cvv")}</Label>
                  <Input
                    id="cvv"
                    value={paymentDetails.cvv}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/\D/g, "");
                      setPaymentDetails((prev) => ({
                        ...prev,
                        cvv: cleaned,
                      }));
                    }}
                    placeholder="123"
                    maxLength={4}
                    className={formErrors.cvv ? "border-red-500" : ""}
                  />
                  {formErrors.cvv && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.cvv}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="cardholderName">
                  {t("order.cardholderName")}
                </Label>
                <Input
                  id="cardholderName"
                  value={paymentDetails.cardholderName}
                  onChange={(e) =>
                    setPaymentDetails((prev) => ({
                      ...prev,
                      cardholderName: e.target.value,
                    }))
                  }
                  placeholder="John Doe"
                  className={formErrors.cardholderName ? "border-red-500" : ""}
                />
                {formErrors.cardholderName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.cardholderName}
                  </p>
                )}
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between font-bold">
                  <span>Total: ${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPayment(false)}>
                {t("order.cancel")}
              </Button>
              <Button onClick={handlePaymentComplete}>
                {t("order.completePayment")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog */}
        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <DialogTitle>{t("order.confirmed")}</DialogTitle>
              </div>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">
                  {t("order.confirmationDetails")}
                </h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Order ID:</strong> ADV-
                    {Date.now().toString().slice(-8)}
                  </p>
                  <p>
                    <strong>Book Type:</strong>{" "}
                    {orderType === "digital"
                      ? t("pricing.digitalBook")
                      : t("pricing.printedBook")}
                  </p>
                  <p>
                    <strong>Total:</strong> ${totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>

              {orderType === "printed" && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    {t("order.shippingDetails")}
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Name:</strong> {shippingAddress.fullName}
                    </p>
                    <p>
                      <strong>Address:</strong> {shippingAddress.street}
                    </p>
                    <p>
                      <strong>City:</strong> {shippingAddress.city}
                    </p>
                    <p>
                      <strong>Postal Code:</strong> {shippingAddress.postalCode}
                    </p>
                    <p>
                      <strong>Country:</strong> {shippingAddress.country}
                    </p>
                    <p>
                      <strong>Phone:</strong> {shippingAddress.phone}
                    </p>
                  </div>
                </div>
              )}

              {orderType === "digital" && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-semibold">Digital Delivery</h4>
                  </div>
                  <p className="text-sm">{t("order.deliveryInfo")}</p>
                </div>
              )}
            </div>
            <DialogFooter className="flex-col space-y-2">
              <Button
                onClick={() => {
                  localStorage.removeItem("adventureBookData");
                  navigate("/create");
                }}
                className="w-full"
              >
                {t("order.createAnother")}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="w-full"
              >
                {t("order.goHome")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Preview;
