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
  User,
  Baby,
  MapPin,
  Palette,
  Users,
  Gift,
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

// Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const Preview = () => {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
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

  // Function to truncate text for preview
  const truncateText = (text: string, limit: number = 150) => {
    if (text.length <= limit) return text;

    // Find the last complete word before the limit
    const truncated = text.substring(0, limit);
    const lastSpaceIndex = truncated.lastIndexOf(" ");

    // If there's a space, cut at the last complete word, otherwise use the limit
    const cutPoint = lastSpaceIndex > 0 ? lastSpaceIndex : limit;

    return text.substring(0, cutPoint) + "...";
  };

  useEffect(() => {
    const savedData = localStorage.getItem("adventureBookData");
    console.log("Raw localStorage data:", savedData);

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log("Loaded book data:", parsedData);
        console.log("Experiences:", parsedData.experiences);

        // Ensure experiences array exists and is properly structured
        if (!parsedData.experiences) {
          parsedData.experiences = [];
          console.log("No experiences found, initializing empty array");
        }

        if (parsedData.experiences) {
          parsedData.experiences.forEach((exp: any, index: number) => {
            console.log(`Experience ${index}:`, {
              title: exp.title,
              predefinedActivities: exp.predefinedActivities,
              customActivities: exp.customActivities,
            });
          });
        }

        setBookData(parsedData);
      } catch (error) {
        console.error("Error parsing book data:", error);
        // Fallback: try to get data from draft storage
        const draftData = localStorage.getItem("bookBuilderDraft");
        if (draftData) {
          try {
            const draft = JSON.parse(draftData);
            if (draft.formData) {
              console.log("Using draft data as fallback");
              setBookData(draft.formData);
            } else {
              navigate("/create");
            }
          } catch (draftError) {
            console.error("Error parsing draft data:", draftError);
            navigate("/create");
          }
        } else {
          navigate("/create");
        }
      }
    } else {
      console.log("No saved data found, checking for draft...");
      // Try to get data from draft storage as fallback
      const draftData = localStorage.getItem("bookBuilderDraft");
      if (draftData) {
        try {
          const draft = JSON.parse(draftData);
          if (draft.formData) {
            console.log("Using draft data");
            setBookData(draft.formData);
          } else {
            navigate("/create");
          }
        } catch (error) {
          console.error("Error parsing draft data:", error);
          navigate("/create");
        }
      } else {
        navigate("/create");
      }
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

  const handlePaymentComplete = async () => {
    if (validatePaymentForm()) {
      try {
        // Prepare data for Google Apps Script in the required format
        const adventures = [];

        for (const experience of bookData.experiences) {
          // Convert all images to base64
          const images = [];
          if (experience.images && experience.images.length > 0) {
            for (const image of experience.images) {
              if (image instanceof File) {
                const base64 = await fileToBase64(image);
                images.push(base64);
              } else if (typeof image === "string") {
                images.push(image);
              }
            }
          }

          const adventure = {
            name: experience.title || "Adventure",
            description: experience.description || "",
            images: images,
          };

          adventures.push(adventure);
        }

        const googleScriptPayload = {
          parentName: bookData.parentName?.trim() || "",
          parentEmail: bookData.parentEmail || "",
          childName: bookData.childName?.trim() || "",
          childAge: bookData.childAge || "",
          childGender: bookData.childGender || "",
          adventureType: bookData.adventureType || "",
          customAdventureType: bookData.customAdventureType || "",
          finalAdventureType:
            bookData.finalAdventureType || bookData.adventureType || "",
          adventureLocation: bookData.location?.trim() || "",
          favoriteColor: bookData.favoriteColor || "",
          petName: bookData.petName || "",
          includeFriends: bookData.includeFriends || "",
          specialDetails: bookData.specialDetails || "",
          orderType: orderType || "",
          orderPrice: `$${totalPrice.toFixed(2)}`,
          orderDate: new Date().toISOString(),
          orderNumber: "ADV-" + Date.now().toString().slice(-8),
          shippingFullName:
            orderType === "printed"
              ? shippingAddress.fullName?.trim() || ""
              : "",
          shippingStreet:
            orderType === "printed" ? shippingAddress.street?.trim() || "" : "",
          shippingCity:
            orderType === "printed" ? shippingAddress.city?.trim() || "" : "",
          shippingPostalCode:
            orderType === "printed"
              ? shippingAddress.postalCode?.trim() || ""
              : "",
          shippingCountry:
            orderType === "printed"
              ? shippingAddress.country?.trim() || ""
              : "",
          shippingPhone:
            orderType === "printed" ? shippingAddress.phone?.trim() || "" : "",
          shippingCost:
            orderType === "printed" ? `$${shippingCost.toFixed(2)}` : "$0.00",
          interfaceLanguage: language || "en",
          bookLanguage: language || "en",
          experiencesCount: bookData.experiences.length,
          experiencesSummary: bookData.experiences
            .map(
              (exp, index) =>
                `${index + 1}. ${exp.title || "Adventure"}: ${exp.description || "No description"}`,
            )
            .join(" | "),
          allActivities: bookData.experiences
            .flatMap((exp) => [
              ...exp.predefinedActivities,
              ...exp.customActivities,
            ])
            .filter(Boolean)
            .join(", "),
          allCharacters: bookData.experiences
            .map((exp) => exp.characters)
            .filter(Boolean)
            .join(", "),
          totalImages: bookData.experiences.reduce(
            (total, exp) => total + (exp.images ? exp.images.length : 0),
            0,
          ),
          adventures: adventures,
        };

        console.log("Final payload:", googleScriptPayload);

        // Send to Google Apps Script
        const payloadStr = JSON.stringify(googleScriptPayload);

        await fetch(
          "https://script.google.com/macros/s/AKfycbyUMrzt00F9K9qNwedqO43LoY26MREwdp-SVfF4JLVFqYqTiKUa5oStVLrjQ44f81ylEQ/exec",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
            body: payloadStr,
          },
        );

        // Save order data to localStorage (keep existing functionality)
        const orderData = {
          orderNumber: "ADV-" + Date.now().toString().slice(-8),
          bookData,
          orderType,
          shippingAddress: orderType === "printed" ? shippingAddress : null,
          paymentDetails,
          shippingCost,
          total: totalPrice,
          orderDate: new Date().toISOString(),
          status: "confirmed",
        };

        localStorage.setItem("currentOrder", JSON.stringify(orderData));
        localStorage.removeItem("adventureBookData");
        navigate("/order-success");
      } catch (error) {
        console.error("Error sending order to Google Apps Script:", error);
        // Still proceed with local order completion even if Google Apps Script fails
        const orderData = {
          orderNumber: "ADV-" + Date.now().toString().slice(-8),
          bookData,
          orderType,
          shippingAddress: orderType === "printed" ? shippingAddress : null,
          paymentDetails,
          shippingCost,
          total: totalPrice,
          orderDate: new Date().toISOString(),
          status: "confirmed",
        };

        localStorage.setItem("currentOrder", JSON.stringify(orderData));
        localStorage.removeItem("adventureBookData");
        navigate("/order-success");
      }
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

      <div className="container mx-auto px-4 py-8 max-w-7xl">
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

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Book Preview - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold adventure-text-gradient mb-2">
                {bookData.childName}'s Adventure Book
              </h1>
              <p className="text-lg text-foreground/80">
                Preview your personalized adventure story
              </p>
            </div>

            {/* Book Details Summary */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Book Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <User className="w-5 h-5 text-adventure-blue mt-1" />
                      <div>
                        <h4 className="font-medium">Main Character</h4>
                        <p className="text-sm text-foreground/70">
                          {bookData.childName}, {bookData.childAge} years old
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-adventure-green mt-1" />
                      <div>
                        <h4 className="font-medium">Adventure Setting</h4>
                        <p className="text-sm text-foreground/70">
                          {bookData.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Sparkles className="w-5 h-5 text-adventure-purple mt-1" />
                      <div>
                        <h4 className="font-medium">Adventure Type</h4>
                        <p className="text-sm text-foreground/70">
                          {bookData.finalAdventureType ||
                            bookData.adventureType}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {bookData.favoriteColor && (
                      <div className="flex items-start space-x-3">
                        <Palette className="w-5 h-5 text-adventure-yellow mt-1" />
                        <div>
                          <h4 className="font-medium">Favorite Color</h4>
                          <p className="text-sm text-foreground/70">
                            {bookData.favoriteColor}
                          </p>
                        </div>
                      </div>
                    )}

                    {bookData.includeFriends && (
                      <div className="flex items-start space-x-3">
                        <Users className="w-5 h-5 text-adventure-orange mt-1" />
                        <div>
                          <h4 className="font-medium">Special Friends</h4>
                          <p className="text-sm text-foreground/70">
                            {bookData.includeFriends}
                          </p>
                        </div>
                      </div>
                    )}

                    {bookData.petName && (
                      <div className="flex items-start space-x-3">
                        <Heart className="w-5 h-5 text-adventure-pink mt-1" />
                        <div>
                          <h4 className="font-medium">Pet Companion</h4>
                          <p className="text-sm text-foreground/70">
                            {bookData.petName}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Story Preview Pages */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-6">
                {t("preview.storyPreview")}
              </h2>

              {/* Page 1 - Opening */}
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-br from-adventure-purple via-adventure-pink to-adventure-orange p-8 text-white">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mb-6 flex items-center justify-center">
                      <span className="text-3xl">📚</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      {bookData.childName}'s Amazing Adventure
                    </h3>
                    <p className="text-lg leading-relaxed">
                      Once upon a time, in the magical world of{" "}
                      {bookData.location}, there lived a brave{" "}
                      {bookData.childAge}-year-old named {bookData.childName}.
                      {bookData.favoriteColor &&
                        ` Dressed in their favorite ${bookData.favoriteColor} outfit,`}
                      {bookData.childName} was ready for the adventure of a
                      lifetime!
                    </p>
                    {bookData.petName && (
                      <p className="mt-4 text-white/90">
                        Joined by their loyal companion {bookData.petName}, they
                        set off on their quest.
                      </p>
                    )}
                  </div>
                </div>
              </Card>

              {/* Experience Pages */}
              {bookData.experiences.map((experience, index) => (
                <Card key={experience.id} className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-adventure-blue to-adventure-green text-white">
                    <CardTitle className="text-xl flex items-center space-x-2">
                      <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <span>
                        {(() => {
                          const cutePhrases = [
                            `✨ Chapter ${index + 1}: ${bookData.childName}'s Magical Journey to`,
                            `🌟 Chapter ${index + 1}: Follow ${bookData.childName} on an Amazing Adventure with`,
                            `💫 Chapter ${index + 1}: ${bookData.childName} Discovers the Wonders of`,
                            `🦄 Chapter ${index + 1}: ${bookData.childName}'s Epic Quest through`,
                            `🌈 Chapter ${index + 1}: ${bookData.childName} Embarks on a Fantastic Tale of`,
                          ];

                          const defaultPhrases = [
                            `✨ Chapter ${index + 1}: ${bookData.childName}'s Magical Adventure Begins!`,
                            `🌟 Chapter ${index + 1}: ${bookData.childName}'s Epic Journey Unfolds!`,
                            `💫 Chapter ${index + 1}: ${bookData.childName} Discovers Amazing Wonders!`,
                            `🦄 Chapter ${index + 1}: ${bookData.childName}'s Fantastic Quest Starts!`,
                            `🌈 Chapter ${index + 1}: ${bookData.childName} Begins an Incredible Tale!`,
                          ];

                          if (experience.title) {
                            const randomPhrase =
                              cutePhrases[index % cutePhrases.length];
                            return `${randomPhrase} "${experience.title}"! ✨`;
                          } else {
                            return defaultPhrases[
                              index % defaultPhrases.length
                            ];
                          }
                        })()}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-lg leading-relaxed">
                        {truncateText(
                          experience.description ||
                            `In this thrilling chapter, ${bookData.childName} embarks on an incredible journey through ${bookData.location}. Along the way, they discover new friends, face exciting challenges, and learn valuable lessons about courage and friendship.`,
                        )}
                      </p>

                      {(experience.predefinedActivities.length > 0 ||
                        experience.customActivities.length > 0) && (
                        <div className="bg-adventure-yellow/10 p-4 rounded-lg">
                          <h4 className="font-semibold mb-3 flex items-center">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Adventures in This Chapter:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {[
                              ...experience.predefinedActivities,
                              ...experience.customActivities,
                            ].map((activity, actIndex) => (
                              <Badge
                                key={actIndex}
                                variant="secondary"
                                className="bg-adventure-yellow/30 text-adventure-orange border-adventure-orange/30"
                              >
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {experience.characters && (
                        <div className="bg-adventure-blue/10 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            Characters in This Chapter:
                          </h4>
                          <p className="text-foreground/80">
                            {experience.characters}
                          </p>
                        </div>
                      )}

                      {experience.activityDetails.length > 0 && (
                        <div className="bg-adventure-green/10 p-4 rounded-lg">
                          <h4 className="font-semibold mb-3">
                            Special Moments:
                          </h4>
                          <div className="grid gap-3">
                            {experience.activityDetails.map(
                              (activity, actIndex) => (
                                <div
                                  key={activity.id}
                                  className="bg-white/50 p-3 rounded-lg"
                                >
                                  <h5 className="font-medium text-adventure-purple">
                                    {activity.name}
                                  </h5>
                                  {activity.details && (
                                    <p className="text-sm text-foreground/70 mt-1">
                                      {activity.details}
                                    </p>
                                  )}
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Final Page - Conclusion */}
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-br from-adventure-green via-adventure-yellow to-adventure-orange p-8 text-white">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mb-6 flex items-center justify-center">
                      <span className="text-3xl">🎉</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      The Adventure Continues!
                    </h3>
                    <p className="text-lg leading-relaxed">
                      {bookData.childName} has completed an incredible journey
                      through {bookData.location}! With bravery, kindness, and
                      determination, they've shown that any dream is possible.
                      The memories of this adventure will last forever.
                    </p>
                    {bookData.includeFriends && (
                      <p className="mt-4 text-white/90">
                        Special thanks to {bookData.includeFriends} for making
                        this adventure even more magical!
                      </p>
                    )}
                    {bookData.specialDetails && (
                      <p className="mt-4 text-white/90 italic">
                        "{bookData.specialDetails}"
                      </p>
                    )}
                    <p className="mt-6 font-bold text-xl">
                      What amazing adventure will {bookData.childName} discover
                      next?
                    </p>
                    <p className="mt-2 text-lg">
                      The End... or is it just the beginning?
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Order Section - Takes 1 column */}
          <div className="space-y-6">
            {/* Format Choice */}
            {showFormatChoice && (
              <Card className="border-2 border-primary shadow-lg">
                <CardHeader>
                  <CardTitle className="text-center text-xl">
                    {t("order.chooseFormat")}
                  </CardTitle>
                  <p className="text-center text-sm text-foreground/70">
                    Choose how you'd like to receive your personalized book
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Card
                    className="cursor-pointer border-2 border-adventure-blue/30 hover:border-adventure-blue transition-colors"
                    onClick={() => handleOrderClick("digital")}
                  >
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <Download className="w-12 h-12 text-adventure-blue mx-auto" />
                        <div>
                          <h3 className="text-xl font-bold">
                            {t("pricing.digitalBook")}
                          </h3>
                          <p className="text-sm text-foreground/70 mb-2">
                            {t("pricing.digitalBookDesc")}
                          </p>
                          <div className="text-3xl font-bold text-primary mb-4">
                            $12.99
                          </div>
                        </div>
                        <div className="space-y-2 text-left">
                          <div className="flex items-center text-sm">
                            <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                            <span>{t("pricing.feature1")}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                            <span>{t("pricing.feature2")}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                            <span>{t("pricing.feature3")}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                            <span>{t("pricing.feature4")}</span>
                          </div>
                        </div>
                        <Button className="w-full" size="lg" variant="outline">
                          Choose Digital
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className="cursor-pointer border-2 border-adventure-green/30 hover:border-adventure-green transition-colors relative"
                    onClick={() => handleOrderClick("printed")}
                  >
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-primary text-white">
                        {t("pricing.popular")}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <Printer className="w-12 h-12 text-adventure-green mx-auto" />
                        <div>
                          <h3 className="text-xl font-bold">
                            {t("pricing.printedBook")}
                          </h3>
                          <p className="text-sm text-foreground/70 mb-2">
                            {t("pricing.printedBookDesc")}
                          </p>
                          <div className="text-3xl font-bold text-primary mb-4">
                            $24.99
                          </div>
                        </div>
                        <div className="space-y-2 text-left">
                          <div className="flex items-center text-sm">
                            <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                            <span>{t("pricing.feature5")}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                            <span>{t("pricing.feature6")}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                            <span>{t("pricing.feature7")}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                            <span>{t("pricing.feature8")}</span>
                          </div>
                        </div>
                        <Button
                          className="w-full bg-adventure-green hover:bg-adventure-green/90 text-white"
                          size="lg"
                        >
                          Choose Printed
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>
                        {orderType === "digital"
                          ? t("pricing.digitalBook")
                          : t("pricing.printedBook")}
                      </span>
                      <span>${bookPrice.toFixed(2)}</span>
                    </div>
                    {orderType === "printed" && (
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>
                          {shippingCost === 0 ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            `$${shippingCost.toFixed(2)}`
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Book Statistics */}
            <Card className="bg-gradient-to-br from-adventure-blue/10 to-adventure-purple/10">
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("preview.bookStatistics")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">{t("preview.totalChapters")}</span>
                  <span className="font-medium">
                    {bookData.experiences.length + 2}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">
                    {t("preview.adventureActivities")}
                  </span>
                  <span className="font-medium">
                    {(() => {
                      const count = (bookData.experiences || []).reduce(
                        (total, exp) => {
                          // Count actual activity details (the sections that get created)
                          const activityDetails = (exp.activityDetails || [])
                            .length;

                          // Also count predefined and custom activities as backup
                          const predefined = (exp.predefinedActivities || [])
                            .length;
                          const custom = (exp.customActivities || []).length;

                          // Use activityDetails if available, otherwise fall back to predefined + custom
                          const expCount =
                            activityDetails > 0
                              ? activityDetails
                              : predefined + custom;

                          console.log(`Experience ${exp.title || "Unnamed"}:`, {
                            activityDetails,
                            predefined,
                            custom,
                            expCount,
                          });
                          return total + expCount;
                        },
                        0,
                      );
                      console.log("Total activity count:", count);
                      return count;
                    })()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t("preview.estimatedPages")}</span>
                  <span className="font-medium">
                    {Math.max(
                      (bookData.experiences || []).reduce((total, exp) => {
                        // Count actual activity details (the sections that get created)
                        const activityDetails = (exp.activityDetails || [])
                          .length;

                        // Also count predefined and custom activities as backup
                        const predefined = (exp.predefinedActivities || [])
                          .length;
                        const custom = (exp.customActivities || []).length;

                        // Use activityDetails if available, otherwise fall back to predefined + custom
                        const expCount =
                          activityDetails > 0
                            ? activityDetails
                            : predefined + custom;

                        return total + expCount;
                      }, 0) + 2,
                      4,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t("preview.readingLevel")}</span>
                  <span className="font-medium">Ages {bookData.childAge}+</span>
                </div>
              </CardContent>
            </Card>
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
      </div>
    </div>
  );
};

export default Preview;
