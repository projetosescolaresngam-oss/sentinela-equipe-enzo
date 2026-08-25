import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Send, 
  Search, 
  HeartHandshake, 
  BarChart3, 
  PhoneCall, 
  Wind, 
  Menu, 
  X, 
  Sparkles, 
  ChevronRight, 
  Heart,
  Compass,
  Trophy
} from 'lucide-react';
import { useApp } from './AppContext';
import { AppTab } from './types';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    notifications, 
    setIsBreathingModalOpen,
    setIsLoadingScreen,
    achievements
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const unreadNotifs = notifications.filter(n => !n.read).length;
  const unlockedBadgesCount = achievements.filter(a => a.isUnlocked).length;

  interface NavItem {
    id: AppTab;
    label: string;
    shortLabel: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    highlight?: boolean;
    badge?: number | string | null;
  }

  const navItems: NavItem[] = [
    { 
      id: 'home', 
      label: 'Início', 
      shortLabel: 'Início', 
      description: 'Página inicial e visão geral', 
      icon: ShieldCheck 
    },
    { 
      id: 'guide', 
      label: 'Guia / Tutorial', 
      shortLabel: 'Guia', 
      description: 'Como usar e passo a passo', 
      icon: Compass 
    },
    { 
      id: 'achievements', 
      label: 'Conquistas', 
      shortLabel: 'Conquistas', 
      description: 'Distintivos e molduras de honra', 
      icon: Trophy
    },
    { 
      id: 'education', 
      label: 'Tipos de Bullying', 
      shortLabel: 'Bullying', 
      description: 'Leis, sinais e como agir', 
      icon: BookOpen 
    },
    { 
      id: 'report', 
      label: 'Denúncia Anônima', 
      shortLabel: 'Denunciar', 
      description: 'Envio seguro e sigiloso', 
      icon: Send, 
      highlight: true 
    },
    { 
      id: 'tracker', 
      label: 'Acompanhar Protocolo', 
      shortLabel: 'Protocolo', 
      description: 'Consultar status e respostas', 
      icon: Search 
    },
    { 
      id: 'support', 
      label: 'Apoio Emocional', 
      shortLabel: 'Apoio IA', 
      description: 'Chat com a Sentinela', 
      icon: HeartHandshake 
    },
    { 
      id: 'admin', 
      label: 'Painel Gestão', 
      shortLabel: 'Gestão', 
      description: 'Conselho e mediação', 
      icon: BarChart3, 
      badge: unreadNotifs > 0 ? unreadNotifs : null 
    },
  ];

  const handleSelectTab = (tabId: NavItem['id']) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-200/90 text-slate-800 transition-colors shadow-2xs w-full">
        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-4">
            
            {/* Logo / Brand Framing */}
            <button 
              id="nav-logo-btn"
              onClick={() => handleSelectTab('home')}
              className="flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-2xl p-1 shrink-0 group transition-all"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform text-white font-black shrink-0">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-black text-sm sm:text-base md:text-lg text-slate-900 tracking-tight whitespace-nowrap">
                    Sentinela Escolar
                  </span>
                  <span className="inline-flex items-center text-[9px] sm:text-[10px] font-extrabold uppercase px-1.5 sm:px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300 shrink-0">
                    Sigilo 100%
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium whitespace-nowrap leading-none mt-0.5 hidden xs:block">
                  Acolhimento & Prevenção
                </p>
              </div>
            </button>

            {/* Desktop Navigation (Visible on Large Screens) */}
            <nav className="hidden xl:flex items-center gap-1 shrink-0">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => handleSelectTab(item.id)}
                    className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-xs'
                        : item.highlight
                        ? 'bg-purple-100 text-purple-950 hover:bg-purple-200 border border-purple-300'
                        : 'text-slate-700 hover:bg-purple-50 hover:text-purple-950'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold bg-rose-500 text-white rounded-full animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Medium Screens Navigation (Compact pills on md/lg) */}
            <nav className="hidden md:flex xl:hidden items-center gap-1 shrink-0">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-md-${item.id}`}
                    onClick={() => handleSelectTab(item.id)}
                    title={item.label}
                    className={`relative flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-xs'
                        : item.highlight
                        ? 'bg-purple-100 text-purple-950 hover:bg-purple-200 border border-purple-300'
                        : 'text-slate-700 hover:bg-purple-50 hover:text-purple-950'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.shortLabel}</span>
                    {item.badge && (
                      <span className="ml-0.5 px-1 py-0.2 text-[9px] font-bold bg-rose-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Quick Actions & Mobile Menu Toggle */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Relaxation Button */}
              <button
                id="btn-quick-breathing"
                onClick={() => setIsBreathingModalOpen(true)}
                title="Exercício de Respiração Guiada"
                className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-purple-100/90 border border-purple-300 text-purple-950 hover:bg-purple-200 text-xs font-bold transition-all shrink-0 active:scale-95"
              >
                <Wind className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                <span className="whitespace-nowrap">Acalmar</span>
              </button>

              {/* SOS 188 Emergency Button */}
              <a
                id="btn-sos-call-188"
                href="tel:188"
                title="Ligue Grátis CVV 188"
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold transition-transform active:scale-95 shadow-xs shrink-0 whitespace-nowrap"
              >
                <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                <span>SOS 188</span>
              </a>

              {/* Hamburger Button (Opens full mobile menu) */}
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-purple-100 border border-purple-300 text-purple-950 hover:bg-purple-200 transition-colors shrink-0"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <div className="relative">
                    <Menu className="w-5 h-5" />
                    {unreadNotifs > 0 && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
                    )}
                  </div>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu (Guarantees ALL items are always accessible) */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-purple-200 bg-white/98 px-4 py-4 space-y-2 shadow-xl animate-fade-in max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-purple-950">
                Menu de Navegação
              </span>
              <span className="text-[11px] text-slate-500">Selecione uma opção:</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-dropdown-${item.id}`}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
                      isActive
                        ? 'bg-purple-600 border-purple-700 text-white shadow-xs'
                        : item.highlight
                        ? 'bg-purple-100/90 border-purple-300 text-purple-950 font-bold'
                        : 'bg-purple-50/50 border-purple-200 text-slate-800 hover:bg-purple-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : item.highlight 
                          ? 'bg-purple-200 text-purple-900' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm">{item.label}</span>
                          {item.badge && (
                            <span className="px-2 py-0.2 text-[10px] font-extrabold bg-rose-500 text-white rounded-full">
                              {item.badge} novo(s)
                            </span>
                          )}
                        </div>
                        <p className={`text-[11px] ${isActive ? 'text-purple-100' : 'text-slate-500'}`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Quick Actions inside mobile dropdown */}
            <div className="pt-3 border-t border-purple-200/80 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsBreathingModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-purple-100 text-purple-950 font-bold text-xs border border-purple-300"
              >
                <Wind className="w-4 h-4 text-purple-700" />
                <span>Exercício de Respiração & Descompressão</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLoadingScreen(true);
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-rose-50 text-rose-800 font-bold text-xs border border-rose-200"
              >
                <Heart className="w-4 h-4 text-rose-600 fill-rose-500" />
                <span>Ver Animação da Solidariedade</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sticky Bottom Navigation Bar for Instant 1-Tap Access */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-purple-200 py-1.5 px-2 shadow-lg">
        <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
          
          <button
            onClick={() => handleSelectTab('home')}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
              activeTab === 'home' ? 'text-purple-700 font-black' : 'text-slate-500 font-medium'
            }`}
          >
            <ShieldCheck className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight">Início</span>
          </button>

          <button
            onClick={() => handleSelectTab('education')}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
              activeTab === 'education' ? 'text-purple-700 font-black' : 'text-slate-500 font-medium'
            }`}
          >
            <BookOpen className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight">Tipos</span>
          </button>

          <button
            onClick={() => handleSelectTab('report')}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
              activeTab === 'report' ? 'text-purple-700 font-black' : 'text-purple-900 font-bold'
            }`}
          >
            <div className="w-7 h-7 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs -mt-2">
              <Send className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] leading-tight mt-0.5">Denunciar</span>
          </button>

          <button
            onClick={() => handleSelectTab('tracker')}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
              activeTab === 'tracker' ? 'text-purple-700 font-black' : 'text-slate-500 font-medium'
            }`}
          >
            <Search className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight">Protocolo</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
              mobileMenuOpen ? 'text-purple-700 font-black' : 'text-slate-500 font-medium'
            }`}
          >
            <div className="relative">
              <Menu className="w-5 h-5 mb-0.5" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
              )}
            </div>
            <span className="text-[10px] leading-tight">Mais</span>
          </button>

        </div>
      </div>
    </>
  );
};
