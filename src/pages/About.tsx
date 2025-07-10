import Header from "@/components/Header";
import { useTranslation } from "@/hooks/useTranslation";
import { BookOpen, Heart, Users, Star } from "lucide-react";

const About = () => {
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
                <BookOpen className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="adventure-text-gradient">Our Story</span>
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              We believe every child deserves to be the hero of their own
              adventure story.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                At Personalized Adventure Book, we're passionate about creating
                magical, personalized stories that spark imagination and build
                confidence in children.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Every book is crafted with love, featuring your child as the
                main character in adventures that are uniquely theirs.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-60 bg-gradient-to-br from-adventure-blue/20 to-adventure-yellow/20 rounded-xl flex items-center justify-center">
                <Heart className="w-16 h-16 text-adventure-blue" />
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-adventure-blue/20 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-adventure-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality</h3>
                <p className="text-foreground/70">
                  Every story is carefully crafted with beautiful illustrations
                  and engaging narratives.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-adventure-yellow/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-adventure-yellow" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Family</h3>
                <p className="text-foreground/70">
                  We understand the importance of family bonds and creating
                  lasting memories together.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-adventure-green/20 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-adventure-green" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Imagination</h3>
                <p className="text-foreground/70">
                  We believe in the power of stories to inspire creativity and
                  wonder in children.
                </p>
              </div>
            </div>
          </div>

          {/* Story Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">How It Started</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-foreground/80 leading-relaxed mb-4">
                Founded in 2024, Personalized Adventure Book began with a simple
                idea: what if children could see themselves as the heroes of
                their favorite stories?
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Our team of storytellers, illustrators, and parents came
                together to create a platform where every child's unique
                personality, interests, and dreams could come to life in a
                beautifully illustrated book.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Today, we've helped thousands of families create magical
                memories through personalized storytelling, and we're just
                getting started.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
