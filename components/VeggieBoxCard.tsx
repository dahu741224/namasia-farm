
import React, { useState } from 'react';
import { VeggieBox } from '../types';

interface VeggieBoxCardProps {
  box: VeggieBox;
  onAdd: (box: VeggieBox) => void;
}

const VeggieBoxCard: React.FC<VeggieBoxCardProps> = ({ box, onAdd }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full transform hover:-translate-y-2">
      {/* Header with Pricing Badge */}
      <div className={`relative h-40 ${box.color} p-8 flex flex-col justify-end overflow-hidden`}>
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
           <svg viewBox="0 0 100 100" className="w-full h-full"><circle cx="10" cy="10" r="50" fill="white"/></svg>
        </div>
        
        <div className="absolute top-6 right-6">
          <div className="bg-white/95 backdrop-blur text-slate-900 px-4 py-2 rounded-2xl shadow-xl flex flex-col items-center animate-bounce">
             <span className="text-[10px] font-black uppercase tracking-tighter text-rose-500">超划算</span>
             <span className="text-xl font-black">15% OFF</span>
          </div>
        </div>

        <div className="relative z-10">
          <h3 className="text-3xl font-black text-white mb-1">{box.name}</h3>
          <div className="flex items-center gap-2 text-white/80 font-bold text-sm">
             <i className="fa-solid fa-tag"></i>
             零售價 NT$ {box.retailPrice}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-4xl font-black text-slate-800">NT$ {box.price}</span>
          <span className="text-slate-400 text-sm font-medium">/ 乙箱</span>
        </div>

        <p className="text-slate-500 font-medium mb-8 leading-relaxed">
          {box.description}
        </p>

        {/* Menu Preview Toggle */}
        <div className="mb-8">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className={`w-full py-4 px-6 rounded-2xl border-2 font-bold transition-all flex items-center justify-between ${
              showMenu ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-white border-slate-100 text-slate-500 hover:border-emerald-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-clipboard-list text-lg text-emerald-500"></i>
              本週菜單預覽
            </div>
            <i className={`fa-solid fa-chevron-${showMenu ? 'up' : 'down'} text-xs`}></i>
          </button>

          {showMenu && (
            <div className="mt-4 grid grid-cols-1 gap-2 animate-fadeIn">
              {box.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-sm font-bold text-slate-700">{item.split(' x')[0]}</span>
                  <span className="text-xs bg-white px-2 py-1 rounded-lg text-emerald-600 font-black border border-emerald-100">
                    {item.split(' x')[1] ? `x${item.split(' x')[1]}` : 'x1'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          onClick={() => onAdd(box)}
          className="mt-auto w-full bg-slate-900 text-white py-5 rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 group-active:scale-95"
        >
          <i className="fa-solid fa-cart-plus text-xl"></i>
          一鍵加入購物車
        </button>
      </div>
    </div>
  );
};

export default VeggieBoxCard;
