import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { BookOpen } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();

  return (
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
            <p className="text-sm text-foreground/70">{t("footer.tagline")}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("footer.product")}</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <Link
                  to="/#how-it-works"
                  className="hover:text-foreground transition-colors"
                >
                  {t("footer.howItWorks")}
                </Link>
              </li>
              <li>
                <Link
                  to="/#examples"
                  className="hover:text-foreground transition-colors"
                >
                  {t("footer.examples")}
                </Link>
              </li>
              <li>
                <Link
                  to="/#pricing"
                  className="hover:text-foreground transition-colors"
                >
                  {t("footer.pricing")}
                </Link>
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
  );
};

export default Footer;
