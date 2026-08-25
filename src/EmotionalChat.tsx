import React, { useState, useRef, useEffect } from 'react';
import { 
  HeartHandshake, 
  Send, 
  Sparkles, 
  Wind, 
  PhoneCall, 
  ShieldCheck, 
  RotateCcw, 
  Bot, 
  User, 
  Heart,
  AlertOctagon,
  Music
} from 'lucide-react';
import { useApp } from './AppContext';
import { SoundPlayer } from './SoundPlayer';

export const EmotionalChat: React.FC = () => {
  const { 
    chatMessages, 
    sendChatMessage, 
    clearChat, 
    setIsBreathingModalOpen, 
    setActiveTab 
  } = useApp();

  const [inputVal, setInputVal] = useState<string>('');
  const [showSoundsPanel, setShowSoundsPanel] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendChatMessage(inputVal.trim());
    setInputVal('');
  };

  const handleQuickOptionClick = (optionText: string) => {
    if (optionText.toLowerCase().includes('respira')) {
      setIsBreathingModalOpen(true);
      return;
    }
    if (optionText.toLowerCase().includes('denunci')) {
      setActiveTab('report');
      return;
    }
    if (optionText.toLowerCase().includes('cvv') || optionText.toLowerCase().includes('188')) {
      window.location.href = 'tel:188';
      return;
    }
    sendChatMessage(optionText);
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in text-slate-800">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-300/80 text-purple-950 text-xs font-bold uppercase tracking-wider mb-2 shadow-2xs">
          <HeartHandshake className="w-3.5 h-3.5 text-purple-700" />
          Acolhimento Emocional em Tempo Real
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Espaço Seguro de Escuta e Apoio
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Converse com nossa assistente de suporte socioemocional, desacelere sua mente e encontre caminhos seguros para se proteger.
        </p>
      </div>

      {/* Quick Action Bar Above Chat */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
        <button
          onClick={() => setIsBreathingModalOpen(true)}
          className="bg-white border border-purple-200 hover:border-purple-400 p-3.5 rounded-2xl flex items-center gap-2.5 text-left text-xs font-medium text-slate-800 transition-all hover:bg-purple-50/60 shadow-xs"
        >
          <div className="p-2 rounded-xl bg-purple-100 text-purple-800">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold block text-slate-900">Respiração 4-7-8</span>
            <span className="text-[11px] text-purple-800 font-semibold">Guia Visual</span>
          </div>
        </button>

        <button
          onClick={() => setShowSoundsPanel(!showSoundsPanel)}
          className={`bg-white border p-3.5 rounded-2xl flex items-center gap-2.5 text-left text-xs font-medium transition-all shadow-xs ${
            showSoundsPanel 
              ? 'border-purple-400 bg-purple-100/70 text-purple-950 ring-1 ring-purple-400' 
              : 'border-purple-200 hover:border-purple-400 text-slate-800 hover:bg-purple-50/60'
          }`}
        >
          <div className="p-2 rounded-xl bg-purple-100 text-purple-800">
            <Music className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold block text-slate-900">Sons Relaxantes</span>
            <span className="text-[11px] text-purple-800 font-semibold">{showSoundsPanel ? 'Ocultar Sons' : 'Chuva, Mar & Zen'}</span>
          </div>
        </button>

        <a
          href="tel:188"
          className="bg-white border border-rose-200 hover:border-rose-300 p-3.5 rounded-2xl flex items-center gap-2.5 text-left text-xs font-medium text-slate-800 transition-all hover:bg-rose-50/60 shadow-xs"
        >
          <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold block text-slate-900">Ligar CVV (188)</span>
            <span className="text-[11px] text-rose-700 font-bold">Apoio Gratuito 24h</span>
          </div>
        </a>

        <button
          onClick={() => setActiveTab('report')}
          className="hidden sm:flex bg-white border border-purple-200 hover:border-purple-400 p-3.5 rounded-2xl items-center gap-2.5 text-left text-xs font-medium text-slate-800 transition-all hover:bg-purple-50/60 shadow-xs"
        >
          <div className="p-2 rounded-xl bg-purple-100 text-purple-800">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold block text-slate-900">Fazer Denúncia</span>
            <span className="text-[11px] text-purple-800 font-semibold">100% Anônima</span>
          </div>
        </button>
      </div>

      {/* Relaxing Sounds Section (Togglable or Always Available) */}
      <SoundPlayer />

      {/* Main Chat Container */}
      <div className="bg-white border border-purple-200/90 rounded-3xl p-4 sm:p-6 text-slate-800 shadow-xs flex flex-col h-[520px]">
        
        {/* Chat Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-800">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                Sentinela Acolhe
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">Assistente de suporte socioemocional</p>
            </div>
          </div>

          <button
            onClick={clearChat}
            className="text-xs text-slate-500 hover:text-slate-900 p-1.5 rounded-xl hover:bg-purple-50 flex items-center gap-1 font-semibold transition-colors"
            title="Limpar Conversa"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-none">
          {chatMessages.map((msg) => {
            const isUser = msg.sender === 'usuario';
            return (
              <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mb-1 px-1">
                  {isUser ? (
                    <>
                      <User className="w-3 h-3 text-purple-700" />
                      <span className="font-bold text-purple-950">Você</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-3 h-3 text-purple-700" />
                      <span className="font-bold text-purple-950">Sentinela Acolhe</span>
                    </>
                  )}
                </div>

                <div
                  className={`max-w-md p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-purple-600 text-white rounded-tr-xs font-semibold shadow-xs'
                      : 'bg-purple-50 text-slate-900 border border-purple-200/80 rounded-tl-xs shadow-2xs font-medium'
                  }`}
                >
                  {msg.content}
                </div>

                {/* Bot Quick Reply Buttons */}
                {!isUser && msg.quickOptions && msg.quickOptions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-md">
                    {msg.quickOptions.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickOptionClick(opt)}
                        className="bg-purple-100/80 hover:bg-purple-200/80 border border-purple-300 text-purple-950 text-[11px] font-bold py-1.5 px-3 rounded-xl transition-colors text-left"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Disclaimer Note */}
        <div className="py-2 text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-purple-700 flex-shrink-0" />
          <span>Suas mensagens são confidenciais. Este canal não substitui acompanhamento médico ou psicológico clínico.</span>
        </div>

        {/* Input Field Form */}
        <form onSubmit={handleSend} className="flex gap-2 pt-2 border-t border-purple-100">
          <input
            type="text"
            placeholder="Como você está se sentindo? Digite aqui..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-purple-50/50 border border-purple-300/80 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl flex items-center gap-2 transition-all active:scale-95 shadow-xs"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Enviar</span>
          </button>
        </form>

      </div>

    </div>
  );
};
