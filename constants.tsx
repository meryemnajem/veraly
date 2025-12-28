
import React from 'react';
import { Leaf, Recycle, TreePine, Users, QrCode, Scan, ShieldCheck, Eye, Palette } from 'lucide-react';

export const PRODUCTS = [
  {
    id: 1,
    name: "Gobelet Écologique",
    category: "Gobelets",
    image: "/products/gobelet.jpg",
    description:
      "Gobelet biodégradable conçu pour boissons chaudes et froides, respectueux de l’environnement et parfaitement adapté aux cafés, événements et entreprises.",
    features: ["Biodégradable", "Recyclable", "Résistant", "Contact alimentaire"],
  },

  {
    id: 2,
    name: "Sachet Kraft",
    category: "Sachets",
    image: "/products/sachet-kraft.jpg",
    description:
      "Sachet kraft écologique fabriqué en papier recyclé, idéal pour le transport de produits alimentaires et non alimentaires avec une excellente résistance.",
    features: ["Papier recyclé", "Écologique", "Résistant", "Compostable"],
  },

  {
    id: 3,
    name: "Boîte Kraft – Gamme Pâtisserie & Snacking",
    category: "Boîtes",
    image: "/products/boite-patisserie.jpg",
    description:
      "Emballage écologique premium, fabriqué en papier kraft recyclé, avec fenêtre transparente en matériau compostable, spécialement conçu pour les gâteaux, donuts, biscuits et produits gourmands.",
    features: ["Fenêtre compostable", "Papier recyclé", "Design premium", "Alimentaire"],
  },

  {
    id: 4,
    name: "Boîte Kraft Mini – Gamme Pâtisserie",
    category: "Boîtes",
    image: "/products/boite-mini.jpg",
    description:
      "Emballage premium en papier kraft recyclé, à fibres naturelles et matériaux compostables. Conçu pour mini pâtisseries, fruits secs, biscuits, chocolats et snacks gourmands.",
    features: ["Mini format", "Fibres naturelles", "Compostable", "Élégant"],
  },

  {
    id: 5,
    name: "Boîte Kraft – ÉcoSnack",
    category: "Boîtes",
    image: "/products/boite-ecosnack.jpg",
    description:
      "Boîte en papier kraft recyclé avec fenêtre transparente, idéale pour snacks, mini pâtisseries, biscuits, chocolats et confiseries. Design naturel, élégant et pratique pour pâtisseries, coffee shops et marques artisanales.",
    features: ["Fenêtre transparente", "Kraft recyclé", "Design naturel", "Pratique"],
  },
];

export const VALUES = [
  {
    id: 'v1',
    title: '100% Biodégradable',
    description: 'Tous nos produits se décomposent naturellement sans laisser de traces nocives.',
    icon: <Leaf className="w-8 h-8 text-emerald-600" />
  },
  {
    id: 'v2',
    title: 'Sur-Mesure',
    description: 'Nous adaptons nos solutions à vos besoins spécifiques : dimensions, formes et identité visuelle.',
    icon: <Palette className="w-8 h-8 text-emerald-600" />
  },
  {
    id: 'v3',
    title: 'Matériaux Durables',
    description: 'Issus de forêts gérées durablement et de sources responsables certifiées.',
    icon: <TreePine className="w-8 h-8 text-emerald-600" />
  },
  {
    id: 'v4',
    title: 'Engagement Social',
    description: 'Une production éthique qui respecte l’environnement et les communautés locales.',
    icon: <Users className="w-8 h-8 text-emerald-600" />
  }
];

export const TRACEABILITY_FEATURES = [
  {
    id: 't1',
    title: 'Code QR Unique',
    description: 'Chaque produit dispose d’un code QR unique pour une traçabilité totale.',
    icon: <QrCode className="w-6 h-6" />
  },
  {
    id: 't2',
    title: 'Scannez & Tracez',
    description: 'Suivez le parcours de votre emballage de la production au recyclage.',
    icon: <Scan className="w-6 h-6" />
  },
  {
    id: 't3',
    title: 'Certification Garantie',
    description: 'Vérifiez l’authenticité et les certifications écologiques de nos produits.',
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    id: 't4',
    title: 'Transparence Totale',
    description: 'Accédez aux informations complètes sur l’origine et la composition.',
    icon: <Eye className="w-6 h-6" />
  }
];
