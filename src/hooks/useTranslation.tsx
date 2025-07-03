import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "fr" | "it" | "es" | "ar" | "nl" | "de";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    "nav.adventurePossibilities": "Adventure Possibilities",
    "nav.howItWorks": "How It Works",
    "nav.examples": "Examples",
    "nav.pricing": "Pricing",

    // Homepage
    "hero.subtitle": "Personalized Adventure Books for Kids",
    "hero.title": "Create Magical",
    "hero.titleHighlight": "Adventures",
    "hero.subtitle2": "Starring Your Child",
    "hero.description":
      "Transform your child into the hero of their own personalized adventure book. Choose from enchanted forests, space missions, underwater expeditions, and more!",
    "hero.startCreating": "Start Creating",
    "hero.seeExamples": "See Examples",

    // Features
    "features.personalizedCharacters": "Personalized Characters",
    "features.personalizedCharactersDesc":
      "Include your child, friends, and family members in the story",
    "features.instantPreview": "Instant Preview",
    "features.instantPreviewDesc":
      "See your book come to life with immediate preview pages",
    "features.printOrDigital": "Print or Digital",
    "features.printOrDigitalDesc":
      "Get a physical book delivered or download instantly",

    // Adventure Types
    "adventure.possibilities": "Adventure Possibilities",
    "adventure.possibilitiesDesc":
      "Explore the magical worlds we can create for your child - and many more!",
    "adventure.spaceMission": "Space Mission",
    "adventure.spaceMissionDesc":
      "Blast off to distant planets and meet alien friends",
    "adventure.enchantedForest": "Enchanted Forest",
    "adventure.enchantedForestDesc":
      "Discover magical creatures and hidden treasures",
    "adventure.royalCastle": "Royal Castle",
    "adventure.royalCastleDesc": "Become a brave knight or wise princess",
    "adventure.pirateVoyage": "Pirate Voyage",
    "adventure.pirateVoyageDesc": "Sail the seven seas in search of treasure",
    "adventure.superheroAcademy": "Superhero Academy",
    "adventure.superheroAcademyDesc":
      "Train to become the world's next great hero",
    "adventure.underwaterWorld": "Underwater World",
    "adventure.underwaterWorldDesc": "Dive deep to explore coral kingdoms",

    // Examples Section
    "examples.title": "Book Examples",
    "examples.description":
      "See how other children's adventures came to life in their personalized books",
    "examples.adventure": "Adventure",
    "examples.preview": "Story Preview",
    "examples.createYours": "Create Your Adventure",
    "examples.example1.title": "Magical Forest Quest",
    "examples.example1.adventure":
      "Enchanted Forest with talking animals and hidden fairy villages",
    "examples.example1.preview":
      "Emma stepped through the golden archway and gasped as butterflies with rainbow wings danced around her...",
    "examples.example2.title": "Space Explorer Mission",
    "examples.example2.adventure":
      "Journey to Mars with robotic companions and alien discoveries",
    "examples.example2.preview":
      "Captain Lucas adjusted his space helmet and looked out at the red planet below...",
    "examples.example3.title": "Princess Academy",
    "examples.example3.adventure":
      "Royal castle with dragon friends and magical spells to learn",
    "examples.example3.preview":
      "Princess Sofia waved her sparkly wand and watched as the flowers began to glow...",
    "examples.example4.title": "Pirate Treasure Hunt",
    "examples.example4.adventure":
      "Sailing the seven seas with a crew of friendly pirates",
    "examples.example4.preview":
      "First Mate Alex spotted something glimmering beneath the crystal-clear water...",
    "examples.example5.title": "Wizard's Apprentice",
    "examples.example5.adventure":
      "Learning magic spells in a tower filled with mysterious creatures",
    "examples.example5.preview":
      "Maya carefully mixed the shimmering potion as her owl companion watched...",
    "examples.example6.title": "Ocean Adventure",
    "examples.example6.adventure":
      "Underwater kingdom with dolphin friends and coral castles",
    "examples.example6.preview":
      "Diego swam alongside the friendly dolphins toward the glowing underwater city...",

    // How It Works
    "howItWorks.title": "How It Works",
    "howItWorks.description":
      "Create your personalized adventure book in just a few simple steps",
    "howItWorks.step1.title": "Fill Details",
    "howItWorks.step1.description":
      "Enter your child's name, age, and adventure preferences",
    "howItWorks.step2.title": "Customize Story",
    "howItWorks.step2.description":
      "Choose setting, characters, and special details",
    "howItWorks.step3.title": "Preview Pages",
    "howItWorks.step3.description":
      "See your personalized book come to life instantly",
    "howItWorks.step4.title": "Get Your Book",
    "howItWorks.step4.description":
      "Download digital copy or order a printed version",

    // Form Steps
    "form.step1": "Parent Information",
    "form.step2": "Child Information",
    "form.step3": "Adventure Selection",
    "form.step4": "Personal Touches",
    "form.step5": "Activity Details",

    // Form Fields
    "form.parentName": "Your Name",
    "form.email": "Gmail Address",
    "form.emailInvalid": "Please enter a valid Gmail address",
    "form.childName": "Child's Name",
    "form.age": "Age",
    "form.gender": "Gender",
    "form.boy": "Boy",
    "form.girl": "Girl",
    "form.other": "Other",
    "form.adventureType": "Choose Adventure Type",
    "form.customAdventure": "Can't find your adventure type? Enter it here:",
    "form.customAdventurePlaceholder": "Describe your custom adventure...",
    "form.location": "Setting or Location",
    "form.keyActivities": "Key Activities",
    "form.selectActivities": "Select activities that interest your child:",
    "form.customActivities": "Other activities (one per line):",
    "form.favoriteColor": "Child's Favorite Color",
    "form.petName": "Pet's Name (if any)",
    "form.includeFriends": "Friends or Family to Include",
    "form.characters": "Favorite Characters or Themes",
    "form.specialDetails": "Special Details or Inside Jokes",
    "form.personalExperiences": "Personal Experiences to Include",
    "form.addExperience": "Add Another Experience",
    "form.activityName": "Activity Name",
    "form.activityDetails": "Activity Details",
    "form.activityCharacters": "Characters Involved",
    "form.activityImageDesc": "Image Description",
    "form.uploadImages": "Upload Images",
    "form.addActivity": "Add Another Activity",
    "form.previous": "Previous",
    "form.next": "Next",
    "form.reviewBook": "Review My Book",
    "form.required": "Required",
    "form.complete": "Complete",

    // Pricing
    "pricing.title": "Book Options",
    "pricing.description":
      "Create lasting memories with a personalized book that your child will treasure forever. Choose the perfect option for your family's budget and preferences.",
    "pricing.digitalBook": "Digital Book",
    "pricing.digitalBookDesc": "Instant download PDF",
    "pricing.printedBook": "Printed Book",
    "pricing.printedBookDesc": "Professional hardcover",
    "pricing.feature1": "20+ page personalized story",
    "pricing.feature2": "High-quality illustrations",
    "pricing.feature3": "Instant download",
    "pricing.feature4": "Print at home option",
    "pricing.feature5": "Everything in Digital",
    "pricing.feature6": "Premium hardcover binding",
    "pricing.feature7": "Professional printing",
    "pricing.feature8": "Free delivery in Europe",
    "pricing.popular": "Popular",

    // Order
    "order.chooseFormat": "Choose Your Book Format",
    "order.digitalOption": "Digital Book - $12.99",
    "order.printedOption": "Printed Book - $24.99",
    "order.shippingAddress": "Shipping Address",
    "order.fullName": "Full Name",
    "order.streetAddress": "Street Address",
    "order.city": "City",
    "order.postalCode": "Postal Code",
    "order.country": "Country",
    "order.selectCountry": "Select a country...",
    "order.phone": "Phone Number",
    "order.countryCode": "Country Code",
    "order.phoneInvalid": "Please enter a valid phone number",
    "order.paymentDetails": "Payment Details",
    "order.cardNumber": "Card Number",
    "order.cardNumberInvalid": "Please enter a valid card number",
    "order.expiryDate": "Expiry Date",
    "order.expiryInvalid": "Please enter a valid expiry date (MM/YY)",
    "order.cvv": "CVV",
    "order.cvvInvalid": "Please enter a valid CVV",
    "order.cardholderName": "Cardholder Name",
    "order.completePayment": "Complete Payment",
    "order.cancel": "Cancel",
    "order.confirmed": "Order Confirmed!",
    "order.confirmationDetails": "Confirmation Details",
    "order.shippingDetails": "Shipping Details",
    "order.deliveryInfo": "Your book will be delivered via email when ready",
    "order.createAnother": "Create Another Book",
    "order.goHome": "Go to Homepage",
    "order.backToForm": "Back to Form",

    // Countries
    "countries.us": "United States",
    "countries.ca": "Canada",
    "countries.gb": "United Kingdom",
    "countries.fr": "France",
    "countries.de": "Germany",
    "countries.it": "Italy",
    "countries.es": "Spain",
    "countries.nl": "Netherlands",
    "countries.be": "Belgium",
    "countries.at": "Austria",
    "countries.ch": "Switzerland",
    "countries.au": "Australia",
    "countries.nz": "New Zealand",
    "countries.jp": "Japan",
    "countries.kr": "South Korea",
    "countries.cn": "China",
    "countries.in": "India",
    "countries.br": "Brazil",
    "countries.mx": "Mexico",
    "countries.ar": "Argentina",

    // CTA Section
    "cta.title": "Ready to Create Magic?",
    "cta.description":
      "Give your child the gift of being the hero in their own personalized adventure story. Start creating their magical book today!",
    "cta.startAdventure": "Start Your Adventure",

    // Footer
    "footer.tagline":
      "Creating magical personalized adventure books for children worldwide.",
    "footer.product": "Product",
    "footer.howItWorks": "How It Works",
    "footer.examples": "Examples",
    "footer.pricing": "Pricing",
    "footer.support": "Support",
    "footer.helpCenter": "Help Center",
    "footer.contactUs": "Contact Us",
    "footer.faq": "FAQ",
    "footer.company": "Company",
    "footer.about": "About",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.copyright":
      "© 2024 Personalized Adventure Book. All rights reserved.",
  },
  fr: {
    // Navigation
    "nav.adventurePossibilities": "Possibilités d'Aventure",
    "nav.howItWorks": "Comment Ça Marche",
    "nav.examples": "Exemples",
    "nav.pricing": "Tarifs",

    // Homepage
    "hero.subtitle": "Livres d'Aventure Personnalisés pour Enfants",
    "hero.title": "Créez des",
    "hero.titleHighlight": "Aventures",
    "hero.subtitle2": "Magiques avec Votre Enfant",
    "hero.description":
      "Transformez votre enfant en héros de son propre livre d'aventure personnalisé. Choisissez parmi des forêts enchantées, des missions spatiales, des expéditions sous-marines, et plus encore!",
    "hero.startCreating": "Commencer à Créer",
    "hero.seeExamples": "Voir les Exemples",

    // Features
    "features.personalizedCharacters": "Personnages Personnalisés",
    "features.personalizedCharactersDesc":
      "Incluez votre enfant, ses amis et sa famille dans l'histoire",
    "features.instantPreview": "Aperçu Instantané",
    "features.instantPreviewDesc":
      "Voyez votre livre prendre vie avec des pages d'aperçu immédiates",
    "features.printOrDigital": "Imprimé ou Numérique",
    "features.printOrDigitalDesc":
      "Recevez un livre physique livré ou téléchargez instantanément",

    // Examples
    "examples.title": "Exemples de Livres",
    "examples.description":
      "Voyez comment les aventures d'autres enfants ont pris vie dans leurs livres personnalisés",

    // How It Works
    "howItWorks.title": "Comment Ça Marche",
    "howItWorks.description":
      "Créez votre livre d'aventure personnalisé en quelques étapes simples",

    // Pricing
    "pricing.title": "Options de Livre",
    "pricing.description":
      "Créez des souvenirs durables avec un livre personnalisé que votre enfant chérira pour toujours.",

    // CTA Section
    "cta.title": "Prêt à Créer de la Magie?",
    "cta.description":
      "Offrez à votre enfant le cadeau d'être le héros de sa propre histoire d'aventure personnalisée.",

    // Footer
    "footer.copyright":
      "© 2024 Livre d'Aventure Personnalisé. Tous droits réservés.",
  },
};

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined,
);

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    try {
      // Get the current language translations
      const langTranslations = translations[language] || translations.en;

      // Check if the key exists directly
      if (langTranslations[key as keyof typeof langTranslations]) {
        return langTranslations[key as keyof typeof langTranslations] as string;
      }

      // Split the key by dots for nested access
      const keys = key.split(".");
      let value: any = langTranslations;

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          // Fallback to English
          value = translations.en;
          for (const fallbackKey of keys) {
            if (value && typeof value === "object" && fallbackKey in value) {
              value = value[fallbackKey];
            } else {
              console.warn(`Translation key not found: ${key}`);
              return key; // Return key if no translation found
            }
          }
          break;
        }
      }

      return typeof value === "string" ? value : key;
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error);
      return key;
    }
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
