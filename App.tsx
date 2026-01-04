import React, { useState, useMemo } from "react";
import { parseProducts, parseMealKits } from "./constants";
import { Product, CartItem, MealKit } from "./types";
import Navbar from "./components/Navbar";
import MealKitCard from "./components/MealKitCard";
import SeasonCountdown from "./components/SeasonCountdown";
import Cart from "./components/Cart";

const LocalProductCard = ({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (p: Product) => void;
}) => (
  <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
    <div className="aspect-square rounded-2xl bg-slate-50 mb-4 overflow-hidden relative">
      <img
        src={
          product.imageUrl ||
          `https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80`
        }
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      {product.isSeasonal && (
        <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-black px-2 py-1 rounded-lg">
          盛產推薦
        </span>
      )}
    </div>
    <h4 className="font-black text-slate-800 mb-1">{product.name}</h4>
    <p className="text-[10px] text-slate-400 mb-3 line-clamp-1">
      {product.note}
    </p>
    <div className="flex items-center justify-between">
      <span className="font-black text-emerald-600">NT$ {product.price}</span>
      <button
        onClick={() => onAdd(product)}
        className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors"
        aria-label="Add to cart"
      >
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  </div>
);

const App = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [storeTab, setStoreTab] = useState<"veggie" | "mealkit" | "fruit">(
    "fruit"
  );

  const products = useMemo(() => parseProducts(), []);
  const mealKits = useMemo(() => parseMealKits(), []);

  const addItemToCart = (item: Product | MealKit, type: CartItem["type"]) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        { id: item.id, name: item.name, price: item.price, quantity: 1, type },
      ];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id
            ? { ...i, quantity: Math.max(0, i.quantity + delta) }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const filteredProducts = products.filter((p) => {
    if (storeTab === "veggie") return p.category === "蔬菜";
    if (storeTab === "fruit")
      return p.category === "水果" || p.subCategory === "釋迦";
    return false;
  });

  const custardApple = products.find((p) => p.id === "F-C-001");

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Hero */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[3.5rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black mb-6 inline-block tracking-widest uppercase">
                產地直接發貨
              </span>
              <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                台東大目釋迦
                <br />
                當季採收 · 鮮甜直送
              </h2>
              <p className="text-emerald-50/80 font-bold mb-10 text-lg leading-relaxed">
                特選台東卑南契作，晨間現採、產地直發。
                <br />
                感受如冰淇淋般細緻的濃郁果肉。
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setStoreTab("fruit");
                    if (custardApple) addItemToCart(custardApple, "product");
                  }}
                  className="bg-white text-emerald-800 px-8 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-all flex items-center gap-3"
                >
                  <i className="fa-solid fa-basket-shopping"></i> 立即下單釋迦
                </button>
              </div>
            </div>
            <div className="hidden md:flex justify-end relative">
              <img
                src="https://images.unsplash.com/photo-1629837943640-7e615e5d36b8?auto=format&fit=crop&w=600&q=80"
                className="w-[380px] h-[380px] object-cover rounded-[3rem] shadow-2xl rotate-3 relative z-10 border-8 border-white/10"
                alt="釋迦"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 產季模組：釋迦倒數 */}
      <SeasonCountdown />

      {/* 配送說明 */}
      <section className="py-6 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-emerald-600 font-black mb-1">週一採收</div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Harvest Day
            </p>
          </div>
          <div className="border-l border-slate-50">
            <div className="text-emerald-600 font-black mb-1">週二包裝</div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Packing
            </p>
          </div>
          <div className="border-l border-slate-50">
            <div className="text-emerald-600 font-black mb-1">週三送達</div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Delivery
            </p>
          </div>
          <div className="border-l border-slate-50">
            <div className="text-[#06C755] font-black mb-1 text-xs">
              <i className="fa-brands fa-line mr-1"></i>LINE Pay
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Secure Pay
            </p>
          </div>
        </div>
      </section>

      {/* 商店專區 */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: "fruit", label: "產地鮮果(釋迦)", icon: "fa-apple-whole" },
            { id: "veggie", label: "高山蔬菜零售", icon: "fa-leaf" },
            { id: "mealkit", label: "料理包 (超值價格)", icon: "fa-kitchen-set" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setStoreTab(t.id as any)}
              className={`px-8 py-4 rounded-2xl font-black transition-all flex items-center gap-3 ${
                storeTab === t.id
                  ? "bg-slate-900 text-white shadow-xl scale-105"
                  : "bg-white text-slate-400 hover:bg-slate-50"
              }`}
            >
              <i className={`fa-solid ${t.icon}`}></i>
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {storeTab === "mealkit"
            ? mealKits.map((kit) => (
                <MealKitCard
                  key={kit.id}
                  kit={kit}
                  onAdd={(k) => addItemToCart(k, "mealkit")}
                />
              ))
            : filteredProducts.map((p) => (
                <LocalProductCard
                  key={p.id}
                  product={p}
                  onAdd={(pp) => addItemToCart(pp, "product")}
                />
              ))}
        </div>
      </section>

      {/* ✅ 統一購物車：只使用 components/Cart.tsx */}
      <Cart
        items={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeItem}
        onUpdateQty={updateQty}
      />
    </div>
  );
};

export default App;
