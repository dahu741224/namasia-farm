
import React, { useState } from 'react';
import { MealKit } from '../types';

interface MealKitCardProps {
  kit: MealKit;
  onAdd: (kit: MealKit) => void;
}

const MealKitCard: React.FC<MealKitCardProps> = ({ kit, onAdd }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 p-6 flex flex-col h-full shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
      <div className="flex justify-between items-start mb-4">
        <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider">{kit.tag}</span>
        <span className="text-slate-400 text-[10px] font-bold"><i className="fa-regular fa-clock mr-1"></i>{kit.time}</span>
      </div>

      <h3 className="text-xl font-black text-slate-800 mb-2 leading-tight">{kit.name}</h3>
      <div className="flex items-center gap-2 mb-6">
        <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-md font-bold">{kit.portion}</span>
        <span className="text-[10px] text-slate-400 font-medium">適合繁忙家庭</span>
      </div>

      <div className="space-y-3 mb-8 flex-grow">
        <div className="flex items-center gap-3 text-xs">
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
             <i className="fa-solid fa-drumstick-bite"></i>
          </div>
          <span className="text-slate-600 font-medium">{kit.meat}</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
             <i className="fa-solid fa-leaf"></i>
          </div>
          <span className="text-slate-600 font-medium">{kit.veggie}</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0">
             <i className="fa-solid fa-bottle-droplet"></i>
          </div>
          <span className="text-slate-600 font-medium">{kit.sauce}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-2xl font-black text-emerald-600">NT$ {kit.price}</span>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowDetails(true)}
            className="w-10 h-10 rounded-xl border border-slate-100 text-slate-400 flex items-center justify-center hover:bg-slate-50"
            title="查看做法"
          >
            <i className="fa-solid fa-receipt"></i>
          </button>
          <button 
            onClick={() => onAdd(kit)}
            className="bg-slate-900 text-white px-4 py-2 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-emerald-600 transition-colors"
          >
            <i className="fa-solid fa-plus"></i> 下單
          </button>
        </div>
      </div>

      {/* 做法彈窗 */}
      {showDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-2xl font-black text-slate-800">料理秘笈</h4>
              <button onClick={() => setShowDetails(false)} className="text-slate-300 hover:text-slate-600">
                <i className="fa-solid fa-circle-xmark text-2xl"></i>
              </button>
            </div>
            
            <div className="bg-emerald-50 p-4 rounded-2xl mb-6">
              <div className="text-emerald-800 font-black mb-1">{kit.name}</div>
              <div className="text-xs text-emerald-600/80 font-bold italic">只需 {kit.time}，美味上桌</div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black flex-shrink-0">1</div>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">{kit.steps.split('→')[0]}</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black flex-shrink-0">2</div>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">{kit.steps.split('→')[1]}</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black flex-shrink-0">3</div>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">{kit.steps.split('→')[2]}</p>
              </div>
            </div>

            <button 
              onClick={() => setShowDetails(false)}
              className="w-full mt-8 bg-slate-100 text-slate-500 py-4 rounded-2xl font-black hover:bg-slate-200 transition-colors"
            >
              我知道了
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealKitCard;
