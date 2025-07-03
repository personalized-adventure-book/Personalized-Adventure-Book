import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  User,
  Baby,
  MapPin,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Rocket,
  TreePine,
  Crown,
  Anchor,
  Zap,
  Heart,
  X,
} from "lucide-react";

interface FormData {
  // Parent Information
  parentName: string;
  parentEmail: string;

  // Child Information
  childName: string;
  childAge: string;
  childGender: string;

  // Adventure Details
  adventureType: string;
  location: string;
  activities: string[];
  characters: string;
  personalTouches: string;

  // Friends/Family
  includeFriends: string;
  favoriteColor: string;
  petName: string;
  specialDetails: string;
  personalExperiences: string[];
}

const BookBuilder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    parentName: "",
    parentEmail: "",
    childName: "",
    childAge: "",
    childGender: "",
    adventureType: "",
    location: "",
    activities: [],
    characters: "",
    personalTouches: "",
    includeFriends: "",
    favoriteColor: "",
    petName: "",
    specialDetails: "",
    personalExperiences: [],
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  // Check for pre-selected adventure type on component mount
  useEffect(() => {
    const selectedAdventure = localStorage.getItem("selectedAdventure");
    if (selectedAdventure) {
      setFormData((prev) => ({ ...prev, adventureType: selectedAdventure }));
      // Skip to step 3 (adventure details) if adventure is pre-selected
      setCurrentStep(3);
      // Clear the stored selection
      localStorage.removeItem("selectedAdventure");
    }
  }, []);

  const adventureTypes = [
    {
      id: "space",
      name: "Space Mission",
      icon: Rocket,
      description: "Blast off to distant planets",
    },
    {
      id: "forest",
      name: "Enchanted Forest",
      icon: TreePine,
      description: "Discover magical creatures",
    },
    {
      id: "castle",
      name: "Royal Castle",
      icon: Crown,
      description: "Become a brave knight or princess",
    },
    {
      id: "pirate",
      name: "Pirate Voyage",
      icon: Anchor,
      description: "Sail the seven seas",
    },
    {
      id: "superhero",
      name: "Superhero Academy",
      icon: Zap,
      description: "Train to become a hero",
    },
    {
      id: "underwater",
      name: "Underwater World",
      icon: Heart,
      description: "Explore coral kingdoms",
    },
  ];

  const activityOptions = [
    "Treasure hunting",
    "Dragon encounters",
    "Deep-sea diving",
    "Rocket launches",
    "Magic spell casting",
    "Solving mysteries",
    "Meeting new friends",
    "Saving the day",
    "Exploring new worlds",
    "Learning new skills",
    "Finding hidden secrets",
    "Going on quests",
  ];

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValidGmail = (email: string) => {
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailPattern.test(email);
  };

  const handleActivityToggle = (activity: string) => {
    const currentActivities = formData.activities;
    const updated = currentActivities.includes(activity)
      ? currentActivities.filter((a) => a !== activity)
      : [...currentActivities, activity];
    updateFormData("activities", updated);
  };

  const addPersonalExperience = (experience: string) => {
    if (experience.trim()) {
      updateFormData("personalExperiences", [
        ...formData.personalExperiences,
        experience.trim(),
      ]);
    }
  };

  const removePersonalExperience = (index: number) => {
    const updated = formData.personalExperiences.filter((_, i) => i !== index);
    updateFormData("personalExperiences", updated);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Store form data and navigate to preview
    localStorage.setItem("adventureBookData", JSON.stringify(formData));
    navigate("/preview");
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.parentName && formData.parentEmail;
      case 2:
        return formData.childName && formData.childAge && formData.childGender;
      case 3:
        return formData.adventureType && formData.location;
      case 4:
        return true; // Optional details
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-adventure-yellow/20">
      {/* Header */}
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
            <div className="text-sm text-foreground/70">
              Step {currentStep} of {totalSteps}
            </div>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-foreground/70 hover:text-foreground"
            >
              <Link to="/" className="flex items-center space-x-1">
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-foreground/70 mb-2">
            <span>Create Your Adventure</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl md:text-3xl">
              {currentStep === 1 && "Let's Start With You"}
              {currentStep === 2 && "About Your Little Hero"}
              {currentStep === 3 && "Choose the Adventure"}
              {currentStep === 4 && "Add Personal Touches"}
            </CardTitle>
            <p className="text-foreground/70">
              {currentStep === 1 &&
                "We need your information to create and deliver the book"}
              {currentStep === 2 && "Tell us about the star of this adventure"}
              {currentStep === 3 &&
                "What kind of magical journey should we create?"}
              {currentStep === 4 &&
                "Make it extra special with these personal details"}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Parent Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-adventure-purple">
                  <User className="w-5 h-5" />
                  <h3 className="font-semibold">Parent Information</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Your Name *</Label>
                    <Input
                      id="parentName"
                      value={formData.parentName}
                      onChange={(e) =>
                        updateFormData("parentName", e.target.value)
                      }
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">Email Address *</Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      value={formData.parentEmail}
                      onChange={(e) =>
                        updateFormData("parentEmail", e.target.value)
                      }
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Child Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-adventure-green">
                  <Baby className="w-5 h-5" />
                  <h3 className="font-semibold">Child Information</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="childName">Child's Name *</Label>
                    <Input
                      id="childName"
                      value={formData.childName}
                      onChange={(e) =>
                        updateFormData("childName", e.target.value)
                      }
                      placeholder="Enter your child's name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childAge">Age *</Label>
                    <Select
                      value={formData.childAge}
                      onValueChange={(value) =>
                        updateFormData("childAge", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select age" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 years old</SelectItem>
                        <SelectItem value="4">4 years old</SelectItem>
                        <SelectItem value="5">5 years old</SelectItem>
                        <SelectItem value="6">6 years old</SelectItem>
                        <SelectItem value="7">7 years old</SelectItem>
                        <SelectItem value="8">8 years old</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Gender *</Label>
                  <RadioGroup
                    value={formData.childGender}
                    onValueChange={(value) =>
                      updateFormData("childGender", value)
                    }
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="boy" id="boy" />
                      <Label htmlFor="boy">Boy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="girl" id="girl" />
                      <Label htmlFor="girl">Girl</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 3: Adventure Selection */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-adventure-blue">
                  <MapPin className="w-5 h-5" />
                  <h3 className="font-semibold">Adventure Details</h3>
                </div>

                <div className="space-y-4">
                  <Label>Choose Adventure Type *</Label>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {adventureTypes.map((adventure) => (
                      <Card
                        key={adventure.id}
                        className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                          formData.adventureType === adventure.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() =>
                          updateFormData("adventureType", adventure.id)
                        }
                      >
                        <CardContent className="p-4 text-center">
                          <adventure.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                          <h4 className="font-semibold text-sm mb-1">
                            {adventure.name}
                          </h4>
                          <p className="text-xs text-foreground/70">
                            {adventure.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Setting or Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                    placeholder="e.g., Enchanted Forest, Mars Colony, Grand Canyon"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Key Activities (select up to 4)</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {activityOptions.map((activity) => (
                      <div
                        key={activity}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={activity}
                          checked={formData.activities.includes(activity)}
                          onCheckedChange={() => handleActivityToggle(activity)}
                          disabled={
                            formData.activities.length >= 4 &&
                            !formData.activities.includes(activity)
                          }
                        />
                        <Label htmlFor={activity} className="text-sm">
                          {activity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Personal Touches */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-adventure-pink">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="font-semibold">Personal Touches</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="favoriteColor">
                      Child's Favorite Color
                    </Label>
                    <Input
                      id="favoriteColor"
                      value={formData.favoriteColor}
                      onChange={(e) =>
                        updateFormData("favoriteColor", e.target.value)
                      }
                      placeholder="e.g., Purple, Blue, Pink"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="petName">Pet's Name (if any)</Label>
                    <Input
                      id="petName"
                      value={formData.petName}
                      onChange={(e) =>
                        updateFormData("petName", e.target.value)
                      }
                      placeholder="e.g., Fluffy, Buddy"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="includeFriends">
                    Friends or Family to Include
                  </Label>
                  <Input
                    id="includeFriends"
                    value={formData.includeFriends}
                    onChange={(e) =>
                      updateFormData("includeFriends", e.target.value)
                    }
                    placeholder="e.g., Sister Emma, Best friend Jake, Grandma"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="characters">
                    Favorite Characters or Themes
                  </Label>
                  <Textarea
                    id="characters"
                    value={formData.characters}
                    onChange={(e) =>
                      updateFormData("characters", e.target.value)
                    }
                    placeholder="e.g., Talking animals, Superheroes, Magic spells, Robots"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialDetails">
                    Special Details or Inside Jokes
                  </Label>
                  <Textarea
                    id="specialDetails"
                    value={formData.specialDetails}
                    onChange={(e) =>
                      updateFormData("specialDetails", e.target.value)
                    }
                    placeholder="Any special details, inside jokes, or favorite things your child loves"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 bg-primary hover:bg-primary/90"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Create My Book</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookBuilder;
