import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateToSection = (sectionId: string) => {
    if (location.pathname === "/") {
      // If on homepage, scroll to section
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      // If on other page, navigate to homepage with section hash
      navigate(`/#${sectionId}`);
    }
  };

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
      {/* Desktop Navigation (large screens only) */}
      <nav className="hidden lg:flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full adventure-gradient flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold adventure-text-gradient">
            Personalized Adventure Book
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {/* Navigation Menu */}
          {showNavigation && (
            <div className="flex items-center space-x-6">
              <button
                onClick={() => handleNavigateToSection("adventure-types")}
                className="text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
              >
                {t("nav.adventurePossibilities")}
              </button>
              <button
                onClick={() => handleNavigateToSection("how-it-works")}
                className="text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
              >
                {t("nav.howItWorks")}
              </button>
              <button
                onClick={() => handleNavigateToSection("examples")}
                className="text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
              >
                {t("nav.examples")}
              </button>
              <button
                onClick={() => handleNavigateToSection("pricing")}
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
      </nav>

      {/* Mobile & Tablet Navigation */}
      <div className="lg:hidden">
        {/* Mobile Layout (below sm breakpoint) */}
        <div className="sm:hidden space-y-4">
          {/* Logo on top - centered */}
          <div className="flex justify-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full adventure-gradient flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold adventure-text-gradient">
                Personalized Adventure Book
              </span>
            </Link>
          </div>

          {/* Controls below logo - centered */}
          <div className="flex items-center justify-center space-x-2">
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

            {/* Hamburger Menu */}
            {showNavigation && (
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
            )}
          </div>
        </div>

        {/* Tablet Layout (sm to lg breakpoint) */}
        <div className="hidden sm:flex items-center justify-between">
          {/* Logo on the left */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full adventure-gradient flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold adventure-text-gradient">
              Personalized Adventure Book
            </span>
          </Link>

          {/* Controls on the right */}
          <div className="flex items-center space-x-2">
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

            {/* Hamburger Menu */}
            {showNavigation && (
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
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu with smooth transitions */}
      <div className="lg:hidden relative">
        <div
          className={`absolute top-2 right-0 w-64 bg-background border border-border rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="py-2">
            {/* Navigation Items */}
            {showNavigation && (
              <>
                <button
                  onClick={() => {
                    handleNavigateToSection("adventure-types");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors"
                >
                  {t("nav.adventurePossibilities")}
                </button>
                <button
                  onClick={() => {
                    handleNavigateToSection("how-it-works");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors"
                >
                  {t("nav.howItWorks")}
                </button>
                <button
                  onClick={() => {
                    handleNavigateToSection("examples");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors"
                >
                  {t("nav.examples")}
                </button>
                <button
                  onClick={() => {
                    handleNavigateToSection("pricing");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors"
                >
                  {t("nav.pricing")}
                </button>
                <Link
                  to="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors"
                >
                  {t("nav.myOrders")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
