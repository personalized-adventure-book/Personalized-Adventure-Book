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

    // Examples Section
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
    "form.email": "Adresse Gmail",
    "form.emailInvalid": "Veuillez entrer une adresse Gmail valide",
    "form.childName": "Nom de l'Enfant",
    "form.age": "Âge",
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

    // Countries
    "countries.us": "États-Unis",
    "countries.ca": "Canada",
    "countries.gb": "Royaume-Uni",
    "countries.fr": "France",
    "countries.de": "Allemagne",
    "countries.it": "Italie",
    "countries.es": "Espagne",
    "countries.nl": "Pays-Bas",
    "countries.be": "Belgique",
    "countries.at": "Autriche",
    "countries.ch": "Suisse",
    "countries.au": "Australie",
    "countries.nz": "Nouvelle-Zélande",
    "countries.jp": "Japon",
    "countries.kr": "Corée du Sud",
    "countries.cn": "Chine",
    "countries.in": "Inde",
    "countries.br": "Brésil",
    "countries.mx": "Mexique",
    "countries.ar": "Argentine",

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
  },
  // Add other languages with complete translations...
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

    // Add all other translations...
    "examples.title": "Esempi di Libri",
    "examples.description":
      "Vedi come le avventure di altri bambini hanno preso vita nei loro libri personalizzati",
    "howItWorks.title": "Come Funziona",
    "pricing.title": "Opzioni Libro",
    "cta.title": "Pronto a Creare Magia?",
    "footer.copyright":
      "© 2024 Libro di Avventura Personalizzato. Tutti i diritti riservati.",
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
    "hero.subtitle2": "Mágicas con Tu Hijo",
    "hero.description":
      "Transforma a tu hijo en el héroe de su propio libro de aventuras personalizado. ¡Elige entre bosques encantados, misiones espaciales, expediciones submarinas y más!",
    "hero.startCreating": "Comenzar a Crear",
    "hero.seeExamples": "Ver Ejemplos",

    "examples.title": "Ejemplos de Libros",
    "howItWorks.title": "Cómo Funciona",
    "pricing.title": "Opciones de Libro",
    "cta.title": "¿Listo para Crear Magia?",
    "footer.copyright":
      "© 2024 Libro de Aventuras Personalizado. Todos los derechos reservados.",
  },
  ar: {
    // Navigation
    "nav.adventurePossibilities": "إمكانيات المغامرة",
    "nav.howItWorks": "كيف يعمل",
    "nav.examples": "أمثلة",
    "nav.pricing": "الأسعار",

    // Homepage
    "hero.subtitle": "كتب مغامرات شخصية للأطفال",
    "hero.title": "اصنع",
    "hero.titleHighlight": "مغامرات",
    "hero.subtitle2": "سحرية مع طفلك",
    "hero.description":
      "حول طفلك إلى بطل كتاب المغامرات الشخصي الخاص به. اختر من بين الغابات المسحورة، والمهام الفضائية، والرحلات تحت الماء، وأكثر!",
    "hero.startCreating": "ابدأ الإنشاء",
    "hero.seeExamples": "انظر الأمثلة",

    "examples.title": "أمثلة الكتب",
    "howItWorks.title": "كيف يعمل",
    "pricing.title": "خيارات الكتاب",
    "cta.title": "مستعد لصنع السحر؟",
    "footer.copyright": "© 2024 كتاب المغامرة الشخصي. جميع الحقوق محفوظة.",
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

    "examples.title": "Boekvoorbeelden",
    "howItWorks.title": "Hoe Het Werkt",
    "pricing.title": "Boekopties",
    "cta.title": "Klaar om Magie te Creëren?",
    "footer.copyright":
      "© 2024 Gepersonaliseerd Avontuurboek. Alle rechten voorbehouden.",
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

    "examples.title": "Buchbeispiele",
    "howItWorks.title": "Wie Es Funktioniert",
    "pricing.title": "Buchoptionen",
    "cta.title": "Bereit, Magie zu Erschaffen?",
    "footer.copyright":
      "© 2024 Personalisiertes Abenteuerbuch. Alle Rechte vorbehalten.",
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
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if no translation found
          }
        }
        break;
      }
    }

    return typeof value === "string" ? value : key;
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
