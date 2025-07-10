import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { useTranslation } from "@/hooks/useTranslation";
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
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-adventure-yellow/20">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-adventure-pink/20 text-adventure-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>{t("hero.subtitle")}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t("hero.title")}{" "}
            <span className="adventure-text-gradient">
              {t("hero.titleHighlight")}
            </span>
            <br />
            {t("hero.subtitle2")}
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg"
            >
              <Link to="/create">
                <Sparkles className="w-5 h-5 mr-2" />
                {t("hero.startCreating")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg rounded-full"
              onClick={() =>
                document
                  .getElementById("examples")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>{t("hero.seeExamples")}</span>
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-adventure-blue/20 text-adventure-blue mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">
                {t("features.personalizedCharacters")}
              </h3>
              <p className="text-sm text-foreground/70">
                {t("features.personalizedCharactersDesc")}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-adventure-green/20 text-adventure-green mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">
                {t("features.instantPreview")}
              </h3>
              <p className="text-sm text-foreground/70">
                {t("features.instantPreviewDesc")}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-adventure-purple/20 text-adventure-purple mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">
                {t("features.printOrDigital")}
              </h3>
              <p className="text-sm text-foreground/70">
                {t("features.printOrDigitalDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Adventure Types */}
      <section id="adventure-types" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("adventure.possibilities")}
          </h2>
          <p className="text-lg text-foreground/80">
            {t("adventure.possibilitiesDesc")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: t("adventure.spaceMission"),
              description: t("adventure.spaceMissionDesc"),
              icon: Rocket,
              color: "adventure-blue",
              gradient: "from-adventure-blue/20 to-adventure-purple/20",
            },
            {
              title: t("adventure.enchantedForest"),
              description: t("adventure.enchantedForestDesc"),
              icon: TreePine,
              color: "adventure-green",
              gradient: "from-adventure-green/20 to-adventure-yellow/20",
            },
            {
              title: t("adventure.royalCastle"),
              description: t("adventure.royalCastleDesc"),
              icon: Crown,
              color: "adventure-purple",
              gradient: "from-adventure-purple/20 to-adventure-pink/20",
            },
            {
              title: t("adventure.pirateVoyage"),
              description: t("adventure.pirateVoyageDesc"),
              icon: Anchor,
              color: "adventure-orange",
              gradient: "from-adventure-orange/20 to-adventure-blue/20",
            },
            {
              title: t("adventure.superheroAcademy"),
              description: t("adventure.superheroAcademyDesc"),
              icon: Zap,
              color: "adventure-yellow",
              gradient: "from-adventure-yellow/20 to-adventure-orange/20",
            },
            {
              title: t("adventure.underwaterWorld"),
              description: t("adventure.underwaterWorldDesc"),
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

      {/* Examples Section */}
      <section
        id="examples"
        className="bg-gradient-to-br from-adventure-purple/10 to-adventure-pink/10 py-16"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("examples.title")}
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              {t("examples.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: t("examples.example1.title"),
                childName: "Emma",
                adventure: t("examples.example1.adventure"),
                preview: t("examples.example1.preview"),
                image: "🌟",
                color: "adventure-purple",
              },
              {
                title: t("examples.example2.title"),
                childName: "Lucas",
                adventure: t("examples.example2.adventure"),
                preview: t("examples.example2.preview"),
                image: "🚀",
                color: "adventure-blue",
              },
              {
                title: t("examples.example3.title"),
                childName: "Sofia",
                adventure: t("examples.example3.adventure"),
                preview: t("examples.example3.preview"),
                image: "🏰",
                color: "adventure-pink",
              },
              {
                title: t("examples.example4.title"),
                childName: "Alex",
                adventure: t("examples.example4.adventure"),
                preview: t("examples.example4.preview"),
                image: "🏴‍☠️",
                color: "adventure-orange",
              },
              {
                title: t("examples.example5.title"),
                childName: "Maya",
                adventure: t("examples.example5.adventure"),
                preview: t("examples.example5.preview"),
                image: "🧙‍♀️",
                color: "adventure-green",
              },
              {
                title: t("examples.example6.title"),
                childName: "Diego",
                adventure: t("examples.example6.adventure"),
                preview: t("examples.example6.preview"),
                image: "🌊",
                color: "adventure-blue",
              },
            ].map((example, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div
                      className={`w-16 h-16 rounded-full bg-${example.color}/20 text-${example.color} mx-auto mb-3 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}
                    >
                      {example.image}
                    </div>
                    <h3 className="font-bold text-lg mb-1">{example.title}</h3>
                    <p className="text-sm font-medium text-primary">
                      {example.childName}'s Adventure
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/70 rounded-lg p-3">
                      <p className="text-sm font-medium mb-1">
                        {t("examples.adventure")}:
                      </p>
                      <p className="text-sm text-foreground/80">
                        {example.adventure}
                      </p>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3">
                      <p className="text-sm font-medium mb-1">
                        {t("examples.preview")}:
                      </p>
                      <p className="text-sm text-foreground/80 italic">
                        "{example.preview}"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg"
            >
              <Link to="/create">
                <Sparkles className="w-5 h-5 mr-2" />
                {t("examples.createYours")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("howItWorks.title")}
            </h2>
            <p className="text-lg text-foreground/80">
              {t("howItWorks.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: t("howItWorks.step1.title"),
                description: t("howItWorks.step1.description"),
                icon: "📝",
              },
              {
                step: "2",
                title: t("howItWorks.step2.title"),
                description: t("howItWorks.step2.description"),
                icon: "✨",
              },
              {
                step: "3",
                title: t("howItWorks.step3.title"),
                description: t("howItWorks.step3.description"),
                icon: "👀",
              },
              {
                step: "4",
                title: t("howItWorks.step4.title"),
                description: t("howItWorks.step4.description"),
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
            <span className="adventure-text-gradient">
              {t("pricing.title")}
            </span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            {t("pricing.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-2 border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Download className="w-12 h-12 text-adventure-blue mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">
                  {t("pricing.digitalBook")}
                </h3>
                <p className="text-foreground/70 mb-4">
                  {t("pricing.digitalBookDesc")}
                </p>
                <div className="text-4xl font-bold text-primary mb-2">
                  $12.99
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                  <span className="text-sm">{t("pricing.feature1")}</span>
                </li>
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                  <span className="text-sm">{t("pricing.feature2")}</span>
                </li>
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                  <span className="text-sm">{t("pricing.feature3")}</span>
                </li>
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                  <span className="text-sm">{t("pricing.feature4")}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary text-primary-foreground">
                {t("pricing.popular")}
              </Badge>
            </div>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Printer className="w-12 h-12 text-adventure-green mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">
                  {t("pricing.printedBook")}
                </h3>
                <p className="text-foreground/70 mb-4">
                  {t("pricing.printedBookDesc")}
                </p>
                <div className="text-4xl font-bold text-primary mb-2">
                  $24.99
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                  <span className="text-sm">{t("pricing.feature5")}</span>
                </li>
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                  <span className="text-sm">{t("pricing.feature6")}</span>
                </li>
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                  <span className="text-sm">{t("pricing.feature7")}</span>
                </li>
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-adventure-yellow mr-2" />
                  <span className="text-sm">{t("pricing.feature8")}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-adventure-purple to-adventure-pink py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {t("cta.description")}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-adventure-purple hover:bg-white/90 px-8 py-6 text-lg rounded-full shadow-lg"
          >
            <Link to="/create">
              <Sparkles className="w-5 h-5 mr-2" />
              {t("cta.startAdventure")}
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
                {t("footer.tagline")}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("footer.product")}</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <button
                    onClick={() => {
                      document.getElementById("how-it-works")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className="hover:text-foreground transition-colors text-left"
                  >
                    {t("footer.howItWorks")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      document.getElementById("examples")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className="hover:text-foreground transition-colors text-left"
                  >
                    {t("footer.examples")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      document.getElementById("pricing")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className="hover:text-foreground transition-colors text-left"
                  >
                    {t("footer.pricing")}
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("footer.support")}</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <Link
                    to="/help-center"
                    className="hover:text-foreground transition-colors"
                  >
                    {t("footer.helpCenter")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-foreground transition-colors"
                  >
                    {t("footer.contactUs")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="hover:text-foreground transition-colors"
                  >
                    {t("footer.faq")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("footer.company")}</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    {t("footer.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-foreground transition-colors"
                  >
                    {t("footer.privacy")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-foreground transition-colors"
                  >
                    {t("footer.terms")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-foreground/70">
            {t("footer.copyright")}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
