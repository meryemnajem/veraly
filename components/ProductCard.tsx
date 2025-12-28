import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Product } from "../types";

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-w-[260px] bg-stone-50 rounded-3xl overflow-hidden border border-stone-100 shadow hover:shadow-xl transition-all">
      <div className="h-44 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-lg font-bold text-emerald-950">{product.name}</h3>

        <p className="text-sm text-slate-600">{product.description}</p>

        {showMore && (
          <p className="text-xs text-emerald-700 font-semibold">
            Disponible en plusieurs tailles, poids et en 3 couleurs : beige, vert et marron
          </p>
        )}

        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-2 py-2 border border-emerald-200 rounded-xl text-emerald-700 font-bold hover:bg-emerald-600 hover:text-white transition"
        >
          {showMore ? "Réduire" : "En savoir plus"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
