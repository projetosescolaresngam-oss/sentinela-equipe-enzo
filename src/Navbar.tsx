import React, { useState, useRef, useEffect } from 'react';
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
  Heart,
  Compass,
  Trophy,
  MoreVertical,
  Moon,
  Sun,
  User,
  ChevronRight
} from 'lucide-react';
import { useApp } from './AppContext';
import { AppTab } from './types';
import { UserProfileHeader } from './UserProfileHeader';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    notifications, 
    setIsBreathingModalOpen,
    setIsProfileModalOpen
  } = useApp();

  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Theme state (Dark mode support toggle)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             localStorage.getItem('sentinela_theme') === 'dark';
    }
    return false;
  });

  const moreMenuRef = useRef<HTMLDivElement>(null);
  const unreadNotifs = notifications.filter(n => !n.read).length;

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sentinela_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sentinela_theme', 'light');
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    };

    if (moreMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [moreMenuOpen]);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMoreMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  interface MainNavItem {
    id: AppTab;
    fullLabel: string;
    shortLabel: string;
    icon: React.ComponentType<{ className?: string }>;
    highlight?: boolean;
    badge?: number | string | null;
  }

  // 1. Início | 2. Guia | 3. Denúncia Anônima | 4. Tipos de Bullying | 5. Acompanhar Protocolo | 6. Painel de Gestão
  const mainNavItems: MainNavItem[] = [
    { 
      id: 'home', 
      fullLabel: 'Início', 
      shortLabel: 'Início', 
      icon: ShieldCheck 
    },
    { 
      id: 'guide', 
      fullLabel: 'Guia', 
      shortLabel: 'Guia', 
      icon: Compass 
    },
    { 
      id: 'report', 
      fullLabel: 'Denúncia Anônima', 
      shortLabel: 'Denúncia', 
      icon: Send,
      highlight: true
    },
    { 
      id: 'education', 
      fullLabel: 'Tipos de Bullying', 
      shortLabel: 'Bullying', 
      icon: BookOpen 
    },
    { 
      id: 'tracker', 
      fullLabel: 'Acompanhar Protocolo', 
      shortLabel: 'Protocolo', 
      icon: Search 
    },
    { 
      id: 'admin', 
      fullLabel: 'Painel de Gestão', 
      shortLabel: 'Gestão', 
      icon: BarChart3,
      badge: unreadNotifs > 0 ? unreadNotifs : null
    },
  ];

  interface SecondaryItem {
    id?: AppTab;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    action?: () => void;
    color?: string;
  }

  const secondaryNavItems: SecondaryItem[] = [
    {
      id: 'achievements',
      label: 'Conquistas & Medalhas',
      description: 'Distintivos desbloqueados e honrarias',
      icon: Trophy,
      color: 'text-amber-600 bg-amber-50'
    },
    {
      id: 'ranking',
      label: 'Ranking da Comunidade',
      description: 'Classificação anônima dos estudantes',
      icon: Sparkles,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 'simulations',
      label: 'Simulações Interativas',
      description: 'Dilemas práticos e tomada de decisão',
      icon: Heart,
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      id: 'support',
      label: 'Apoio Emocional & IA',
      description: 'Chat acolhedor e escuta empática',
      icon: HeartHandshake,
      color: 'text-rose-600 bg-rose-50'
    },
    {
      label: 'Exercício de Respiração',
      description: 'Descompressão e relaxamento guiado',
      icon: Wind,
      color: 'text-teal-600 bg-teal-50',
      action: () => setIsBreathingModalOpen(true)
    },
    {
      label: 'Meu Perfil & Missões',
      description: 'Progresso detalhado em 20 níveis',
      icon: User,
      color: 'text-purple-700 bg-purple-100',
      action: () => setIsProfileModalOpen(true)
    },
  ];

  const handleSelectTab = (tabId: AppTab) => {
    setActiveTab(tabId);
    setMoreMenuOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-200/90 text-slate-800 transition-colors shadow-2xs w-full">
        <div className="w-full max-w-[1680px] mx-auto px-2 sm:px-3 md:px-4 lg:px-5">
          <div className="flex items-center justify-between h-16 md:h-17 lg:h-18 gap-1.5 sm:gap-2.5 lg:gap-3">
            
            {/* ========================================================================= */}
            {/* 1. 👤 PERFIL DO USUÁRIO (CANTO ESQUERDO)                                 */}
            {/* ========================================================================= */}
            <div className="flex items-center shrink-0">
              <UserProfileHeader onOpenProfileModal={() => setIsProfileModalOpen(true)} />
            </div>

            {/* Subtle Divider (visible on medium screens and up) */}
            <div className="hidden lg:block h-7 w-px bg-purple-200/80 shrink-0" />

            {/* ========================================================================= */}
            {/* 2. 🛡️ IDENTIDADE DO SENTINELA ESCOLAR                                    */}
            {/* ========================================================================= */}
            <div className="flex items-center shrink-0">
              <button 
                id="nav-logo-btn"
                onClick={() => handleSelectTab('home')}
                title="Página Inicial do Sentinela Escolar"
                className="flex items-center gap-1.5 sm:gap-2 text-left focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-2xl p-1 shrink-0 group transition-all"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-9.5 md:h-9.5 rounded-xl bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform text-white font-black shrink-0">
                  <ShieldCheck className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </div>
                <div className="hidden md:flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-xs sm:text-sm lg:text-[14.5px] text-slate-900 tracking-tight whitespace-nowrap">
                      Sentinela Escolar
                    </span>
                    <span className="hidden xl:inline-flex items-center text-[8.5px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-950 border border-purple-300 shrink-0">
                      SIGILO 100%
                    </span>
                  </div>
                  <p className="text-[9.5px] lg:text-[10px] text-slate-500 font-medium whitespace-nowrap leading-none mt-0.5">
                    Acolhimento & Prevenção
                  </p>
                </div>
              </button>
            </div>

            {/* ========================================================================= */}
            {/* 3. 🧭 MENU PRINCIPAL (ORDEM OBRIGATÓRIA SEM SOBREPOSIÇÃO)                */}
            {/* 1. Início | 2. Guia | 3. Denúncia Anônima | 4. Tipos de Bullying |       */}
            {/* 5. Acompanhar Protocolo | 6. Painel de Gestão                            */}
            {/* ========================================================================= */}
            
            {/* Desktop Full Navigation (xl and 2xl screens: all 6 items fit smoothly) */}
            <nav className="hidden xl:flex items-center gap-1 xl:gap-1.5 flex-1 justify-center min-w-0 px-1">
              {mainNavItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => handleSelectTab(item.id)}
                    className={`relative flex items-center gap-1 xl:gap-1.5 px-2 py-1.5 xl:px-2.5 xl:py-1.5 2xl:px-3 2xl:py-2 rounded-xl text-[11.5px] xl:text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                      isActive
                        ? 'bg-purple-700 text-white shadow-xs scale-[1.02]'
                        : item.highlight
                        ? 'bg-purple-100 text-purple-950 hover:bg-purple-200 border border-purple-300'
                        : 'text-slate-700 hover:bg-purple-50 hover:text-purple-950'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-purple-700' : 'text-purple-600'}`} />
                    <span className="hidden 2xl:inline">{item.fullLabel}</span>
                    <span className="2xl:hidden">{item.shortLabel}</span>
                    {item.badge && (
                      <span className="ml-0.5 px-1.5 py-0.2 text-[8.5px] font-black bg-rose-500 text-white rounded-full animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Medium Screens Navigation (lg: 1024px - 1279px, shows 4 core items) */}
            <nav className="hidden lg:flex xl:hidden items-center gap-1 flex-1 justify-center min-w-0">
              {mainNavItems.slice(0, 4).map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-lg-${item.id}`}
                    onClick={() => handleSelectTab(item.id)}
                    title={item.fullLabel}
                    className={`relative flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                      isActive
                        ? 'bg-purple-700 text-white shadow-xs'
                        : item.highlight
                        ? 'bg-purple-100 text-purple-950 hover:bg-purple-200 border border-purple-300'
                        : 'text-slate-700 hover:bg-purple-50 hover:text-purple-950'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.shortLabel}</span>
                  </button>
                );
              })}
            </nav>

            {/* ========================================================================= */}
            {/* 4. ⋯ / ⋮ BOTÃO DE TRÊS PONTINHOS ("MAIS OPÇÕES") & QUICK ACTIONS           */}
            {/* ========================================================================= */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              
              {/* SOS 188 Quick Call Pill */}
              <a
                id="btn-sos-call-188"
                href="tel:188"
                title="Ligue Grátis para o CVV 188 (Apoio Emocional 24h)"
                className="hidden sm:flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold transition-transform active:scale-95 shadow-xs shrink-0 whitespace-nowrap"
              >
                <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline">SOS</span>
                <span>188</span>
              </a>

              {/* THREE DOTS MENU (⋮) DROPDOWN CONTAINER */}
              <div className="relative shrink-0" ref={moreMenuRef}>
                <button
                  id="btn-more-options-menu"
                  type="button"
                  onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                  aria-expanded={moreMenuOpen}
                  aria-haspopup="true"
                  title="Mais Opções & Recursos"
                  aria-label="Menu de mais opções e funcionalidades secundárias"
                  className={`flex items-center justify-center w-8.5 h-8.5 sm:w-9 sm:h-9 md:w-9.5 md:h-9.5 rounded-xl border transition-all active:scale-95 shrink-0 ${
                    moreMenuOpen
                      ? 'bg-purple-700 text-white border-purple-800 shadow-md'
                      : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border-purple-200 hover:border-purple-300'
                  }`}
                >
                  <MoreVertical className="w-4.5 h-4.5" />
                </button>

                {/* DROPDOWN MENU POPUP */}
                {moreMenuOpen && (
                  <div 
                    id="more-options-dropdown"
                    className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white border border-purple-200/90 shadow-2xl py-2 z-50 animate-fade-in text-slate-800 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="px-3.5 py-2 border-b border-purple-100 flex items-center justify-between bg-purple-50/50">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-purple-700" />
                        <span className="text-xs font-black uppercase tracking-wider text-purple-950">
                          Mais Opções & Recursos
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">Sentinela Escolar</span>
                    </div>

                    {/* Secondary Navigation Links */}
                    <div className="p-1.5 space-y-0.5 max-h-[60vh] overflow-y-auto">
                      {secondaryNavItems.map((item, idx) => {
                        const Icon = item.icon;
                        const isCurrent = item.id && activeTab === item.id;
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              if (item.action) {
                                item.action();
                                setMoreMenuOpen(false);
                              } else if (item.id) {
                                handleSelectTab(item.id);
                              }
                            }}
                            className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-left transition-all ${
                              isCurrent 
                                ? 'bg-purple-100 text-purple-950 font-bold' 
                                : 'hover:bg-purple-50/80 text-slate-700 hover:text-purple-950'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.color || 'bg-purple-100 text-purple-700'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-slate-900 leading-tight">
                                {item.label}
                              </div>
                              <div className="text-[10.5px] text-slate-500 truncate leading-tight mt-0.5">
                                {item.description}
                              </div>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          </button>
                        );
                      })}

                      {/* Items on medium/compact screens that are in main nav */}
                      <div className="xl:hidden pt-2 mt-1 border-t border-purple-100">
                        <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Navegação Principal
                        </div>
                        {mainNavItems.map(item => {
                          const Icon = item.icon;
                          const isActive = activeTab === item.id;
                          return (
                            <button
                              key={`more-main-${item.id}`}
                              onClick={() => handleSelectTab(item.id)}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
                                isActive ? 'bg-purple-600 text-white' : 'hover:bg-purple-50 text-slate-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <Icon className="w-3.5 h-3.5 shrink-0" />
                                <span>{item.fullLabel}</span>
                              </div>
                              {item.badge && (
                                <span className="px-1.5 py-0.2 text-[9px] font-black bg-rose-500 text-white rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom Utility Controls: Dark Mode Toggle & SOS */}
                    <div className="p-2 border-t border-purple-100 bg-purple-50/40 space-y-1.5">
                      {/* Dark Mode Toggle Button */}
                      <button
                        type="button"
                        onClick={toggleDarkMode}
                        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-white border border-purple-200 text-xs font-bold text-slate-700 hover:text-purple-950 hover:bg-purple-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {isDarkMode ? (
                            <Sun className="w-4 h-4 text-amber-500" />
                          ) : (
                            <Moon className="w-4 h-4 text-purple-700" />
                          )}
                          <span>{isDarkMode ? 'Modo Claro' : 'Modo Noturno'}</span>
                        </div>
                        <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded-md">
                          {isDarkMode ? 'Ativo' : 'Desativado'}
                        </span>
                      </button>

                      {/* SOS 188 CVV Emergency Button */}
                      <a
                        href="tel:188"
                        className="w-full flex items-center justify-center gap-2 px-2.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold transition-colors shadow-xs"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Ligue Grátis CVV 188 (24h)</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Hamburger Toggle for Quick Navigation on mobile devices */}
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
                className="lg:hidden flex items-center justify-center w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl bg-purple-100 border border-purple-300 text-purple-950 hover:bg-purple-200 transition-colors shrink-0"
              >
                {mobileMenuOpen ? (
                  <X className="w-4.5 h-4.5" />
                ) : (
                  <div className="relative">
                    <Menu className="w-4.5 h-4.5" />
                    {unreadNotifs > 0 && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
                    )}
                  </div>
                )}
              </button>

            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE FULL DRAWER NAVIGATION                                            */}
        {/* ========================================================================= */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-purple-200 bg-white/98 px-4 py-4 space-y-3 shadow-xl animate-fade-in max-h-[82vh] overflow-y-auto">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-xs font-black uppercase tracking-wider text-purple-950">
                Menu Principal
              </span>
              <span className="text-[11px] text-slate-500">Selecione uma seção:</span>
            </div>

            {/* Primary Nav List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {mainNavItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl font-bold text-xs transition-all ${
                      isActive
                        ? 'bg-purple-700 text-white shadow-xs'
                        : item.highlight
                        ? 'bg-purple-100 text-purple-950 border border-purple-300'
                        : 'bg-purple-50/70 text-slate-800 hover:bg-purple-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-700'}`} />
                      <span>{item.fullLabel}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-black bg-rose-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Secondary Features Section */}
            <div className="pt-2 border-t border-purple-100 space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1">
                Recursos Secundários
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {secondaryNavItems.slice(0, 4).map((sec, i) => {
                  const SecIcon = sec.icon;
                  const isAct = sec.id && activeTab === sec.id;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        if (sec.id) handleSelectTab(sec.id);
                      }}
                      className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-left ${
                        isAct ? 'bg-purple-100 text-purple-950 font-bold border border-purple-300' : 'bg-slate-50 hover:bg-purple-50 text-slate-700'
                      }`}
                    >
                      <SecIcon className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                      <span className="truncate">{sec.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions in Mobile Drawer */}
            <div className="pt-2 border-t border-purple-200 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsProfileModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-purple-100 text-purple-950 font-bold text-xs border border-purple-300"
              >
                <Trophy className="w-4 h-4 text-purple-700" />
                <span>Ver Meu Perfil Completo & Missões Diárias</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsBreathingModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-purple-50 text-purple-900 font-bold text-xs border border-purple-200"
              >
                <Wind className="w-4 h-4 text-purple-700" />
                <span>Exercício de Respiração & Descompressão</span>
              </button>

              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center justify-center gap-2 p-2 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-purple-700" />}
                <span>Alternar Modo Noturno ({isDarkMode ? 'Ativo' : 'Desativado'})</span>
              </button>

              <a
                href="tel:188"
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-rose-600 text-white font-extrabold text-xs shadow-xs"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Ligar para o SOS 188 (CVV Gratuito)</span>
              </a>
            </div>
          </div>
        )}

      </header>
    </>
  );
};
