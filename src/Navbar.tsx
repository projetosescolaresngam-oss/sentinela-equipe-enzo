import React from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Send, 
  Search, 
  HeartHandshake, 
  BarChart3, 
  PhoneCall, 
  Wind,
  Bell
} from 'lucide-react';
import { useApp } from './AppContext';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    notifications, 
    setIsBreathingModalOpen 
  } = useApp();

  const unreadNotifs = notifications.filter(n => !n.read).length;

  interface NavItem {
    id: 'home' | 'education' | 'report' | 'tracker' | 'support' | 'admin';
    label: string;
    shortLabel?: string;
    icon: React.ComponentType<{ className?: string }>;
    highlight?: boolean;
    badge?: number | null;
  }

  const navItems: NavItem[] = [
    { id: 'home', label: 'Início', shortLabel: 'Início', icon: ShieldCheck },
    { id: 'education', label: 'Tipos de Bullying', shortLabel: 'Tipos', icon: BookOpen },
    { id: 'report', label: 'Denúncia Anônima', shortLabel: 'Denunciar', icon: Send, highlight: true },
    { id: 'tracker', label: 'Acompanhar Protocolo', shortLabel: 'Protocolo', icon: Search },
    { id: 'support', label: 'Apoio Emocional', shortLabel: 'Apoio', icon: HeartHandshake },
    { id: 'admin', label: 'Painel Gestão', shortLabel: 'Gestão', icon: BarChart3, badge: unreadNotifs > 0 ? unreadNotifs : null },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-200/90 text-slate-800 transition-colors shadow-2xs w-full max-w-full">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3">
          
          {/* Logo / Brand Framing */}
          <button 
            id="nav-logo-btn"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-2xl p-1 shrink-0 group transition-all"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform text-white font-black shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="font-black text-base sm:text-lg text-slate-900 tracking-tight whitespace-nowrap">
                  Sentinela Escolar
                </span>
                <span className="inline-flex items-center text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300 shrink-0">
                  Sigilo 100%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium whitespace-nowrap leading-none mt-1 hidden sm:block">
                Acolhimento & Prevenção ao Bullying
              </p>
            </div>
          </button>

          {/* Desktop Navigation (Visible on lg/xl screens to prevent crowding) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-1.5 xl:gap-2 px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-xs'
                      : item.highlight
                      ? 'bg-purple-100 text-purple-950 hover:bg-purple-200 border border-purple-300'
                      : 'text-slate-700 hover:bg-purple-50 hover:text-purple-950'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="hidden xl:inline">{item.label}</span>
                  <span className="xl:hidden">{item.shortLabel || item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold bg-rose-500 text-white rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick SOS & Relaxation Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="btn-quick-breathing"
              onClick={() => setIsBreathingModalOpen(true)}
              title="Exercício de Respiração Rápida"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-purple-100/90 border border-purple-300 text-purple-950 hover:bg-purple-200 text-xs font-bold transition-all shrink-0 active:scale-95"
            >
              <Wind className="w-3.5 h-3.5 text-purple-700 shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">Acalmar Mente</span>
            </button>

            <a
              id="btn-sos-call-188"
              href="tel:188"
              title="Ligar para Apoio Emocional Gratuito CVV 188"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold transition-transform active:scale-95 shadow-xs shrink-0 whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5 shrink-0" />
              <span>SOS 188</span>
            </a>
          </div>

        </div>

        {/* Secondary Navigation Row for Mobile and Medium screens (< lg) */}
        <div className="lg:hidden py-2.5 border-t border-purple-200/80 w-full max-w-full min-w-0 overflow-hidden">
          <div className="flex items-center justify-between px-1 mb-1.5 text-[10px] text-slate-500 font-medium">
            <span className="font-bold text-purple-950">Acesso Rápido:</span>
            <span className="text-purple-800 font-semibold">← Deslize para navegar →</span>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory touch-pan-x w-full max-w-full">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`snap-start shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 border ${
                    isActive
                      ? 'bg-purple-600 border-purple-700 text-white shadow-xs'
                      : item.highlight
                      ? 'bg-purple-100 border-purple-300 text-purple-950 font-extrabold shadow-2xs'
                      : 'bg-purple-50/80 border-purple-200 text-slate-700 hover:bg-purple-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-rose-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </header>
  );
};
