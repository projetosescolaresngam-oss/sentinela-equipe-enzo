/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './AppContext';
import { Navbar } from './Navbar';
import { EmergencyBanner } from './EmergencyBanner';
import { HomeHero } from './HomeHero';
import { PlatformGuideView } from './PlatformGuideView';
import { EducationalModule } from './EducationalModule';
import { SimulationsModule } from './SimulationsModule';
import { AchievementsView } from './AchievementsView';
import { ReportWizard } from './ReportWizard';
import { ProtocolTracker } from './ProtocolTracker';
import { EmotionalChat } from './EmotionalChat';
import { AdminDashboard } from './AdminDashboard';
import { BreathingModal } from './BreathingModal';
import { LoadingScreen } from './LoadingScreen';
import { AchievementUnlockModal } from './AchievementUnlockModal';
import { ShieldCheck, Heart, Sparkles, Compass, Trophy } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="flex-1 w-full max-w-full overflow-x-hidden pb-16 md:pb-0">
      {activeTab === 'home' && <HomeHero />}
      {activeTab === 'guide' && <PlatformGuideView />}
      {activeTab === 'achievements' && <AchievementsView />}
      {activeTab === 'simulations' && <SimulationsModule />}
      {activeTab === 'education' && <EducationalModule />}
      {activeTab === 'report' && <ReportWizard />}
      {activeTab === 'tracker' && <ProtocolTracker />}
      {activeTab === 'support' && <EmotionalChat />}
      {activeTab === 'admin' && <AdminDashboard />}
    </main>
  );
};

const Footer: React.FC = () => {
  const { setActiveTab, setIsLoadingScreen } = useApp();

  return (
    <footer className="bg-purple-100/60 border-t border-purple-200/80 text-slate-600 text-xs py-8 transition-colors w-full max-w-full overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm">Sentinela Escolar</span>
              <p className="text-[11px] text-slate-500">Ecossistema Seguro de Acolhimento & Prevenção</p>
            </div>
          </div>

          {/* Footer Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <button onClick={() => setActiveTab('guide')} className="text-purple-900 font-bold hover:text-purple-700 transition-colors inline-flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Guia do Site & Tutorial</span>
            </button>
            <button onClick={() => setActiveTab('achievements')} className="text-purple-900 font-bold hover:text-purple-700 transition-colors inline-flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>Conquistas</span>
            </button>
            <button onClick={() => setActiveTab('simulations')} className="text-purple-900 font-bold hover:text-purple-700 transition-colors inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Simulações 🎭</span>
            </button>
            <button onClick={() => setActiveTab('education')} className="hover:text-purple-800 transition-colors">
              Tipos de Bullying
            </button>
            <button onClick={() => setActiveTab('report')} className="hover:text-purple-800 transition-colors">
              Fazer Denúncia
            </button>
            <button onClick={() => setActiveTab('tracker')} className="hover:text-purple-800 transition-colors">
              Acompanhar Protocolo
            </button>
            <button onClick={() => setActiveTab('support')} className="hover:text-purple-800 transition-colors">
              Apoio Emocional
            </button>
            <button onClick={() => setActiveTab('admin')} className="text-purple-700 hover:text-purple-900 font-semibold transition-colors">
              Painel de Gestão
            </button>
            <button 
              onClick={() => setIsLoadingScreen(true)} 
              className="text-rose-700 hover:text-rose-900 font-bold transition-colors inline-flex items-center gap-1"
              title="Assistir à animação de amizade e solidariedade"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Animação da Solidariedade</span>
            </button>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-500">
            <span>Disque 100 • CVV 188 • Emergência 190</span>
            <p className="mt-0.5">Em conformidade com a Lei Federal 13.185/15</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

const AppInner: React.FC = () => {
  const { isLoadingScreen, setIsLoadingScreen } = useApp();

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f8f6fc] text-slate-800 flex flex-col font-sans selection:bg-purple-200 selection:text-purple-950">
      {isLoadingScreen && (
        <LoadingScreen onComplete={() => setIsLoadingScreen(false)} />
      )}
      <EmergencyBanner />
      <Navbar />
      <MainContent />
      <Footer />
      <BreathingModal />
      <AchievementUnlockModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
