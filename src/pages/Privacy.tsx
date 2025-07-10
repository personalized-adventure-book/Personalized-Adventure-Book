import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import { Shield, Lock, Eye, Users } from "lucide-react";

const Privacy = () => {
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
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy <span className="adventure-text-gradient">Policy</span>
            </h1>
            <p className="text-xl text-foreground/80">
              Your privacy and your child's safety are our top priorities.
            </p>
            <p className="text-sm text-foreground/60 mt-4">
              Last updated: December 2024
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-adventure-blue/20 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-adventure-blue" />
                </div>
                <h3 className="text-lg font-semibold">Data Security</h3>
                <p className="text-sm text-foreground/70">
                  All data is encrypted and securely stored.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-adventure-yellow/20 flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-adventure-yellow" />
                </div>
                <h3 className="text-lg font-semibold">Transparency</h3>
                <p className="text-sm text-foreground/70">
                  Clear information about what we collect.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-adventure-green/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-adventure-green" />
                </div>
                <h3 className="text-lg font-semibold">Child Safety</h3>
                <p className="text-sm text-foreground/70">
                  COPPA compliant and child-focused policies.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-adventure-purple/20 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-adventure-purple" />
                </div>
                <h3 className="text-lg font-semibold">Your Control</h3>
                <p className="text-sm text-foreground/70">
                  You control your data and can delete it anytime.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">
                  Information We Collect
                </h2>
                <div className="bg-white/50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">
                    Personal Information
                  </h3>
                  <ul className="list-disc list-inside text-foreground/80 space-y-2">
                    <li>Parent/Guardian name and email address</li>
                    <li>
                      Child's name, age, and gender (for book personalization)
                    </li>
                    <li>Story preferences and customization details</li>
                    <li>Shipping address (for printed books only)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">
                  How We Use Your Information
                </h2>
                <div className="bg-white/50 p-6 rounded-lg">
                  <ul className="list-disc list-inside text-foreground/80 space-y-2">
                    <li>Create personalized adventure books for your child</li>
                    <li>Process and fulfill your orders</li>
                    <li>Send order confirmations and updates</li>
                    <li>Improve our services and user experience</li>
                    <li>Respond to customer support inquiries</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Data Protection</h2>
                <div className="bg-white/50 p-6 rounded-lg">
                  <ul className="list-disc list-inside text-foreground/80 space-y-2">
                    <li>All data is encrypted in transit and at rest</li>
                    <li>We use secure payment processors for transactions</li>
                    <li>
                      Access to personal data is limited to authorized personnel
                    </li>
                    <li>Regular security audits and updates</li>
                    <li>No data is shared with third parties for marketing</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
                <div className="bg-white/50 p-6 rounded-lg">
                  <p className="text-foreground/80 mb-3">
                    We are committed to protecting children's privacy and comply
                    with the Children's Online Privacy Protection Act (COPPA).
                  </p>
                  <ul className="list-disc list-inside text-foreground/80 space-y-2">
                    <li>
                      We only collect child information necessary for book
                      creation
                    </li>
                    <li>Parental consent is required for all child data</li>
                    <li>
                      Children's data is never used for marketing purposes
                    </li>
                    <li>
                      Parents can review, modify, or delete child information at
                      any time
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                <div className="bg-white/50 p-6 rounded-lg">
                  <ul className="list-disc list-inside text-foreground/80 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct or update your data</li>
                    <li>Delete your account and all associated data</li>
                    <li>Withdraw consent for data processing</li>
                    <li>Request data portability</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <div className="bg-white/50 p-6 rounded-lg">
                  <p className="text-foreground/80 mb-3">
                    If you have any questions about this Privacy Policy or how
                    we handle your data, please contact us:
                  </p>
                  <ul className="text-foreground/80 space-y-2">
                    <li>Email: privacy@personalizedadventurebook.com</li>
                    <li>Address: 123 Story Lane, Adventure City, AC 12345</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
