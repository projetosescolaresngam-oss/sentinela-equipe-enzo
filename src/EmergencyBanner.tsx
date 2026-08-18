import React, { useState } from 'react';
import { AlertCircle, Phone, Heart, Shield, X, Sparkles } from 'lucide-react';
import { CRISIS_CONTACTS } from './educationalData';

export const EmergencyBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showContactsModal, setShowContactsModal] = useState(false);

  if (!isVisible) return null;

  return (
    <>
      <div className="bg-purple-100/80 text-purple-950 border-b border-purple-200/90 px-3 sm:px-4 py-2 text-xs shadow-2xs w-full max-w-full overflow-hidden">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 overflow-hidden min-w-0">
            <span className="flex h-2 w-2 relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <p className="truncate font-medium text-slate-800 text-xs">
              <span className="font-extrabold text-purple-950">Você não está sozinho(a):</span> Canal 100% anônimo e protegido pela Lei 13.185/15.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setShowContactsModal(true)}
              className="text-[11px] sm:text-xs font-bold text-purple-900 hover:text-purple-700 underline underline-offset-2 flex items-center gap-1 shrink-0"
            >
              <Phone className="w-3 h-3" />
              <span className="whitespace-nowrap">Canais de Apoio 24h</span>
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-slate-400 hover:text-slate-700 p-0.5 rounded-md hover:bg-purple-200/50"
              aria-label="Fechar banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Telefones de Emergência */}
      {showContactsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-purple-200 rounded-3xl max-w-lg w-full p-6 text-slate-900 shadow-2xl relative">
            <button
              onClick={() => setShowContactsModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-purple-50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 shadow-sm">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">Rede de Proteção e Acolhimento</h3>
                <p className="text-xs text-slate-500">Linhas gratuitas, anônimas e disponíveis a qualquer momento</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {CRISIS_CONTACTS.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-3.5 flex items-center justify-between gap-3 hover:border-purple-400 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                      <span className="text-[10px] font-bold bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                  <a
                    href={`tel:${item.phone.replace(/[^0-9]/g, '')}`}
                    className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Ligar {item.phone}</span>
                  </a>
                </div>
              ))}
            </div>

            <div className="bg-purple-100/60 border border-purple-300/80 rounded-2xl p-3 text-xs text-purple-950 flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-purple-700 mt-0.5 flex-shrink-0" />
              <p>
                As ligações para o <strong>188 (CVV)</strong> e <strong>100 (Direitos Humanos)</strong> não aparecem discriminadas na conta telefônica e são completamente sigilosas.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
