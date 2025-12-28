// frontend/services/ecoAiService.ts

export type Rule = {
  keywords: string[];
  response: string;
};

// ✅ Normalisation : minuscules + suppression accents + nettoyage
function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // enlève accents
    .replace(/[^a-z0-9\s]/g, " ")    // enlève ponctuation
    .replace(/\s+/g, " ")
    .trim();
}

// ✅ Score : plus il y a de mots-clés qui matchent, plus la règle est pertinente
function scoreRule(text: string, rule: Rule): number {
  let score = 0;
  for (const kw of rule.keywords) {
    const k = normalizeText(kw);
    if (!k) continue;
    if (text.includes(k)) score += 3;
    // bonus si c'est un mot entier (évite certains faux positifs)
    const re = new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
    if (re.test(text)) score += 2;
  }
  return score;
}

const rules: Rule[] = [
  // =========================
  // 1) Salutations / base (1-15)
  // =========================
  { keywords: ["bonjour", "salut", "hello", "hey", "coucou"], response: "Bonjour 😊 Je suis l’Eco-Conseiller Veraly. Posez-moi vos questions sur nos emballages, la traçabilité QR, ou un devis." },
  { keywords: ["merci", "thanks", "thx"], response: "Avec plaisir 🌱 Si vous voulez, dites-moi votre produit (boisson / snack / plat) et la quantité, je vous conseille le meilleur emballage." },
  { keywords: ["qui es tu", "tu es qui", "c est quoi veraly", "veraly c'est quoi"], response: "Je suis l’Eco-Conseiller Veraly : j’aide à choisir des emballages écologiques, expliquer les matières, et la traçabilité via QR code." },
  { keywords: ["aide", "help", "peux tu m aider", "assist"], response: "Oui ✅ Dites-moi : 1) type de produit (chaud/froid), 2) quantité, 3) impression logo ou non." },
  { keywords: ["au revoir", "bye", "a bientot", "a plus"], response: "À bientôt 👋 Je reste disponible si vous avez une question sur le kraft, compostable, ou QR code." },
  { keywords: ["tu peux faire quoi", "tes fonctions", "que fais tu"], response: "Je peux : conseiller un emballage, expliquer kraft/PLA/carton, donner infos traçabilité QR, et guider pour demander un devis." },
  { keywords: ["livraison", "livrer", "shipping"], response: "Pour la livraison : indiquez votre ville/pays, la quantité et le délai souhaité. Je peux vous dire les options habituelles et ce qu’il faut préciser au devis." },
  { keywords: ["devis", "quote", "prix", "tarif"], response: "Pour un devis rapide : type d’emballage + dimensions + quantité + impression logo (oui/non) + destination livraison." },
  { keywords: ["contact", "email", "telephone", "tel"], response: "Pour nous contacter : utilisez la section Contact du site (email/téléphone). Dites-moi aussi votre besoin, je vous prépare les infos à envoyer." },
  { keywords: ["certificat", "certification", "norme"], response: "Les certifications dépendent du produit (contact alimentaire, compostable, recyclabilité). Dites-moi la matière et l’usage, je vous indique quoi demander." },
  { keywords: ["ecologique", "eco", "durable", "responsable"], response: "Écologique = réduire plastique, choisir matières recyclables/compostables, et optimiser le transport. Veraly privilégie des solutions à faible impact." },
  { keywords: ["temps", "delai", "lead time"], response: "Le délai dépend : stock, personnalisation, quantité et livraison. Pour un projet personnalisé, précisez la date limite souhaitée." },
  { keywords: ["minimum", "moq", "quantite minimale"], response: "La quantité minimale (MOQ) varie selon le produit et la personnalisation. Donnez votre quantité cible, je vous oriente." },
  { keywords: ["impression", "logo", "personnalise", "personnalisation"], response: "Oui ✅ On peut personnaliser (logo, couleurs, dimensions). Dites : format, quantité, nombre de couleurs, et type d’encre souhaitée." },
  { keywords: ["j ai un probleme", "bug", "erreur"], response: "Ok ✅ Dites-moi exactement le message d’erreur (copiez la console) et quel fichier vous modifiez, je vous guide." },

  // =========================
  // 2) Matières / définitions (16-70)
  // =========================
  { keywords: ["papier kraft", "kraft"], response: "Le papier kraft est un papier robuste, souvent brun, fabriqué à partir de fibres de bois. Il est très utilisé pour sacs/sachets et souvent recyclable selon traitement (pelliculage, encres, etc.)." },
  { keywords: ["papier", "carton"], response: "Papier/carton : bonnes options écologiques si bien triés. Le carton est plus rigide, le papier plus léger. Le choix dépend du produit (poids, gras, humidité)." },
  { keywords: ["biodegradable", "biodégradable"], response: "Biodégradable = se dégrade naturellement avec le temps. Attention : ce mot seul ne garantit pas compostabilité industrielle ou domestique." },
  { keywords: ["compostable", "compost"], response: "Compostable = se décompose en conditions de compost (souvent industriel). Vérifiez la norme/certification et les conditions de traitement." },
  { keywords: ["recyclable", "recyclage"], response: "Recyclable = peut être collecté et transformé. La recyclabilité réelle dépend de la filière locale et de la composition (mono-matière > multi-couches)." },
  { keywords: ["pla"], response: "PLA (acide polylactique) : bioplastique souvent compostable industriellement, utilisé pour gobelets/couvercles. Il n’aime pas la chaleur élevée." },
  { keywords: ["pet", "rpet"], response: "PET : plastique transparent courant. rPET = PET recyclé. Bonne option si filière de recyclage disponible." },
  { keywords: ["pp", "polypropylene"], response: "PP (polypropylène) : résiste mieux à la chaleur. Utilisé pour contenants chauds. Recyclable selon filière locale." },
  { keywords: ["pe", "polyethylene", "polyéthylène"], response: "PE : utilisé en films/sachets. Recyclage possible selon filière. Mono-matière = meilleur." },
  { keywords: ["bagasse"], response: "Bagasse : fibre de canne à sucre. Très utilisée pour barquettes/assiettes. Bonne tenue pour aliments, souvent compostable (selon certification)." },
  { keywords: ["bambou"], response: "Bambou : matière fibreuse utilisée pour certains emballages/ustensiles. Vérifiez toujours contact alimentaire et traitement." },
  { keywords: ["cellulose"], response: "Cellulose : dérivée de fibres végétales. Peut être utilisée pour films/emballages transparents (selon produit)." },
  { keywords: ["aluminium"], response: "Aluminium : bonne barrière (gras/chaleur) et recyclable si bien trié. Impact de production élevé mais recyclable plusieurs fois." },
  { keywords: ["verre"], response: "Verre : réutilisable et recyclable, mais lourd → transport plus coûteux. Très bien pour réemploi." },
  { keywords: ["encre", "encres"], response: "Encres : privilégier encres à l’eau ou végétales. Pour recyclage/compost, l’encre et le pelliculage peuvent changer le tri." },
  { keywords: ["pelliculage", "lamination", "film"], response: "Pelliculage = couche protectrice (brillance, barrière). Mais peut réduire la recyclabilité si multi-matière. On privilégie solutions mono-matière." },
  { keywords: ["contact alimentaire", "alimentaire"], response: "Contact alimentaire : l’emballage doit être conforme aux normes en vigueur. Dites-moi chaud/froid et type d’aliment (gras, liquide, sec)." },
  { keywords: ["chaud", "boisson chaude", "soupe"], response: "Pour le chaud : privilégiez carton avec barrière adaptée ou PP selon usage. Évitez PLA si température élevée." },
  { keywords: ["froid", "boisson froide", "glace"], response: "Pour le froid : PLA/PET/rPET ou carton selon le besoin. Pour boissons très froides, attention à la condensation." },
  { keywords: ["huile", "gras", "aliment gras"], response: "Pour aliments gras : il faut une bonne barrière (papier traité, carton barrière, ou autre solution). Dites le produit exact." },
  { keywords: ["liquide", "sauce", "soupes", "jus"], response: "Liquides : il faut une étanchéité (carton barrière ou plastique adapté). Dites si c’est chaud/froid et le volume." },
  { keywords: ["odeur", "barriere", "barrière"], response: "Barrière : capacité à bloquer graisse, humidité, oxygène. Plus l’aliment est exigeant, plus la barrière doit être adaptée." },
  { keywords: ["micro onde", "micro-ondes", "microwave"], response: "Micro-ondes : certains contenants carton/PP peuvent convenir. Il faut un produit certifié pour cet usage (et éviter films inadaptés)." },
  { keywords: ["congelation", "congélation", "freezer"], response: "Congélation : vérifier résistance au froid/condensation. Certains plastiques et cartons barrières sont adaptés." },
  { keywords: ["stockage", "stocker"], response: "Stockage : gardez les emballages au sec, à l’abri chaleur et soleil. L’humidité peut déformer papier/carton." },
  { keywords: ["durabilite", "durabilité", "resistant", "solide"], response: "Solidité : dépend de la matière, grammage, et design (soufflets, renforts). Donnez le poids du produit à emballer." },
  { keywords: ["grammage"], response: "Grammage = épaisseur/poids du papier (g/m²). Plus il est élevé, plus c’est robuste, mais plus coûteux." },
  { keywords: ["anti fuite", "etanche", "étanche"], response: "Étanchéité : possible via revêtement/film/barrière. On choisit selon liquide, durée, température." },
  { keywords: ["odeur plastique"], response: "Si une odeur plastique apparaît, c’est souvent lié à une matière/stockage. On privilégie matières certifiées contact alimentaire." },
  { keywords: ["sans plastique", "0 plastique", "zero plastique"], response: "Sans plastique : possible pour plusieurs usages (papier/carton/bagasse). Mais pour liquide/gras, une barrière est parfois nécessaire." },
  { keywords: ["reutilisable", "réutilisable", "reemploi", "réemploi"], response: "Réemploi : très bon pour réduire l’impact. Souvent via contenants réutilisables et consigne (selon modèle business)." },
  { keywords: ["compostable maison", "compostage domestique"], response: "Compostage domestique : plus exigeant que compost industriel. Il faut une certification/mention adaptée. Sinon, compost industriel recommandé." },
  { keywords: ["compost industriel", "industriel"], response: "Compost industriel : conditions contrôlées (température/humidité). Beaucoup d’emballages compostables nécessitent ces conditions." },
  { keywords: ["fsc"], response: "FSC : label indiquant une gestion forestière responsable (matière bois/papier). Bon indicateur pour papier/carton." },
  { keywords: ["pefc"], response: "PEFC : certification de gestion durable des forêts, similaire à FSC selon pays/chaîne d’approvisionnement." },
  { keywords: ["co2", "carbone", "empreinte carbone"], response: "Empreinte carbone : dépend matière + production + transport. Carton/papier bien sourcés et optimisés logistique réduisent souvent l’impact." },
  { keywords: ["lca", "analyse cycle de vie"], response: "ACV/LCA : méthode pour mesurer l’impact environnemental complet. Utile pour comparer deux solutions d’emballage." },
  { keywords: ["mono matiere", "mono-matiere", "monomatiere"], response: "Mono-matière = plus facile à recycler. Les emballages multi-couches sont plus compliqués à trier." },
  { keywords: ["multi couche", "multicouche"], response: "Multi-couches : meilleures barrières, mais recyclage plus difficile. On privilégie quand c’est nécessaire (liquides, gras, longue conservation)." },
  { keywords: ["odeur", "humidite", "humidité"], response: "Humidité : elle peut ramollir papier/carton. Choisissez un grammage/barrière adapté si condensation." },

  // =========================
  // 3) Produits Veraly (71-120)
  // =========================
  { keywords: ["sachet", "sachets"], response: "Sachets : parfaits pour snacks, boulangerie, épicerie, ou packaging boutique. Dites-moi dimensions et usage (sec/gras)." },
  { keywords: ["gobelet", "gobelets"], response: "Gobelets : pour boissons chaudes ou froides. Pour le chaud on préfère carton barrière, pour le froid PLA/PET selon besoins." },
  { keywords: ["barquette", "barquettes"], response: "Barquettes : pratiques pour plats à emporter. On choisit selon chaleur, sauce et graisse." },
  { keywords: ["sac", "sacs"], response: "Sacs kraft : très demandés en commerce. Possibilité de poignées et impression logo." },
  { keywords: ["pochette", "pochettes"], response: "Pochettes : idéales pour sandwiches, cookies, petits produits. On adapte la barrière si gras." },
  { keywords: ["couvercle", "couvercles"], response: "Couvercles : en PLA/PET/PP selon usage et température. Dites la boisson (chaud/froid)." },
  { keywords: ["pailles", "paille"], response: "Pailles : alternatives papier/biodégradables existent. Dites si boisson froide et durée d’utilisation." },
  { keywords: ["serviette", "serviettes"], response: "Serviettes : papier recyclé possible. On peut aussi personnaliser (logo) selon quantité." },
  { keywords: ["boite", "boite carton", "boite repas"], response: "Boîtes : adaptées pour livraison/à emporter. Pour plats gras, on recommande barrière adaptée." },
  { keywords: ["pizza"], response: "Pour pizza : boîtes carton rigides, parfois micro-perforées. Dites diamètre et quantité." },
  { keywords: ["burger"], response: "Pour burger : boîtes carton ou papier alimentaire. Barrière anti-graisse utile." },
  { keywords: ["frites"], response: "Pour frites : cornets/sachets papier avec barrière légère si besoin." },
  { keywords: ["salade"], response: "Pour salade : bol + couvercle, souvent PET/rPET/PLA. Dites si sauce séparée." },
  { keywords: ["sushi"], response: "Pour sushi : boîtes avec fenêtre possible, matériaux selon présentation/rigidité." },
  { keywords: ["cafe", "café", "latte", "capuccino"], response: "Pour café/boissons chaudes : gobelet carton barrière + couvercle adapté. Dites volume (8oz/12oz/16oz)." },
  { keywords: ["the", "thé"], response: "Pour thé chaud : gobelet carton barrière recommandé." },
  { keywords: ["jus", "smoothie"], response: "Pour jus/smoothie : gobelet froid + couvercle dôme si besoin. Dites volume." },
  { keywords: ["glace", "ice cream"], response: "Pour glace : pot adapté au froid/condensation. Dites volume et durée de conservation." },
  { keywords: ["boulangerie", "pain", "viennoiserie", "croissant"], response: "Boulangerie : sachets kraft, pochettes, boîtes pâtisserie. Dites si produit gras (viennoiserie) ou sec." },
  { keywords: ["patisserie", "pâtisserie", "gateau", "gâteau"], response: "Pâtisserie : boîtes carton, inserts, options fenêtre. Dites dimensions du gâteau." },
  { keywords: ["chocolat", "bonbon"], response: "Chocolat/confiserie : pochettes/boîtes avec finition premium possible." },
  { keywords: ["boutique", "shopping", "magasin"], response: "Boutique : sacs kraft personnalisés, papier de soie, étiquettes. Dites le style souhaité." },
  { keywords: ["cosmetique", "cosmétique"], response: "Cosmétique : boîtes carton, sachets, étiquettes. Possibilité de design premium et QR traçabilité." },
  { keywords: ["pharmacie", "parapharmacie"], response: "Pharmacie : sacs/pochettes papier, boîtes, étiquettes. On adapte la solidité au poids." },
  { keywords: ["restaurant", "snack", "fast food"], response: "Restaurant/snack : barquettes, boîtes, gobelets, sacs. Dites menu (chaud/froid, sauce, gras)." },
  { keywords: ["evenement", "événement", "festival"], response: "Événement : gobelets, sacs, barquettes, serviettes. Dites nombre de personnes et type de boissons." },
  { keywords: ["hotel", "hôtel"], response: "Hôtel : amenities, emballages, sacs, gobelets. Personnalisation possible." },
  { keywords: ["traiteur", "catering"], response: "Traiteur : contenants repas, barquettes, couverts, sacs. Dites si livraison et durée." },
  { keywords: ["ecommerce", "e-commerce"], response: "E-commerce : calage papier, boîtes carton, rubans, étiquettes. On optimise protection + empreinte carbone." },
  { keywords: ["etiquette", "étiquette", "labels"], response: "Étiquettes : possibles avec QR code, infos produit, traçabilité. Dites format et usage (frigo, chaleur, humidité)." },
  { keywords: ["ruban", "scotch", "adhesif", "adhésif"], response: "Adhésifs : il existe des rubans papier/écologiques. Le choix dépend du carton et du poids du colis." },
  { keywords: ["fenetre", "fenêtre"], response: "Fenêtre : peut améliorer présentation, mais attention recyclabilité si film plastique. Alternatives possibles selon besoin." },
  { keywords: ["imprimerie", "impression hd", "qualite impression"], response: "Qualité impression : dépend du support (kraft/carton) et du nombre de couleurs. Donnez votre logo (format vectoriel idéal)." },

  // =========================
  // 4) Traçabilité / QR code (121-170)
  // =========================
  { keywords: ["tracabilite", "traçabilité"], response: "Traçabilité : on relie un emballage à des infos (origine matière, lot, date, impact, conseils tri). Le QR code est le moyen le plus simple." },
  { keywords: ["qr", "qr code", "qrcode", "code qr"], response: "QR code : code scannable qui ouvre une page (URL). On peut y mettre : origine matières, conseils tri, numéro de lot, et infos produit." },
  { keywords: ["comment faire un qr", "creer un qr", "générer un qr"], response: "Créer un QR : 1) choisir une URL (page traçabilité), 2) générer le QR (outil en ligne ou lib JS), 3) imprimer sur l’emballage/étiquette." },
  { keywords: ["qr dynamique", "qr statique"], response: "QR statique = URL fixe. QR dynamique = vous pouvez changer la destination sans réimprimer. Pour traçabilité, dynamique est souvent mieux." },
  { keywords: ["scanner", "scanne", "scan"], response: "Scanner : avec l’app caméra du téléphone. Il ouvre le lien. Il faut un bon contraste et taille suffisante (minimum ~2 cm selon design)." },
  { keywords: ["taille qr", "dimension qr"], response: "Taille QR recommandée : souvent 2×2 cm minimum (plus si impression sur kraft texturé). Garder zone blanche autour (quiet zone)." },
  { keywords: ["quiet zone", "zone blanche qr"], response: "Quiet zone : bord blanc autour du QR. Indispensable pour un scan fiable. Éviter de coller le QR au bord." },
  { keywords: ["qr sur kraft", "kraft qr"], response: "QR sur kraft : possible, mais il faut bon contraste (noir sur kraft clair) et taille un peu plus grande à cause de la texture." },
  { keywords: ["tracer lot", "numero lot", "lot"], response: "Traçabilité par lot : on met un identifiant (lot/date) accessible via QR ou imprimé. Utile pour suivi qualité et production." },
  { keywords: ["origine", "provenance"], response: "On peut afficher dans la page QR : origine des fibres, certifications (FSC/PEFC), et informations de production." },
  { keywords: ["impact carbone qr", "co2 qr"], response: "Oui, on peut intégrer une estimation CO₂ (transport + matière) sur la page ouverte par le QR." },
  { keywords: ["conseil tri", "tri", "recycler qr"], response: "On peut mettre des consignes de tri via QR : dans quelle poubelle, comment séparer couvercle/boîte, etc." },
  { keywords: ["lien qr", "url qr"], response: "Le QR ouvre une URL. Idéalement une page de votre site (ex: /tracabilite?id=XXXX) pour garder contrôle et analytics." },
  { keywords: ["analytics qr", "statistiques qr"], response: "Statistiques : si le QR ouvre une page web, vous pouvez mesurer les visites (Google Analytics/Matomo) sans données sensibles." },
  { keywords: ["anti fraude", "anti-contrefacon", "anti contrefacon"], response: "Anti-contrefaçon : QR dynamique + identifiant unique par lot/produit + vérification serveur (si besoin)." },
  { keywords: ["qr unique", "qr par produit"], response: "QR unique : possible (un QR par produit/lot). Il faut un système de génération + base de données (niveau avancé)." },
  { keywords: ["qrcode url veraly", "veraly qr"], response: "Veraly QR : vous pouvez relier le QR à une page “Traçabilité Veraly” qui explique matière, tri, et histoire du produit." },
  { keywords: ["page tracabilite", "page traçabilité"], response: "Page traçabilité : une page simple avec : matière, origine, certifications, conseils tri, et contact." },
  { keywords: ["que mettre dans qr", "contenu qr"], response: "Contenu QR recommandé : 1) Matière + tri, 2) Origine, 3) Certifications, 4) Lot/date, 5) Contact." },
  { keywords: ["qr et rgpd", "rgpd"], response: "RGPD : le QR peut être neutre. Évitez de collecter des infos personnelles sans consentement. Analytics anonymisées ok." },
  { keywords: ["qr sur etiquette", "qr sur étiquette"], response: "QR sur étiquette : souvent le plus simple. Permet aussi d’ajouter lot/date facilement." },
  { keywords: ["qr sur gobelet", "qr gobelet"], response: "QR sur gobelet : possible, mais attention au galbe (courbure) et à la zone d’impression. Faire test scan." },
  { keywords: ["qr sur boite", "qr boite"], response: "QR sur boîte : très bon support car surface plane. Garder contraste et zone blanche." },
  { keywords: ["qrcode cassé", "qr ne marche pas"], response: "Si le QR ne marche pas : augmenter taille, améliorer contraste, garder quiet zone, éviter texture trop forte, vérifier l’URL." },
  { keywords: ["tracabilite qr veraly", "traçabilité qr veraly"], response: "Traçabilité Veraly : QR → page avec matière, origine, impact, consignes tri. C’est une super valeur ajoutée pour vos clients." },

  // =========================
  // 5) Valeurs Veraly / engagement (171-190)
  // =========================
  { keywords: ["nos valeurs", "valeurs"], response: "Nos valeurs : durabilité, transparence, traçabilité, et qualité. L’objectif : réduire l’impact sans perdre en performance." },
  { keywords: ["innovation", "innovant"], response: "Innovation Veraly : traçabilité QR + solutions adaptées + personnalisation éco-responsable." },
  { keywords: ["qualite", "qualité"], response: "Qualité : solidité + conformité alimentaire + finition. Dites le produit (chaud/froid/gras) pour une recommandation précise." },
  { keywords: ["transparence"], response: "Transparence : traçabilité, composition claire, et consignes de tri. Le QR code peut expliquer tout ça simplement." },
  { keywords: ["responsabilite", "responsabilité"], response: "Responsabilité : choix matières, réduction déchets, optimisation transport, et alternatives au plastique quand possible." },
  { keywords: ["eco design", "écoconception", "eco-conception"], response: "Éco-conception : réduire matière, favoriser mono-matière, maximiser recyclabilité, et adapter l’emballage au besoin réel." },
  { keywords: ["bilan", "bilan carbone"], response: "Bilan carbone : on peut comparer 2 solutions et choisir celle qui correspond au bon compromis (protection vs impact)." },
  { keywords: ["engagement", "mission"], response: "Mission : donner une nouvelle vie à l’emballage, plus propre et traçable, sans sacrifier la qualité." },
  { keywords: ["traçabilite valeur", "valeur qr"], response: "Traçabilité = confiance. Le QR code renforce la preuve d’origine et les consignes de tri → meilleure image de marque." },
  { keywords: ["partenaire", "revendeur"], response: "Partenariat/revendeur : possible selon volumes et pays. Dites votre secteur et quantités mensuelles." },
  { keywords: ["pme", "petite entreprise"], response: "PME : on peut proposer des quantités adaptées et des options de personnalisation selon budget." },
  { keywords: ["grande quantite", "grossiste"], response: "Grossiste/grandes quantités : on optimise le coût unitaire et la logistique. Donnez vos volumes mensuels." },
  { keywords: ["sur mesure", "sur-mesure"], response: "Sur-mesure : dimensions, impression, fenêtre, finitions. Donnez : usage + dimensions + quantité + logo." },
  { keywords: ["impression vegetale", "encre vegetale", "encre végétale"], response: "Encres végétales : option intéressante. On vérifie compatibilité avec support et rendu couleur sur kraft." },
  { keywords: ["veraly15", "code promo"], response: "Code promo VERALY15 : -15% sur la première commande (selon conditions). Pour en profiter, mentionnez-le au devis." },
  { keywords: ["offre bienvenue", "bienvenue"], response: "Offre bienvenue : -15% sur la première commande avec VERALY15. Dites-moi votre besoin et je vous guide pour le devis." },
  { keywords: ["projet", "démarrer projet"], response: "Démarrer un projet : 1) choix produit, 2) dimensions, 3) quantités, 4) personnalisation, 5) validation échantillon, 6) production/livraison." },
  { keywords: ["echantillon", "échantillon"], response: "Échantillons : souvent possibles selon produit. Dites ce que vous voulez tester (gobelet, sachet, barquette) et la taille." },
  { keywords: ["conseil"], response: "Conseil rapide : dites si c’est chaud/froid, gras/non, volume ou dimensions, et quantité. Je vous réponds en 10 secondes 😉" },

  // =========================
  // 6) FAQ Commande / paiement / logistique (191-200)
  // =========================
  { keywords: ["paiement", "payer", "payment"], response: "Paiement : dépend du devis (virement, etc.). Dites votre pays et type de commande, je vous indique quoi préciser." },
  { keywords: ["facture", "invoice"], response: "Facture : possible. Donnez les infos entreprise (nom, adresse, ICE/TVA si applicable) pour le devis." },
  { keywords: ["retour", "remboursement"], response: "Retours : dépend du type de produit (standard/personnalisé). En général, le personnalisé a des conditions spécifiques." },
  { keywords: ["adresse livraison", "livrer ou", "destination"], response: "Livraison : dites destination + code postal + quantité + date souhaitée. Ça aide à calculer transport." },
  { keywords: ["suivi", "tracking"], response: "Suivi : souvent possible via transporteur. Une fois expédié, vous recevez un numéro de suivi si disponible." },
  { keywords: ["urgence", "urgent"], response: "Urgent : dites la date limite, le produit et la quantité. On regarde ce qui est faisable (stock vs production)." },
  { keywords: ["stock", "disponible"], response: "Stock : certains formats sont souvent disponibles, d’autres nécessitent production. Dites le produit et la taille." },
  { keywords: ["dimension", "taille", "format"], response: "Dimensions : donnez largeur × hauteur × soufflet (sachets) ou volume (gobelets). Je vous confirme le format adapté." },
  { keywords: ["couleur", "colors", "couleurs"], response: "Couleurs : sur kraft/carton, le rendu peut varier. Pour un logo fidèle, fournissez un fichier vectoriel (AI/SVG/PDF)." },
  { keywords: ["catalogue", "produits disponibles"], response: "Catalogue : vous avez des produits (sachets, gobelets, etc.). Dites votre usage et je vous recommande le meilleur choix." },
];

// ✅ Fonction principale
export function askEcoConsultant(message: string): string {
  const text = normalizeText(message);
  if (!text) return "Pouvez-vous écrire votre question ? 😊";

  let best: { rule: Rule; score: number } | null = null;

  for (const rule of rules) {
    const s = scoreRule(text, rule);
    if (s > 0 && (!best || s > best.score)) {
      best = { rule, score: s };
    }
  }

  if (best) return best.rule.response;

  // ✅ Fallback intelligent (aide l’utilisateur)
  if (text.includes("qr") || text.includes("qrcode") || text.includes("code qr")) {
    return "QR code : il ouvre une page (URL) avec infos (matière, tri, lot, origine). Dites-moi ce que vous voulez afficher dans la page QR, et sur quel emballage.";
  }

  return "Je peux vous aider sur : papier kraft, emballages (gobelets/sachets/barquettes), personnalisation (logo), traçabilité QR, recyclage/compost. Dites votre produit (chaud/froid/gras) + quantité 🌱";
}
