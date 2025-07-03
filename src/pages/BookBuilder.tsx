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
import Header from "@/components/Header";
import { useTranslation } from "@/hooks/useTranslation";
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
  Upload,
  Image,
  Plus,
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface ActivityImage {
  file: File;
  description: string;
}

interface ActivityDetail {
  id: string;
  name: string;
  details: string;
  characters: string;
  images: ActivityImage[];
  imageDescription: string;
}

interface ExperienceDetail {
  id: string;
  title: string;
  description: string;
  predefinedActivities: string[];
  customActivities: string[];
  activityDetails: ActivityDetail[];
  characters: string;
  images: ActivityImage[];
  imageDescription: string;
}

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
  customAdventureType: string;
  location: string;

  // Merged Experiences and Activities
  experiences: ExperienceDetail[];

  // Personal Details
  favoriteColor: string;
  petName: string;
  includeFriends: string;
  specialDetails: string;
}

const BookBuilder = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [emailTouched, setEmailTouched] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    parentName: "",
    parentEmail: "",
    childName: "",
    childAge: "",
    childGender: "",
    adventureType: "",
    customAdventureType: "",
    location: "",
    experiences: [],
    favoriteColor: "",
    petName: "",
    includeFriends: "",
    specialDetails: "",
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const adventureTypes = [
    {
      id: "space",
      name: t("adventure.spaceMission"),
      icon: Rocket,
      description: t("adventure.spaceMissionDesc"),
    },
    {
      id: "forest",
      name: t("adventure.enchantedForest"),
      icon: TreePine,
      description: t("adventure.enchantedForestDesc"),
    },
    {
      id: "castle",
      name: t("adventure.royalCastle"),
      icon: Crown,
      description: t("adventure.royalCastleDesc"),
    },
    {
      id: "pirate",
      name: t("adventure.pirateVoyage"),
      icon: Anchor,
      description: t("adventure.pirateVoyageDesc"),
    },
    {
      id: "superhero",
      name: t("adventure.superheroAcademy"),
      icon: Zap,
      description: t("adventure.superheroAcademyDesc"),
    },
    {
      id: "underwater",
      name: t("adventure.underwaterWorld"),
      icon: Heart,
      description: t("adventure.underwaterWorldDesc"),
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

  // Experience Management Functions
  const addExperience = () => {
    const newExperience: ExperienceDetail = {
      id: Date.now().toString(),
      title: "",
      description: "",
      predefinedActivities: [],
      customActivities: [],
      activityDetails: [],
      characters: "",
      images: [],
      imageDescription: "",
    };
    updateFormData("experiences", [...formData.experiences, newExperience]);
  };

  const updateExperience = (
    id: string,
    field: keyof ExperienceDetail,
    value: any,
  ) => {
    const updated = formData.experiences.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp,
    );
    updateFormData("experiences", updated);
  };

  const removeExperience = (id: string) => {
    const updated = formData.experiences.filter((exp) => exp.id !== id);
    updateFormData("experiences", updated);
  };

  const moveExperience = (id: string, direction: "up" | "down") => {
    const experiences = [...formData.experiences];
    const index = experiences.findIndex((exp) => exp.id === id);
    if (
      (direction === "up" && index > 0) ||
      (direction === "down" && index < experiences.length - 1)
    ) {
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      [experiences[index], experiences[targetIndex]] = [
        experiences[targetIndex],
        experiences[index],
      ];
      updateFormData("experiences", experiences);
    }
  };

  // Activity Management Functions
  const togglePredefinedActivity = (experienceId: string, activity: string) => {
    const experience = formData.experiences.find(
      (exp) => exp.id === experienceId,
    );
    if (!experience) return;

    const currentActivities = experience.predefinedActivities;
    const updated = currentActivities.includes(activity)
      ? currentActivities.filter((a) => a !== activity)
      : [...currentActivities, activity];

    updateExperience(experienceId, "predefinedActivities", updated);

    // Auto-create activity detail if not exists
    if (!currentActivities.includes(activity)) {
      addActivityDetail(experienceId, activity);
    } else {
      removeActivityDetail(experienceId, activity);
    }
  };

  const addCustomActivity = (experienceId: string, activity: string) => {
    if (!activity.trim()) return;

    const experience = formData.experiences.find(
      (exp) => exp.id === experienceId,
    );
    if (!experience) return;

    const updated = [...experience.customActivities, activity.trim()];
    updateExperience(experienceId, "customActivities", updated);

    // Auto-create activity detail
    addActivityDetail(experienceId, activity.trim());
  };

  const removeCustomActivity = (experienceId: string, index: number) => {
    const experience = formData.experiences.find(
      (exp) => exp.id === experienceId,
    );
    if (!experience) return;

    const activityToRemove = experience.customActivities[index];
    const updated = experience.customActivities.filter((_, i) => i !== index);
    updateExperience(experienceId, "customActivities", updated);

    // Remove corresponding activity detail
    removeActivityDetail(experienceId, activityToRemove);
  };

  // Activity Detail Management Functions
  const addActivityDetail = (experienceId: string, activityName: string) => {
    const experience = formData.experiences.find(
      (exp) => exp.id === experienceId,
    );
    if (!experience) return;

    // Check if activity detail already exists
    const exists = experience.activityDetails.some(
      (detail) => detail.name === activityName,
    );
    if (exists) return;

    const newActivityDetail: ActivityDetail = {
      id: Date.now().toString() + Math.random(),
      name: activityName,
      details: "",
      characters: "",
      images: [],
      imageDescription: "",
    };

    const updatedDetails = [...experience.activityDetails, newActivityDetail];
    updateExperience(experienceId, "activityDetails", updatedDetails);
  };

  const removeActivityDetail = (experienceId: string, activityName: string) => {
    const experience = formData.experiences.find(
      (exp) => exp.id === experienceId,
    );
    if (!experience) return;

    const updatedDetails = experience.activityDetails.filter(
      (detail) => detail.name !== activityName,
    );
    updateExperience(experienceId, "activityDetails", updatedDetails);
  };

  const updateActivityDetail = (
    experienceId: string,
    activityId: string,
    field: keyof ActivityDetail,
    value: any,
  ) => {
    const experience = formData.experiences.find(
      (exp) => exp.id === experienceId,
    );
    if (!experience) return;

    const updatedDetails = experience.activityDetails.map((detail) =>
      detail.id === activityId ? { ...detail, [field]: value } : detail,
    );
    updateExperience(experienceId, "activityDetails", updatedDetails);
  };

  // Image Management Functions
  const handleImageUpload = (
    experienceId: string,
    files: FileList | null,
    activityId?: string,
  ) => {
    if (!files) return;

    const newImages: ActivityImage[] = Array.from(files).map((file) => ({
      file,
      description: "",
    }));

    if (activityId) {
      // Add to activity detail
      const experience = formData.experiences.find(
        (exp) => exp.id === experienceId,
      );
      if (!experience) return;

      const activityDetail = experience.activityDetails.find(
        (detail) => detail.id === activityId,
      );
      if (!activityDetail) return;

      updateActivityDetail(experienceId, activityId, "images", [
        ...activityDetail.images,
        ...newImages,
      ]);
    } else {
      // Add to experience
      const experience = formData.experiences.find(
        (exp) => exp.id === experienceId,
      );
      if (!experience) return;

      updateExperience(experienceId, "images", [
        ...experience.images,
        ...newImages,
      ]);
    }
  };

  const updateImageDescription = (
    experienceId: string,
    imageIndex: number,
    description: string,
    activityId?: string,
  ) => {
    if (activityId) {
      const experience = formData.experiences.find(
        (exp) => exp.id === experienceId,
      );
      if (!experience) return;

      const activityDetail = experience.activityDetails.find(
        (detail) => detail.id === activityId,
      );
      if (!activityDetail) return;

      const updatedImages = activityDetail.images.map((img, index) =>
        index === imageIndex ? { ...img, description } : img,
      );
      updateActivityDetail(experienceId, activityId, "images", updatedImages);
    } else {
      const experience = formData.experiences.find(
        (exp) => exp.id === experienceId,
      );
      if (!experience) return;

      const updatedImages = experience.images.map((img, index) =>
        index === imageIndex ? { ...img, description } : img,
      );
      updateExperience(experienceId, "images", updatedImages);
    }
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
    const finalData = {
      ...formData,
      finalAdventureType:
        formData.adventureType || formData.customAdventureType,
    };
    localStorage.setItem("adventureBookData", JSON.stringify(finalData));
    navigate("/preview");
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.parentName &&
          formData.parentEmail &&
          isValidGmail(formData.parentEmail)
        );
      case 2:
        return formData.childName && formData.childAge && formData.childGender;
      case 3:
        return (
          (formData.adventureType || formData.customAdventureType) &&
          formData.location
        );
      case 4:
        return true; // Optional details
      case 5:
        return true; // Optional experience details
      default:
        return false;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return t("form.step1");
      case 2:
        return t("form.step2");
      case 3:
        return t("form.step3");
      case 4:
        return t("form.step4");
      case 5:
        return t("form.step5");
      default:
        return "";
    }
  };

  const RequiredStar = () => <span className="text-red-500 ml-1">*</span>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-adventure-yellow/20">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-foreground/70 mb-2">
            <span>{t("nav.examples")}</span>
            <span>
              {Math.round(progress)}% {t("form.complete")}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl md:text-3xl">
              {getStepTitle()}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Parent Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-adventure-blue/20 text-adventure-blue flex items-center justify-center">
                    <User className="w-8 h-8" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="parentName">
                      {t("form.parentName")}
                      <RequiredStar />
                    </Label>
                    <Input
                      id="parentName"
                      value={formData.parentName}
                      onChange={(e) =>
                        updateFormData("parentName", e.target.value)
                      }
                      placeholder={t("form.parentName")}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="parentEmail">
                      {t("form.email")}
                      <RequiredStar />
                    </Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      value={formData.parentEmail}
                      onChange={(e) =>
                        updateFormData("parentEmail", e.target.value)
                      }
                      onBlur={() => setEmailTouched(true)}
                      placeholder="your.name@gmail.com"
                      className="mt-1"
                    />
                    {emailTouched &&
                      formData.parentEmail &&
                      !isValidGmail(formData.parentEmail) && (
                        <p className="text-red-500 text-sm mt-1">
                          {t("form.emailInvalid")}
                        </p>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Child Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-adventure-pink/20 text-adventure-pink flex items-center justify-center">
                    <Baby className="w-8 h-8" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="childName">
                      {t("form.childName")}
                      <RequiredStar />
                    </Label>
                    <Input
                      id="childName"
                      value={formData.childName}
                      onChange={(e) =>
                        updateFormData("childName", e.target.value)
                      }
                      placeholder={t("form.childName")}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="childAge">
                      {t("form.age")}
                      <RequiredStar />
                    </Label>
                    <Select
                      value={formData.childAge}
                      onValueChange={(value) =>
                        updateFormData("childAge", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={t("form.selectAge")} />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 19 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i} {i === 1 ? "year old" : "years old"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>
                      {t("form.gender")}
                      <RequiredStar />
                    </Label>
                    <RadioGroup
                      value={formData.childGender}
                      onValueChange={(value) =>
                        updateFormData("childGender", value)
                      }
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="boy" id="boy" />
                        <Label htmlFor="boy">{t("form.boy")}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="girl" id="girl" />
                        <Label htmlFor="girl">{t("form.girl")}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">{t("form.other")}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Adventure Selection */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-adventure-purple/20 text-adventure-purple flex items-center justify-center">
                    <MapPin className="w-8 h-8" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label>
                      {t("form.adventureType")}
                      <RequiredStar />
                    </Label>
                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                      {adventureTypes.map((adventure) => (
                        <Card
                          key={adventure.id}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            formData.adventureType === adventure.id
                              ? "border-primary bg-primary/5"
                              : "border-border"
                          }`}
                          onClick={() => {
                            updateFormData("adventureType", adventure.id);
                            updateFormData("customAdventureType", "");
                          }}
                        >
                          <CardContent className="p-4 flex items-center space-x-3">
                            <adventure.icon className="w-6 h-6 text-primary" />
                            <div>
                              <h4 className="font-medium">{adventure.name}</h4>
                              <p className="text-sm text-foreground/70">
                                {adventure.description}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="customAdventure" className="text-sm">
                        {t("form.customAdventure")}
                      </Label>
                      <Textarea
                        id="customAdventure"
                        value={formData.customAdventureType}
                        onChange={(e) => {
                          updateFormData("customAdventureType", e.target.value);
                          if (e.target.value) {
                            updateFormData("adventureType", "");
                          }
                        }}
                        placeholder={t("form.customAdventurePlaceholder")}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">
                      {t("form.location")}
                      <RequiredStar />
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        updateFormData("location", e.target.value)
                      }
                      placeholder="Magical Kingdom, Space Station, Underwater City..."
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Personal Touches */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-adventure-green/20 text-adventure-green flex items-center justify-center">
                    <Heart className="w-8 h-8" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="favoriteColor">
                      {t("form.favoriteColor")}
                    </Label>
                    <Input
                      id="favoriteColor"
                      value={formData.favoriteColor}
                      onChange={(e) =>
                        updateFormData("favoriteColor", e.target.value)
                      }
                      placeholder="Blue, Pink, Rainbow..."
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="petName">{t("form.petName")}</Label>
                    <Input
                      id="petName"
                      value={formData.petName}
                      onChange={(e) =>
                        updateFormData("petName", e.target.value)
                      }
                      placeholder="Fluffy, Rex, Whiskers..."
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="includeFriends">
                      {t("form.includeFriends")}
                    </Label>
                    <Input
                      id="includeFriends"
                      value={formData.includeFriends}
                      onChange={(e) =>
                        updateFormData("includeFriends", e.target.value)
                      }
                      placeholder="Mom, Dad, Sister Emma, Best friend Jake..."
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialDetails">
                      {t("form.specialDetails")}
                    </Label>
                    <Textarea
                      id="specialDetails"
                      value={formData.specialDetails}
                      onChange={(e) =>
                        updateFormData("specialDetails", e.target.value)
                      }
                      placeholder="Special interests, hobbies, funny moments..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Experience Details */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-adventure-yellow/20 text-adventure-yellow flex items-center justify-center">
                    <Sparkles className="w-8 h-8" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                      {t("form.personalExperiences")}
                    </h3>
                  </div>

                  {formData.experiences.map((experience, index) => (
                    <Card
                      key={experience.id}
                      className="border-2 border-dashed border-adventure-blue/30"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            Experience {index + 1}
                          </h4>
                          <div className="flex items-center space-x-2">
                            {/* Move up/down buttons */}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                moveExperience(experience.id, "up")
                              }
                              disabled={index === 0}
                            >
                              <ChevronUp className="w-4 h-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                moveExperience(experience.id, "down")
                              }
                              disabled={
                                index === formData.experiences.length - 1
                              }
                            >
                              <ChevronDown className="w-4 h-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeExperience(experience.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <Label>{t("form.activityName")}</Label>
                          <Input
                            value={experience.title}
                            onChange={(e) =>
                              updateExperience(
                                experience.id,
                                "title",
                                e.target.value,
                              )
                            }
                            placeholder="Swimming with dolphins, Finding treasure..."
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label>{t("form.activityDetails")}</Label>
                          <Textarea
                            value={experience.description}
                            onChange={(e) =>
                              updateExperience(
                                experience.id,
                                "description",
                                e.target.value,
                              )
                            }
                            placeholder="Describe what happens in this part of the adventure..."
                            className="mt-1"
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label>{t("form.selectActivities")}</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                            {activityOptions.map((activity) => (
                              <div
                                key={activity}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`${experience.id}-${activity}`}
                                  checked={experience.predefinedActivities.includes(
                                    activity,
                                  )}
                                  onCheckedChange={() =>
                                    togglePredefinedActivity(
                                      experience.id,
                                      activity,
                                    )
                                  }
                                />
                                <Label
                                  htmlFor={`${experience.id}-${activity}`}
                                  className="text-sm"
                                >
                                  {activity}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label>{t("form.customActivities")}</Label>
                          <div className="space-y-2 mt-2">
                            {experience.customActivities.map(
                              (activity, actIndex) => (
                                <div
                                  key={actIndex}
                                  className="flex items-center space-x-2"
                                >
                                  <Input value={activity} readOnly />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      removeCustomActivity(
                                        experience.id,
                                        actIndex,
                                      )
                                    }
                                    className="text-red-500"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              ),
                            )}
                            <Input
                              placeholder="Add custom activity..."
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  const target = e.target as HTMLInputElement;
                                  addCustomActivity(
                                    experience.id,
                                    target.value,
                                  );
                                  target.value = "";
                                }
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <Label>{t("form.activityCharacters")}</Label>
                          <Input
                            value={experience.characters}
                            onChange={(e) =>
                              updateExperience(
                                experience.id,
                                "characters",
                                e.target.value,
                              )
                            }
                            placeholder="Who's involved in this experience?"
                            className="mt-1"
                          />
                        </div>

                        {/* Experience Images */}
                        <div>
                          <Label>{t("form.uploadImages")} (Experience)</Label>
                          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={(e) =>
                                handleImageUpload(experience.id, e.target.files)
                              }
                              className="hidden"
                              id={`exp-images-${experience.id}`}
                            />
                            <Label
                              htmlFor={`exp-images-${experience.id}`}
                              className="cursor-pointer flex flex-col items-center space-y-2"
                            >
                              <Upload className="w-6 h-6 text-gray-400" />
                              <span className="text-sm text-gray-500">
                                Click to upload images for this experience
                              </span>
                            </Label>
                          </div>

                          {/* Experience Image Descriptions */}
                          {experience.images.length > 0 && (
                            <div className="mt-4 space-y-4">
                              <h5 className="font-medium">Experience Images</h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {experience.images.map((img, imgIndex) => (
                                  <div key={imgIndex} className="space-y-2">
                                    <img
                                      src={URL.createObjectURL(img.file)}
                                      alt="Experience upload"
                                      className="w-full h-32 object-cover rounded"
                                    />
                                    <div>
                                      <Label className="text-sm">
                                        Image Description
                                      </Label>
                                      <Textarea
                                        value={img.description}
                                        onChange={(e) =>
                                          updateImageDescription(
                                            experience.id,
                                            imgIndex,
                                            e.target.value,
                                          )
                                        }
                                        placeholder="Describe this image..."
                                        className="mt-1"
                                        rows={2}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Activity Details Subsections */}
                        {experience.activityDetails.length > 0 && (
                          <div className="space-y-4">
                            <h5 className="font-medium text-adventure-purple">
                              Activity Details
                            </h5>
                            {experience.activityDetails.map(
                              (activityDetail) => (
                                <Card
                                  key={activityDetail.id}
                                  className="border border-adventure-purple/30 bg-adventure-purple/5"
                                >
                                  <CardHeader className="pb-3">
                                    <h6 className="font-medium">
                                      {activityDetail.name}
                                    </h6>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div>
                                      <Label className="text-sm">
                                        Activity Details
                                      </Label>
                                      <Textarea
                                        value={activityDetail.details}
                                        onChange={(e) =>
                                          updateActivityDetail(
                                            experience.id,
                                            activityDetail.id,
                                            "details",
                                            e.target.value,
                                          )
                                        }
                                        placeholder="Describe what happens during this activity..."
                                        className="mt-1"
                                        rows={3}
                                      />
                                    </div>

                                    <div>
                                      <Label className="text-sm">
                                        Characters Involved
                                      </Label>
                                      <Input
                                        value={activityDetail.characters}
                                        onChange={(e) =>
                                          updateActivityDetail(
                                            experience.id,
                                            activityDetail.id,
                                            "characters",
                                            e.target.value,
                                          )
                                        }
                                        placeholder="Who's involved in this activity?"
                                        className="mt-1"
                                      />
                                    </div>

                                    {/* Activity Images */}
                                    <div>
                                      <Label className="text-sm">
                                        Activity Images
                                      </Label>
                                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-3">
                                        <input
                                          type="file"
                                          multiple
                                          accept="image/*"
                                          onChange={(e) =>
                                            handleImageUpload(
                                              experience.id,
                                              e.target.files,
                                              activityDetail.id,
                                            )
                                          }
                                          className="hidden"
                                          id={`activity-images-${activityDetail.id}`}
                                        />
                                        <Label
                                          htmlFor={`activity-images-${activityDetail.id}`}
                                          className="cursor-pointer flex flex-col items-center space-y-1"
                                        >
                                          <Upload className="w-5 h-5 text-gray-400" />
                                          <span className="text-xs text-gray-500">
                                            Upload images for{" "}
                                            {activityDetail.name}
                                          </span>
                                        </Label>
                                      </div>

                                      {/* Activity Image Descriptions */}
                                      {activityDetail.images.length > 0 && (
                                        <div className="mt-3 space-y-3">
                                          <h6 className="text-sm font-medium">
                                            Activity Images
                                          </h6>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {activityDetail.images.map(
                                              (img, imgIndex) => (
                                                <div
                                                  key={imgIndex}
                                                  className="space-y-2"
                                                >
                                                  <img
                                                    src={URL.createObjectURL(
                                                      img.file,
                                                    )}
                                                    alt="Activity upload"
                                                    className="w-full h-24 object-cover rounded"
                                                  />
                                                  <div>
                                                    <Label className="text-xs">
                                                      Image Description
                                                    </Label>
                                                    <Textarea
                                                      value={img.description}
                                                      onChange={(e) =>
                                                        updateImageDescription(
                                                          experience.id,
                                                          imgIndex,
                                                          e.target.value,
                                                          activityDetail.id,
                                                        )
                                                      }
                                                      placeholder="Describe this image..."
                                                      className="mt-1"
                                                      rows={2}
                                                    />
                                                  </div>
                                                </div>
                                              ),
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              ),
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  {/* Add Experience Button - Always at the end */}
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addExperience}
                      className="flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{t("form.addExperience")}</span>
                    </Button>
                  </div>

                  {formData.experiences.length === 0 && (
                    <div className="text-center py-8 text-foreground/70">
                      <p>
                        No experiences added yet. Click "Add Experience" to get
                        started!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t("form.previous")}</span>
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex items-center space-x-2"
                >
                  <span>{t("form.next")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className="flex items-center space-x-2"
                >
                  <span>{t("form.reviewBook")}</span>
                  <ArrowRight className="w-4 h-4" />
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
