
import React from 'react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-600 text-white p-2 rounded-lg">
            <i className="fa-solid fa-leaf"></i>
          </div>
          <span className="text-xl font-bold tracking-tight text-emerald-800">那瑪夏小農夫</span>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="hidden md:block text-slate-600 hover:text-emerald-600 font-medium">首頁</button>
          <button className="hidden md:block text-slate-600 hover:text-emerald-600 font-medium">產地故事</button>
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <i className="fa-solid fa-basket-shopping text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
