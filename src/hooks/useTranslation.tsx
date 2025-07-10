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
    "nav.myOrders": "My Orders",

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
    "form.email": "Email Address",
    "form.emailInvalid": "Please enter a valid email address",
    "form.childName": "Child's Name",
    "form.age": "Age",
    "form.selectAge": "Select Age",
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
    "form.stop": "Stop",
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

    // Theme and UI
    "ui.light": "Light",
    "ui.dark": "Dark",
    "ui.english": "English",
    "ui.french": "Français",
    "ui.italian": "Italiano",
    "ui.spanish": "Español",
    "ui.arabic": "العربية",
    "ui.dutch": "Nederlands",
    "ui.german": "Deutsch",

    // Placeholder texts
    "placeholder.email": "your.name@example.com",
    "placeholder.location":
      "Magical Kingdom, Space Station, Underwater City...",
    "placeholder.favoriteColor": "Blue, Pink, Rainbow...",
    "placeholder.petName": "Fluffy, Rex, Whiskers...",
    "placeholder.includeFriends": "Mom, Dad, Sister Emma, Best friend Jake...",
    "placeholder.specialDetails":
      "Special interests, hobbies, funny moments...",
    "placeholder.experienceTitle":
      "Swimming with dolphins, Finding treasure...",
    "placeholder.experienceDescription":
      "Describe what happens in this part of the adventure...",
    "placeholder.characters": "Who's involved in this experience?",
    "placeholder.imageDescription": "Describe image...",
    "placeholder.customActivity": "Add custom activity...",
    "placeholder.activityDescription":
      "Describe what happens during this activity...",
    "placeholder.activityCharacters": "Who's involved in this activity?",

    // Loading and messages
    "loading.adventure": "Loading your adventure...",
    "loading.preparation":
      "Please wait while we prepare your book creation form.",

    // Validation messages
    "validation.experienceNameRequired": "Experience name is required",
    "validation.experienceDetailsRequired": "Experience details are required",
    "validation.activityDetailsRequired": "Activity details are required",
    "validation.activityEncouragement":
      "💡 Describe this activity to make it more engaging!",

    // UI Labels
    "ui.experienceImages": "Experience Images",
    "ui.activityDetails": "Activity Details",
    "ui.activityImages": "Activity Images",
    "ui.charactersInvolved": "Characters Involved",
    "ui.description": "Description",
    "ui.add": "Add",
    "ui.addAnotherExperience": "Add Another Experience",

    // Upload messages
    "upload.clickToUploadExperience":
      "Click to upload images for this experience",
    "upload.uploadImagesFor": "Upload images for",

    // Empty states
    "empty.firstAdventure":
      "🌟 Your first adventure experience is ready to be created! 🌟",
    "empty.autoCreate":
      "The system will automatically create your first experience section below.",

    // Dialog
    "dialog.saveProgress": "Save Your Progress?",
    "dialog.unsavedChanges":
      "You have unsaved changes. Would you like to save your current progress?",
    "dialog.discardChanges": "Don't Save",
    "dialog.saveDraft": "Save & Continue",

    // Draft Detection Dialog
    "draftDetection.title": "Continue Your Adventure?",
    "draftDetection.description":
      "We found a saved draft of your adventure book. Would you like to continue where you left off, start a new book, or go back to the homepage?",
    "draftDetection.continue": "Continue Draft",
    "draftDetection.startNew": "Start New Book",
    "draftDetection.goHome": "Go Home",

    // Stop Dialog
    "stopDialog.title": "Stop Creating Your Book?",
    "stopDialog.description":
      "What would you like to do with your progress? You can save it as a draft to continue later, or delete it completely.",
    "stopDialog.save": "Save as Draft",
    "stopDialog.delete": "Delete Progress",

    // Additional UI elements
    "ui.experience": "Experience",
    "ui.required": "Required",
    "ui.activityName": "Activity Name",
    "ui.activityEncouragement":
      "💡 The more experiences you add, the more personalized and magical your story becomes! ✨",
    "ui.addDetails":
      "Add details, activities, and characters to create a truly unique adventure",

    // Activity names
    "activity.treasureHunting": "Treasure hunting",
    "activity.dragonEncounters": "Dragon encounters",
    "activity.deepSeaDiving": "Deep-sea diving",
    "activity.rocketLaunches": "Rocket launches",
    "activity.magicSpellCasting": "Magic spell casting",
    "activity.solvingMysteries": "Solving mysteries",
    "activity.meetingNewFriends": "Meeting new friends",
    "activity.savingTheDay": "Saving the day",
    "activity.exploringNewWorlds": "Exploring new worlds",
    "activity.learningNewSkills": "Learning new skills",
    "activity.findingHiddenSecrets": "Finding hidden secrets",
    "activity.goingOnQuests": "Going on quests",

    // Preview page
    "preview.storyPreview": "Story Preview",
    "preview.bookStatistics": "Your Book Statistics",
    "preview.totalChapters": "Total Chapters:",
    "preview.adventureActivities": "Adventure Activities:",
    "preview.estimatedPages": "Estimated Pages:",
    "preview.readingLevel": "Reading Level:",
    "preview.bookDetails": "Book Details",
    "preview.chooseFormat": "Choose Your Format",
    "preview.digitalBook": "Digital Book",
    "preview.printedBook": "Printed Book",
  },
  fr: {
    // Navigation
    "nav.adventurePossibilities": "Possibilités d'Aventure",
    "nav.howItWorks": "Comment ��a Marche",
    "nav.examples": "Exemples",
    "nav.pricing": "Tarifs",
    "nav.myOrders": "Mes Commandes",

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
    "features.instantPreview": "Aperçu Instantan��",
    "features.instantPreviewDesc":
      "Voyez votre livre prendre vie avec des pages d'aperçu immédiates",
    "features.printOrDigital": "Imprimé ou Numérique",
    "features.printOrDigitalDesc":
      "Recevez un livre physique livré ou téléchargez instantanément",

    // Adventure Types
    "adventure.possibilities": "Possibilités d'Aventure",
    "adventure.possibilitiesDesc":
      "Explorez les mondes magiques que nous pouvons créer pour votre enfant - et bien plus encore!",
    "adventure.spaceMission": "Mission Spatiale",
    "adventure.spaceMissionDesc":
      "Décollage vers des planètes lointaines et rencontre d'amis extraterrestres",
    "adventure.enchantedForest": "Forêt Enchantée",
    "adventure.enchantedForestDesc":
      "Découvrez des créatures magiques et des trésors cachés",
    "adventure.royalCastle": "Château Royal",
    "adventure.royalCastleDesc":
      "Devenez un chevalier brave ou une princesse sage",
    "adventure.pirateVoyage": "Voyage de Pirate",
    "adventure.pirateVoyageDesc":
      "Naviguez sur les sept mers à la recherche de trésors",
    "adventure.superheroAcademy": "Académie de Super-Héros",
    "adventure.superheroAcademyDesc":
      "Entraînez-vous pour devenir le prochain grand héros du monde",
    "adventure.underwaterWorld": "Monde Sous-Marin",
    "adventure.underwaterWorldDesc":
      "Plongez profondément pour explorer les royaumes coralliens",

    // Examples
    "examples.title": "Exemples de Livres",
    "examples.description":
      "Voyez comment les aventures d'autres enfants ont pris vie dans leurs livres personnalisés",
    "examples.adventure": "Aventure",
    "examples.preview": "Aperçu de l'Histoire",
    "examples.createYours": "Créez Votre Aventure",
    "examples.example1.title": "Quête de la Forêt Magique",
    "examples.example1.adventure":
      "Forêt enchantée avec des animaux parlants et des villages de fées cachés",
    "examples.example1.preview":
      "Emma franchit l'arche dorée et haleta alors que des papillons aux ailes arc-en-ciel dansaient autour d'elle...",
    "examples.example2.title": "Mission d'Explorateur Spatial",
    "examples.example2.adventure":
      "Voyage vers Mars avec des compagnons robotiques et des découvertes extraterrestres",
    "examples.example2.preview":
      "Le Capitaine Lucas ajusta son casque spatial et regarda la planète rouge en contrebas...",
    "examples.example3.title": "Académie de Princesse",
    "examples.example3.adventure":
      "Château royal avec des amis dragons et des sorts magiques à apprendre",
    "examples.example3.preview":
      "La Princesse Sofia agita sa baguette scintillante et regarda les fleurs commencer à briller...",
    "examples.example4.title": "Chasse au Trésor de Pirate",
    "examples.example4.adventure":
      "Navigation sur les sept mers avec un équipage de pirates amicaux",
    "examples.example4.preview":
      "Le Premier Maître Alex aperçut quelque chose qui scintillait sous l'eau cristalline...",
    "examples.example5.title": "Apprentie Sorcière",
    "examples.example5.adventure":
      "Apprendre des sorts magiques dans une tour remplie de créatures mystérieuses",
    "examples.example5.preview":
      "Maya mélangea soigneusement la potion chatoyante tandis que son compagnon hibou regardait...",
    "examples.example6.title": "Aventure Océanique",
    "examples.example6.adventure":
      "Royaume sous-marin avec des amis dauphins et des châteaux de corail",
    "examples.example6.preview":
      "Diego nagea aux côtés des dauphins amicaux vers la cité sous-marine brillante...",

    // How It Works
    "howItWorks.title": "Comment Ça Marche",
    "howItWorks.description":
      "Créez votre livre d'aventure personnalisé en quelques étapes simples",
    "howItWorks.step1.title": "Remplir les Détails",
    "howItWorks.step1.description":
      "Entrez le nom, l'âge et les préférences d'aventure de votre enfant",
    "howItWorks.step2.title": "Personnaliser l'Histoire",
    "howItWorks.step2.description":
      "Choisissez le cadre, les personnages et les détails spéciaux",
    "howItWorks.step3.title": "Aperçu des Pages",
    "howItWorks.step3.description":
      "Voyez votre livre personnalisé prendre vie instantanément",
    "howItWorks.step4.title": "Obtenez Votre Livre",
    "howItWorks.step4.description":
      "Téléchargez une copie numérique ou commandez une version imprimée",

    // Form Steps
    "form.step1": "Informations Parent",
    "form.step2": "Informations Enfant",
    "form.step3": "Sélection d'Aventure",
    "form.step4": "Touches Personnelles",
    "form.step5": "Détails d'Activité",

    // Form Fields
    "form.parentName": "Votre Nom",
    "form.email": "Adresse Email",
    "form.emailInvalid": "Veuillez entrer une adresse email valide",
    "form.childName": "Nom de l'Enfant",
    "form.age": "Âge",
    "form.selectAge": "Sélectionner l'Âge",
    "form.gender": "Genre",
    "form.boy": "Garçon",
    "form.girl": "Fille",
    "form.other": "Autre",
    "form.adventureType": "Choisir le Type d'Aventure",
    "form.customAdventure":
      "Vous ne trouvez pas votre type d'aventure? Entrez-le ici:",
    "form.customAdventurePlaceholder":
      "Décrivez votre aventure personnalisée...",
    "form.location": "Cadre ou Lieu",
    "form.keyActivities": "Activités Clés",
    "form.selectActivities":
      "Sélectionnez les activités qui intéressent votre enfant:",
    "form.customActivities": "Autres activités (une par ligne):",
    "form.favoriteColor": "Couleur Préférée de l'Enfant",
    "form.petName": "Nom de l'Animal (si applicable)",
    "form.includeFriends": "Amis ou Famille à Inclure",
    "form.characters": "Personnages ou Thèmes Préférés",
    "form.specialDetails": "Détails Spéciaux ou Blagues Privées",
    "form.personalExperiences": "Expériences Personnelles à Inclure",
    "form.addExperience": "Ajouter une Autre Expérience",
    "form.activityName": "Nom de l'Activité",
    "form.activityDetails": "Détails de l'Activité",
    "form.activityCharacters": "Personnages Impliqués",
    "form.activityImageDesc": "Description de l'Image",
    "form.uploadImages": "Télécharger des Images",
    "form.addActivity": "Ajouter une Autre Activité",
    "form.previous": "Précédent",
    "form.next": "Suivant",
    "form.reviewBook": "Réviser Mon Livre",
    "form.required": "Obligatoire",
    "form.complete": "Terminé",

    // Pricing
    "pricing.title": "Options de Livre",
    "pricing.description":
      "Créez des souvenirs durables avec un livre personnalisé que votre enfant chérira pour toujours. Choisissez l'option parfaite pour le budget et les préférences de votre famille.",
    "pricing.digitalBook": "Livre Numérique",
    "pricing.digitalBookDesc": "Téléchargement PDF instantané",
    "pricing.printedBook": "Livre Imprimé",
    "pricing.printedBookDesc": "Couverture rigide professionnelle",
    "pricing.feature1": "Histoire personnalisée de 20+ pages",
    "pricing.feature2": "Illustrations de haute qualité",
    "pricing.feature3": "Téléchargement instantané",
    "pricing.feature4": "Option d'impression à domicile",
    "pricing.feature5": "Tout dans Numérique",
    "pricing.feature6": "Reliure rigide premium",
    "pricing.feature7": "Impression professionnelle",
    "pricing.feature8": "Livraison gratuite en Europe",
    "pricing.popular": "Populaire",

    // Order
    "order.chooseFormat": "Choisissez le Format de Votre Livre",
    "order.digitalOption": "Livre Numérique - 12,99€",
    "order.printedOption": "Livre Imprimé - 24,99€",
    "order.shippingAddress": "Adresse de Livraison",
    "order.fullName": "Nom Complet",
    "order.streetAddress": "Adresse de la Rue",
    "order.city": "Ville",
    "order.postalCode": "Code Postal",
    "order.country": "Pays",
    "order.selectCountry": "Sélectionnez un pays...",
    "order.phone": "Numéro de Téléphone",
    "order.countryCode": "Indicatif Pays",
    "order.phoneInvalid": "Veuillez entrer un numéro de téléphone valide",
    "order.paymentDetails": "Détails de Paiement",
    "order.cardNumber": "Numéro de Carte",
    "order.cardNumberInvalid": "Veuillez entrer un numéro de carte valide",
    "order.expiryDate": "Date d'Expiration",
    "order.expiryInvalid":
      "Veuillez entrer une date d'expiration valide (MM/AA)",
    "order.cvv": "CVV",
    "order.cvvInvalid": "Veuillez entrer un CVV valide",
    "order.cardholderName": "Nom du Titulaire de la Carte",
    "order.completePayment": "Finaliser le Paiement",
    "order.cancel": "Annuler",
    "order.confirmed": "Commande Confirmée!",
    "order.confirmationDetails": "Détails de Confirmation",
    "order.shippingDetails": "Détails de Livraison",
    "order.deliveryInfo": "Votre livre sera livré par email quand il sera prêt",
    "order.createAnother": "Créer un Autre Livre",
    "order.goHome": "Aller à l'Accueil",
    "order.backToForm": "Retour au Formulaire",

    // CTA Section
    "cta.title": "Prêt à Créer de la Magie?",
    "cta.description":
      "Offrez à votre enfant le cadeau d'être le héros de sa propre histoire d'aventure personnalisée. Commencez à créer son livre magique aujourd'hui!",
    "cta.startAdventure": "Commencez Votre Aventure",

    // Footer
    "footer.tagline":
      "Création de livres d'aventure personnalisés magiques pour enfants du monde entier.",
    "footer.product": "Produit",
    "footer.howItWorks": "Comment Ça Marche",
    "footer.examples": "Exemples",
    "footer.pricing": "Tarifs",
    "footer.support": "Support",
    "footer.helpCenter": "Centre d'Aide",
    "footer.contactUs": "Nous Contacter",
    "footer.faq": "FAQ",
    "footer.company": "Entreprise",
    "footer.about": "À Propos",
    "footer.privacy": "Confidentialité",
    "footer.terms": "Conditions",
    "footer.copyright":
      "© 2024 Livre d'Aventure Personnalisé. Tous droits réservés.",

    // Theme and UI
    "ui.light": "Clair",
    "ui.dark": "Sombre",
    "ui.english": "English",
    "ui.french": "Français",
    "ui.italian": "Italiano",
    "ui.spanish": "Español",
    "ui.arabic": "العربية",
    "ui.dutch": "Nederlands",
    "ui.german": "Deutsch",

    // Placeholder texts
    "placeholder.email": "votre.nom@exemple.com",
    "placeholder.location":
      "Royaume Magique, Station Spatiale, Cité Sous-marine...",
    "placeholder.favoriteColor": "Bleu, Rose, Arc-en-ciel...",
    "placeholder.petName": "Fluffy, Rex, Moustaches...",
    "placeholder.includeFriends":
      "Maman, Papa, Sœur Emma, Meilleur ami Jake...",
    "placeholder.specialDetails":
      "Intérêts spéciaux, hobbies, moments drôles...",
    "placeholder.experienceTitle":
      "Nager avec les dauphins, Chercher un trésor...",
    "placeholder.experienceDescription":
      "Décrivez ce qui se passe dans cette partie de l'aventure...",
    "placeholder.characters": "Qui est impliqué dans cette expérience?",
    "placeholder.imageDescription": "Décrire l'image...",
    "placeholder.customActivity": "Ajouter une activité personnalisée...",
    "placeholder.activityDescription":
      "Décrivez ce qui se passe pendant cette activité...",
    "placeholder.activityCharacters": "Qui est impliqué dans cette activité?",
  },
  it: {
    // Navigation
    "nav.adventurePossibilities": "Possibilità di Avventura",
    "nav.howItWorks": "Come Funziona",
    "nav.examples": "Esempi",
    "nav.pricing": "Prezzi",

    // Homepage
    "hero.subtitle": "Libri di Avventura Personalizzati per Bambini",
    "hero.title": "Crea",
    "hero.titleHighlight": "Avventure",
    "hero.subtitle2": "Magiche con Tuo Figlio",
    "hero.description":
      "Trasforma tuo figlio nell'eroe del suo libro di avventura personalizzato. Scegli tra foreste incantate, missioni spaziali, spedizioni sottomarine e molto altro!",
    "hero.startCreating": "Inizia a Creare",
    "hero.seeExamples": "Vedi Esempi",

    // Features
    "features.personalizedCharacters": "Personaggi Personalizzati",
    "features.personalizedCharactersDesc":
      "Includi tuo figlio, amici e familiari nella storia",
    "features.instantPreview": "Anteprima Istantanea",
    "features.instantPreviewDesc":
      "Guarda il tuo libro prendere vita con pagine di anteprima immediate",
    "features.printOrDigital": "Stampato o Digitale",
    "features.printOrDigitalDesc":
      "Ricevi un libro fisico consegnato o scarica istantaneamente",

    // Adventure Types
    "adventure.possibilities": "Possibilità di Avventura",
    "adventure.possibilitiesDesc":
      "Esplora i mondi magici che possiamo creare per tuo figlio - e molto altro ancora!",
    "adventure.spaceMission": "Missione Spaziale",
    "adventure.spaceMissionDesc":
      "Decolla verso pianeti lontani e incontra amici alieni",
    "adventure.enchantedForest": "Foresta Incantata",
    "adventure.enchantedForestDesc":
      "Scopri creature magiche e tesori nascosti",
    "adventure.royalCastle": "Castello Reale",
    "adventure.royalCastleDesc":
      "Diventa un cavaliere coraggioso o una principessa saggia",
    "adventure.pirateVoyage": "Viaggio Pirata",
    "adventure.pirateVoyageDesc": "Naviga i sette mari alla ricerca di tesori",
    "adventure.superheroAcademy": "Accademia dei Supereroi",
    "adventure.superheroAcademyDesc":
      "Allenati per diventare il prossimo grande eroe del mondo",
    "adventure.underwaterWorld": "Mondo Sottomarino",
    "adventure.underwaterWorldDesc":
      "Immergiti in profondità per esplorare i regni corallini",

    // Examples
    "examples.title": "Esempi di Libri",
    "examples.description":
      "Vedi come le avventure di altri bambini hanno preso vita nei loro libri personalizzati",
    "examples.adventure": "Avventura",
    "examples.preview": "Anteprima della Storia",
    "examples.createYours": "Crea la Tua Avventura",
    "examples.example1.title": "Ricerca della Foresta Magica",
    "examples.example1.adventure":
      "Foresta incantata con animali parlanti e villaggi di fate nascosti",
    "examples.example1.preview":
      "Emma attraversò l'arco dorato e sussultò mentre farfalle dalle ali arcobaleno danzavano intorno a lei...",
    "examples.example2.title": "Missione Esploratore Spaziale",
    "examples.example2.adventure":
      "Viaggio su Marte con compagni robotici e scoperte aliene",
    "examples.example2.preview":
      "Il Capitano Lucas regolò il suo casco spaziale e guardò il pianeta rosso sottostante...",
    "examples.example3.title": "Accademia delle Principesse",
    "examples.example3.adventure":
      "Castello reale con amici draghi e incantesimi magici da imparare",
    "examples.example3.preview":
      "La Principessa Sofia agitò la sua bacchetta scintillante e guardò i fiori iniziare a brillare...",
    "examples.example4.title": "Caccia al Tesoro dei Pirati",
    "examples.example4.adventure":
      "Navigazione sui sette mari con un equipaggio di pirati amichevoli",
    "examples.example4.preview":
      "Il Primo Ufficiale Alex individuò qualcosa che scintillava sotto l'acqua cristallina...",
    "examples.example5.title": "Apprendista Mago",
    "examples.example5.adventure":
      "Imparare incantesimi magici in una torre piena di creature misteriose",
    "examples.example5.preview":
      "Maya mescolò attentamente la pozione scintillante mentre il suo compagno gufo guardava...",
    "examples.example6.title": "Avventura Oceanica",
    "examples.example6.adventure":
      "Regno sottomarino con amici delfini e castelli di corallo",
    "examples.example6.preview":
      "Diego nuotò accanto ai delfini amichevoli verso la città sottomarina luminosa...",

    // How It Works
    "howItWorks.title": "Come Funziona",
    "howItWorks.description":
      "Crea il tuo libro di avventura personalizzato in pochi semplici passaggi",
    "howItWorks.step1.title": "Compila i Dettagli",
    "howItWorks.step1.description":
      "Inserisci il nome, l'età e le preferenze di avventura di tuo figlio",
    "howItWorks.step2.title": "Personalizza la Storia",
    "howItWorks.step2.description":
      "Scegli ambientazione, personaggi e dettagli speciali",
    "howItWorks.step3.title": "Anteprima Pagine",
    "howItWorks.step3.description":
      "Guarda il tuo libro personalizzato prendere vita istantaneamente",
    "howItWorks.step4.title": "Ottieni il Tuo Libro",
    "howItWorks.step4.description":
      "Scarica una copia digitale o ordina una versione stampata",

    // Form Steps
    "form.step1": "Informazioni Genitore",
    "form.step2": "Informazioni Bambino",
    "form.step3": "Selezione Avventura",
    "form.step4": "Tocchi Personali",
    "form.step5": "Dettagli Attività",

    // Form Fields
    "form.parentName": "Il Tuo Nome",
    "form.email": "Indirizzo Email",
    "form.emailInvalid": "Inserisci un indirizzo email valido",
    "form.childName": "Nome del Bambino",
    "form.age": "Età",
    "form.selectAge": "Seleziona Età",
    "form.gender": "Genere",
    "form.boy": "Maschio",
    "form.girl": "Femmina",
    "form.other": "Altro",
    "form.adventureType": "Scegli Tipo di Avventura",
    "form.customAdventure":
      "Non trovi il tuo tipo di avventura? Inseriscilo qui:",
    "form.customAdventurePlaceholder":
      "Descrivi la tua avventura personalizzata...",
    "form.location": "Ambientazione o Luogo",
    "form.keyActivities": "Attività Principali",
    "form.selectActivities":
      "Seleziona le attività che interessano tuo figlio:",
    "form.customActivities": "Altre attività (una per riga):",
    "form.favoriteColor": "Colore Preferito del Bambino",
    "form.petName": "Nome dell'Animale (se presente)",
    "form.includeFriends": "Amici o Famiglia da Includere",
    "form.characters": "Personaggi o Temi Preferiti",
    "form.specialDetails": "Dettagli Speciali o Battute Private",
    "form.personalExperiences": "Esperienze Personali da Includere",
    "form.addExperience": "Aggiungi un'Altra Esperienza",
    "form.activityName": "Nome Attività",
    "form.activityDetails": "Dettagli Attività",
    "form.activityCharacters": "Personaggi Coinvolti",
    "form.activityImageDesc": "Descrizione Immagine",
    "form.uploadImages": "Carica Immagini",
    "form.addActivity": "Aggiungi un'Altra Attività",
    "form.previous": "Precedente",
    "form.next": "Successivo",
    "form.reviewBook": "Rivedi il Mio Libro",
    "form.required": "Obbligatorio",
    "form.complete": "Completo",

    // Pricing
    "pricing.title": "Opzioni Libro",
    "pricing.description":
      "Crea ricordi duraturi con un libro personalizzato che tuo figlio amerà per sempre. Scegli l'opzione perfetta per il budget e le preferenze della tua famiglia.",
    "pricing.digitalBook": "Libro Digitale",
    "pricing.digitalBookDesc": "Download PDF istantaneo",
    "pricing.printedBook": "Libro Stampato",
    "pricing.printedBookDesc": "Copertina rigida professionale",
    "pricing.feature1": "Storia personalizzata di 20+ pagine",
    "pricing.feature2": "Illustrazioni di alta qualità",
    "pricing.feature3": "Download istantaneo",
    "pricing.feature4": "Opzione stampa a casa",
    "pricing.feature5": "Tutto nel Digitale",
    "pricing.feature6": "Rilegatura rigida premium",
    "pricing.feature7": "Stampa professionale",
    "pricing.feature8": "Consegna gratuita in Europa",
    "pricing.popular": "Popolare",

    // Order
    "order.chooseFormat": "Scegli il Formato del Tuo Libro",
    "order.digitalOption": "Libro Digitale - €12,99",
    "order.printedOption": "Libro Stampato - €24,99",
    "order.shippingAddress": "Indirizzo di Spedizione",
    "order.fullName": "Nome Completo",
    "order.streetAddress": "Indirizzo Via",
    "order.city": "Città",
    "order.postalCode": "Codice Postale",
    "order.country": "Paese",
    "order.selectCountry": "Seleziona un paese...",
    "order.phone": "Numero di Telefono",
    "order.countryCode": "Prefisso Paese",
    "order.phoneInvalid": "Inserisci un numero di telefono valido",
    "order.paymentDetails": "Dettagli Pagamento",
    "order.cardNumber": "Numero Carta",
    "order.cardNumberInvalid": "Inserisci un numero di carta valido",
    "order.expiryDate": "Data di Scadenza",
    "order.expiryInvalid": "Inserisci una data di scadenza valida (MM/AA)",
    "order.cvv": "CVV",
    "order.cvvInvalid": "Inserisci un CVV valido",
    "order.cardholderName": "Nome Titolare Carta",
    "order.completePayment": "Completa Pagamento",
    "order.cancel": "Annulla",
    "order.confirmed": "Ordine Confermato!",
    "order.confirmationDetails": "Dettagli Conferma",
    "order.shippingDetails": "Dettagli Spedizione",
    "order.deliveryInfo":
      "Il tuo libro sarà consegnato via email quando sarà pronto",
    "order.createAnother": "Crea un Altro Libro",
    "order.goHome": "Vai alla Homepage",
    "order.backToForm": "Torna al Modulo",

    // CTA Section
    "cta.title": "Pronto a Creare Magia?",
    "cta.description":
      "Regala a tuo figlio il dono di essere l'eroe nella sua storia di avventura personalizzata. Inizia a creare il suo libro magico oggi!",
    "cta.startAdventure": "Inizia la Tua Avventura",

    // Footer
    "footer.tagline":
      "Creazione di libri di avventura personalizzati magici per bambini in tutto il mondo.",
    "footer.product": "Prodotto",
    "footer.howItWorks": "Come Funziona",
    "footer.examples": "Esempi",
    "footer.pricing": "Prezzi",
    "footer.support": "Supporto",
    "footer.helpCenter": "Centro Assistenza",
    "footer.contactUs": "Contattaci",
    "footer.faq": "FAQ",
    "footer.company": "Azienda",
    "footer.about": "Chi Siamo",
    "footer.privacy": "Privacy",
    "footer.terms": "Termini",
    "footer.copyright":
      "© 2024 Libro di Avventura Personalizzato. Tutti i diritti riservati.",

    // Theme and UI
    "ui.light": "Chiaro",
    "ui.dark": "Scuro",
    "ui.english": "English",
    "ui.french": "Français",
    "ui.italian": "Italiano",
    "ui.spanish": "Español",
    "ui.arabic": "العربية",
    "ui.dutch": "Nederlands",
    "ui.german": "Deutsch",

    // Placeholder texts
    "placeholder.email": "tuo.nome@esempio.com",
    "placeholder.location":
      "Regno Magico, Stazione Spaziale, Città Sottomarina...",
    "placeholder.favoriteColor": "Blu, Rosa, Arcobaleno...",
    "placeholder.petName": "Fluffy, Rex, Baffi...",
    "placeholder.includeFriends":
      "Mamma, Papà, Sorella Emma, Migliore amico Jake...",
    "placeholder.specialDetails":
      "Interessi speciali, hobby, momenti divertenti...",
    "placeholder.experienceTitle":
      "Nuotare con i delfini, Trovare un tesoro...",
    "placeholder.experienceDescription":
      "Descrivi cosa succede in questa parte dell'avventura...",
    "placeholder.characters": "Chi è coinvolto in questa esperienza?",
    "placeholder.imageDescription": "Descrivi l'immagine...",
    "placeholder.customActivity": "Aggiungi attività personalizzata...",
    "placeholder.activityDescription":
      "Descrivi cosa succede durante questa attività...",
    "placeholder.activityCharacters": "Chi è coinvolto in questa attività?",
  },
  es: {
    // Navigation
    "nav.adventurePossibilities": "Posibilidades de Aventura",
    "nav.howItWorks": "Cómo Funciona",
    "nav.examples": "Ejemplos",
    "nav.pricing": "Precios",

    // Homepage
    "hero.subtitle": "Libros de Aventura Personalizados para Niños",
    "hero.title": "Crea",
    "hero.titleHighlight": "Aventuras",
    "hero.subtitle2": "M��gicas con Tu Hijo",
    "hero.description":
      "Transforma a tu hijo en el héroe de su propio libro de aventuras personalizado. ¡Elige entre bosques encantados, misiones espaciales, expediciones submarinas y más!",
    "hero.startCreating": "Comenzar a Crear",
    "hero.seeExamples": "Ver Ejemplos",

    // Features
    "features.personalizedCharacters": "Personajes Personalizados",
    "features.personalizedCharactersDesc":
      "Incluye a tu hijo, amigos y familiares en la historia",
    "features.instantPreview": "Vista Previa Instantánea",
    "features.instantPreviewDesc":
      "Ve tu libro cobrar vida con páginas de vista previa inmediatas",
    "features.printOrDigital": "Impreso o Digital",
    "features.printOrDigitalDesc":
      "Recibe un libro físico entregado o descarga instantáneamente",

    // Adventure Types
    "adventure.possibilities": "Posibilidades de Aventura",
    "adventure.possibilitiesDesc":
      "¡Explora los mundos mágicos que podemos crear para tu hijo - y muchos más!",
    "adventure.spaceMission": "Misión Espacial",
    "adventure.spaceMissionDesc":
      "Despega hacia planetas distantes y conoce amigos alienígenas",
    "adventure.enchantedForest": "Bosque Encantado",
    "adventure.enchantedForestDesc":
      "Descubre criaturas mágicas y tesoros ocultos",
    "adventure.royalCastle": "Castillo Real",
    "adventure.royalCastleDesc":
      "Conviértete en un valiente caballero o una sabia princesa",
    "adventure.pirateVoyage": "Viaje Pirata",
    "adventure.pirateVoyageDesc": "Navega los siete mares en busca de tesoros",
    "adventure.superheroAcademy": "Academia de Superhéroes",
    "adventure.superheroAcademyDesc":
      "Entrena para convertirte en el próximo gran héroe del mundo",
    "adventure.underwaterWorld": "Mundo Submarino",
    "adventure.underwaterWorldDesc":
      "Sumérgete profundo para explorar reinos de coral",

    // Examples
    "examples.title": "Ejemplos de Libros",
    "examples.description":
      "Ve cómo las aventuras de otros niños cobraron vida en sus libros personalizados",
    "examples.adventure": "Aventura",
    "examples.preview": "Vista Previa de la Historia",
    "examples.createYours": "Crea Tu Aventura",
    "examples.example1.title": "B��squeda del Bosque Mágico",
    "examples.example1.adventure":
      "Bosque encantado con animales parlantes y aldeas de hadas ocultas",
    "examples.example1.preview":
      "Emma atravesó el arco dorado y jadeó mientras mariposas con alas arcoíris danzaban a su alrededor...",
    "examples.example2.title": "Misión de Explorador Espacial",
    "examples.example2.adventure":
      "Viaje a Marte con compañeros robóticos y descubrimientos alienígenas",
    "examples.example2.preview":
      "El Capitán Lucas ajustó su casco espacial y miró el planeta rojo abajo...",
    "examples.example3.title": "Academia de Princesas",
    "examples.example3.adventure":
      "Castillo real con amigos dragones y hechizos mágicos que aprender",
    "examples.example3.preview":
      "La Princesa Sofia agitó su varita brillante y vio las flores comenzar a brillar...",
    "examples.example4.title": "Búsqueda del Tesoro Pirata",
    "examples.example4.adventure":
      "Navegando los siete mares con una tripulación de piratas amigables",
    "examples.example4.preview":
      "El Primer Oficial Alex divisó algo brillando bajo el agua cristalina...",
    "examples.example5.title": "Aprendiz de Mago",
    "examples.example5.adventure":
      "Aprendiendo hechizos mágicos en una torre llena de criaturas misteriosas",
    "examples.example5.preview":
      "Maya mezcló cuidadosamente la poción brillante mientras su compañero búho observaba...",
    "examples.example6.title": "Aventura Oceánica",
    "examples.example6.adventure":
      "Reino submarino con amigos delfines y castillos de coral",
    "examples.example6.preview":
      "Diego nadó junto a los delfines amigables hacia la ciudad submarina brillante...",

    // How It Works
    "howItWorks.title": "Cómo Funciona",
    "howItWorks.description":
      "Crea tu libro de aventura personalizado en unos pocos pasos simples",
    "howItWorks.step1.title": "Completa los Detalles",
    "howItWorks.step1.description":
      "Ingresa el nombre, edad y preferencias de aventura de tu hijo",
    "howItWorks.step2.title": "Personaliza la Historia",
    "howItWorks.step2.description":
      "Elige el escenario, personajes y detalles especiales",
    "howItWorks.step3.title": "Vista Previa de Páginas",
    "howItWorks.step3.description":
      "Ve tu libro personalizado cobrar vida instantáneamente",
    "howItWorks.step4.title": "Obtén Tu Libro",
    "howItWorks.step4.description":
      "Descarga una copia digital o ordena una versión impresa",

    // Form Steps
    "form.step1": "Información del Padre",
    "form.step2": "Información del Niño",
    "form.step3": "Selección de Aventura",
    "form.step4": "Toques Personales",
    "form.step5": "Detalles de Actividad",

    // Form Fields
    "form.parentName": "Tu Nombre",
    "form.email": "Dirección de Email",
    "form.emailInvalid": "Por favor ingresa una dirección de email v��lida",
    "form.childName": "Nombre del Niño",
    "form.age": "Edad",
    "form.selectAge": "Seleccionar Edad",
    "form.gender": "Género",
    "form.boy": "Niño",
    "form.girl": "Niña",
    "form.other": "Otro",
    "form.adventureType": "Elegir Tipo de Aventura",
    "form.customAdventure":
      "¿No encuentras tu tipo de aventura? Ingrésalo aquí:",
    "form.customAdventurePlaceholder": "Describe tu aventura personalizada...",
    "form.location": "Escenario o Ubicación",
    "form.keyActivities": "Actividades Clave",
    "form.selectActivities": "Selecciona actividades que interesen a tu hijo:",
    "form.customActivities": "Otras actividades (una por línea):",
    "form.favoriteColor": "Color Favorito del Niño",
    "form.petName": "Nombre de la Mascota (si tiene)",
    "form.includeFriends": "Amigos o Familia a Incluir",
    "form.characters": "Personajes o Temas Favoritos",
    "form.specialDetails": "Detalles Especiales o Bromas Internas",
    "form.personalExperiences": "Experiencias Personales a Incluir",
    "form.addExperience": "Agregar Otra Experiencia",
    "form.activityName": "Nombre de Actividad",
    "form.activityDetails": "Detalles de Actividad",
    "form.activityCharacters": "Personajes Involucrados",
    "form.activityImageDesc": "Descripción de Imagen",
    "form.uploadImages": "Subir Imágenes",
    "form.addActivity": "Agregar Otra Actividad",
    "form.previous": "Anterior",
    "form.next": "Siguiente",
    "form.reviewBook": "Revisar Mi Libro",
    "form.required": "Requerido",
    "form.complete": "Completo",

    // Pricing
    "pricing.title": "Opciones de Libro",
    "pricing.description":
      "Crea recuerdos duraderos con un libro personalizado que tu hijo atesorará para siempre. Elige la opción perfecta para el presupuesto y preferencias de tu familia.",
    "pricing.digitalBook": "Libro Digital",
    "pricing.digitalBookDesc": "Descarga PDF instantánea",
    "pricing.printedBook": "Libro Impreso",
    "pricing.printedBookDesc": "Tapa dura profesional",
    "pricing.feature1": "Historia personalizada de 20+ páginas",
    "pricing.feature2": "Ilustraciones de alta calidad",
    "pricing.feature3": "Descarga instantánea",
    "pricing.feature4": "Opción de imprimir en casa",
    "pricing.feature5": "Todo en Digital",
    "pricing.feature6": "Encuadernación de tapa dura premium",
    "pricing.feature7": "Impresión profesional",
    "pricing.feature8": "Entrega gratuita en Europa",
    "pricing.popular": "Popular",

    // Order
    "order.chooseFormat": "Elige el Formato de Tu Libro",
    "order.digitalOption": "Libro Digital - $12,99",
    "order.printedOption": "Libro Impreso - $24,99",
    "order.shippingAddress": "Dirección de Envío",
    "order.fullName": "Nombre Completo",
    "order.streetAddress": "Dirección de la Calle",
    "order.city": "Ciudad",
    "order.postalCode": "Código Postal",
    "order.country": "País",
    "order.selectCountry": "Selecciona un país...",
    "order.phone": "Número de Tel��fono",
    "order.countryCode": "Código de País",
    "order.phoneInvalid": "Por favor ingresa un número de teléfono válido",
    "order.paymentDetails": "Detalles de Pago",
    "order.cardNumber": "Número de Tarjeta",
    "order.cardNumberInvalid": "Por favor ingresa un número de tarjeta válido",
    "order.expiryDate": "Fecha de Vencimiento",
    "order.expiryInvalid":
      "Por favor ingresa una fecha de vencimiento válida (MM/AA)",
    "order.cvv": "CVV",
    "order.cvvInvalid": "Por favor ingresa un CVV válido",
    "order.cardholderName": "Nombre del Titular de la Tarjeta",
    "order.completePayment": "Completar Pago",
    "order.cancel": "Cancelar",
    "order.confirmed": "¡Pedido Confirmado!",
    "order.confirmationDetails": "Detalles de Confirmación",
    "order.shippingDetails": "Detalles de Envío",
    "order.deliveryInfo": "Tu libro será entregado por email cuando esté listo",
    "order.createAnother": "Crear Otro Libro",
    "order.goHome": "Ir a la Página Principal",
    "order.backToForm": "Volver al Formulario",

    // CTA Section
    "cta.title": "¿Listo para Crear Magia?",
    "cta.description":
      "Dale a tu hijo el regalo de ser el héroe en su propia historia de aventura personalizada. ¡Comienza a crear su libro mágico hoy!",
    "cta.startAdventure": "Comienza Tu Aventura",

    // Footer
    "footer.tagline":
      "Creando libros de aventura personalizada mágicos para niños en todo el mundo.",
    "footer.product": "Producto",
    "footer.howItWorks": "Cómo Funciona",
    "footer.examples": "Ejemplos",
    "footer.pricing": "Precios",
    "footer.support": "Soporte",
    "footer.helpCenter": "Centro de Ayuda",
    "footer.contactUs": "Contáctanos",
    "footer.faq": "FAQ",
    "footer.company": "Empresa",
    "footer.about": "Acerca de",
    "footer.privacy": "Privacidad",
    "footer.terms": "Términos",
    "footer.copyright":
      "© 2024 Libro de Aventura Personalizado. Todos los derechos reservados.",

    // Theme and UI
    "ui.light": "Claro",
    "ui.dark": "Oscuro",
    "ui.english": "English",
    "ui.french": "Français",
    "ui.italian": "Italiano",
    "ui.spanish": "Español",
    "ui.arabic": "العربية",
    "ui.dutch": "Nederlands",
    "ui.german": "Deutsch",

    // Placeholder texts
    "placeholder.email": "tu.nombre@ejemplo.com",
    "placeholder.location":
      "Reino Mágico, Estación Espacial, Ciudad Submarina...",
    "placeholder.favoriteColor": "Azul, Rosa, Arcoíris...",
    "placeholder.petName": "Fluffy, Rex, Bigotes...",
    "placeholder.includeFriends":
      "Mamá, Papá, Hermana Emma, Mejor amigo Jake...",
    "placeholder.specialDetails":
      "Intereses especiales, hobbies, momentos divertidos...",
    "placeholder.experienceTitle": "Nadar con delfines, Encontrar un tesoro...",
    "placeholder.experienceDescription":
      "Describe qué pasa en esta parte de la aventura...",
    "placeholder.characters": "¿Quién está involucrado en esta experiencia?",
    "placeholder.imageDescription": "Describe la imagen...",
    "placeholder.customActivity": "Agregar actividad personalizada...",
    "placeholder.activityDescription":
      "Describe qué pasa durante esta actividad...",
    "placeholder.activityCharacters":
      "¿Quién está involucrado en esta actividad?",
  },
  ar: {
    // Navigation
    "nav.adventurePossibilities": "إمكانيات المغامرة",
    "nav.howItWorks": "كيف يعمل",
    "nav.examples": "أمثلة",
    "nav.pricing": "الأسعار",
    "nav.myOrders": "طلباتي",

    // Homepage
    "hero.subtitle": "كتب مغامرات شخصية للأطفال",
    "hero.title": "اصنع",
    "hero.titleHighlight": "مغامرات",
    "hero.subtitle2": "سحرية مع طفلك",
    "hero.description":
      "حول طفلك إلى بطل كتاب المغامرات الشخصي الخاص به. اختر من بين الغابات المسحورة، والمهام الفضائية، والرحلات تحت الماء، وأكثر!",
    "hero.startCreating": "ابدأ الإنشاء",
    "hero.seeExamples": "انظر الأمثلة",

    // Features
    "features.personalizedCharacters": "شخصيات مخصصة",
    "features.personalizedCharactersDesc":
      "اشمل طفلك وأصدقاءه وأفراد عائلته في القصة",
    "features.instantPreview": "معاينة فورية",
    "features.instantPreviewDesc":
      "شاهد كتابك ينبض بالحياة مع صفحات المعاينة الفورية",
    "features.printOrDigital": "مطبوع أو رقمي",
    "features.printOrDigitalDesc":
      "احصل على كتاب مادي مُسلم أو قم بالتحميل فوراً",

    // Adventure Types
    "adventure.possibilities": "إمكانيات المغامرة",
    "adventure.possibilitiesDesc":
      "استكشف ��لعوالم السحرية التي يمكننا إنشاؤها لطفلك - وأكثر من ذلك بكثير!",
    "adventure.spaceMission": "مهمة فضائية",
    "adventure.spaceMissionDesc": "انطلق إلى كواكب بعيدة والتق بأصدقاء فضائيين",
    "adventure.enchantedForest": "غابة مسحورة",
    "adventure.enchantedForestDesc": "اكتشف مخلوقات سحرية وكنوز مخفية",
    "adventure.royalCastle": "قلعة ملكية",
    "adventure.royalCastleDesc": "كن فارساً شجاعاً أو أميرة ��كيمة",
    "adventure.pirateVoyage": "رحلة القراصنة",
    "adventure.pirateVoyageDesc": "أبحر في البحار السبعة بحثاً عن الكنز",
    "adventure.superheroAcademy": "أكاديمية الأب��ال الخارقين",
    "adventure.superheroAcademyDesc":
      "تدرب لتصبح البطل العظيم ال��ادم في العالم",
    "adventure.underwaterWorld": "عالم تحت الماء",
    "adventure.underwaterWorldDesc": "اغطس عميقاً لاستكشاف ممالك المرجان",

    // Examples
    "examples.title": "أمثلة الكتب",
    "examples.description":
      "شاهد كيف أصبحت مغامر��ت الأطفال الآخرين حية في كتبهم الشخصية",
    "examples.adventure": "مغامرة",
    "examples.preview": "معاينة القصة",
    "examples.createYours": "اصنع مغامرتك",
    "examples.example1.title": "مهمة الغابة السحرية",
    "examples.example1.adventure":
      "غابة مسحورة مع حيوانات ناطقة وقرى الجنيات المخفية",
    "examples.example1.preview":
      "عبرت إيما القوس ال��هبي ولهثت بينما رقصت الفراشات ذات الأجنحة ��وس قزح حولها...",
    "examples.example2.title": "مهمة مستكشف الفضاء",
    "examples.example2.adventure":
      "رحلة إلى المريخ مع رفاق آليين واكتشافات فضائية",
    "examples.example2.preview":
      "عدّل الكابتن لوكاس خوذته الفضائية ونظر إلى الكوكب الأحمر أدناه...",
    "examples.example3.title": "أكا��يمية الأميرات",
    "examples.example3.adventure":
      "قلعة ملكية مع أصدقاء التنانين وتعاويذ سحرية للتعلم",
    "examples.example3.preview":
      "لوحت الأميرة صوفيا بعصاها المتل���لئة وشاهدت الزهور تبدأ في التوهج...",
    "examples.example4.title": "البحث عن كن�� القراصنة",
    "examples.example4.adventure":
      "الإبحار في البحار السبعة مع طاقم من القراصنة الودودين",
    "examples.example4.preview":
      "رصد الضابط الأول ألي��س شيئاً يتلألأ تحت الماء الكريستالي...",
    "examples.example5.title": "تلميذ الساحر",
    "examples.example5.adventure":
      "تعلم التعاويذ السحرية في برج مليء بالمخلوقات الغامضة",
    "examples.example5.preview":
      "خلطت م��يا بعناية الجرعة المتلألئة بينما راقب رفيقها البوم...",
    "examples.example6.title": "��غامرة المحيط",
    "examples.example6.adventure":
      "مملكة تحت الماء مع أص��قاء الدلافين وقلاع المرجان",
    "examples.example6.preview":
      "سبح دييغو بجانب الدلافين الودودة نحو المدينة تحت الماء المضيئة...",

    // How It Works
    "howItWorks.title": "كيف يعمل",
    "howItWorks.description": "اصنع كتاب مغامرتك ا��شخصي في خطوات بسيطة قليلة",
    "howItWorks.step1.title": "املأ التفاصيل",
    "howItWorks.step1.description": "أدخل اسم طفلك وعمره وتفضيلات المغامرة",
    "howItWorks.step2.title": "خصص القصة",
    "howItWorks.step2.description": "اختر البيئة والشخصيات وال��فاصيل الخاصة",
    "howItWorks.step3.title": "معاينة الصفحات",
    "howItWorks.step3.description": "شاهد كتاب�� الشخصي ينبض بالحياة فوراً",
    "howItWorks.step4.title": "احصل على كتابك",
    "howItWorks.step4.description": "حمّل نسخة رقمية أو اطل�� نسخة مطبوعة",

    // Form Steps
    "form.step1": "معلومات الوالد",
    "form.step2": "معلومات الطفل",
    "form.step3": "اختيار المغامرة",
    "form.step4": "لمسات ش��صية",
    "form.step5": "تفاصيل النشاط",

    // Form Fields
    "form.parentName": "اسمك",
    "form.email": "عنوان البريد الإلكتروني",
    "form.emailInvalid": "يرجى إدخال عنوان بريد إلكتروني صالح",
    "form.childName": "اسم الطفل",
    "form.age": "العمر",
    "form.selectAge": "اختر العمر",
    "form.gender": "الجنس",
    "form.boy": "ولد",
    "form.girl": "بنت",
    "form.other": "آخر",
    "form.adventureType": "اختر نوع المغامرة",
    "form.customAdventure": "لا تجد نوع مغامرتك؟ أدخلها هنا:",
    "form.customAdventurePlaceholder": "صف مغامرتك المخصصة...",
    "form.location": "البيئة أو المكان",
    "form.keyActivities": "الأنشطة الرئيسية",
    "form.selectActivities": "اختر الأنشطة التي تهم طفلك:",
    "form.customActivities": "أنشطة أخرى (واحد في كل سط��):",
    "form.favoriteColor": "لون الطفل المفضل",
    "form.petName": "اسم الحيوان الأليف (إن وجد)",
    "form.includeFriends": "الأصدقاء أو العائلة للتضمين",
    "form.characters": "الشخصيات أو المواضيع المفضلة",
    "form.specialDetails": "تفاصيل خاصة أو نكات داخلية",
    "form.personalExperiences": "التجارب الشخصية للتضمين",
    "form.addExperience": "أضف تجربة أخرى",
    "form.activityName": "اسم النشاط",
    "form.activityDetails": "تفاصيل النشاط",
    "form.activityCharacters": "الشخصيات المشاركة",
    "form.activityImageDesc": "وصف الصورة",
    "form.uploadImages": "تحميل الصور",
    "form.addActivity": "أضف نشاطاً آخر",
    "form.previous": "السابق",
    "form.next": "التالي",
    "form.reviewBook": "راجع كتابي",
    "form.required": "مطلوب",
    "form.complete": "اكتمل",
    "form.stop": "توقف",

    // Loading and messages
    "loading.adventure": "جاري تحميل مغامرتك...",
    "loading.preparation": "يرجى الانتظار بينما نعد نموذج إنشاء كتابك.",

    // UI elements
    "ui.activityImages": "صور النشاط",
    "ui.charactersInvolved": "الشخصيات المشاركة",
    "ui.description": "الوصف",
    "ui.add": "إضافة",
    "ui.addAnotherExperience": "إضافة تجربة أخرى",

    // Upload messages
    "upload.clickToUploadExperience": "انقر لتحميل صور لهذه التجربة",
    "upload.uploadImagesFor": "تحميل صور لـ",

    // Empty states
    "empty.firstAdventure": "🌟 أول تجربة مغامرة لك جاهزة للإنشاء! 🌟",
    "empty.autoCreate":
      "سيقوم النظام تلقائياً بإنشاء قسم التجربة الأولى أدناه.",

    // Dialog
    "dialog.saveProgress": "حفظ التقدم؟",
    "dialog.unsavedChanges": "لديك تغييرات غير محفوظة. هل تريد حفظ تقدمك؟",
    "dialog.discardChanges": "عدم الحفظ",
    "dialog.saveDraft": "حفظ والمتابعة",

    // Draft Detection Dialog
    "draftDetection.title": "متابعة مغامرتك؟",
    "draftDetection.description":
      "وجدنا مسودة محفوظة لكتاب مغامرتك. هل تريد المتابعة من حيث توقفت، أم بدء كتاب جديد، أم العودة للصفحة الرئيسية؟",
    "draftDetection.continue": "متابعة المسودة",
    "draftDetection.startNew": "بدء كتاب جديد",
    "draftDetection.goHome": "العودة للرئيسية",

    // Stop Dialog
    "stopDialog.title": "التوقف عن إنشاء كتابك؟",
    "stopDialog.description":
      "ماذا تريد أن تفعل بتقدمك؟ يمكنك حفظه كمسودة للمتابعة لاحقاً، أو حذفه تماماً.",
    "stopDialog.save": "حفظ كمسودة",
    "stopDialog.delete": "حذف التقدم",

    // Additional UI elements
    "ui.experience": "التجربة",
    "ui.required": "مطلوب",
    "ui.activityName": "اسم النشاط",
    "ui.activityEncouragement":
      "💡 كلما أضفت المزيد من التجارب، كلما أصبحت قصتك أكثر تخصيصاً وسحراً! ✨",
    "ui.addDetails": "أضف تفاصيل وأنشطة وشخصيات لإنشاء مغامرة فريدة حقاً",

    // Activity names
    "activity.treasureHunting": "البحث عن الكنوز",
    "activity.dragonEncounters": "لقاءات التنانين",
    "activity.deepSeaDiving": "الغوص في أعماق البحار",
    "activity.rocketLaunches": "إطلاق الصواريخ",
    "activity.magicSpellCasting": "إلقاء التعاويذ السحرية",
    "activity.solvingMysteries": "حل الألغاز",
    "activity.meetingNewFriends": "مقابلة أصدقاء جدد",
    "activity.savingTheDay": "إنقاذ الموقف",
    "activity.exploringNewWorlds": "استكشاف عوالم جديدة",
    "activity.learningNewSkills": "تعلم مهارات جديدة",
    "activity.findingHiddenSecrets": "العثور على أسرار مخفية",
    "activity.goingOnQuests": "الذهاب في المهام",

    // Preview page
    "preview.storyPreview": "معاينة القصة",
    "preview.bookStatistics": "إحصائيات كتابك",
    "preview.totalChapters": "إجمالي الفصول:",
    "preview.adventureActivities": "أنشطة المغامرة:",
    "preview.estimatedPages": "الصفحات المقدرة:",
    "preview.readingLevel": "مستوى القراءة:",
    "preview.bookDetails": "تفاصيل الكتاب",
    "preview.chooseFormat": "اختر التنسيق",
    "preview.digitalBook": "كتاب رقمي",
    "preview.printedBook": "كتاب مطبوع",

    // Pricing
    "pricing.title": "خيارات الكتاب",
    "pricing.description":
      "اصنع ذكريات دائمة مع كتاب شخصي سيح��فظ به طفلك إلى الأبد. اختر الخيار المثالي لميزانية وتفضيلات عائلتك.",
    "pricing.digitalBook": "كتاب رقمي",
    "pricing.digitalBookDesc": "تحميل PDF فوري",
    "pricing.printedBook": "كتاب مطبوع",
    "pricing.printedBookDesc": "غلاف صلب احترافي",
    "pricing.feature1": "قصة شخصية من 20+ صفح��",
    "pricing.feature2": "ر��وم توضيحية عالية الجودة",
    "pricing.feature3": "تحميل فوري",
    "pricing.feature4": "خيار الطباعة في المنزل",
    "pricing.feature5": "كل شيء في الرقمي",
    "pricing.feature6": "تجليد غلاف صلب ممتاز",
    "pricing.feature7": "طباعة احترافية",
    "pricing.feature8": "توصيل مجاني في أوروبا",
    "pricing.popular": "شائع",

    // Order
    "order.chooseFormat": "اختر تنسيق كتابك",
    "order.digitalOption": "كتاب رقمي - 12.99$",
    "order.printedOption": "كتاب مطبوع - 24.99$",
    "order.shippingAddress": "عنوان الشحن",
    "order.fullName": "الاسم الكامل",
    "order.streetAddress": "عنوان الشارع",
    "order.city": "المدينة",
    "order.postalCode": "الرمز ال��ريدي",
    "order.country": "البلد",
    "order.selectCountry": "اختر بلداً...",
    "order.phone": "رقم الهاتف",
    "order.countryCode": "رمز البلد",
    "order.phoneInvalid": "يرجى إدخال رقم هاتف صالح",
    "order.paymentDetails": "تفاصيل الدفع",
    "order.cardNumber": "رقم البطاقة",
    "order.cardNumberInvalid": "يرجى إدخال رقم بطاقة صالح",
    "order.expiryDate": "تاريخ الانتهاء",
    "order.expiryInvalid": "يرجى إدخال تاريخ انتهاء صالح (شش/سس)",
    "order.cvv": "CVV",
    "order.cvvInvalid": "يرجى إدخال CVV ��الح",
    "order.cardholderName": "اسم حامل البطاقة",
    "order.completePayment": "إكمال الدفع",
    "order.cancel": "إلغاء",
    "order.confirmed": "تم تأكيد الطلب!",
    "order.confirmationDetails": "تفاصيل التأكيد",
    "order.shippingDetails": "تفاصيل الشحن",
    "order.deliveryInfo":
      "سيتم تسليم كتابك عبر البريد الإلكتروني عندما يكون جاهزاً",
    "order.createAnother": "إنش��ء كتاب آخر",
    "order.goHome": "الذه��ب للصفحة الرئيسية",
    "order.backToForm": "العودة للنموذج",

    // CTA Section
    "cta.title": "مستعد لصنع السحر؟",
    "cta.description":
      "امنح طفلك هدية كونه البطل في قصة مغامرته الشخصية. ابدأ في إنشاء كتابه السحري اليوم!",
    "cta.startAdventure": "ابدأ مغامرتك",

    // Footer
    "footer.tagline":
      "إنشا�� كتب مغامرات شخصية سحرية للأطفال في جميع أنحاء العالم.",
    "footer.product": "��لمنتج",
    "footer.howItWorks": "كيف يعمل",
    "footer.examples": "أمثلة",
    "footer.pricing": "الأسعار",
    "footer.support": "الدعم",
    "footer.helpCenter": "مركز المساعدة",
    "footer.contactUs": "اتصل بنا",
    "footer.faq": "الأسئلة الشائعة",
    "footer.company": "الشركة",
    "footer.about": "حول",
    "footer.privacy": "الخصوصية",
    "footer.terms": "الشروط",
    "footer.copyright": "© 2024 كتاب المغامرة الشخصي. جميع الحقوق محفوظة.",

    // Theme and UI
    "ui.light": "فاتح",
    "ui.dark": "داكن",
    "ui.english": "English",
    "ui.french": "Français",
    "ui.italian": "Italiano",
    "ui.spanish": "Español",
    "ui.arabic": "العربية",
    "ui.dutch": "Nederlands",
    "ui.german": "Deutsch",

    // Placeholder texts
    "placeholder.email": "اسمك@مثال.com",
    "placeholder.location":
      "المملكة السحرية، محطة الفضاء، المدينة تحت الماء...",
    "placeholder.favoriteColor": "أزرق، وردي، قوس قزح...",
    "placeholder.petName": "فلافي، ريكس، شوارب...",
    "placeholder.includeFriends": "ماما، بابا، الأخت إيم��، أفضل صديق جيك...",
    "placeholder.specialDetails": "اهتمامات خاصة، هوايات، لحظات مضحكة...",
    "placeholder.experienceTitle": "السباحة مع الدلافين، العثور على كنز...",
    "placeholder.experienceDescription":
      "اوصف ما يحدث في هذا الجزء من المغامرة...",
    "placeholder.characters": "من المشارك في هذه التجربة؟",
    "placeholder.imageDescription": "وصف الصورة...",
    "placeholder.customActivity": "إضافة نشاط مخصص...",
    "placeholder.activityDescription": "اوصف ما يحدث أثناء هذا النشاط...",
    "placeholder.activityCharacters": "من المشارك في هذا النشاط؟",
  },
  nl: {
    // Navigation
    "nav.adventurePossibilities": "Avontuarmogelijkheden",
    "nav.howItWorks": "Hoe Het Werkt",
    "nav.examples": "Voorbeelden",
    "nav.pricing": "Prijzen",

    // Homepage
    "hero.subtitle": "Gepersonaliseerde Avontuurboeken voor Kinderen",
    "hero.title": "Creëer",
    "hero.titleHighlight": "Avonturen",
    "hero.subtitle2": "Magische met Je Kind",
    "hero.description":
      "Transformeer je kind in de held van hun eigen gepersonaliseerde avontuurboek. Kies uit betoverde bossen, ruimtemissies, onderwaterexpedities en meer!",
    "hero.startCreating": "Begin met Maken",
    "hero.seeExamples": "Zie Voorbeelden",

    // Features
    "features.personalizedCharacters": "Gepersonaliseerde Personages",
    "features.personalizedCharactersDesc":
      "Betrek je kind, vrienden en familieleden bij het verhaal",
    "features.instantPreview": "Directe Voorvertoning",
    "features.instantPreviewDesc":
      "Zie je boek tot leven komen met directe voorvertoningspagina's",
    "features.printOrDigital": "Gedrukt of Digitaal",
    "features.printOrDigitalDesc":
      "Ontvang een fysiek boek bezorgd of download direct",

    // Adventure Types
    "adventure.possibilities": "Avontuarmogelijkheden",
    "adventure.possibilitiesDesc":
      "Verken de magische werelden die we voor je kind kunnen creëren - en nog veel meer!",
    "adventure.spaceMission": "Ruimtemissie",
    "adventure.spaceMissionDesc":
      "Vlieg naar verre planeten en ontmoet buitenaardse vrienden",
    "adventure.enchantedForest": "Betoverd Bos",
    "adventure.enchantedForestDesc":
      "Ontdek magische wezens en verborgen schatten",
    "adventure.royalCastle": "Koninklijk Kasteel",
    "adventure.royalCastleDesc": "Word een dappere ridder of wijze prinses",
    "adventure.pirateVoyage": "Piratenreis",
    "adventure.pirateVoyageDesc": "Vaar over de zeven zeeën op zoek naar schat",
    "adventure.superheroAcademy": "Superhelden Academie",
    "adventure.superheroAcademyDesc":
      "Train om 's werelds volgende grote held te worden",
    "adventure.underwaterWorld": "Onderwaterwereld",
    "adventure.underwaterWorldDesc": "Duik diep om koraalrijken te verkennen",

    // Examples
    "examples.title": "Boekvoorbeelden",
    "examples.description":
      "Zie hoe de avonturen van andere kinderen tot leven kwamen in hun gepersonaliseerde boeken",
    "examples.adventure": "Avontuur",
    "examples.preview": "Verhaalvoorvertoning",
    "examples.createYours": "Creëer Je Avontuur",
    "examples.example1.title": "Magische Boszoektocht",
    "examples.example1.adventure":
      "Betoverd bos met pratende dieren en verborgen feeëndorpen",
    "examples.example1.preview":
      "Emma stapte door de gouden boog en hapte naar adem toen vlinders met regenboogvleugels om haar heen dansten...",
    "examples.example2.title": "Ruimteverkenner Missie",
    "examples.example2.adventure":
      "Reis naar Mars met robotische metgezellen en buitenaardse ontdekkingen",
    "examples.example2.preview":
      "Kapitein Lucas stelde zijn ruimtehelm bij en keek naar de rode planeet beneden...",
    "examples.example3.title": "Prinses Academie",
    "examples.example3.adventure":
      "Koninklijk kasteel met drakenvrienden en magische spreuken om te leren",
    "examples.example3.preview":
      "Prinses Sofia zwaaide met haar glinsterende toverstaf en keek toe hoe de bloemen begonnen te gloeien...",
    "examples.example4.title": "Piratenschatjacht",
    "examples.example4.adventure":
      "Zeilen over de zeven zeeën met een bemanning van vriendelijke piraten",
    "examples.example4.preview":
      "Eerste Stuurman Alex spotte iets dat glinsterde onder het kristalheldere water...",
    "examples.example5.title": "Tovenaarsleerling",
    "examples.example5.adventure":
      "Magische spreuken leren in een toren vol mysterieuze wezens",
    "examples.example5.preview":
      "Maya mengde voorzichtig de glinsterende toverdrank terwijl haar uilgezelle toekeek...",
    "examples.example6.title": "Oceaan Avontuur",
    "examples.example6.adventure":
      "Onderwaterkoninkrijk met dolfijnvrienden en koraalkastelen",
    "examples.example6.preview":
      "Diego zwom naast de vriendelijke dolfijnen naar de gloeiende onderwaterstad...",

    // How It Works
    "howItWorks.title": "Hoe Het Werkt",
    "howItWorks.description":
      "Creëer je gepersonaliseerde avontuurboek in slechts een paar eenvoudige stappen",
    "howItWorks.step1.title": "Vul Details In",
    "howItWorks.step1.description":
      "Voer de naam, leeftijd en avontuurvoorkeuren van je kind in",
    "howItWorks.step2.title": "Personaliseer Verhaal",
    "howItWorks.step2.description":
      "Kies setting, personages en speciale details",
    "howItWorks.step3.title": "Bekijk Pagina's",
    "howItWorks.step3.description":
      "Zie je gepersonaliseerde boek direct tot leven komen",
    "howItWorks.step4.title": "Krijg Je Boek",
    "howItWorks.step4.description":
      "Download een digitale kopie of bestel een gedrukte versie",

    // Form Steps
    "form.step1": "Ouder Informatie",
    "form.step2": "Kind Informatie",
    "form.step3": "Avontuur Selectie",
    "form.step4": "Persoonlijke Accenten",
    "form.step5": "Activiteit Details",

    // Form Fields
    "form.parentName": "Jouw Naam",
    "form.email": "Email Adres",
    "form.emailInvalid": "Voer een geldig email adres in",
    "form.childName": "Naam van het Kind",
    "form.age": "Leeftijd",
    "form.selectAge": "Selecteer Leeftijd",
    "form.gender": "Geslacht",
    "form.boy": "Jongen",
    "form.girl": "Meisje",
    "form.other": "Anders",
    "form.adventureType": "Kies Avontuurtype",
    "form.customAdventure":
      "Kun je jouw avontuurtype niet vinden? Voer het hier in:",
    "form.customAdventurePlaceholder": "Beschrijf je aangepaste avontuur...",
    "form.location": "Setting of Locatie",
    "form.keyActivities": "Hoofdactiviteiten",
    "form.selectActivities":
      "Selecteer activiteiten die je kind interessant vindt:",
    "form.customActivities": "Andere activiteiten (één per regel):",
    "form.favoriteColor": "Favoriete Kleur van het Kind",
    "form.petName": "Naam van Huisdier (indien van toepassing)",
    "form.includeFriends": "Vrienden of Familie om Mee te Nemen",
    "form.characters": "Favoriete Personages of Thema's",
    "form.specialDetails": "Speciale Details of Inside Grappen",
    "form.personalExperiences": "Persoonlijke Ervaringen om Mee te Nemen",
    "form.addExperience": "Voeg Nog Een Ervaring Toe",
    "form.activityName": "Activiteitnaam",
    "form.activityDetails": "Activiteit Details",
    "form.activityCharacters": "Betrokken Personages",
    "form.activityImageDesc": "Afbeelding Beschrijving",
    "form.uploadImages": "Upload Afbeeldingen",
    "form.addActivity": "Voeg Nog Een Activiteit Toe",
    "form.previous": "Vorige",
    "form.next": "Volgende",
    "form.reviewBook": "Bekijk Mijn Boek",
    "form.required": "Vereist",
    "form.complete": "Compleet",

    // Pricing
    "pricing.title": "Boekopties",
    "pricing.description":
      "Creëer blijvende herinneringen met een gepersonaliseerd boek dat je kind voor altijd zal koesteren. Kies de perfecte optie voor je gezinsbudget en voorkeuren.",
    "pricing.digitalBook": "Digitaal Boek",
    "pricing.digitalBookDesc": "Directe PDF download",
    "pricing.printedBook": "Gedrukt Boek",
    "pricing.printedBookDesc": "Professionele hardcover",
    "pricing.feature1": "20+ pagina gepersonaliseerd verhaal",
    "pricing.feature2": "Hoogwaardige illustraties",
    "pricing.feature3": "Directe download",
    "pricing.feature4": "Thuis printen optie",
    "pricing.feature5": "Alles in Digitaal",
    "pricing.feature6": "Premium hardcover binding",
    "pricing.feature7": "Professioneel drukwerk",
    "pricing.feature8": "Gratis bezorging in Europa",
    "pricing.popular": "Populair",

    // Order
    "order.chooseFormat": "Kies Je Boekformaat",
    "order.digitalOption": "Digitaal Boek - €12,99",
    "order.printedOption": "Gedrukt Boek - €24,99",
    "order.shippingAddress": "Verzendadres",
    "order.fullName": "Volledige Naam",
    "order.streetAddress": "Straat Adres",
    "order.city": "Stad",
    "order.postalCode": "Postcode",
    "order.country": "Land",
    "order.selectCountry": "Selecteer een land...",
    "order.phone": "Telefoonnummer",
    "order.countryCode": "Landcode",
    "order.phoneInvalid": "Voer een geldig telefoonnummer in",
    "order.paymentDetails": "Betalingsgegevens",
    "order.cardNumber": "Kaartnummer",
    "order.cardNumberInvalid": "Voer een geldig kaartnummer in",
    "order.expiryDate": "Vervaldatum",
    "order.expiryInvalid": "Voer een geldige vervaldatum in (MM/JJ)",
    "order.cvv": "CVV",
    "order.cvvInvalid": "Voer een geldige CVV in",
    "order.cardholderName": "Naam Kaarthouder",
    "order.completePayment": "Betaling Voltooien",
    "order.cancel": "Annuleren",
    "order.confirmed": "Bestelling Bevestigd!",
    "order.confirmationDetails": "Bevestigingsdetails",
    "order.shippingDetails": "Verzenddetails",
    "order.deliveryInfo":
      "Je boek wordt via e-mail bezorgd wanneer het klaar is",
    "order.createAnother": "Creëer Nog Een Boek",
    "order.goHome": "Ga naar Homepage",
    "order.backToForm": "Terug naar Formulier",

    // CTA Section
    "cta.title": "Klaar om Magie te Creëren?",
    "cta.description":
      "Geef je kind het cadeau van de held te zijn in hun eigen gepersonaliseerde avonturenverhaal. Begin vandaag met het creëren van hun magische boek!",
    "cta.startAdventure": "Begin Je Avontuur",

    // Footer
    "footer.tagline":
      "Het creëren van magische gepersonaliseerde avontuurboeken voor kinderen wereldwijd.",
    "footer.product": "Product",
    "footer.howItWorks": "Hoe Het Werkt",
    "footer.examples": "Voorbeelden",
    "footer.pricing": "Prijzen",
    "footer.support": "Ondersteuning",
    "footer.helpCenter": "Helpcentrum",
    "footer.contactUs": "Neem Contact Op",
    "footer.faq": "FAQ",
    "footer.company": "Bedrijf",
    "footer.about": "Over",
    "footer.privacy": "Privacy",
    "footer.terms": "Voorwaarden",
    "footer.copyright":
      "© 2024 Gepersonaliseerd Avontuurboek. Alle rechten voorbehouden.",

    // Theme and UI
    "ui.light": "Licht",
    "ui.dark": "Donker",
    "ui.english": "English",
    "ui.french": "Français",
    "ui.italian": "Italiano",
    "ui.spanish": "Español",
    "ui.arabic": "العربية",
    "ui.dutch": "Nederlands",
    "ui.german": "Deutsch",

    // Placeholder texts
    "placeholder.email": "jouw.naam@voorbeeld.com",
    "placeholder.location":
      "Magisch Koninkrijk, Ruimtestation, Onderwater Stad...",
    "placeholder.favoriteColor": "Blauw, Roze, Regenboog...",
    "placeholder.petName": "Fluffy, Rex, Snorharen...",
    "placeholder.includeFriends": "Mama, Papa, Zus Emma, Beste vriend Jake...",
    "placeholder.specialDetails":
      "Speciale interesses, hobby's, grappige momenten...",
    "placeholder.experienceTitle": "Zwemmen met dolfijnen, Schat vinden...",
    "placeholder.experienceDescription":
      "Beschrijf wat er gebeurt in dit deel van het avontuur...",
    "placeholder.characters": "Wie is betrokken bij deze ervaring?",
    "placeholder.imageDescription": "Beschrijf afbeelding...",
    "placeholder.customActivity": "Aangepaste activiteit toevoegen...",
    "placeholder.activityDescription":
      "Beschrijf wat er gebeurt tijdens deze activiteit...",
    "placeholder.activityCharacters": "Wie is betrokken bij deze activiteit?",
  },
  de: {
    // Navigation
    "nav.adventurePossibilities": "Abenteuer-Möglichkeiten",
    "nav.howItWorks": "Wie Es Funktioniert",
    "nav.examples": "Beispiele",
    "nav.pricing": "Preise",

    // Homepage
    "hero.subtitle": "Personalisierte Abenteuerbücher für Kinder",
    "hero.title": "Erschaffe",
    "hero.titleHighlight": "Abenteuer",
    "hero.subtitle2": "Magische mit Deinem Kind",
    "hero.description":
      "Verwandle dein Kind in den Helden seines eigenen personalisierten Abenteuerbuchs. Wähle aus verzauberten Wäldern, Weltraummissionen, Unterwasserexpeditionen und mehr!",
    "hero.startCreating": "Mit Erstellen Beginnen",
    "hero.seeExamples": "Beispiele Ansehen",

    // Features
    "features.personalizedCharacters": "Personalisierte Charaktere",
    "features.personalizedCharactersDesc":
      "Beziehe dein Kind, Freunde und Familienmitglieder in die Geschichte ein",
    "features.instantPreview": "Sofortige Vorschau",
    "features.instantPreviewDesc":
      "Siehe dein Buch mit sofortigen Vorschauseiten zum Leben erwachen",
    "features.printOrDigital": "Gedruckt oder Digital",
    "features.printOrDigitalDesc":
      "Erhalte ein physisches Buch geliefert oder lade sofort herunter",

    // Adventure Types
    "adventure.possibilities": "Abenteuer-Möglichkeiten",
    "adventure.possibilitiesDesc":
      "Erkunde die magischen Welten, die wir für dein Kind erschaffen können - und vieles mehr!",
    "adventure.spaceMission": "Weltraummission",
    "adventure.spaceMissionDesc":
      "Fliege zu fernen Planeten und treffe außerirdische Freunde",
    "adventure.enchantedForest": "Verzauberter Wald",
    "adventure.enchantedForestDesc":
      "Entdecke magische Kreaturen und verborgene Schätze",
    "adventure.royalCastle": "Königliches Schloss",
    "adventure.royalCastleDesc":
      "Werde ein tapferer Ritter oder eine weise Prinzessin",
    "adventure.pirateVoyage": "Piratenvoyage",
    "adventure.pirateVoyageDesc":
      "Segle über die sieben Meere auf der Suche nach Schätzen",
    "adventure.superheroAcademy": "Superhelden-Akademie",
    "adventure.superheroAcademyDesc":
      "Trainiere, um der nächste große Held der Welt zu werden",
    "adventure.underwaterWorld": "Unterwasserwelt",
    "adventure.underwaterWorldDesc":
      "Tauche tief ein, um Korallenreiche zu erkunden",

    // Examples
    "examples.title": "Buchbeispiele",
    "examples.description":
      "Sieh, wie die Abenteuer anderer Kinder in ihren personalisierten Büchern zum Leben erwachten",
    "examples.adventure": "Abenteuer",
    "examples.preview": "Geschichte Vorschau",
    "examples.createYours": "Erschaffe Dein Abenteuer",
    "examples.example1.title": "Magische Waldsuche",
    "examples.example1.adventure":
      "Verzauberter Wald mit sprechenden Tieren und versteckten Feendörfern",
    "examples.example1.preview":
      "Emma trat durch den goldenen Bogen und schnappte nach Luft, als Schmetterlinge mit Regenbogenflügeln um sie herum tanzten...",
    "examples.example2.title": "Weltraumforscher Mission",
    "examples.example2.adventure":
      "Reise zum Mars mit robotischen Begleitern und außerirdischen Entdeckungen",
    "examples.example2.preview":
      "Kapitän Lucas justierte seinen Weltraumhelm und blickte hinunter auf den roten Planeten...",
    "examples.example3.title": "Prinzessinnen-Akademie",
    "examples.example3.adventure":
      "Königliches Schloss mit Drachenfreunden und magischen Zaubersprüchen zum Lernen",
    "examples.example3.preview":
      "Prinzessin Sofia schwenkte ihren funkelnden Zauberstab und sah zu, wie die Blumen zu leuchten begannen...",
    "examples.example4.title": "Piratenschatzsuche",
    "examples.example4.adventure":
      "Segeln über die sieben Meere mit einer Crew freundlicher Piraten",
    "examples.example4.preview":
      "Erster Maat Alex entdeckte etwas, das unter dem kristallklaren Wasser glitzerte...",
    "examples.example5.title": "Zauberlehrling",
    "examples.example5.adventure":
      "Magische Zaubersprüche in einem Turm voller mysteriöser Kreaturen lernen",
    "examples.example5.preview":
      "Maya mischte vorsichtig den schimmernden Trank, während ihr Eulenbegleiter zusah...",
    "examples.example6.title": "Ozean-Abenteuer",
    "examples.example6.adventure":
      "Unterwasserreich mit Delfinfreunden und Korallenschlössern",
    "examples.example6.preview":
      "Diego schwamm neben den freundlichen Delfinen zur leuchtenden Unterwasserstadt...",

    // How It Works
    "howItWorks.title": "Wie Es Funktioniert",
    "howItWorks.description":
      "Erstelle dein personalisiertes Abenteuerbuch in nur wenigen einfachen Schritten",
    "howItWorks.step1.title": "Details Ausfüllen",
    "howItWorks.step1.description":
      "Gib den Namen, das Alter und die Abenteuervorlieben deines Kindes ein",
    "howItWorks.step2.title": "Geschichte Anpassen",
    "howItWorks.step2.description":
      "Wähle Schauplatz, Charaktere und besondere Details",
    "howItWorks.step3.title": "Seiten Vorschau",
    "howItWorks.step3.description":
      "Sieh dein personalisiertes Buch sofort zum Leben erwachen",
    "howItWorks.step4.title": "Dein Buch Erhalten",
    "howItWorks.step4.description":
      "Lade eine digitale Kopie herunter oder bestelle eine gedruckte Version",

    // Form Steps
    "form.step1": "Eltern-Information",
    "form.step2": "Kind-Information",
    "form.step3": "Abenteuer-Auswahl",
    "form.step4": "Persönliche Akzente",
    "form.step5": "Aktivitäts-Details",

    // Form Fields
    "form.parentName": "Dein Name",
    "form.email": "Email-Adresse",
    "form.emailInvalid": "Bitte gib eine gültige Email-Adresse ein",
    "form.childName": "Name des Kindes",
    "form.age": "Alter",
    "form.selectAge": "Alter Auswählen",
    "form.gender": "Geschlecht",
    "form.boy": "Junge",
    "form.girl": "Mädchen",
    "form.other": "Anders",
    "form.adventureType": "Abenteuertyp Wählen",
    "form.customAdventure":
      "Findest du deinen Abenteuertyp nicht? Gib ihn hier ein:",
    "form.customAdventurePlaceholder":
      "Beschreibe dein benutzerdefiniertes Abenteuer...",
    "form.location": "Schauplatz oder Ort",
    "form.keyActivities": "Hauptaktivitäten",
    "form.selectActivities": "Wähle Aktivitäten, die dein Kind interessieren:",
    "form.customActivities": "Andere Aktivitäten (eine pro Zeile):",
    "form.favoriteColor": "Lieblingsfarbe des Kindes",
    "form.petName": "Name des Haustiers (falls vorhanden)",
    "form.includeFriends": "Freunde oder Familie Einbeziehen",
    "form.characters": "Lieblingscharaktere oder Themen",
    "form.specialDetails": "Besondere Details oder Insider-Witze",
    "form.personalExperiences": "Persönliche Erfahrungen Einbeziehen",
    "form.addExperience": "Weitere Erfahrung Hinzufügen",
    "form.activityName": "Aktivitätsname",
    "form.activityDetails": "Aktivitäts-Details",
    "form.activityCharacters": "Beteiligte Charaktere",
    "form.activityImageDesc": "Bildbeschreibung",
    "form.uploadImages": "Bilder Hochladen",
    "form.addActivity": "Weitere Aktivität Hinzufügen",
    "form.previous": "Zurück",
    "form.next": "Weiter",
    "form.reviewBook": "Mein Buch Überprüfen",
    "form.required": "Erforderlich",
    "form.complete": "Vollständig",

    // Pricing
    "pricing.title": "Buchoptionen",
    "pricing.description":
      "Schaffe bleibende Erinnerungen mit einem personalisierten Buch, das dein Kind für immer schätzen wird. Wähle die perfekte Option für dein Familienbudget und deine Vorlieben.",
    "pricing.digitalBook": "Digitales Buch",
    "pricing.digitalBookDesc": "Sofortiger PDF-Download",
    "pricing.printedBook": "Gedrucktes Buch",
    "pricing.printedBookDesc": "Professioneller Hardcover",
    "pricing.feature1": "20+ Seiten personalisierte Geschichte",
    "pricing.feature2": "Hochwertige Illustrationen",
    "pricing.feature3": "Sofortiger Download",
    "pricing.feature4": "Zuhause drucken Option",
    "pricing.feature5": "Alles in Digital",
    "pricing.feature6": "Premium Hardcover-Bindung",
    "pricing.feature7": "Professioneller Druck",
    "pricing.feature8": "Kostenlose Lieferung in Europa",
    "pricing.popular": "Beliebt",

    // Order
    "order.chooseFormat": "Wähle Dein Buchformat",
    "order.digitalOption": "Digitales Buch - 12,99€",
    "order.printedOption": "Gedrucktes Buch - 24,99€",
    "order.shippingAddress": "Versandadresse",
    "order.fullName": "Vollständiger Name",
    "order.streetAddress": "Straßenadresse",
    "order.city": "Stadt",
    "order.postalCode": "Postleitzahl",
    "order.country": "Land",
    "order.selectCountry": "Wähle ein Land...",
    "order.phone": "Telefonnummer",
    "order.countryCode": "Ländercode",
    "order.phoneInvalid": "Bitte gib eine gültige Telefonnummer ein",
    "order.paymentDetails": "Zahlungsdetails",
    "order.cardNumber": "Kartennummer",
    "order.cardNumberInvalid": "Bitte gib eine gültige Kartennummer ein",
    "order.expiryDate": "Ablaufdatum",
    "order.expiryInvalid": "Bitte gib ein gültiges Ablaufdatum ein (MM/JJ)",
    "order.cvv": "CVV",
    "order.cvvInvalid": "Bitte gib eine gültige CVV ein",
    "order.cardholderName": "Name des Karteninhabers",
    "order.completePayment": "Zahlung Abschließen",
    "order.cancel": "Abbrechen",
    "order.confirmed": "Bestellung Bestätigt!",
    "order.confirmationDetails": "Bestätigungsdetails",
    "order.shippingDetails": "Versanddetails",
    "order.deliveryInfo":
      "Dein Buch wird per E-Mail zugestellt, wenn es fertig ist",
    "order.createAnother": "Weiteres Buch Erstellen",
    "order.goHome": "Zur Homepage",
    "order.backToForm": "Zurück zum Formular",

    // CTA Section
    "cta.title": "Bereit, Magie zu Erschaffen?",
    "cta.description":
      "Gib deinem Kind das Geschenk, der Held in seiner eigenen personalisierten Abenteuergeschichte zu sein. Beginne heute mit der Erstellung seines magischen Buchs!",
    "cta.startAdventure": "Beginne Dein Abenteuer",

    // Footer
    "footer.tagline":
      "Erschaffung magischer personalisierter Abenteuerbücher für Kinder weltweit.",
    "footer.product": "Produkt",
    "footer.howItWorks": "Wie Es Funktioniert",
    "footer.examples": "Beispiele",
    "footer.pricing": "Preise",
    "footer.support": "Support",
    "footer.helpCenter": "Hilfezentrum",
    "footer.contactUs": "Kontaktiere Uns",
    "footer.faq": "FAQ",
    "footer.company": "Unternehmen",
    "footer.about": "Über",
    "footer.privacy": "Datenschutz",
    "footer.terms": "Bedingungen",
    "footer.copyright":
      "© 2024 Personalisiertes Abenteuerbuch. Alle Rechte vorbehalten.",

    // Theme and UI
    "ui.light": "Hell",
    "ui.dark": "Dunkel",
    "ui.english": "English",
    "ui.french": "Français",
    "ui.italian": "Italiano",
    "ui.spanish": "Español",
    "ui.arabic": "العربية",
    "ui.dutch": "Nederlands",
    "ui.german": "Deutsch",

    // Placeholder texts
    "placeholder.email": "dein.name@beispiel.com",
    "placeholder.location":
      "Magisches Königreich, Raumstation, Unterwasserstadt...",
    "placeholder.favoriteColor": "Blau, Rosa, Regenbogen...",
    "placeholder.petName": "Fluffy, Rex, Schnurrhaare...",
    "placeholder.includeFriends":
      "Mama, Papa, Schwester Emma, Bester Freund Jake...",
    "placeholder.specialDetails":
      "Besondere Interessen, Hobbys, lustige Momente...",
    "placeholder.experienceTitle": "Mit Delfinen schwimmen, Schatz finden...",
    "placeholder.experienceDescription":
      "Beschreibe was in diesem Teil des Abenteuers passiert...",
    "placeholder.characters": "Wer ist an dieser Erfahrung beteiligt?",
    "placeholder.imageDescription": "Bild beschreiben...",
    "placeholder.customActivity": "Benutzerdefinierte Aktivität hinzufügen...",
    "placeholder.activityDescription":
      "Beschreibe was während dieser Aktivität passiert...",
    "placeholder.activityCharacters": "Wer ist an dieser Aktivität beteiligt?",
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
