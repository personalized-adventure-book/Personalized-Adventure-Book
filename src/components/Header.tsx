import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpen, Globe, Sun, Moon, ChevronDown } from "lucide-react";
import { useTranslation, Language } from "@/hooks/useTranslation";
import { useTheme } from "@/hooks/useTheme";

interface HeaderProps {
  showNavigation?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showNavigation = true }) => {
  const { language, setLanguage, t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "nl", name: "Nederlands", flag: "🇳🇱" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
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

        <div className="flex items-center space-x-4">
          {/* Navigation Menu */}
          {showNavigation && (
            <div className="hidden md:flex items-center space-x-6">
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
                  document.getElementById("book-examples")?.scrollIntoView({
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
            </div>
          )}

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">
                  {currentLanguage?.flag} {currentLanguage?.name}
                </span>
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
            className="flex items-center space-x-2"
          >
            {theme === "light" ? (
              <>
                <Moon className="w-4 h-4" />
                <span className="hidden sm:inline">Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4" />
                <span className="hidden sm:inline">Light</span>
              </>
            )}
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
