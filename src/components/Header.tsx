import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpen, Globe, Sun, Moon, ChevronDown, Menu, X } from "lucide-react";
import { useTranslation, Language } from "@/hooks/useTranslation";
import { useTheme } from "@/hooks/useTheme";

interface HeaderProps {
  showNavigation?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showNavigation = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: "en", name: t("ui.english"), flag: "🇺🇸" },
    { code: "fr", name: t("ui.french"), flag: "🇫🇷" },
    { code: "it", name: t("ui.italian"), flag: "🇮🇹" },
    { code: "es", name: t("ui.spanish"), flag: "🇪🇸" },
    { code: "ar", name: t("ui.arabic"), flag: "🇸🇦" },
    { code: "nl", name: t("ui.dutch"), flag: "🇳🇱" },
    { code: "de", name: t("ui.german"), flag: "🇩🇪" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <header className="container mx-auto px-4 py-6">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full adventure-gradient flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold adventure-text-gradient">
            Personalized Adventure Book
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Navigation Menu */}
          {showNavigation && (
            <div className="flex items-center space-x-6">
              <button
                onClick={() => {
                  document.getElementById("adventure-types")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
              >
                {t("nav.adventurePossibilities")}
              </button>
              <button
                onClick={() => {
                  document.getElementById("how-it-works")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
              >
                {t("nav.howItWorks")}
              </button>
              <button
                onClick={() => {
                  document.getElementById("examples")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
              >
                {t("nav.examples")}
              </button>
              <button
                onClick={() => {
                  document.getElementById("pricing")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
              >
                {t("nav.pricing")}
              </button>
              <Link
                to="/orders"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {t("nav.myOrders")}
              </Link>
            </div>
          )}

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                <span className="text-sm">{currentLanguage?.flag}</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`flex items-center space-x-2 cursor-pointer ${
                    language === lang.code ? "bg-secondary" : ""
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="flex items-center"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center space-x-2">
          {/* Language Selector for Mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                <span className="text-sm">{currentLanguage?.flag}</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`flex items-center space-x-2 cursor-pointer ${
                    language === lang.code ? "bg-secondary" : ""
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle for Mobile */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="flex items-center"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </Button>

          {/* Hamburger Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 py-4 border-t border-border bg-background">
          <div className="flex flex-col space-y-4">
            {/* Navigation Items */}
            {showNavigation && (
              <>
                <button
                  onClick={() => {
                    document.getElementById("adventure-types")?.scrollIntoView({
                      behavior: "smooth",
                    });
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-2 text-foreground/80 hover:text-foreground transition-colors"
                >
                  {t("nav.adventurePossibilities")}
                </button>
                <button
                  onClick={() => {
                    document.getElementById("how-it-works")?.scrollIntoView({
                      behavior: "smooth",
                    });
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-2 text-foreground/80 hover:text-foreground transition-colors"
                >
                  {t("nav.howItWorks")}
                </button>
                <button
                  onClick={() => {
                    document.getElementById("examples")?.scrollIntoView({
                      behavior: "smooth",
                    });
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-2 text-foreground/80 hover:text-foreground transition-colors"
                >
                  {t("nav.examples")}
                </button>
                <button
                  onClick={() => {
                    document.getElementById("pricing")?.scrollIntoView({
                      behavior: "smooth",
                    });
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-2 text-foreground/80 hover:text-foreground transition-colors"
                >
                  {t("nav.pricing")}
                </button>
                <Link
                  to="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left py-2 text-foreground/80 hover:text-foreground transition-colors block"
                >
                  {t("nav.myOrders")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
