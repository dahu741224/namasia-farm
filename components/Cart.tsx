
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, isOpen, onClose, onRemove, onUpdateQty }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slideInRight">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-900">您的購物籃</h2>
            <p className="text-slate-400 text-sm font-bold mt-1">共 {items.reduce((s,i) => s + i.quantity, 0)} 個品項</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-full border border-slate-100 text-slate-400 hover:bg-slate-50 transition-colors flex items-center justify-center">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* List */}
        <div className="flex-grow overflow-y-auto p-8 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center text-5xl text-slate-200 mb-6">
                <i className="fa-solid fa-basket-shopping"></i>
              </div>
              <p className="text-slate-400 font-black text-xl mb-4">目前空空如也</p>
              <button onClick={onClose} className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-emerald-100">前往挑選</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-5 group">
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 relative border border-slate-100">
                  <i className={`fa-solid ${item.type === 'box' ? 'fa-box-open' : 'fa-carrot'} text-2xl`}></i>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-slate-800 leading-tight">{item.name}</h3>
                    <button onClick={() => onRemove(item.id)} className="text-slate-300 hover:text-rose-500 transition-colors">
                      <i className="fa-solid fa-trash-can text-sm"></i>
                    </button>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                      <button onClick={() => onUpdateQty(item.id, -1)} className="w-8 h-8 rounded-lg hover:bg-white hover:shadow-sm text-slate-500 transition-all font-black">-</button>
                      <span className="w-10 text-center font-black text-slate-800 text-sm">{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} className="w-8 h-8 rounded-lg hover:bg-white hover:shadow-sm text-slate-500 transition-all font-black">+</button>
                    </div>
                    <span className="font-black text-emerald-600">NT$ {item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-8 bg-slate-50 border-t border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <span className="text-slate-500 font-bold">預估總計</span>
              <span className="text-4xl font-black text-slate-900">NT$ {total}</span>
            </div>
            
            <div className="grid gap-3">
              <button className="w-full bg-[#06C755] text-white py-5 rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:brightness-105 transition-all shadow-xl shadow-green-100">
                <i className="fa-brands fa-line text-2xl"></i>
                LINE Pay 快速結帳
              </button>
              
              <button className="w-full bg-slate-900 text-white py-4 rounded-3xl font-black flex items-center justify-center gap-3 hover:bg-slate-800 transition-colors">
                一般管道結帳
              </button>
            </div>
            
            <div className="mt-8 bg-white p-4 rounded-2xl border border-slate-100 flex items-start gap-4 shadow-sm">
               <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <i className="fa-solid fa-truck-fast"></i>
               </div>
               <div>
                  <div className="text-xs font-black text-slate-800 mb-1">配送透明承諾</div>
                  <p className="text-[10px] text-slate-400 font-bold leading-relaxed">週一採收、週二包裝、週三準時送達。新鮮美味不等待。</p>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
