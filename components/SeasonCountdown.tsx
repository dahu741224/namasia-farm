import React, { useState, useEffect } from 'react';

const SeasonCountdown: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState<'peach' | 'mango'>('peach');
  const [stock, setStock] = useState(48); // 模擬水蜜桃剩餘箱數

  useEffect(() => {
    // 模擬庫存隨機跳動，增加急迫感
    const stockTimer = setInterval(() => {
      setStock(prev => (prev > 5 ? prev - Math.floor(Math.random() * 2) : prev));
    }, 15000);
    return () => clearInterval(stockTimer);
  }, []);

  return (
    <section className="relative py-12 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* 產季切換分流 */}
        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => setActiveTab('peach')}
            className={`px-6 py-2 rounded-xl font-black transition-all ${activeTab === 'peach' ? 'bg-rose-500 text-white shadow-lg shadow-rose-100' : 'bg-white text-slate-400'}`}
          >
            【現正盛產】水蜜桃季
          </button>
          <button 
            onClick={() => setActiveTab('mango')}
            className={`px-6 py-2 rounded-xl font-black transition-all ${activeTab === 'mango' ? 'bg-amber-500 text-white shadow-lg shadow-amber-100' : 'bg-white text-slate-400'}`}
          >
            【即將到來】芒果季
          </button>
        </div>

        {activeTab === 'peach' ? (
          <div className="relative bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
              <i className="fa-solid fa-sun-plant-wilt text-[280px]"></i>
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-white/30">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  今日現採直發！剩餘 {stock} 箱
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                  那瑪夏高山水蜜桃<br/>
                  鮮甜多汁．產季限時
                </h2>
                
                <div className="grid grid-cols-2 gap-3 mb-8 text-sm">
                  <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                    <div className="font-bold opacity-70">6 粒禮盒裝</div>
                    <div className="text-xl font-black">NT$ 1,000</div>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                    <div className="font-bold opacity-70">8 粒禮盒裝</div>
                    <div className="text-xl font-black">NT$ 800</div>
                  </div>
                  <div className="col-span-2 bg-rose-600/50 p-3 rounded-xl border border-white/30 flex justify-between items-center">
                    <div className="font-bold text-white">產地直送價</div>
                    <div className="font-black text-amber-300 animate-pulse text-lg">剩餘 {stock} 份</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-white text-rose-600 px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-rose-50 transition-all flex items-center justify-center gap-3 active:scale-95">
                    <i className="fa-solid fa-basket-shopping text-xl"></i>
                    立即搶購水蜜桃
                  </button>
                  <button 
                    onClick={() => setIsSubscribed(true)}
                    className={`px-8 py-4 rounded-2xl font-black border-2 transition-all flex items-center justify-center gap-3 ${
                      isSubscribed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-white/50 hover:bg-white/10 text-white'
                    }`}
                  >
                    <i className={`fa-${isSubscribed ? 'solid fa-check' : 'brands fa-line'} text-xl`}></i>
                    {isSubscribed ? '已訂閱產季通知' : '產季通知訂閱'}
                  </button>
                </div>
              </div>

              <div className="hidden md:flex justify-end">
                <img 
                  src="https://images.unsplash.com/photo-1522010694701-096773322194?auto=format&fit=crop&w=600&h=600&q=80" 
                  alt="Namasia Peaches"
                  className="w-80 h-80 object-cover rounded-[3rem] shadow-2xl border-8 border-white/10 rotate-3 transition-transform group-hover:rotate-0"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative bg-gradient-to-br from-amber-500 via-orange-400 to-yellow-500 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
              <i className="fa-solid fa-leaf text-[280px]"></i>
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-white/30">
                  即將開採
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                  金煌芒果．夏日預告<br/>
                  即將鮮甜上市
                </h2>
                
                <p className="text-white/90 text-lg mb-8 max-w-md leading-relaxed">
                  不想錯過今年的第一口甜？現在就訂閱 LINE 通知，芒果季開始第一時間告知您！
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setIsSubscribed(true)}
                    className={`px-8 py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-3 ${
                      isSubscribed ? 'bg-emerald-500 text-white' : 'bg-[#06C755] text-white shadow-xl hover:brightness-105 active:scale-95'
                    }`}
                  >
                    <i className={`fa-${isSubscribed ? 'solid fa-check' : 'brands fa-line'} text-xl`}></i>
                    {isSubscribed ? '已成功訂閱芒果季' : '芒果季開始前收到 LINE 通知'}
                  </button>
                </div>
              </div>

              <div className="hidden md:flex justify-end">
                <img 
                  src="https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&h=600&q=80" 
                  alt="Mango"
                  className="w-80 h-80 object-cover rounded-[3rem] shadow-2xl border-8 border-white/10 -rotate-3 transition-transform group-hover:rotate-0"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SeasonCountdown;
