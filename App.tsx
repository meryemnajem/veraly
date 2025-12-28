
import React from 'react';
import Navbar from './components/Navbar';
import EcoChat from './components/EcoChat';
import ecoHero from "./assets/eco.png";
import ProductCard from "./components/ProductCard";
import { PRODUCTS, VALUES, TRACEABILITY_FEATURES } from './constants';
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { 
  ArrowRight, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Leaf, 
  QrCode, 
  Facebook, 
  Instagram, 
  Tag,
  Sparkles,
  Palette,
  Layers
} from 'lucide-react';

const App: React.FC = () => {
  
  const formRef = useRef<HTMLFormElement>(null);
const [sent, setSent] = useState(false);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!formRef.current) return;

  emailjs
    .sendForm(
      "service_kyrsiha",        // ✅ TON Service ID
      "template_3aurmx5",      // ✅ TON Template ID
      formRef.current,
      "t0ibhKaJuxV8WtPI6"       // ✅ TON Public Key
    )
    .then(() => {
      setSent(true);
      alert("Message envoyé avec succès ! Nous vous répondrons rapidement.");
      formRef.current?.reset();
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      alert("Erreur lors de l'envoi du message.");
    });
};

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Top Promotion Bar */}
      <div className="bg-emerald-900 text-white py-2 px-4 text-center text-xs font-bold uppercase tracking-widest z-[60] relative overflow-hidden">
        <div className="flex items-center justify-center gap-2 animate-pulse">
          <Tag className="w-3 h-3" />
          Offre de Bienvenue : -15% sur votre première commande avec le code <span className="bg-emerald-600 px-2 py-0.5 rounded ml-1">VERALY15</span>
        </div>
      </div>
   
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img
      src={ecoHero}
      className="w-full h-full object-cover"
      alt="Eco-friendly packaging background"
    />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-stone-50/90 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-bold mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              100% Biodégradable & -15% sur 1ère commande
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-emerald-950 leading-[1.1] mb-6 drop-shadow-sm">
              L'avenir de <br />
              <span className="text-emerald-600 italic">l'emballage</span> <br />
              écologique
            </h1>
            <p className="text-xl text-slate-700 mb-10 max-w-xl leading-relaxed">
              Découvrez notre gamme complète de sachets et gobelets écologiques. 
              Des solutions durables pour un monde plus propre et une empreinte carbone réduite.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl hover:shadow-emerald-200 flex items-center justify-center gap-2">
                Demander un devis <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#produits" className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-md text-emerald-800 border-2 border-emerald-100 rounded-2xl font-bold text-lg hover:border-emerald-600 transition-all flex items-center justify-center gap-2">
                Voir les produits
              </a>
            </div>
          </div>
        </div>
      </section>

  {/* Products Section */}
<section id="produits" className="py-24 bg-white">
  <div className="text-center mb-12">
    <h2 className="text-4xl font-extrabold text-emerald-950">Nos Produits</h2>
  </div>

  <div className="relative max-w-7xl mx-auto px-6">
    <div
      id="product-slider"
      className="flex gap-6 overflow-x-auto scroll-smooth pb-6"
    >
      {PRODUCTS.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>

    {/* Flèches */}
    <button
      onClick={() =>
        document.getElementById("product-slider")!.scrollLeft -= 300
      }
      className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3"
    >
      ◀
    </button>

    <button
      onClick={() =>
        document.getElementById("product-slider")!.scrollLeft += 300
      }
      className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3"
    >
      ▶
    </button>
  </div>
</section>

      {/* Traceability Section */}
      <section id="tracabilite" className="py-24 bg-emerald-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-800/20 rounded-full blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="bg-emerald-600/20 text-emerald-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-600/30">Innovation Digitale</span>
            <h2 className="text-4xl font-extrabold mt-6 mb-6">Traçabilité par Code QR</h2>
            <p className="text-emerald-100/70 max-w-2xl mx-auto">
              Scannez le code QR sur nos emballages Veraly pour découvrir l'histoire complète de votre produit. 
              De l'origine des fibres à l'impact carbone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {TRACEABILITY_FEATURES.map((f) => (
              <div key={f.id} className="bg-emerald-900/40 border border-emerald-800/50 p-8 rounded-[2rem] hover:bg-emerald-800/40 transition-colors text-center group">
                <div className="bg-emerald-600 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-emerald-100/60 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[3rem] p-8 md:p-12 text-emerald-950 flex flex-col md:flex-row items-center gap-12 shadow-2xl">
            <div className="flex-1 order-2 md:order-1">
              <h3 className="text-3xl font-extrabold mb-6">Comment ça marche ?</h3>
              <ol className="space-y-6">
                {[
                  "Scannez le code QR sur votre emballage Veraly avec votre smartphone.",
                  "Découvrez l'origine des matériaux, la composition exacte et les certifications associées.",
                  "Suivez le cycle de vie complet et trouvez le centre de recyclage le plus proche."
                ].map((step, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <p className="text-slate-700 font-medium">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex-1 order-1 md:order-2 flex justify-center">
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-emerald-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-stone-50 p-6 rounded-3xl border border-stone-200">
                  <div className="w-48 h-48 bg-emerald-600 rounded-2xl flex items-center justify-center text-white">
                    <QrCode className="w-32 h-32" />
                  </div>
                  <p className="text-center mt-4 text-sm font-bold text-emerald-800">QR code</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="valeurs" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm">Notre Engagement</span>
          <h2 className="text-4xl font-extrabold text-emerald-950 mt-4 mb-6">Pourquoi Nous Choisir ?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Un engagement fort pour la planète et les générations futures à travers chaque produit que nous créons.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {VALUES.map((v) => (
            <div key={v.id} className="text-center group">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-emerald-50 group-hover:rotate-6 transition-transform">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold text-emerald-950 mb-3">{v.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-50 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-16">
            <div className="flex-1">
              <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm">Contact</span>
              <h2 className="text-4xl font-extrabold text-emerald-950 mt-4 mb-6">Contactez-nous</h2>
              <p className="text-slate-600 mb-10 text-lg">
                Une question ? Besoin d'un devis personnalisé ? Notre équipe est à votre écoute pour vous accompagner dans votre transition écologique.
              </p>

              <div className="space-y-8">
                {[
                  { icon: <Mail className="w-6 h-6" />, title: "Email", info: "veralypackaging@gmail.com" },
                  { icon: <Phone className="w-6 h-6" />, title: "Téléphone", info: "+33 1 23 45 67 89" },
                  { icon: <MapPin className="w-6 h-6" />, title: "Adresse", info: "Zone Industrielle - Ain Sebaa, Casablanca" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="bg-white p-4 rounded-2xl text-emerald-600 shadow-sm border border-emerald-100">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-bold text-emerald-950">{item.title}</p>
                      <p className="text-slate-600">{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <p className="font-bold text-emerald-950 mb-4 uppercase tracking-widest text-sm">Suivez-nous</p>
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/profile.php?id=61585413932208" target="_blank" rel="noopener noreferrer" className="bg-white p-4 rounded-2xl text-emerald-600 shadow-sm border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="https://www.instagram.com/veraly.packaging?igsh=MXR4YnV1bm04d2k5OA==" target="_blank" rel="noopener noreferrer" className="bg-white p-4 rounded-2xl text-emerald-600 shadow-sm border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all">
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-emerald-900/5">
              {/* Special Offer Alert */}
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4">
                <div className="bg-emerald-600 p-2 rounded-xl">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-950">-15% Première Commande</p>
                  <p className="text-xs text-emerald-700">Utilisez "VERALY15" pour profiter de l'offre.</p>
                </div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

  <div className="grid md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-bold text-emerald-950 mb-2">
        Votre nom
      </label>
      <input
        type="text"
        name="from_name"     // ⚠️ EXACT
        required
        className="w-full px-5 py-3.5 bg-stone-50 border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
        placeholder="Jean Dupont"
      />
    </div>

    <div>
      <label className="block text-sm font-bold text-emerald-950 mb-2">
        Votre email
      </label>
      <input
        type="email"
        name="reply_to"      // ⚠️ EXACT
        required
        className="w-full px-5 py-3.5 bg-stone-50 border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
        placeholder="jean@example.com"
      />
    </div>
  </div>

  <div>
    <label className="block text-sm font-bold text-emerald-950 mb-2">
      Type de demande
    </label>
    <select
      name="subject"       // ⚠️ EXACT
      className="w-full px-5 py-3.5 bg-stone-50 border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
    >
      <option value="Devis">Devis pour Emballage Standard</option>
      <option value="Commande">Commander</option>
      <option value="Échantillons">Demande d'Échantillons</option>
      <option value="Partenariat">Partenariat / Revendeur</option>
      <option value="Autre">Autre</option>
    </select>
  </div>

  <div>
    <label className="block text-sm font-bold text-emerald-950 mb-2">
      Détails de votre besoin
    </label>
    <textarea
      name="message"        // ⚠️ EXACT
      rows={4}
      required
      className="w-full px-5 py-3.5 bg-stone-50 border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
      placeholder="Décrivez les dimensions, quantités ou options de personnalisation souhaitées..."
    />
  </div>

  <button
    type="submit"
    className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200"
  >
    Envoyer ma demande
  </button>

</form>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-stone-100 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-emerald-600" />
              <span className="text-xl font-bold text-emerald-950">Veraly</span>
            </div>
            
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61585413932208" className="text-slate-500 hover:text-emerald-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/veraly.packaging?igsh=MXR4YnV1bm04d2k5OA==" className="text-slate-500 hover:text-emerald-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            <div className="flex gap-6 text-slate-400 text-sm font-medium">
              <a href="#" className="hover:text-emerald-600">Mentions Légales</a>
              <a href="#" className="hover:text-emerald-600">Confidentialité</a>
              <a href="#" className="hover:text-emerald-600">FAQ</a>
            </div>
          </div>
          <div className="text-center">
            <p className="text-slate-500 text-sm italic">
              © 2025 Veraly. Votre partenaire en emballages durables et personnalisés.
            </p>
          </div>
        </div>
      </footer>

      {/* AI Assistant Floating Button */}
      <EcoChat />
    </div>
  );
};

export default App;
