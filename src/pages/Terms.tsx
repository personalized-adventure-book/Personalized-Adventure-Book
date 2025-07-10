import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import { FileText, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

const Terms = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-adventure-yellow/20">
      <Header showNavigation={false} />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full adventure-gradient flex items-center justify-center">
                <FileText className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms of <span className="adventure-text-gradient">Service</span>
            </h1>
            <p className="text-xl text-foreground/80">
              The terms and conditions for using our service.
            </p>
            <p className="text-sm text-foreground/60 mt-4">
              Last updated: December 2024
            </p>
          </div>

          {/* Quick Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-adventure-blue/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-adventure-blue" />
              </div>
              <h3 className="text-lg font-semibold">Service Use</h3>
              <p className="text-sm text-foreground/70">
                Guidelines for using our platform
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-adventure-yellow/20 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-adventure-yellow" />
              </div>
              <h3 className="text-lg font-semibold">Responsibilities</h3>
              <p className="text-sm text-foreground/70">
                Your rights and obligations
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-adventure-green/20 flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-adventure-green" />
              </div>
              <h3 className="text-lg font-semibold">Refunds</h3>
              <p className="text-sm text-foreground/70">
                Our refund and cancellation policy
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-adventure-purple/20 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-adventure-purple" />
              </div>
              <h3 className="text-lg font-semibold">Legal</h3>
              <p className="text-sm text-foreground/70">
                Legal terms and limitations
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
              <div className="bg-white/50 p-6 rounded-lg">
                <p className="text-foreground/80">
                  By accessing and using Personalized Adventure Book's services,
                  you accept and agree to be bound by these Terms of Service. If
                  you do not agree to these terms, please do not use our
                  services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Service Description</h2>
              <div className="bg-white/50 p-6 rounded-lg">
                <p className="text-foreground/80 mb-3">
                  Personalized Adventure Book provides a platform for creating
                  custom children's books featuring the child as the main
                  character. Our services include:
                </p>
                <ul className="list-disc list-inside text-foreground/80 space-y-2">
                  <li>Online book creation and customization tools</li>
                  <li>Digital book delivery via email</li>
                  <li>Printed book production and shipping</li>
                  <li>Customer support services</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">User Responsibilities</h2>
              <div className="bg-white/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">You agree to:</h3>
                <ul className="list-disc list-inside text-foreground/80 space-y-2 mb-4">
                  <li>Provide accurate and complete information</li>
                  <li>Use the service only for lawful purposes</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not attempt to harm or disrupt our services</li>
                  <li>Keep your account credentials secure</li>
                </ul>
                <h3 className="text-lg font-semibold mb-3">
                  You agree NOT to:
                </h3>
                <ul className="list-disc list-inside text-foreground/80 space-y-2">
                  <li>Upload inappropriate or offensive content</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on others' privacy or rights</li>
                  <li>Attempt to reverse engineer our platform</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Payment and Pricing</h2>
              <div className="bg-white/50 p-6 rounded-lg">
                <ul className="list-disc list-inside text-foreground/80 space-y-2">
                  <li>
                    All prices are displayed in USD and include applicable taxes
                  </li>
                  <li>Payment is required at the time of order</li>
                  <li>
                    We accept major credit cards and secure payment methods
                  </li>
                  <li>
                    Prices may change without notice, but orders already placed
                    are honored
                  </li>
                  <li>Failed payments may result in order cancellation</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                Refunds and Cancellations
              </h2>
              <div className="bg-white/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Digital Books:</h3>
                <ul className="list-disc list-inside text-foreground/80 space-y-2 mb-4">
                  <li>Refunds available within 7 days of purchase</li>
                  <li>Must demonstrate significant quality issues</li>
                  <li>
                    No refunds after book download and satisfaction confirmation
                  </li>
                </ul>
                <h3 className="text-lg font-semibold mb-3">Printed Books:</h3>
                <ul className="list-disc list-inside text-foreground/80 space-y-2">
                  <li>Cancellation possible before printing begins</li>
                  <li>Full refund for defective or damaged books</li>
                  <li>Return shipping costs covered for our errors</li>
                  <li>
                    Custom orders cannot be refunded once printed unless
                    defective
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
              <div className="bg-white/50 p-6 rounded-lg">
                <ul className="list-disc list-inside text-foreground/80 space-y-2">
                  <li>You retain rights to personal information provided</li>
                  <li>
                    We retain rights to our platform, stories, and illustrations
                  </li>
                  <li>
                    You may not reproduce or distribute our content without
                    permission
                  </li>
                  <li>Personal books created are for personal use only</li>
                  <li>Commercial use of our content is prohibited</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                Limitation of Liability
              </h2>
              <div className="bg-white/50 p-6 rounded-lg">
                <p className="text-foreground/80 mb-3">
                  To the maximum extent permitted by law:
                </p>
                <ul className="list-disc list-inside text-foreground/80 space-y-2">
                  <li>
                    Our liability is limited to the amount you paid for services
                  </li>
                  <li>
                    We are not liable for indirect or consequential damages
                  </li>
                  <li>
                    Service interruptions or technical issues are not our
                    liability
                  </li>
                  <li>You use our service at your own risk</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="bg-white/50 p-6 rounded-lg">
                <p className="text-foreground/80 mb-3">
                  For questions about these Terms of Service, please contact us:
                </p>
                <ul className="text-foreground/80 space-y-2">
                  <li>Email: legal@personalizedadventurebook.com</li>
                  <li>Address: 123 Story Lane, Adventure City, AC 12345</li>
                  <li>Phone: 1-800-ADVENTURE</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
