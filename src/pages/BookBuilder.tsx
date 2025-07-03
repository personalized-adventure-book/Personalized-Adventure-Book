import { useState, useEffect, useRef } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoadingDraft, setIsLoadingDraft] = useState(true);
  const [expandedExperiences, setExpandedExperiences] = useState<Set<string>>(
    new Set(),
  );
  const [hasAttemptedProceed, setHasAttemptedProceed] = useState(false);
  const [customActivityInputs, setCustomActivityInputs] = useState<{
    [key: string]: string;
  }>({});
  const hasInitializedRef = useRef(false);
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

  // Load saved draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("bookBuilderDraft");
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        setFormData(
          draftData.formData || {
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
          },
        );
        setCurrentStep(draftData.currentStep || 1);
        setHasUnsavedChanges(false); // Draft data is already saved
      } catch (error) {
        console.error("Error loading draft:", error);
        localStorage.removeItem("bookBuilderDraft");
      }
    }
    setIsLoadingDraft(false);
    hasInitializedRef.current = true;

    // Initialize first experience if none exist
    setTimeout(() => initializeFirstExperience(), 0);
  }, []);

  // Track changes only after initial load
  useEffect(() => {
    if (hasInitializedRef.current && !isLoadingDraft) {
      setHasUnsavedChanges(true);
    }
  }, [
    formData.parentName,
    formData.parentEmail,
    formData.childName,
    formData.childAge,
    formData.childGender,
    formData.adventureType,
    formData.customAdventureType,
    formData.location,
    formData.favoriteColor,
    formData.petName,
    formData.includeFriends,
    formData.specialDetails,
    formData.experiences?.length,
    currentStep,
    isLoadingDraft,
  ]);

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

  const saveDraft = () => {
    const draftData = {
      formData,
      currentStep,
      savedAt: new Date().toISOString(),
      status: "draft" as const,
    };
    localStorage.setItem("bookBuilderDraft", JSON.stringify(draftData));

    // Also save to drafts list
    const existingDrafts = JSON.parse(
      localStorage.getItem("orderDrafts") || "[]",
    );

    // Use a consistent ID based on child name and creation time
    const baseId =
      `${formData.childName || "unnamed"}_${formData.parentEmail || "no-email"}`
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "_");
    const draftId = `${baseId}_${Date.now()}`;

    const newDraft = {
      id: draftId,
      ...draftData,
      title: `${formData.childName || "Unnamed"}'s Adventure`,
    };

    // Remove any existing draft with similar title and add the new one
    const updatedDrafts = existingDrafts.filter(
      (d: any) =>
        !d.title.startsWith(`${formData.childName || "Unnamed"}'s Adventure`),
    );
    updatedDrafts.push(newDraft);
    localStorage.setItem("orderDrafts", JSON.stringify(updatedDrafts));

    setHasUnsavedChanges(false);
  };

  const handleNavigation = (destination: string) => {
    if (hasUnsavedChanges) {
      setShowSaveDialog(true);
      return;
    }
    navigate(destination);
  };

  const handleSaveAndLeave = () => {
    saveDraft();
    setShowSaveDialog(false);
    navigate("/");
  };

  const handleDiscardAndLeave = () => {
    localStorage.removeItem("bookBuilderDraft");
    setShowSaveDialog(false);
    navigate("/");
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
    const updatedExperiences = [...formData.experiences, newExperience];
    updateFormData("experiences", updatedExperiences);

    // Expand the new experience
    setExpandedExperiences((prev) => new Set(prev).add(newExperience.id));
  };

  // Initialize first experience and expand it by default
  const initializeFirstExperience = () => {
    if (formData.experiences.length === 0) {
      const firstExperience: ExperienceDetail = {
        id: "experience-1",
        title: "",
        description: "",
        predefinedActivities: [],
        customActivities: [],
        activityDetails: [],
        characters: "",
        images: [],
        imageDescription: "",
      };
      updateFormData("experiences", [firstExperience]);
      setExpandedExperiences(new Set(["experience-1"]));
    }
  };

  // Toggle experience expansion
  const toggleExperience = (experienceId: string) => {
    setExpandedExperiences((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(experienceId)) {
        newSet.delete(experienceId);
      } else {
        newSet.add(experienceId);
      }
      return newSet;
    });
  };

  const updateExperience = (
    id: string,
    field: keyof ExperienceDetail,
    value: any,
  ) => {
    if (!formData.experiences) return;
    const updated = formData.experiences.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp,
    );
    updateFormData("experiences", updated);
  };

  const removeExperience = (id: string) => {
    if (!formData.experiences) return;
    const updated = formData.experiences.filter((exp) => exp.id !== id);
    updateFormData("experiences", updated);
  };

  const moveExperience = (id: string, direction: "up" | "down") => {
    if (!formData.experiences || formData.experiences.length === 0) return;
    const experiences = [...formData.experiences];
    const index = experiences.findIndex((exp) => exp.id === id);
    if (
      index !== -1 &&
      ((direction === "up" && index > 0) ||
        (direction === "down" && index < experiences.length - 1))
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

  const handleAddCustomActivity = (experienceId: string) => {
    const inputValue = customActivityInputs[experienceId]?.trim();
    if (inputValue) {
      addCustomActivity(experienceId, inputValue);
      // Clear the input for this experience
      setCustomActivityInputs((prev) => ({
        ...prev,
        [experienceId]: "",
      }));
    }
  };

  const updateCustomActivityInput = (experienceId: string, value: string) => {
    setCustomActivityInputs((prev) => ({
      ...prev,
      [experienceId]: value,
    }));
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
    setHasAttemptedProceed(true);
    if (canProceed() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setHasAttemptedProceed(false); // Reset for next step
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setHasAttemptedProceed(true);
    if (canProceed()) {
      const finalData = {
        ...formData,
        finalAdventureType:
          formData.adventureType || formData.customAdventureType,
      };
      localStorage.setItem("adventureBookData", JSON.stringify(finalData));
      navigate("/preview");
    }
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
        // All experiences must have title and description
        if (formData.experiences.length === 0) return false;

        // Check that all experiences have required fields
        const allExperiencesValid = formData.experiences.every(
          (exp) => exp.title.trim() && exp.description.trim(),
        );

        // Check that all activity details have required fields
        const allActivityDetailsValid = formData.experiences.every((exp) =>
          exp.activityDetails.every(
            (activity) => activity.name.trim() && activity.details.trim(),
          ),
        );

        return allExperiencesValid && allActivityDetailsValid;
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

  // Show loading state while loading draft
  if (isLoadingDraft) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-adventure-yellow/20 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold mb-2">Loading your adventure...</h2>
          <p className="text-foreground/70">
            Please wait while we prepare your book creation form.
          </p>
        </div>
      </div>
    );
  }

  if (isLoadingDraft) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-adventure-yellow/20">
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-adventure-blue mx-auto mb-4"></div>
              <p className="text-foreground/70">Loading your draft...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                  <div className="text-center bg-gradient-to-r from-adventure-blue/10 to-adventure-purple/10 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-medium mb-3">
                      {t("form.personalExperiences")}
                    </h3>
                    <p className="text-base font-medium text-adventure-blue">
                      ✨ The more experiences you add, the more personalized and
                      magical your story becomes! ✨
                    </p>
                    <p className="text-sm text-foreground/60 mt-2">
                      Add details, activities, and characters to create a truly
                      unique adventure
                    </p>
                  </div>

                  {(formData.experiences || []).map((experience, index) => {
                    const isExpanded = expandedExperiences.has(experience.id);
                    const isFirst = index === 0;
                    const isRequired =
                      isFirst || experience.title || experience.description;

                    return (
                      <Card
                        key={experience.id}
                        className={`border-2 ${isFirst ? "border-adventure-blue/50 bg-adventure-blue/5" : "border-dashed border-adventure-blue/30"}`}
                      >
                        <CardHeader
                          className="pb-4 cursor-pointer"
                          onClick={() => toggleExperience(experience.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">
                                Experience {index + 1} (Required)
                              </h4>
                              {experience.title && (
                                <span className="text-sm text-foreground/70">
                                  - {experience.title}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              {/* Move up/down buttons */}
                              {!isFirst && (
                                <>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      moveExperience(experience.id, "up");
                                    }}
                                    disabled={index === 1}
                                  >
                                    <ChevronUp className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      moveExperience(experience.id, "down");
                                    }}
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
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeExperience(experience.id);
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                              <Button type="button" variant="ghost" size="sm">
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        {(isExpanded || isFirst) && (
                          <CardContent className="space-y-6">
                            <div>
                              <Label>
                                {t("form.activityName")}
                                <RequiredStar />
                              </Label>
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
                                className={`mt-1 ${!experience.title && hasAttemptedProceed ? "border-red-300" : ""}`}
                                required
                              />
                              {!experience.title && hasAttemptedProceed && (
                                <p className="text-xs text-red-500 mt-1">
                                  Experience name is required
                                </p>
                              )}
                            </div>

                            <div>
                              <Label>
                                {t("form.activityDetails")}
                                <RequiredStar />
                              </Label>
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
                                className={`mt-1 ${!experience.description && hasAttemptedProceed ? "border-red-300" : ""}`}
                                rows={3}
                                required
                              />
                              {!experience.description &&
                                hasAttemptedProceed && (
                                  <p className="text-xs text-red-500 mt-1">
                                    Experience details are required
                                  </p>
                                )}
                            </div>

                            {/* Characters Involved */}
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
                              <Label>
                                {t("form.uploadImages")} (Experience)
                              </Label>
                              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
                                <input
                                  type="file"
                                  multiple
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleImageUpload(
                                      experience.id,
                                      e.target.files,
                                    )
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
                                <div className="mt-4 space-y-3">
                                  <h5 className="font-medium text-sm">
                                    Experience Images
                                  </h5>
                                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                    {experience.images.map((img, imgIndex) => (
                                      <div key={imgIndex} className="space-y-2">
                                        <div className="aspect-square w-full max-w-[100px]">
                                          <img
                                            src={URL.createObjectURL(img.file)}
                                            alt="Experience upload"
                                            className="w-full h-full object-cover rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                                          />
                                        </div>
                                        <div>
                                          <Label className="text-xs">
                                            Description
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
                                            placeholder="Describe image..."
                                            className="mt-1 text-xs"
                                            rows={2}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
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
                                      className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
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
                                <div className="flex items-center space-x-2">
                                  <Input
                                    placeholder="Add custom activity..."
                                    value={
                                      customActivityInputs[experience.id] || ""
                                    }
                                    onChange={(e) =>
                                      updateCustomActivityInput(
                                        experience.id,
                                        e.target.value,
                                      )
                                    }
                                    onKeyPress={(e) => {
                                      if (e.key === "Enter") {
                                        handleAddCustomActivity(experience.id);
                                      }
                                    }}
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleAddCustomActivity(experience.id)
                                    }
                                    disabled={
                                      !customActivityInputs[
                                        experience.id
                                      ]?.trim()
                                    }
                                    className="px-3"
                                  >
                                    Add
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/* Activity Details */}
                            {experience.activityDetails &&
                              experience.activityDetails.length > 0 && (
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
                                          <div className="flex items-center justify-between">
                                            <h6 className="font-medium text-sm">
                                              {activityDetail.name}
                                            </h6>
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              onClick={() =>
                                                removeActivityDetail(
                                                  experience.id,
                                                  activityDetail.name,
                                                )
                                              }
                                              className="text-red-500 hover:text-red-700"
                                            >
                                              <X className="w-3 h-3" />
                                            </Button>
                                          </div>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                          <div>
                                            <Label className="text-sm">
                                              Activity Details
                                              <RequiredStar />
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
                                              className={`mt-1 ${!activityDetail.details && hasAttemptedProceed ? "border-red-300" : ""}`}
                                              rows={2}
                                              required
                                            />
                                            {!activityDetail.details &&
                                              hasAttemptedProceed && (
                                                <p className="text-xs text-red-500 mt-1">
                                                  Activity details are required
                                                </p>
                                              )}
                                            {!activityDetail.details &&
                                              !hasAttemptedProceed && (
                                                <p className="text-xs text-blue-500 mt-1">
                                                  💡 Describe this activity to
                                                  make it more engaging!
                                                </p>
                                              )}
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
                                                <Upload className="w-4 h-4 text-gray-400" />
                                                <span className="text-xs text-gray-500">
                                                  Upload images for{" "}
                                                  {activityDetail.name}
                                                </span>
                                              </Label>
                                            </div>

                                            {/* Activity Image Descriptions */}
                                            {activityDetail.images.length >
                                              0 && (
                                              <div className="mt-3 space-y-2">
                                                <h6 className="text-sm font-medium">
                                                  Activity Images
                                                </h6>
                                                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                                                  {activityDetail.images.map(
                                                    (img, imgIndex) => (
                                                      <div
                                                        key={imgIndex}
                                                        className="space-y-1"
                                                      >
                                                        <div className="aspect-square w-full max-w-[80px]">
                                                          <img
                                                            src={URL.createObjectURL(
                                                              img.file,
                                                            )}
                                                            alt="Activity upload"
                                                            className="w-full h-full object-cover rounded border-2 border-gray-200 shadow-sm"
                                                          />
                                                        </div>
                                                        <div>
                                                          <Label className="text-xs">
                                                            Description
                                                          </Label>
                                                          <Textarea
                                                            value={
                                                              img.description
                                                            }
                                                            onChange={(e) =>
                                                              updateImageDescription(
                                                                experience.id,
                                                                imgIndex,
                                                                e.target.value,
                                                                activityDetail.id,
                                                              )
                                                            }
                                                            placeholder="Describe image..."
                                                            className="mt-1 text-xs"
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
                        )}
                      </Card>
                    );
                  })}

                  {/* Add Experience Button - On the right */}
                  <div className="flex justify-end mt-6">
                    <div className="text-center">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addExperience}
                        className="flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Another Experience</span>
                      </Button>
                      <p className="text-xs text-foreground/60 mt-2">
                        ✨ Add more experiences to create a richer, more
                        personalized adventure! ✨
                      </p>
                    </div>
                  </div>

                  {(!formData.experiences ||
                    formData.experiences.length === 0) && (
                    <div className="text-center py-8 text-foreground/70">
                      <p>
                        ���� Your first adventure experience is ready to be
                        created! 🌟
                      </p>
                      <p className="text-sm mt-2">
                        The system will automatically create your first
                        experience section below.
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

        {/* Save/Discard Dialog */}
        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Save Your Progress?</DialogTitle>
              <DialogDescription>
                You have unsaved changes. Would you like to save your progress
                before leaving?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Button
                variant="outline"
                onClick={handleDiscardAndLeave}
                className="w-full sm:w-auto"
              >
                Discard Changes
              </Button>
              <Button onClick={handleSaveAndLeave} className="w-full sm:w-auto">
                Save Draft
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BookBuilder;
