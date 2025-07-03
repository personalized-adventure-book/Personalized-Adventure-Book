import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Sparkles,
  Users,
  Download,
  Printer,
  Star,
  ArrowRight,
  Heart,
  Rocket,
  TreePine,
  Crown,
  Anchor,
  Zap,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-adventure-yellow/20">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full adventure-gradient flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold adventure-text-gradient">
              Personalized Adventure Book
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => {
                document.getElementById("how-it-works")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                document.getElementById("book-examples")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
            >
              Examples
            </button>
            <button
              onClick={() => {
                document.getElementById("pricing")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
            >
              Pricing
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-adventure-pink/20 text-adventure-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Personalized Adventure Books for Kids 3-8</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Create Magical{" "}
            <span className="adventure-text-gradient">Adventures</span>
            <br />
            Starring Your Child
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Transform your child into the hero of their own personalized
            adventure book. Choose from enchanted forests, space missions,
            underwater expeditions, and more!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg"
            >
              <Link to="/create">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Creating
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg rounded-full"
            >
              <span>See Examples</span>
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-adventure-blue/20 text-adventure-blue mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Personalized Characters</h3>
              <p className="text-sm text-foreground/70">
                Include your child, friends, and family members in the story
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-adventure-green/20 text-adventure-green mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Instant Preview</h3>
              <p className="text-sm text-foreground/70">
                See your book come to life with immediate preview pages
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-adventure-purple/20 text-adventure-purple mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Print or Digital</h3>
              <p className="text-sm text-foreground/70">
                Get a physical book delivered or download instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Adventure Types */}
      <section id="examples" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Adventure Possibilities
          </h2>
          <p className="text-lg text-foreground/80">
            Explore the magical worlds we can create for your child - and many
            more!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Space Mission",
              description:
                "Blast off to distant planets and meet alien friends",
              icon: Rocket,
              color: "adventure-blue",
              gradient: "from-adventure-blue/20 to-adventure-purple/20",
            },
            {
              title: "Enchanted Forest",
              description: "Discover magical creatures and hidden treasures",
              icon: TreePine,
              color: "adventure-green",
              gradient: "from-adventure-green/20 to-adventure-yellow/20",
            },
            {
              title: "Royal Castle",
              description: "Become a brave knight or wise princess",
              icon: Crown,
              color: "adventure-purple",
              gradient: "from-adventure-purple/20 to-adventure-pink/20",
            },
            {
              title: "Pirate Voyage",
              description: "Sail the seven seas in search of treasure",
              icon: Anchor,
              color: "adventure-orange",
              gradient: "from-adventure-orange/20 to-adventure-blue/20",
            },
            {
              title: "Superhero Academy",
              description: "Train to become the world's next great hero",
              icon: Zap,
              color: "adventure-yellow",
              gradient: "from-adventure-yellow/20 to-adventure-orange/20",
            },
            {
              title: "Underwater World",
              description: "Dive deep to explore coral kingdoms",
              icon: Heart,
              color: "adventure-blue",
              gradient: "from-adventure-blue/20 to-adventure-green/20",
            },
          ].map((adventure, index) => (
            <Card
              key={index}
              className={`group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br ${adventure.gradient} hover:scale-105`}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 rounded-full bg-${adventure.color}/20 text-${adventure.color} mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <adventure.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {adventure.title}
                </h3>
                <p className="text-sm text-foreground/70">
                  {adventure.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-foreground/80">
              Create your personalized adventure book in just a few simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Fill Details",
                description:
                  "Enter your child's name, age, and adventure preferences",
                icon: "📝",
              },
              {
                step: "2",
                title: "Customize Story",
                description: "Choose setting, characters, and special details",
                icon: "✨",
              },
              {
                step: "3",
                title: "Preview Pages",
                description:
                  "See your personalized book come to life instantly",
                icon: "👀",
              },
              {
                step: "4",
                title: "Get Your Book",
                description: "Download digital copy or order a printed version",
                icon: "📚",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary text-white mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-foreground/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="adventure-text-gradient">Bring Magic Home</span> -
            <br className="hidden sm:block" />
            Affordable Adventures for Every Family
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Create lasting memories with a personalized book that your child
            will treasure forever. Choose the perfect option for your family's
            budget and preferences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-2 border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Download className="w-12 h-12 text-adventure-blue mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Digital Book</h3>
                <p className="text-foreground/70 mb-4">Instant download PDF</p>
                <div className="text-4xl font-bold text-primary mb-2">
                  $12.99
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                  <span className="text-sm">20+ page personalized story</span>
                </li>
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                  <span className="text-sm">High-quality illustrations</span>
                </li>
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                  <span className="text-sm">Instant download</span>
                </li>
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                  <span className="text-sm">Print at home option</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline">
                Choose Digital
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary text-primary-foreground">
                Popular
              </Badge>
            </div>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Printer className="w-12 h-12 text-adventure-green mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Printed Book</h3>
                <p className="text-foreground/70 mb-4">
                  Professional hardcover
                </p>
                <div className="text-4xl font-bold text-primary mb-2">
                  $24.99
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                  <span className="text-sm">Everything in Digital</span>
                </li>
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                  <span className="text-sm">Premium hardcover binding</span>
                </li>
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                  <span className="text-sm">Professional printing</span>
                </li>
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                  <span className="text-sm">Free shipping</span>
                </li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Choose Printed
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-adventure-purple to-adventure-pink py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Magic?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Give your child the gift of being the hero in their own personalized
            adventure story. Start creating their magical book today!
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-adventure-purple hover:bg-white/90 px-8 py-6 text-lg rounded-full shadow-lg"
          >
            <Link to="/create">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Your Adventure
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full adventure-gradient flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold adventure-text-gradient">
                  Personalized Adventure Book
                </span>
              </div>
              <p className="text-sm text-foreground/70">
                Creating magical personalized adventure books for children
                worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <a href="#" className="hover:text-foreground">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Examples
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <a href="#" className="hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-foreground/70">
            © 2024 Personalized Adventure Book. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
