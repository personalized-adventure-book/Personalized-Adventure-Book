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
    "hero.subtitle": "Personalized Adventure Books for Kids 3-8",
    "hero.title": "Create Magical Adventures",
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

    // Form
    "form.parentName": "Your Name",
    "form.email": "Gmail Address",
    "form.childName": "Child's Name",
    "form.age": "Age",
    "form.gender": "Gender",
    "form.boy": "Boy",
    "form.girl": "Girl",
    "form.other": "Other",
    "form.adventureType": "Choose Adventure Type",
    "form.location": "Setting or Location",
    "form.keyActivities": "Key Activities",
    "form.favoriteColor": "Child's Favorite Color",
    "form.petName": "Pet's Name (if any)",
    "form.includeFriends": "Friends or Family to Include",
    "form.characters": "Favorite Characters or Themes",
    "form.specialDetails": "Special Details or Inside Jokes",
    "form.previous": "Previous",
    "form.next": "Next",
    "form.reviewBook": "Review My Book",

    // Pricing
    "pricing.title": "Book Options",
    "pricing.description":
      "Create lasting memories with a personalized book that your child will treasure forever. Choose the perfect option for your family's budget and preferences.",
    "pricing.digitalBook": "Digital Book",
    "pricing.digitalBookDesc": "Instant download PDF",
    "pricing.printedBook": "Printed Book",
    "pricing.printedBookDesc": "Professional hardcover",
    "pricing.buyDigital": "Buy Digital",
    "pricing.orderPrinted": "Order Printed",

    // Order
    "order.shippingAddress": "Shipping Address",
    "order.fullName": "Full Name",
    "order.streetAddress": "Street Address",
    "order.city": "City",
    "order.postalCode": "Postal Code",
    "order.country": "Country",
    "order.phone": "Phone Number",
    "order.paymentDetails": "Payment Details",
    "order.cardNumber": "Card Number",
    "order.expiryDate": "Expiry Date",
    "order.cvv": "CVV",
    "order.cardholderName": "Cardholder Name",
    "order.completePayment": "Complete Payment",
    "order.cancel": "Cancel",
    "order.confirmed": "Order Confirmed!",

    // Footer
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
    "hero.subtitle": "Livres d'Aventure Personnalisés pour Enfants 3-8 ans",
    "hero.title": "Créez des Aventures Magiques",
    "hero.titleHighlight": "Aventures",
    "hero.subtitle2": "Avec Votre Enfant comme Héros",
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

    // Form
    "form.parentName": "Votre Nom",
    "form.email": "Adresse Gmail",
    "form.childName": "Nom de l'Enfant",
    "form.age": "Âge",
    "form.gender": "Genre",
    "form.boy": "Garçon",
    "form.girl": "Fille",
    "form.other": "Autre",
    "form.adventureType": "Choisir le Type d'Aventure",
    "form.location": "Cadre ou Lieu",
    "form.keyActivities": "Activités Clés",
    "form.favoriteColor": "Couleur Préférée de l'Enfant",
    "form.petName": "Nom de l'Animal (si applicable)",
    "form.includeFriends": "Amis ou Famille à Inclure",
    "form.characters": "Personnages ou Thèmes Préférés",
    "form.specialDetails": "Détails Spéciaux ou Blagues Privées",
    "form.previous": "Précédent",
    "form.next": "Suivant",
    "form.reviewBook": "Réviser Mon Livre",

    // Pricing
    "pricing.title": "Options de Livre",
    "pricing.description":
      "Créez des souvenirs durables avec un livre personnalisé que votre enfant chérira pour toujours. Choisissez l'option parfaite pour le budget et les préférences de votre famille.",
    "pricing.digitalBook": "Livre Numérique",
    "pricing.digitalBookDesc": "Téléchargement PDF instantané",
    "pricing.printedBook": "Livre Imprimé",
    "pricing.printedBookDesc": "Couverture rigide professionnelle",
    "pricing.buyDigital": "Acheter Numérique",
    "pricing.orderPrinted": "Commander Imprimé",

    // Order
    "order.shippingAddress": "Adresse de Livraison",
    "order.fullName": "Nom Complet",
    "order.streetAddress": "Adresse de la Rue",
    "order.city": "Ville",
    "order.postalCode": "Code Postal",
    "order.country": "Pays",
    "order.phone": "Numéro de Téléphone",
    "order.paymentDetails": "Détails de Paiement",
    "order.cardNumber": "Numéro de Carte",
    "order.expiryDate": "Date d'Expiration",
    "order.cvv": "CVV",
    "order.cardholderName": "Nom du Titulaire de la Carte",
    "order.completePayment": "Finaliser le Paiement",
    "order.cancel": "Annuler",
    "order.confirmed": "Commande Confirmée!",

    // Footer
    "footer.company": "Entreprise",
    "footer.about": "À Propos",
    "footer.privacy": "Confidentialité",
    "footer.terms": "Conditions",
    "footer.copyright":
      "© 2024 Livre d'Aventure Personnalisé. Tous droits réservés.",
  },
  it: {
    // Navigation
    "nav.adventurePossibilities": "Possibilità di Avventura",
    "nav.howItWorks": "Come Funziona",
    "nav.examples": "Esempi",
    "nav.pricing": "Prezzi",

    // Homepage
    "hero.subtitle": "Libri di Avventura Personalizzati per Bambini 3-8 anni",
    "hero.title": "Crea Avventure Magiche",
    "hero.titleHighlight": "Avventure",
    "hero.subtitle2": "Con Tuo Figlio come Protagonista",
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

    // Form
    "form.parentName": "Il Tuo Nome",
    "form.email": "Indirizzo Gmail",
    "form.childName": "Nome del Bambino",
    "form.age": "Età",
    "form.gender": "Genere",
    "form.boy": "Maschio",
    "form.girl": "Femmina",
    "form.other": "Altro",
    "form.adventureType": "Scegli Tipo di Avventura",
    "form.location": "Ambientazione o Luogo",
    "form.keyActivities": "Attività Chiave",
    "form.favoriteColor": "Colore Preferito del Bambino",
    "form.petName": "Nome dell'Animale (se presente)",
    "form.includeFriends": "Amici o Famiglia da Includere",
    "form.characters": "Personaggi o Temi Preferiti",
    "form.specialDetails": "Dettagli Speciali o Battute Private",
    "form.previous": "Precedente",
    "form.next": "Successivo",
    "form.reviewBook": "Rivedi il Mio Libro",

    // Pricing
    "pricing.title": "Opzioni Libro",
    "pricing.description":
      "Crea ricordi duraturi con un libro personalizzato che tuo figlio amerà per sempre. Scegli l'opzione perfetta per il budget e le preferenze della tua famiglia.",
    "pricing.digitalBook": "Libro Digitale",
    "pricing.digitalBookDesc": "Download PDF istantaneo",
    "pricing.printedBook": "Libro Stampato",
    "pricing.printedBookDesc": "Copertina rigida professionale",
    "pricing.buyDigital": "Compra Digitale",
    "pricing.orderPrinted": "Ordina Stampato",

    // Order
    "order.shippingAddress": "Indirizzo di Spedizione",
    "order.fullName": "Nome Completo",
    "order.streetAddress": "Indirizzo Via",
    "order.city": "Città",
    "order.postalCode": "Codice Postale",
    "order.country": "Paese",
    "order.phone": "Numero di Telefono",
    "order.paymentDetails": "Dettagli di Pagamento",
    "order.cardNumber": "Numero Carta",
    "order.expiryDate": "Data di Scadenza",
    "order.cvv": "CVV",
    "order.cardholderName": "Nome Titolare Carta",
    "order.completePayment": "Completa Pagamento",
    "order.cancel": "Annulla",
    "order.confirmed": "Ordine Confermato!",

    // Footer
    "footer.company": "Azienda",
    "footer.about": "Chi Siamo",
    "footer.privacy": "Privacy",
    "footer.terms": "Termini",
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
    "hero.subtitle": "Libros de Aventura Personalizados para Niños 3-8 años",
    "hero.title": "Crea Aventuras Mágicas",
    "hero.titleHighlight": "Aventuras",
    "hero.subtitle2": "Protagonizadas por Tu Hijo",
    "hero.description":
      "Transforma a tu hijo en el héroe de su propio libro de aventura personalizado. ¡Elige entre bosques encantados, misiones espaciales, expediciones submarinas y más!",
    "hero.startCreating": "Empezar a Crear",
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
      "Explora los mundos mágicos que podemos crear para tu hijo - ¡y muchos más!",
    "adventure.spaceMission": "Misión Espacial",
    "adventure.spaceMissionDesc":
      "Despega hacia planetas lejanos y conoce amigos alienígenas",
    "adventure.enchantedForest": "Bosque Encantado",
    "adventure.enchantedForestDesc":
      "Descubre criaturas m��gicas y tesoros ocultos",
    "adventure.royalCastle": "Castillo Real",
    "adventure.royalCastleDesc":
      "Conviértete en un caballero valiente o una princesa sabia",
    "adventure.pirateVoyage": "Viaje Pirata",
    "adventure.pirateVoyageDesc": "Navega los siete mares en busca de tesoros",
    "adventure.superheroAcademy": "Academia de Superhéroes",
    "adventure.superheroAcademyDesc":
      "Entrénate para convertirte en el próximo gran héroe del mundo",
    "adventure.underwaterWorld": "Mundo Submarino",
    "adventure.underwaterWorldDesc":
      "Sumérgete profundamente para explorar reinos de coral",

    // Form
    "form.parentName": "Tu Nombre",
    "form.email": "Dirección Gmail",
    "form.childName": "Nombre del Niño",
    "form.age": "Edad",
    "form.gender": "Género",
    "form.boy": "Niño",
    "form.girl": "Niña",
    "form.other": "Otro",
    "form.adventureType": "Elegir Tipo de Aventura",
    "form.location": "Escenario o Ubicación",
    "form.keyActivities": "Actividades Clave",
    "form.favoriteColor": "Color Favorito del Niño",
    "form.petName": "Nombre de la Mascota (si la hay)",
    "form.includeFriends": "Amigos o Familia a Incluir",
    "form.characters": "Personajes o Temas Favoritos",
    "form.specialDetails": "Detalles Especiales o Bromas Privadas",
    "form.previous": "Anterior",
    "form.next": "Siguiente",
    "form.reviewBook": "Revisar Mi Libro",

    // Pricing
    "pricing.title": "Opciones de Libro",
    "pricing.description":
      "Crea recuerdos duraderos con un libro personalizado que tu hijo atesorará para siempre. Elige la opción perfecta para el presupuesto y preferencias de tu familia.",
    "pricing.digitalBook": "Libro Digital",
    "pricing.digitalBookDesc": "Descarga PDF instantánea",
    "pricing.printedBook": "Libro Impreso",
    "pricing.printedBookDesc": "Tapa dura profesional",
    "pricing.buyDigital": "Comprar Digital",
    "pricing.orderPrinted": "Ordenar Impreso",

    // Order
    "order.shippingAddress": "Dirección de Envío",
    "order.fullName": "Nombre Completo",
    "order.streetAddress": "Dirección de la Calle",
    "order.city": "Ciudad",
    "order.postalCode": "Código Postal",
    "order.country": "País",
    "order.phone": "Número de Teléfono",
    "order.paymentDetails": "Detalles de Pago",
    "order.cardNumber": "Número de Tarjeta",
    "order.expiryDate": "Fecha de Vencimiento",
    "order.cvv": "CVV",
    "order.cardholderName": "Nombre del Titular de la Tarjeta",
    "order.completePayment": "Completar Pago",
    "order.cancel": "Cancelar",
    "order.confirmed": "¡Pedido Confirmado!",

    // Footer
    "footer.company": "Empresa",
    "footer.about": "Acerca de",
    "footer.privacy": "Privacidad",
    "footer.terms": "Términos",
    "footer.copyright":
      "© 2024 Libro de Aventura Personalizado. Todos los derechos reservados.",
  },
  ar: {
    // Navigation
    "nav.adventurePossibilities": "إمكانيات المغامرة",
    "nav.howItWorks": "كيف يعمل",
    "nav.examples": "أمثلة",
    "nav.pricing": "الأسعار",

    // Homepage
    "hero.subtitle": "كتب المغامرات الشخصية للأطفال 3-8 سنوات",
    "hero.title": "اصنع مغامرات سحرية",
    "hero.titleHighlight": "مغامرات",
    "hero.subtitle2": "بطولة طفلك",
    "hero.description":
      "حول طفلك إلى بطل كتاب المغامرة الشخصي الخاص به. اختر من بين الغابات المسحورة ومهام الفضاء والاستكشافات تحت الماء والمزيد!",
    "hero.startCreating": "ابدأ الإنشاء",
    "hero.seeExamples": "شاهد الأمثلة",

    // Features
    "features.personalizedCharacters": "شخصيات مخصصة",
    "features.personalizedCharactersDesc":
      "أدرج طفلك وأصدقاءه وأفراد أسرته في القصة",
    "features.instantPreview": "معاينة فورية",
    "features.instantPreviewDesc":
      "شاهد كتابك ينبض بالحياة مع صفحات المعاينة الفورية",
    "features.printOrDigital": "مطبوع أو رقمي",
    "features.printOrDigitalDesc":
      "احصل على كتاب مادي مُسلم أو قم بالتحميل فوراً",

    // Adventure Types
    "adventure.possibilities": "إمكانيات المغامرة",
    "adventure.possibilitiesDesc":
      "استكشف العوالم السحرية التي يمكننا إنشاؤها لطفلك - والمزيد!",
    "adventure.spaceMission": "مهمة فضائية",
    "adventure.spaceMissionDesc": "انطلق إلى كواكب بعيدة والتق بأصدقاء فضائيين",
    "adventure.enchantedForest": "الغابة المسحورة",
    "adventure.enchantedForestDesc": "اكتشف المخلوقات السحرية والكنوز المخفية",
    "adventure.royalCastle": "القلعة الملكية",
    "adventure.royalCastleDesc": "كن فارساً شجاعاً أو أميرة حكيمة",
    "adventure.pirateVoyage": "رحلة القراصنة",
    "adventure.pirateVoyageDesc": "أبحر في البحار السبعة بحثاً عن الكنز",
    "adventure.superheroAcademy": "أكاديمية الأبطال الخارقين",
    "adventure.superheroAcademyDesc":
      "تدرب لتصبح البطل العظيم التالي في العالم",
    "adventure.underwaterWorld": "العالم تحت الماء",
    "adventure.underwaterWorldDesc": "اغطس عميقاً لاستكشاف ممالك المرجان",

    // Form
    "form.parentName": "اسمك",
    "form.email": "عنوان Gmail",
    "form.childName": "اسم الطفل",
    "form.age": "العمر",
    "form.gender": "الجنس",
    "form.boy": "ولد",
    "form.girl": "بنت",
    "form.other": "آخر",
    "form.adventureType": "اختر نوع المغامرة",
    "form.location": "الإعداد أو الموقع",
    "form.keyActivities": "الأنشطة الرئيسية",
    "form.favoriteColor": "اللون المفضل للطفل",
    "form.petName": "اسم الحيوان الأليف (إن وجد)",
    "form.includeFriends": "الأصدقاء أو العائلة المراد تضمينهم",
    "form.characters": "الشخصيات أو المواضيع المفضلة",
    "form.specialDetails": "تفاصيل خاصة أو نكات داخلية",
    "form.previous": "السابق",
    "form.next": "التالي",
    "form.reviewBook": "مراجعة كتابي",

    // Pricing
    "pricing.title": "خيارات الكتاب",
    "pricing.description":
      "اصنع ذكريات دائمة مع كتاب شخصي سيحتفظ به طفلك إلى الأبد. اختر الخيار المثالي لميزانية وتفضيلات عائلتك.",
    "pricing.digitalBook": "كتاب رقمي",
    "pricing.digitalBookDesc": "تحميل PDF فوري",
    "pricing.printedBook": "كتاب مطبوع",
    "pricing.printedBookDesc": "غلاف صلب احترافي",
    "pricing.buyDigital": "شراء رقمي",
    "pricing.orderPrinted": "طلب مطبوع",

    // Order
    "order.shippingAddress": "عنوان الشحن",
    "order.fullName": "الاسم الكامل",
    "order.streetAddress": "عنوان الشارع",
    "order.city": "المدينة",
    "order.postalCode": "الرمز البريدي",
    "order.country": "البلد",
    "order.phone": "رقم الهاتف",
    "order.paymentDetails": "تفاصيل الدفع",
    "order.cardNumber": "رقم البطاقة",
    "order.expiryDate": "تاريخ الانتهاء",
    "order.cvv": "CVV",
    "order.cardholderName": "اسم حامل البطاقة",
    "order.completePayment": "إكمال الدفع",
    "order.cancel": "إلغاء",
    "order.confirmed": "تم تأكيد الطلب!",

    // Footer
    "footer.company": "الشركة",
    "footer.about": "حول",
    "footer.privacy": "الخصوصية",
    "footer.terms": "الشروط",
    "footer.copyright": "© 2024 كتاب المغامرة الشخصي. جميع الحقوق محفوظة.",
  },
  nl: {
    // Navigation
    "nav.adventurePossibilities": "Avontuur Mogelijkheden",
    "nav.howItWorks": "Hoe Het Werkt",
    "nav.examples": "Voorbeelden",
    "nav.pricing": "Prijzen",

    // Homepage
    "hero.subtitle": "Gepersonaliseerde Avontuurboeken voor Kinderen 3-8 jaar",
    "hero.title": "Creëer Magische Avonturen",
    "hero.titleHighlight": "Avonturen",
    "hero.subtitle2": "Met Jouw Kind als Hoofdpersoon",
    "hero.description":
      "Transformeer je kind tot de held van zijn eigen gepersonaliseerde avontuurboek. Kies uit betoverde bossen, ruimtemissies, onderwaterexpedities en meer!",
    "hero.startCreating": "Begin met Creëren",
    "hero.seeExamples": "Bekijk Voorbeelden",

    // Features
    "features.personalizedCharacters": "Gepersonaliseerde Personages",
    "features.personalizedCharactersDesc":
      "Voeg je kind, vrienden en familieleden toe aan het verhaal",
    "features.instantPreview": "Directe Voorvertoning",
    "features.instantPreviewDesc":
      "Zie je boek tot leven komen met directe voorbeeldpagina's",
    "features.printOrDigital": "Gedrukt of Digitaal",
    "features.printOrDigitalDesc":
      "Ontvang een fysiek boek bezorgd of download direct",

    // Adventure Types
    "adventure.possibilities": "Avontuur Mogelijkheden",
    "adventure.possibilitiesDesc":
      "Verken de magische werelden die we voor je kind kunnen creëren - en nog veel meer!",
    "adventure.spaceMission": "Ruimtemissie",
    "adventure.spaceMissionDesc":
      "Vertrek naar verre planeten en ontmoet buitenaardse vrienden",
    "adventure.enchantedForest": "Betoverd Bos",
    "adventure.enchantedForestDesc":
      "Ontdek magische wezens en verborgen schatten",
    "adventure.royalCastle": "Koninklijk Kasteel",
    "adventure.royalCastleDesc": "Word een moedige ridder of wijze prinses",
    "adventure.pirateVoyage": "Piratenreis",
    "adventure.pirateVoyageDesc": "Zeil de zeven zeeën op zoek naar schatten",
    "adventure.superheroAcademy": "Superhelden Academie",
    "adventure.superheroAcademyDesc":
      "Train om de volgende grote held van de wereld te worden",
    "adventure.underwaterWorld": "Onderwaterwereld",
    "adventure.underwaterWorldDesc": "Duik diep om koraalrijken te verkennen",

    // Form
    "form.parentName": "Jouw Naam",
    "form.email": "Gmail Adres",
    "form.childName": "Naam van het Kind",
    "form.age": "Leeftijd",
    "form.gender": "Geslacht",
    "form.boy": "Jongen",
    "form.girl": "Meisje",
    "form.other": "Anders",
    "form.adventureType": "Kies Avontuurtype",
    "form.location": "Setting of Locatie",
    "form.keyActivities": "Belangrijkste Activiteiten",
    "form.favoriteColor": "Favoriete Kleur van het Kind",
    "form.petName": "Naam van Huisdier (indien van toepassing)",
    "form.includeFriends": "Vrienden of Familie om Op te Nemen",
    "form.characters": "Favoriete Personages of Thema's",
    "form.specialDetails": "Speciale Details of Inside Grapjes",
    "form.previous": "Vorige",
    "form.next": "Volgende",
    "form.reviewBook": "Bekijk Mijn Boek",

    // Pricing
    "pricing.title": "Boek Opties",
    "pricing.description":
      "Creëer blijvende herinneringen met een gepersonaliseerd boek dat je kind voor altijd zal koesteren. Kies de perfecte optie voor het budget en de voorkeuren van je gezin.",
    "pricing.digitalBook": "Digitaal Boek",
    "pricing.digitalBookDesc": "Directe PDF download",
    "pricing.printedBook": "Gedrukt Boek",
    "pricing.printedBookDesc": "Professionele hardcover",
    "pricing.buyDigital": "Koop Digitaal",
    "pricing.orderPrinted": "Bestel Gedrukt",

    // Order
    "order.shippingAddress": "Verzendadres",
    "order.fullName": "Volledige Naam",
    "order.streetAddress": "Straatnaam en Huisnummer",
    "order.city": "Stad",
    "order.postalCode": "Postcode",
    "order.country": "Land",
    "order.phone": "Telefoonnummer",
    "order.paymentDetails": "Betalingsgegevens",
    "order.cardNumber": "Kaartnummer",
    "order.expiryDate": "Vervaldatum",
    "order.cvv": "CVV",
    "order.cardholderName": "Naam Kaarthouder",
    "order.completePayment": "Betaling Voltooien",
    "order.cancel": "Annuleren",
    "order.confirmed": "Bestelling Bevestigd!",

    // Footer
    "footer.company": "Bedrijf",
    "footer.about": "Over Ons",
    "footer.privacy": "Privacy",
    "footer.terms": "Voorwaarden",
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
    "hero.subtitle": "Personalisierte Abenteuerbücher für Kinder 3-8 Jahre",
    "hero.title": "Erstelle Magische Abenteuer",
    "hero.titleHighlight": "Abenteuer",
    "hero.subtitle2": "Mit Deinem Kind als Hauptfigur",
    "hero.description":
      "Verwandle dein Kind in den Helden seines eigenen personalisierten Abenteuerbuchs. Wähle aus verzauberten Wäldern, Weltraummissionen, Unterwasser-Expeditionen und mehr!",
    "hero.startCreating": "Mit Erstellen Beginnen",
    "hero.seeExamples": "Beispiele Ansehen",

    // Features
    "features.personalizedCharacters": "Personalisierte Charaktere",
    "features.personalizedCharactersDesc":
      "Füge dein Kind, Freunde und Familienmitglieder zur Geschichte hinzu",
    "features.instantPreview": "Sofortige Vorschau",
    "features.instantPreviewDesc":
      "Sieh dein Buch mit sofortigen Vorschauseiten zum Leben erwachen",
    "features.printOrDigital": "Gedruckt oder Digital",
    "features.printOrDigitalDesc":
      "Erhalte ein physisches Buch geliefert oder lade sofort herunter",

    // Adventure Types
    "adventure.possibilities": "Abenteuer-Möglichkeiten",
    "adventure.possibilitiesDesc":
      "Erkunde die magischen Welten, die wir für dein Kind erschaffen können - und viele mehr!",
    "adventure.spaceMission": "Weltraummission",
    "adventure.spaceMissionDesc":
      "Starte zu fernen Planeten und triff außerirdische Freunde",
    "adventure.enchantedForest": "Verzauberter Wald",
    "adventure.enchantedForestDesc":
      "Entdecke magische Kreaturen und versteckte Schätze",
    "adventure.royalCastle": "Königliches Schloss",
    "adventure.royalCastleDesc":
      "Werde ein mutiger Ritter oder eine weise Prinzessin",
    "adventure.pirateVoyage": "Piratenreise",
    "adventure.pirateVoyageDesc":
      "Segle die sieben Meere auf der Suche nach Schätzen",
    "adventure.superheroAcademy": "Superhelden-Akademie",
    "adventure.superheroAcademyDesc":
      "Trainiere, um der nächste große Held der Welt zu werden",
    "adventure.underwaterWorld": "Unterwasserwelt",
    "adventure.underwaterWorldDesc":
      "Tauche tief ein, um Korallenreiche zu erkunden",

    // Form
    "form.parentName": "Dein Name",
    "form.email": "Gmail-Adresse",
    "form.childName": "Name des Kindes",
    "form.age": "Alter",
    "form.gender": "Geschlecht",
    "form.boy": "Junge",
    "form.girl": "Mädchen",
    "form.other": "Andere",
    "form.adventureType": "Abenteuertyp Wählen",
    "form.location": "Schauplatz oder Ort",
    "form.keyActivities": "Hauptaktivitäten",
    "form.favoriteColor": "Lieblingsfarbe des Kindes",
    "form.petName": "Name des Haustiers (falls vorhanden)",
    "form.includeFriends": "Freunde oder Familie zum Einbeziehen",
    "form.characters": "Lieblings-Charaktere oder Themen",
    "form.specialDetails": "Besondere Details oder Insider-Witze",
    "form.previous": "Zurück",
    "form.next": "Weiter",
    "form.reviewBook": "Mein Buch Überprüfen",

    // Pricing
    "pricing.title": "Buch-Optionen",
    "pricing.description":
      "Schaffe bleibende Erinnerungen mit einem personalisierten Buch, das dein Kind für immer schätzen wird. Wähle die perfekte Option für das Budget und die Vorlieben deiner Familie.",
    "pricing.digitalBook": "Digitales Buch",
    "pricing.digitalBookDesc": "Sofortiger PDF-Download",
    "pricing.printedBook": "Gedrucktes Buch",
    "pricing.printedBookDesc": "Professioneller Hardcover",
    "pricing.buyDigital": "Digital Kaufen",
    "pricing.orderPrinted": "Gedruckt Bestellen",

    // Order
    "order.shippingAddress": "Versandadresse",
    "order.fullName": "Vollständiger Name",
    "order.streetAddress": "Straßenadresse",
    "order.city": "Stadt",
    "order.postalCode": "Postleitzahl",
    "order.country": "Land",
    "order.phone": "Telefonnummer",
    "order.paymentDetails": "Zahlungsdetails",
    "order.cardNumber": "Kartennummer",
    "order.expiryDate": "Ablaufdatum",
    "order.cvv": "CVV",
    "order.cardholderName": "Name des Karteninhabers",
    "order.completePayment": "Zahlung Abschließen",
    "order.cancel": "Abbrechen",
    "order.confirmed": "Bestellung Bestätigt!",

    // Footer
    "footer.company": "Unternehmen",
    "footer.about": "Über Uns",
    "footer.privacy": "Datenschutz",
    "footer.terms": "Bedingungen",
    "footer.copyright":
      "© 2024 Personalisiertes Abenteuerbuch. Alle Rechte vorbehalten.",
  },
};

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined,
);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      <div dir={language === "ar" ? "rtl" : "ltr"}>{children}</div>
    </TranslationContext.Provider>
  );
};
