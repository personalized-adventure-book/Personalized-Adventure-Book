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
          content:
            "1. Click 'Start Creating' on the homepage or navigation menu.\n2. Enter your name and email address (required for order delivery).\n3. Provide your child's name, age, and gender - this personalizes the entire story.\n4. Select an adventure type from our collection (Space Mission, Enchanted Forest, Royal Castle, etc.) or describe a custom adventure.\n5. Add location details where the adventure takes place.\n6. Include personal touches like favorite colors, pet names, friends and family to include.\n7. Create detailed experiences with activities, characters, and descriptions.\n8. Upload photos to inspire custom illustrations of your child.\n9. Review everything in the preview section before ordering.",
        },
        {
          title: "Customizing your child's character",
          content:
            "Make your child the perfect hero by:\n• Providing clear, recent photos for our artists to reference\n• Describing physical features: hair color, eye color, height, distinctive features\n• Including personality traits: brave, curious, funny, kind, etc.\n• Mentioning favorite activities or hobbies to weave into the story\n• Adding any special characteristics or interests they're passionate about\n• Including their favorite colors for clothing and theme elements\n• Describing their relationship with friends/family members you want included\n• Noting any accessibility needs or considerations for the character\n• The more details you provide, the more personalized and meaningful the story becomes!",
        },
        {
          title: "Choosing the right adventure type",
          content:
            "Select the perfect adventure based on your child's interests:\n\n🚀 SPACE MISSION: Perfect for kids who love astronauts, planets, aliens, and sci-fi. Features space exploration, meeting friendly aliens, and cosmic adventures.\n\n🌲 ENCHANTED FOREST: Ideal for nature lovers and fantasy fans. Includes magical creatures, talking animals, fairy villages, and mystical quests.\n\n👑 ROYAL CASTLE: Great for kids who love princesses, knights, and medieval themes. Features castle life, royal adventures, and noble quests.\n\n🏴‍☠️ PIRATE VOYAGE: Perfect for adventure seekers who love the ocean. Includes treasure hunts, sailing adventures, and meeting friendly pirates.\n\n🦸 SUPERHERO ACADEMY: Ideal for kids who love superheroes and powers. Features training to become a hero and saving the day.\n\n🐠 UNDERWATER WORLD: Great for ocean lovers. Includes swimming with dolphins, exploring coral reefs, and underwater kingdoms.\n\n🎨 CUSTOM ADVENTURE: Create something unique! Describe any theme or setting you want - we'll craft a personalized adventure around your child's specific interests.",
        },
        {
          title: "Adding photos and personal details",
          content:
            "Photos and details make your book truly special:\n\nPHOTO GUIDELINES:\n• Upload clear, well-lit photos showing your child's face clearly\n• Include full-body shots for character design reference\n• Add photos of pets, family members, or friends you want included\n• Pictures of favorite places or objects can inspire story settings\n• Photos should be high resolution (at least 300 DPI) for best results\n• Multiple angles help our artists create accurate representations\n\nPERSONAL DETAILS TO INCLUDE:\n• Favorite foods, games, or activities\n• Special family traditions or inside jokes\n• Unique phrases or words your child uses\n• Fears to avoid or things that make them feel brave\n• Recent achievements or milestones to celebrate\n• Favorite books, movies, or characters for inspiration\n• Special memories or experiences to incorporate\n• Any learning goals or values you want emphasized\n\nThese details help create a story that feels authentically about YOUR child, making it more engaging and memorable.",
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
          content:
            "ACCEPTED PAYMENT METHODS:\n• All major credit cards (Visa, MasterCard, American Express, Discover)\n• PayPal (including PayPal Credit)\n• Apple Pay (on supported devices)\n• Google Pay (on supported devices)\n• Bank transfers for large orders (contact us)\n\nSECURITY:\n• All transactions are secured with 256-bit SSL encryption\n• We never store your payment information\n• PCI DSS compliant payment processing\n• Fraud protection and secure checkout\n\nBILLING:\n• Charges appear as 'Personalized Adventure Book'\n• You'll receive an email receipt immediately\n• Billing address must match payment method\n• International cards accepted (currency converted automatically)\n• No hidden fees or recurring charges",
        },
        {
          title: "How to track your order",
          content:
            "TRACKING YOUR ORDER:\n\n1. CHECK YOUR EMAIL:\n• Order confirmation sent immediately after purchase\n• Production updates sent every 24-48 hours\n• Shipping notification with tracking number (printed books)\n• Digital delivery email with download links\n\n2. MY ORDERS SECTION:\n• Log into your account and visit 'My Orders'\n• View real-time status updates\n• See estimated delivery dates\n• Download previous orders\n\n3. ORDER STATUSES:\n• 'Confirmed' - Payment processed, creation beginning\n• 'In Progress' - Story being written and illustrated\n• 'Review' - Ready for your approval (if requested)\n• 'Printing' - Book being professionally printed\n• 'Shipped' - On its way to you with tracking\n• 'Delivered' - Enjoy your adventure book!\n\n4. NEED HELP?\n• Contact us with your order number for instant updates\n• We respond within 2 hours during business days",
        },
        {
          title: "Changing or canceling an order",
          content:
            "ORDER MODIFICATIONS:\n\nWITHIN 4 HOURS (Free Changes):\n• Update child's information or photos\n• Modify story details or preferences\n• Change adventure type or activities\n• Update shipping address\n• Switch between digital and printed format\n\n4-24 HOURS (May Incur Fees):\n• Minor text changes: $5 fee\n• Character modifications: $10 fee\n• Major story changes: $15 fee\n• Photo replacements: $5 per photo\n\nAFTER 24 HOURS:\n• Digital books: Changes possible until delivery ($20 fee)\n• Printed books: No changes once printing begins\n• Emergency changes: Contact us immediately\n\nCANCELLATION POLICY:\n• Full refund within 4 hours of order\n• 50% refund within 24 hours (before production)\n• No refund after production begins (unless defective)\n• Printed books: No refund once shipped (unless damaged)\n\nTO MAKE CHANGES:\n• Email us your order number and requested changes\n• Call our support line for urgent modifications\n• Changes processed within 2-4 hours during business days",
        },
        {
          title: "Understanding pricing",
          content:
            "PRICING BREAKDOWN:\n\nDIGITAL BOOK - $19.99:\n• High-resolution PDF (300 DPI)\n• 20-24 full-color pages\n• Instant download after creation\n• Print-at-home option included\n• Lifetime access and re-downloads\n• Mobile-friendly format\n\nPRINTED BOOK - $39.99:\n• Premium hardcover binding\n• Glossy, thick paper stock\n• Professional printing quality\n• 20-24 full-color pages\n• Includes digital copy\n• Free shipping within US\n• Gift wrapping available (+$5)\n\nADD-ONS:\n• Extra characters: $3 each\n• Rush delivery (48 hours): $15\n• Additional printed copies: $25 each\n• Gift message card: $2\n• Premium gift box: $8\n\nDISCOUNTS:\n• Multiple books: 10% off 2+, 15% off 3+\n• Returning customers: 5% loyalty discount\n• Seasonal promotions throughout the year\n• Bulk orders (10+): Contact for custom pricing\n\nTAXES & FEES:\n• Sales tax applied based on delivery address\n• International shipping: $12-25 depending on location\n• No hidden fees or subscription charges",
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
