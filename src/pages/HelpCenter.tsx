import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import {
  HelpCircle,
  Book,
  Truck,
  CreditCard,
  MessageCircle,
  Search,
} from "lucide-react";
import { useState } from "react";

const HelpCenter = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const helpCategories = [
    {
      icon: Book,
      title: "Creating Your Book",
      description: "Learn how to personalize and create your adventure book",
      articles: [
        {
          title: "How to start creating a book",
          content: "Step-by-step guide to begin your book creation journey.",
        },
        {
          title: "Customizing your child's character",
          content: "Tips for personalizing your child's appearance and traits.",
        },
        {
          title: "Choosing the right adventure type",
          content: "Guide to selecting the perfect adventure for your child.",
        },
        {
          title: "Adding photos and personal details",
          content: "How to include photos and special details in your book.",
        },
      ],
    },
    {
      icon: CreditCard,
      title: "Orders & Billing",
      description: "Payment, pricing, and order management help",
      articles: [
        {
          title: "Payment methods accepted",
          content: "We accept all major credit cards, PayPal, and Apple Pay.",
        },
        {
          title: "How to track your order",
          content:
            "Use your order number to track progress and delivery status.",
        },
        {
          title: "Changing or canceling an order",
          content: "Orders can be modified within 24 hours of placement.",
        },
        {
          title: "Understanding pricing",
          content: "Transparent pricing for digital and printed book options.",
        },
      ],
    },
    {
      icon: Truck,
      title: "Shipping & Delivery",
      description: "Information about book delivery and shipping",
      articles: [
        {
          title: "Digital book delivery",
          content:
            "Digital books are delivered within 2-3 business days via email.",
        },
        {
          title: "Printed book shipping times",
          content:
            "Printed books ship within 5-7 business days after approval.",
        },
        {
          title: "International shipping",
          content: "We ship worldwide with various delivery speed options.",
        },
        {
          title: "Damaged or lost packages",
          content:
            "We'll replace any damaged books or resend lost packages for free.",
        },
      ],
    },
    {
      icon: MessageCircle,
      title: "Technical Support",
      description: "Help with website issues and technical problems",
      articles: [
        {
          title: "Troubleshooting login issues",
          content: "Steps to resolve login and account access problems.",
        },
        {
          title: "Browser compatibility",
          content:
            "Our platform works best with Chrome, Firefox, Safari, and Edge.",
        },
        {
          title: "File upload problems",
          content: "Solutions for issues uploading photos or images.",
        },
        {
          title: "Mobile app support",
          content: "Tips for using our platform on mobile devices.",
        },
      ],
    },
  ];

  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const filteredCategories = helpCategories
    .map((category) => ({
      ...category,
      articles: category.articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.content.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter(
      (category) =>
        category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        category.articles.length > 0,
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-adventure-yellow/20">
      <Header showNavigation={true} />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full adventure-gradient flex items-center justify-center">
                <HelpCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Help <span className="adventure-text-gradient">Center</span>
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              Find answers to your questions and get help with your adventure
              books.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-xl border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-adventure-blue/50 focus:border-adventure-blue"
              />
            </div>
          </div>

          {/* Quick Contact */}
          <div className="bg-white/50 rounded-xl p-6 mb-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Personal Help?</h2>
            <p className="text-foreground/80 mb-6">
              Can't find what you're looking for? Our support team is here to
              help!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:support@personalizedadventurebook.com"
                className="bg-adventure-blue text-white px-6 py-3 rounded-lg hover:bg-adventure-blue/90 transition-colors"
              >
                Email Support
              </a>
              <a
                href="tel:1-800-ADVENTURE"
                className="bg-adventure-yellow text-white px-6 py-3 rounded-lg hover:bg-adventure-yellow/90 transition-colors"
              >
                Call Us
              </a>
            </div>
          </div>

          {/* Help Categories */}
          <div className="space-y-6">
            {filteredCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              const isExpanded = expandedCategory === categoryIndex;

              return (
                <div
                  key={categoryIndex}
                  className="bg-white/50 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedCategory(isExpanded ? null : categoryIndex)
                    }
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-white/20 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-adventure-blue/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-adventure-blue" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {category.title}
                        </h3>
                        <p className="text-foreground/70">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`transform transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    >
                      ▼
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6">
                      <div className="space-y-3">
                        {category.articles.map((article, articleIndex) => {
                          const articleKey = `${categoryIndex}-${articleIndex}`;
                          const isArticleExpanded =
                            expandedArticle === articleKey;

                          return (
                            <div
                              key={articleIndex}
                              className="border border-border/30 rounded-lg overflow-hidden"
                            >
                              <button
                                onClick={() =>
                                  setExpandedArticle(
                                    isArticleExpanded ? null : articleKey,
                                  )
                                }
                                className="w-full p-4 text-left hover:bg-background/50 transition-colors flex justify-between items-center"
                              >
                                <span className="font-medium">
                                  {article.title}
                                </span>
                                <span
                                  className={`transform transition-transform ${isArticleExpanded ? "rotate-180" : ""}`}
                                >
                                  ▼
                                </span>
                              </button>
                              {isArticleExpanded && (
                                <div className="px-4 pb-4 text-foreground/80">
                                  {article.content}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-foreground/60 mb-4">
                No help articles found for "{searchQuery}"
              </p>
              <p className="text-foreground/50">
                Try searching with different keywords or contact our support
                team.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HelpCenter;
