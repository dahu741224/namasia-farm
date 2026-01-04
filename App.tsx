import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import SeasonCountdown from './components/SeasonCountdown';
import VeggieBoxCard from './components/VeggieBoxCard';
import MealKitCard from './components/MealKitCard';
import Cart from './components/Cart';
import { parseProducts, parseMealKits, VEGGIE_BOXES } from './constants';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const products = useMemo(() => parseProducts(), []);
  const mealKits = useMemo(() => parseMealKits(), []);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('全部');
  const [mealKitFilter, setMealKitFilter] = useState<string>('全部');

  const categories = ['全部', '葉菜類', '瓜果類', '根莖類', '豆類', '菇類', '其他', '常年水果', '季節水果', '進口水果'];
  const mealKitTags = ['全部', '#一個人的精采', '#兩個人的小酒館', '#給寶貝的健康餐', '#懶人神機料理', '#大廚到你家'];

  const filteredProducts = products.filter(p => 
    filterCategory === '全部' || p.subCategory === filterCategory || p.category === filterCategory
  );

  const filteredMealKits = mealKits.filter(mk => 
    mealKitFilter === '全部' || mk.tag === mealKitFilter
  );

  const addToCart = (id: string, name: string, price: number, type: 'product' | 'box' | 'mealkit' = 'product') => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id, name, price, quantity: 1, type }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const getProductIcon = (p: Product) => {
    if (p.category === '水果') return 'fa-apple-whole';
    if (p.subCategory === '葉菜類') return 'fa-leaf';
    if (p.subCategory === '菇類') return 'fa-mushroom';
    if (p.subCategory === '根莖類') return 'fa-carrot';
    if (p.subCategory === '豆類') return 'fa-seedling';
    return 'fa-lemon';
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar cartCount={cart.reduce((s, i) => s + i.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />
      
      <main>
        {/* 1. 產季分流模組 (水蜜桃季) */}
        <SeasonCountdown />

        {/* 2. 大型配菜箱快速訂購區 */}
        <section className="py-24 px-4 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-black tracking-widest mb-4">SMART CHOICE</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">本週精選配菜箱</h2>
              <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
                由那瑪夏小農為您親自搭配，<span className="text-rose-500 font-black">比單獨購買省下 15% 以上</span>。
                營養均衡，一週只需訂一箱。
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {VEGGIE_BOXES.map(box => (
                <VeggieBoxCard key={box.id} box={box} onAdd={(b) => addToCart(b.id, b.name, b.price, 'box')} />
              ))}
            </div>
          </div>
        </section>

        {/* 3. 配送透明化承諾 */}
        <section className="py-24 px-4 bg-[#0F172A] text-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-16 md:gap-8 relative">
              {/* 連接線 (Desktop only) */}
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-dashed bg-emerald-500/30"></div>
              
              {[
                { day: '週一', action: '新鮮採收', desc: '那瑪夏產地直採，確保食材在最完美的狀態啟程。', icon: 'fa-sun' },
                { day: '週二', action: '嚴格包裝', desc: '全程低溫冷鏈，精細分揀並完成防護包裝。', icon: 'fa-box-open' },
                { day: '週三', action: '準時送達', desc: '專業物流直送到府，鎖住最後一公里的鮮味。', icon: 'fa-truck-fast' }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center relative z-10">
                  <div className="w-24 h-24 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-3xl mb-10 shadow-2xl shadow-emerald-900/40 transform hover:scale-110 transition-all duration-500">
                    <i className={`fa-solid ${step.icon}`}></i>
                  </div>
                  <div className="text-emerald-400 font-black text-xl mb-3 tracking-tighter">{step.day}</div>
                  <h3 className="text-2xl font-black mb-5">{step.action}</h3>
                  <p className="text-slate-400 leading-relaxed max-w-xs text-sm font-medium">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. 料理包專區 */}
        <section className="py-24 px-4 bg-emerald-50/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-4">料理包專區</h2>
                <p className="text-slate-500 font-medium text-lg">下班後的 10 分鐘，也能吃得像大廚一樣精緻。</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {mealKitTags.map(tag => (
                  <button 
                    key={tag}
                    onClick={() => setMealKitFilter(tag)}
                    className={`px-5 py-2.5 rounded-2xl font-black text-xs transition-all ${
                      mealKitFilter === tag 
                        ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200 translate-y-[-2px]' 
                        : 'bg-white text-slate-400 border border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredMealKits.map(kit => (
                <MealKitCard key={kit.id} kit={kit} onAdd={(k) => addToCart(k.id, k.name, k.price, 'mealkit')} />
              ))}
            </div>
          </div>
        </section>

        {/* 5. 零售專區 */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16">
              <h2 className="text-4xl font-black text-slate-900">單點零售專區</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-5 py-2.5 rounded-2xl font-black text-xs transition-all ${
                      filterCategory === cat 
                        ? 'bg-slate-900 text-white shadow-xl' 
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {filteredProducts.map(p => (
                <div key={p.id} className="group bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden transform hover:-translate-y-2">
                  <div className="relative aspect-square overflow-hidden bg-slate-50">
                    {p.imageUrl ? (
                      <img 
                        src={p.imageUrl} 
                        alt={p.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-200">
                        <i className={`fa-solid ${getProductIcon(p)} text-5xl`}></i>
                      </div>
                    )}
                    {p.isSeasonal && (
                      <div className="absolute top-4 left-4 bg-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                        SEASONAL
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{p.subCategory}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg font-bold">{p.weight}g</span>
                    </div>
                    <h3 className="font-black text-slate-800 text-base mb-2 group-hover:text-emerald-600 transition-colors">{p.name}</h3>
                    <p className="text-xs text-slate-400 mb-6 line-clamp-1">{p.note}</p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-black text-emerald-600 text-xl tracking-tighter">NT$ {p.price}</span>
                      <button 
                        onClick={() => addToCart(p.id, p.name, p.price)}
                        className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-emerald-600 transition-all shadow-lg active:scale-90"
                      >
                        <i className="fa-solid fa-plus text-lg"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Cart 
        isOpen={isCartOpen} 
        items={cart} 
        onClose={() => setIsCartOpen(false)} 
        onRemove={(id) => updateCartQty(id, -100)}
        onUpdateQty={updateCartQty}
      />
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-500 py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm font-medium">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-black">N</div>
            <span className="text-white font-bold">那瑪夏小農夫 Namasia Farmer</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">隱私權政策</a>
            <a href="#" className="hover:text-white transition-colors">服務條款</a>
            <a href="#" className="hover:text-white transition-colors">常見問題</a>
          </div>
          <div className="text-slate-600">© 2024 那瑪夏小農夫. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
