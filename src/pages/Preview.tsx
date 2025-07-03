import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
          <Button variant="outline" asChild>
            <Link to="/create" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Edit Details</span>
            </Link>
          </Button>
        </nav>
      </header>

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

            {/* Sample Pages */}
            <div className="grid gap-4">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-adventure-blue/20 rounded-lg flex items-center justify-center">
                      <Heart className="w-8 h-8 text-adventure-blue" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">
                        Page 1: The Adventure Begins
                      </h3>
                      <p className="text-sm text-foreground/70">
                        "Once upon a time, there was a brave {bookData.childAge}
                        -year-old named {bookData.childName}
                        who loved{" "}
                        {bookData.favoriteColor
                          ? bookData.favoriteColor.toLowerCase()
                          : "colorful"}{" "}
                        things and exciting adventures..."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-adventure-green/20 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-adventure-green" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">
                        Page 3: The Journey to {bookData.location}
                      </h3>
                      <p className="text-sm text-foreground/70">
                        "{bookData.childName} packed{" "}
                        {bookData.childGender === "girl" ? "her" : "his"}{" "}
                        favorite things
                        {bookData.petName &&
                          ` and said goodbye to ${bookData.petName}`}{" "}
                        before setting off to {bookData.location}..."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-adventure-orange/20 rounded-lg flex items-center justify-center">
                      <Star className="w-8 h-8 text-adventure-orange" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">
                        Page 8: The Great Discovery
                      </h3>
                      <p className="text-sm text-foreground/70">
                        "With{" "}
                        {bookData.includeFriends
                          ? `${bookData.includeFriends} by ${bookData.childGender === "girl" ? "her" : "his"} side`
                          : "courage in their heart"}
                        ,{bookData.childName} discovered the secret to{" "}
                        {bookData.activities[0] || "solving the mystery"}..."
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
                    <Button className="w-full" variant="outline">
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
                    <Button className="w-full bg-primary hover:bg-primary/90">
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
    </div>
  );
};

export default Preview;
