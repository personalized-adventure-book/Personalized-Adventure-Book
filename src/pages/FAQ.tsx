import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import { HelpCircle, ChevronDown, Search, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create my first personalized book?",
          answer:
            "Simply click 'Start Creating' on our homepage and follow the step-by-step process. You'll provide your child's information, choose an adventure type, customize the story details, and select your preferred book format (digital or printed).",
        },
        {
          question: "What age groups are your books suitable for?",
          answer:
            "Our books are designed for children aged 2-12 years. The content and complexity are automatically adjusted based on the age you specify during the creation process.",
        },
        {
          question: "How long does it take to create a book?",
          answer:
            "The creation process typically takes 10-15 minutes. You can save your progress and return later if needed. Once completed, digital books are delivered within 2-3 business days, while printed books ship within 5-7 business days.",
        },
        {
          question: "Can I preview my book before ordering?",
          answer:
            "Yes! After completing the creation process, you'll see a detailed preview of your book including sample pages, character illustrations, and story content before making your final purchase decision.",
        },
      ],
    },
    {
      category: "Customization Options",
      questions: [
        {
          question: "How personalized are the books?",
          answer:
            "Every book is unique! We customize the child's name, appearance, age-appropriate content, adventure preferences, favorite colors, pets, friends, and family members. The story adapts to include personal details you provide.",
        },
        {
          question: "Can I include multiple children in one book?",
          answer:
            "Absolutely! You can include siblings, friends, or family members as supporting characters in the adventure. Each additional character can be customized with their own details and roles in the story.",
        },
        {
          question: "What if my child has specific interests or disabilities?",
          answer:
            "We offer accommodations for various needs and interests. You can specify special interests, accessibility requirements, or unique circumstances in the customization process, and we'll adapt the story accordingly.",
        },
        {
          question: "Can I upload my own photos?",
          answer:
            "Yes! You can upload photos that will inspire the illustrations in your book. Our artists use these as references to create personalized artwork that resembles your child and their world.",
        },
      ],
    },
    {
      category: "Ordering & Payment",
      questions: [
        {
          question: "What's the difference between digital and printed books?",
          answer:
            "Digital books are high-quality PDFs delivered via email, perfect for immediate enjoyment and printing at home. Printed books are professionally bound hardcover books with premium paper and printing, shipped directly to you.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are secured with industry-standard encryption.",
        },
        {
          question: "Are there any subscription fees?",
          answer:
            "No, there are no subscription fees. You pay only for the books you order. Each book is a one-time purchase with no recurring charges or hidden fees.",
        },
        {
          question: "Do you offer discounts for multiple books?",
          answer:
            "Yes! We offer volume discounts for multiple books and special promotions throughout the year. Check our pricing page or contact us for bulk order pricing.",
        },
      ],
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          question: "How long does shipping take?",
          answer:
            "Digital books: 2-3 business days via email. Printed books: 5-7 business days production + shipping time. International orders may take additional 7-14 days depending on location.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Yes! We ship printed books worldwide. Shipping costs and delivery times vary by destination. Digital books are available globally with instant delivery via email.",
        },
        {
          question: "Can I track my order?",
          answer:
            "Absolutely! You'll receive tracking information via email once your printed book ships. You can also check your order status anytime in the 'My Orders' section of your account.",
        },
        {
          question: "What if my book arrives damaged?",
          answer:
            "We're committed to quality! If your book arrives damaged, contact us within 30 days and we'll send a replacement at no charge. We cover return shipping for damaged items.",
        },
      ],
    },
    {
      category: "Account & Technical",
      questions: [
        {
          question: "Do I need to create an account?",
          answer:
            "An account isn't required to create a book, but it's recommended! With an account, you can save drafts, track orders, reorder favorite books, and access your purchase history.",
        },
        {
          question: "Can I edit my book after ordering?",
          answer:
            "Minor edits may be possible within 24 hours of ordering, depending on production status. Contact us immediately if you need changes. For major revisions, you may need to place a new order.",
        },
        {
          question: "Is my personal information secure?",
          answer:
            "Yes! We use industry-standard encryption and security measures. We never share personal information with third parties and are fully COPPA compliant for children's privacy protection.",
        },
        {
          question: "What browsers work best with your platform?",
          answer:
            "Our platform works best with modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.",
        },
      ],
    },
    {
      category: "Refunds & Returns",
      questions: [
        {
          question: "What is your refund policy?",
          answer:
            "Digital books: Refunds available within 7 days if there are significant quality issues. Printed books: Full refund for defective items, cancellation possible before printing begins. Custom orders cannot be refunded once printed unless defective.",
        },
        {
          question: "How do I request a refund?",
          answer:
            "Contact our customer service team via email or phone with your order number. We'll review your request and process eligible refunds within 5-7 business days.",
        },
        {
          question: "Can I return a printed book?",
          answer:
            "Printed books can be returned only if they arrive damaged or have printing defects. Since each book is custom-made, we cannot accept returns for personalized content preferences.",
        },
        {
          question: "What if I'm not satisfied with my book?",
          answer:
            "Customer satisfaction is our priority! If there's an issue with your book quality or our service, please contact us. We'll work with you to find a solution that makes you happy.",
        },
      ],
    },
  ];

  const allQuestions = faqData.flatMap((category, categoryIndex) =>
    category.questions.map((q, questionIndex) => ({
      ...q,
      id: `${categoryIndex}-${questionIndex}`,
      category: category.category,
    })),
  );

  const filteredQuestions = searchQuery
    ? allQuestions.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : allQuestions;

  const displayCategories = searchQuery
    ? [
        {
          category: "Search Results",
          questions: filteredQuestions,
        },
      ]
    : faqData;

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
              Frequently Asked{" "}
              <span className="adventure-text-gradient">Questions</span>
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              Find quick answers to the most common questions about our
              personalized adventure books.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search FAQ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-xl border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-adventure-blue/50 focus:border-adventure-blue"
              />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {displayCategories.map((categoryData, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold mb-6 text-adventure-blue">
                  {categoryData.category}
                </h2>
                <div className="space-y-4">
                  {categoryData.questions.map((faq, questionIndex) => {
                    const faqId = searchQuery
                      ? faq.id
                      : `${categoryIndex}-${questionIndex}`;
                    const isExpanded = expandedFAQ === faqId;

                    return (
                      <div
                        key={questionIndex}
                        className="bg-white/50 rounded-xl overflow-hidden border border-border/30"
                      >
                        <button
                          onClick={() =>
                            setExpandedFAQ(isExpanded ? null : faqId)
                          }
                          className="w-full p-6 text-left flex justify-between items-center hover:bg-white/20 transition-colors"
                        >
                          <span className="font-semibold text-lg pr-4">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-foreground/50 transform transition-transform flex-shrink-0 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isExpanded && (
                          <div className="px-6 pb-6">
                            <div className="pt-4 border-t border-border/20">
                              <p className="text-foreground/80 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {searchQuery && filteredQuestions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-foreground/60 mb-4">
                No FAQ found for "{searchQuery}"
              </p>
              <p className="text-foreground/50 mb-6">
                Try searching with different keywords or contact our support
                team.
              </p>
              <Button asChild>
                <a href="/contact">Contact Support</a>
              </Button>
            </div>
          )}

          {/* Contact Section */}
          <div className="mt-16 bg-white/50 rounded-xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-adventure-blue/20 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-adventure-blue" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-foreground/80 mb-6">
              Can't find the answer you're looking for? Our friendly support
              team is here to help!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <a href="/contact">Contact Us</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/help-center">Visit Help Center</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
