// translations.js - Système de traduction multilingue

const translations = {
  fr: {
    // Header
    appTitle: "Reconnaissance des Navires SH3",
    themeDark: "Mode sombre",
    themeLight: "Mode clair",
    
    // Filtres
    filterCodeLabel: "Code M/F/K",
    filterCodePlaceholder: "Ex: MF, KMF...",
    filterFunnelLabel: "Position cheminée",
    filterSuperstructureLabel: "Superstructure",
    filterShipTypeLabel: "Type de navire",
    filterAll: "Tous",
    filterAmidship: "Amidship (Au milieu)",
    filterAft: "Aft (Arrière)",
    filterUnspecified: "Non spécifié",
    filterComposite: "Composite",
    filterSplit: "Split",
    filterPassenger: "Passenger",
    filterMerchants: "Marchands",
    filterTankers: "Pétroliers",
    filterPassengers: "Passagers",
    filterIslandsLabel: "Îles (Islands)",
    islandUnspecified: "Non spécifié",
    islandFront: "Avant",
    islandMiddle: "Milieu",
    islandAft: "Arrière",
    btnReset: "Réinitialiser",
    
    // Convoi
    "Convoi": "Convoi",
    "Ajouter au convoi": "Ajouter au convoi",
    "Retirer du convoi": "Retirer du convoi",
    emptyConvoy: "Aucun navire enregistré dans votre convoi.",
    
    // Résultats
    resultsLabel: "RÉSULTATS:",
    resultsShips: "navires",
    
    // Modal
    modalTitle: "Détails du navire",
    modalNavHint: "Cliquez sur l'image pour zoomer • Utilisez ← → pour naviguer",
    btnPrevious: "Précédent",
    btnNext: "Suivant",
    
    // Sections détails
    detailIdentification: "📋 Identification",
    detailDimensions: "📐 Dimensions",
    detailPerformance: "⚡ Performance",
    
    // Labels détails
    detailClass: "Classe",
    detailCode: "Code M/F/K",
    detailType: "Type",
    detailLength: "Longueur",
    detailWidth: "Largeur",
    detailDraft: "Tirant d'eau",
    detailMast: "Mât",
    detailSpeed: "Vitesse max",
    detailDisplacement: "Déplacement",
    detailRenown: "Renommée",
    
    // Types de navires
    shipTypeMerchant: "Marchand",
    shipTypeTanker: "Pétrolier",
    shipTypePassenger: "Passager",
    
    // Unités
    unitMeters: "m",
    unitKnots: "nœuds",
    unitTons: "t",
    unitPoints: "pts",
    
    // Messages
    noResults: "Aucun navire trouvé",
    noResultsIcon: "🚢",
    loading: "Chargement..."
  },
  
  en: {
    // Header
    appTitle: "SH3 Ship Recognition",
    themeDark: "Dark mode",
    themeLight: "Light mode",
    
    // Filters
    filterCodeLabel: "M/F/K Code",
    filterCodePlaceholder: "Ex: MF, KMF...",
    filterFunnelLabel: "Funnel position",
    filterSuperstructureLabel: "Superstructure",
    filterShipTypeLabel: "Ship type",
    filterAll: "All",
    filterAmidship: "Amidship",
    filterAft: "Aft",
    filterUnspecified: "Unspecified",
    filterComposite: "Composite",
    filterSplit: "Split",
    filterPassenger: "Passenger",
    filterMerchants: "Merchants",
    filterTankers: "Tankers",
    filterPassengers: "Passengers",
    filterIslandsLabel: "Islands",
    islandUnspecified: "Unspecified",
    islandFront: "Front",
    islandMiddle: "Middle",
    islandAft: "Aft",
    btnReset: "Reset",
    
    // Convoy
    "Convoi": "Convoy",
    "Ajouter au convoi": "Add to convoy",
    "Retirer du convoi": "Remove from convoy",
    emptyConvoy: "No ships in your convoy.",
    
    // Results
    resultsLabel: "RESULTS:",
    resultsShips: "ships",
    
    // Modal
    modalTitle: "Ship details",
    modalNavHint: "Click image to zoom • Use ← → to navigate",
    btnPrevious: "Previous",
    btnNext: "Next",
    
    // Detail sections
    detailIdentification: "📋 Identification",
    detailDimensions: "📐 Dimensions",
    detailPerformance: "⚡ Performance",
    
    // Detail labels
    detailClass: "Class",
    detailCode: "M/F/K Code",
    detailType: "Type",
    detailLength: "Length",
    detailWidth: "Width",
    detailDraft: "Draft",
    detailMast: "Mast",
    detailSpeed: "Max speed",
    detailDisplacement: "Displacement",
    detailRenown: "Renown",
    
    // Ship types
    shipTypeMerchant: "Merchant",
    shipTypeTanker: "Tanker",
    shipTypePassenger: "Passenger",
    
    // Units
    unitMeters: "m",
    unitKnots: "knots",
    unitTons: "t",
    unitPoints: "pts",
    
    // Messages
    noResults: "No ships found",
    noResultsIcon: "🚢",
    loading: "Loading..."
  },
  
  de: {
    // Header
    appTitle: "SH3 Schiffserkennung",
    themeDark: "Dunkler Modus",
    themeLight: "Heller Modus",
    
    // Filters
    filterCodeLabel: "M/F/K Code",
    filterCodePlaceholder: "Bsp: MF, KMF...",
    filterFunnelLabel: "Schornsteinposition",
    filterSuperstructureLabel: "Aufbau",
    filterShipTypeLabel: "Schiffstyp",
    filterAll: "Alle",
    filterAmidship: "Mittschiffs",
    filterAft: "Achtern",
    filterUnspecified: "Nicht angegeben",
    filterComposite: "Verbundaufbau",
    filterSplit: "Geteilter Aufbau",
    filterPassenger: "Passagieraufbau",
    filterMerchants: "Handelsschiffe",
    filterTankers: "Tanker",
    filterPassengers: "Passagierschiffe",
    filterIslandsLabel: "Inseln",
    islandUnspecified: "Nicht angegeben",
    islandFront: "Vorne",
    islandMiddle: "Mitte",
    islandAft: "Hinten",
    btnReset: "Zurücksetzen",
    
    // Convoy
    "Convoi": "Konvoi",
    "Ajouter au convoi": "Zum Konvoi hinzufügen",
    "Retirer du convoi": "Aus Konvoi entfernen",
    emptyConvoy: "Keine Schiffe in Ihrem Konvoi.",
    
    // Results
    resultsLabel: "ERGEBNISSE:",
    resultsShips: "Schiffe",
    
    // Modal
    modalTitle: "Schiffsdetails",
    modalNavHint: "Klicken zum Zoomen • ← → zur Navigation",
    btnPrevious: "Zurück",
    btnNext: "Weiter",
    
    // Detail sections
    detailIdentification: "📋 Identifikation",
    detailDimensions: "📐 Abmessungen",
    detailPerformance: "⚡ Leistung",
    
    // Detail labels
    detailClass: "Klasse",
    detailCode: "M/F/K Code",
    detailType: "Typ",
    detailLength: "Länge",
    detailWidth: "Breite",
    detailDraft: "Tiefgang",
    detailMast: "Mast",
    detailSpeed: "Höchstgeschwindigkeit",
    detailDisplacement: "Verdrängung",
    detailRenown: "Ruhm",
    
    // Ship types
    shipTypeMerchant: "Handelsschiff",
    shipTypeTanker: "Tanker",
    shipTypePassenger: "Passagierschiff",
    
    // Units
    unitMeters: "m",
    unitKnots: "Knoten",
    unitTons: "t",
    unitPoints: "Pkt",
    
    // Messages
    noResults: "Keine Schiffe gefunden",
    noResultsIcon: "🚢",
    loading: "Wird geladen..."
  }
};

// Fonction pour obtenir la traduction
function t(key) {
  const lang = state.language || 'fr';
  return translations[lang][key] || translations.fr[key] || key;
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { translations, t };
}