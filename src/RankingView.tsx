import React, { useState } from 'react';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  HelpCircle, 
  RefreshCw, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  Flame, 
  Compass, 
  BookOpen, 
  Info,
  ChevronDown,
  ChevronUp,
  UserCheck
} from 'lucide-react';
import { useApp } from './AppContext';
import { AnonymousRankingUser } from './types';
import { getRankInfo } from './achievementsData';

export const RankingView: React.FC = () => {
  const { 
    rankingSummary, 
    anonymousIdentity, 
    userRankPosition, 
    syncUserRanking, 
    achievements, 
    setActiveTab 
  } = useApp();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showFullRanking, setShowFullRanking] = useState(false);
  const [activeTabFilter, setActiveTabFilter] = useState<'top10' | 'all'>('top10');

  const totalPossible = achievements.length || 23;
  const userUnlockedCount = achievements.filter(a => a.isUnlocked).length;
  const userRankInfo = getRankInfo(userUnlockedCount);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await syncUserRanking();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 400);
  };

  const topTen = rankingSummary?.topTen || [];
  const allRankings = rankingSummary?.allRankings || [];
  const displayList = activeTabFilter === 'top10' ? topTen : allRankings;

  // Podium Users
  const firstPlace = topTen[0] as AnonymousRankingUser | undefined;
  const secondPlace = topTen[1] as AnonymousRankingUser | undefined;
  const thirdPlace = topTen[2] as AnonymousRankingUser | undefined;

  // Format date helper
  const formatDate = (isoString?: string) => {
    if (!isoString) return 'Data recente';
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) return 'Data recente';
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Data recente';
    }
  };

  // Find user's gap to next rank
  const getNextRankGap = () => {
    if (userRankPosition <= 1) {
      return 'Você está no topo da liderança escolar! 👑';
    }
    const userInListIndex = allRankings.findIndex(u => u.id === anonymousIdentity.id);
    if (userInListIndex > 0) {
      const aheadUser = allRankings[userInListIndex - 1];
      const diff = aheadUser.unlockedCount - userUnlockedCount;
      if (diff > 0) {
        return `Faltam ${diff} conquista(s) para você alcançar o ${userRankPosition - 1}º lugar (${aheadUser.displayName})!`;
      } else {
        return `Empatado com ${aheadUser.displayName}! Desbloqueie mais 1 conquista para ultrapassá-lo no desempate de tempo.`;
      }
    }
    return 'Desbloqueie conquistas nos quizzes e simulações para subir de posição!';
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-fade-in text-slate-800">
      
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-purple-400/30">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-300/40 text-purple-200 text-xs font-black uppercase tracking-wider backdrop-blur-xs">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Liderança & Cultura de Paz Escolar</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              🏆 Ranking de Conquistas
            </h1>

            <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed font-medium max-w-2xl">
              Acompanhe a classificação anônima dos estudantes que mais avançaram na jornada de empatia, mediação de conflitos e combate ao bullying escolar.
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                100% Anônimo & Sigiloso
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 border border-white/20 text-purple-200 text-xs font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                Desempate por Data & Hora
              </span>
              <button
                onClick={() => setShowRulesModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/30 hover:bg-purple-500/50 border border-purple-300/40 text-purple-100 text-xs font-bold transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-purple-200" />
                Como funciona a classificação?
              </button>
            </div>
          </div>

          {/* User Quick Position Badge */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 text-center min-w-[220px] w-full md:w-auto shadow-inner">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-200 mb-1">
              Seu Identificador
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-300 flex items-center justify-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-400" />
              <span>{anonymousIdentity.displayName}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-around gap-2 text-xs">
              <div>
                <span className="block text-[10px] text-purple-200 uppercase font-bold">Posição</span>
                <span className="font-black text-white text-base">
                  {userRankPosition === 1 ? '🥇 1º' : userRankPosition === 2 ? '🥈 2º' : userRankPosition === 3 ? '🥉 3º' : `${userRankPosition}º`}
                </span>
              </div>
              <div className="h-6 w-px bg-white/20" />
              <div>
                <span className="block text-[10px] text-purple-200 uppercase font-bold">Conquistas</span>
                <span className="font-black text-white text-base">
                  {userUnlockedCount}/{totalPossible}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Personal Performance Card ("Seu Desempenho") */}
      <section className="bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50/70 border-2 border-purple-300/80 rounded-3xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-purple-600 text-white text-[11px] font-black uppercase tracking-wider">
                Seu Desempenho
              </span>
              <span className="text-xs font-extrabold text-purple-950">
                {anonymousIdentity.displayName} (Você)
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                • Código Anônimo Permanente
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Você está em{' '}
                <span className="text-purple-700 underline decoration-purple-300 underline-offset-4">
                  {userRankPosition}º lugar
                </span>{' '}
                no ranking geral
              </h2>
              <span className={`px-3 py-1 rounded-xl text-xs font-black border ${userRankInfo.color}`}>
                {userRankInfo.badgeEmoji} {userRankInfo.title}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-purple-950 font-medium">
              {getNextRankGap()}
            </p>

            {/* Progress Bar */}
            <div className="pt-2 max-w-xl">
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                <span>Progresso de Conquistas Desbloqueadas</span>
                <span className="text-purple-900 font-black">{userUnlockedCount} de {totalPossible} ({Math.round((userUnlockedCount / totalPossible) * 100)}%)</span>
              </div>
              <div className="w-full h-3 bg-purple-200/80 rounded-full overflow-hidden p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-500 shadow-xs"
                  style={{ width: `${Math.max(4, (userUnlockedCount / totalPossible) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full lg:w-auto shrink-0">
            <button
              onClick={() => setActiveTab('achievements')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Ver Conquistas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white hover:bg-purple-50 text-purple-900 border border-purple-200 font-bold text-xs transition-all active:scale-95 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-purple-700" />
              <span>Quizzes</span>
            </button>

            <button
              onClick={() => setActiveTab('simulations')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white hover:bg-purple-50 text-purple-900 border border-purple-200 font-bold text-xs transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-700" />
              <span>Simulações 🎭</span>
            </button>
          </div>

        </div>
      </section>

      {/* Podium Top 3 Showcase */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Pódio dos Guardiões da Paz
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Top 3 Líderes da Escola
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-end pt-4">
          
          {/* 🥈 2º LUGAR */}
          <div className={`order-2 md:order-1 rounded-3xl p-6 border-2 transition-all relative text-center bg-gradient-to-b from-slate-50 to-slate-100/90 shadow-md ${
            secondPlace?.isCurrentUser 
              ? 'border-purple-500 ring-4 ring-purple-200' 
              : 'border-slate-300'
          } ${!secondPlace ? 'opacity-80 border-dashed' : ''}`}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-slate-200 border-2 border-slate-400 flex items-center justify-center text-slate-800 font-black text-sm shadow-sm">
              🥈 2º
            </div>

            <div className="mt-2 space-y-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-slate-200 to-slate-400 flex items-center justify-center text-2xl shadow-inner border border-slate-300">
                🥈
              </div>

              <div className="font-black text-base sm:text-lg text-slate-900 flex items-center justify-center gap-1.5">
                <span>{secondPlace ? secondPlace.displayName : 'Vaga Aberta'}</span>
                {secondPlace?.isCurrentUser && (
                  <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-black uppercase">
                    Você
                  </span>
                )}
              </div>

              {secondPlace ? (
                <>
                  <div className="text-xs font-bold text-slate-600">
                    <span className="text-slate-900 font-black text-base">{secondPlace.unlockedCount}</span> / {totalPossible} conquistas
                  </div>

                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200/80 text-slate-800 text-[11px] font-extrabold">
                    <span>{secondPlace.rankTierTitle || 'Sentinela'}</span>
                  </div>

                  <div className="text-[11px] text-slate-500 font-medium pt-1 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Marco: {formatDate(secondPlace.lastCountReachedAt)}</span>
                  </div>
                </>
              ) : (
                <div className="py-2 text-xs text-slate-500 font-medium">
                  Aguardando novo estudante da escola desbloquear conquistas
                </div>
              )}
            </div>
          </div>

          {/* 🥇 1º LUGAR (CHAMPION) */}
          <div className={`order-1 md:order-2 rounded-3xl p-7 border-2 transition-all relative text-center bg-gradient-to-b from-amber-50 via-amber-100/50 to-yellow-50 shadow-xl scale-100 md:-translate-y-3 ${
            firstPlace?.isCurrentUser 
              ? 'border-amber-500 ring-4 ring-amber-300' 
              : 'border-amber-400'
          } ${!firstPlace ? 'opacity-80 border-dashed' : ''}`}>
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 border-2 border-white text-white font-black text-sm shadow-md flex items-center gap-1">
              <Crown className="w-4 h-4 text-white fill-white" />
              <span>🥇 1º LUGAR</span>
            </div>

            <div className="mt-3 space-y-2.5">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 flex items-center justify-center text-3xl shadow-lg border-2 border-amber-200 animate-pulse">
                👑
              </div>

              <div className="font-black text-lg sm:text-xl text-amber-950 flex items-center justify-center gap-1.5">
                <span>{firstPlace ? firstPlace.displayName : 'Vaga Aberta'}</span>
                {firstPlace?.isCurrentUser && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-black uppercase">
                    Você
                  </span>
                )}
              </div>

              {firstPlace ? (
                <>
                  <div className="text-xs font-extrabold text-amber-900">
                    <span className="text-amber-950 font-black text-xl">{firstPlace.unlockedCount}</span> / {totalPossible} conquistas
                  </div>

                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-200 text-amber-950 text-xs font-black border border-amber-300">
                    <span>{firstPlace.rankTierTitle || 'Lenda da Escola'}</span>
                  </div>

                  <div className="text-[11px] text-amber-800/90 font-bold pt-1 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span>Alcançado em: {formatDate(firstPlace.lastCountReachedAt)}</span>
                  </div>
                </>
              ) : (
                <div className="py-2 text-xs text-amber-800/80 font-medium">
                  Seja o primeiro a conquistar o topo da liderança escolar!
                </div>
              )}
            </div>
          </div>

          {/* 🥉 3º LUGAR */}
          <div className={`order-3 rounded-3xl p-6 border-2 transition-all relative text-center bg-gradient-to-b from-orange-50 to-amber-50/70 shadow-md ${
            thirdPlace?.isCurrentUser 
              ? 'border-purple-500 ring-4 ring-purple-200' 
              : 'border-orange-300'
          } ${!thirdPlace ? 'opacity-80 border-dashed' : ''}`}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-orange-200 border-2 border-orange-400 flex items-center justify-center text-orange-950 font-black text-sm shadow-sm">
              🥉 3º
            </div>

            <div className="mt-2 space-y-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-orange-200 to-amber-300 flex items-center justify-center text-2xl shadow-inner border border-orange-300">
                🥉
              </div>

              <div className="font-black text-base sm:text-lg text-slate-900 flex items-center justify-center gap-1.5">
                <span>{thirdPlace ? thirdPlace.displayName : 'Vaga Aberta'}</span>
                {thirdPlace?.isCurrentUser && (
                  <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-black uppercase">
                    Você
                  </span>
                )}
              </div>

              {thirdPlace ? (
                <>
                  <div className="text-xs font-bold text-slate-600">
                    <span className="text-slate-900 font-black text-base">{thirdPlace.unlockedCount}</span> / {totalPossible} conquistas
                  </div>

                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-100 text-orange-950 text-[11px] font-extrabold border border-orange-200">
                    <span>{thirdPlace.rankTierTitle || 'Guardião'}</span>
                  </div>

                  <div className="text-[11px] text-slate-500 font-medium pt-1 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Marco: {formatDate(thirdPlace.lastCountReachedAt)}</span>
                  </div>
                </>
              ) : (
                <div className="py-2 text-xs text-slate-500 font-medium">
                  Aguardando novo estudante da escola desbloquear conquistas
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* TOP 10 / FULL LEADERBOARD TABLE */}
      <section className="bg-white border border-purple-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
        
        {/* Table Header & Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-100 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Medal className="w-5 h-5 text-purple-600" />
              <span>Tabela Oficial de Classificação</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Ordenação estrita por Conquistas Totais e Desempate por Data/Hora
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <div className="inline-flex p-1 rounded-2xl bg-purple-100/70 border border-purple-200 text-xs font-bold">
              <button
                onClick={() => setActiveTabFilter('top10')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTabFilter === 'top10' 
                    ? 'bg-purple-600 text-white shadow-2xs' 
                    : 'text-purple-950 hover:bg-purple-200/60'
                }`}
              >
                Top 10 Melhores
              </button>
              <button
                onClick={() => setActiveTabFilter('all')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTabFilter === 'all' 
                    ? 'bg-purple-600 text-white shadow-2xs' 
                    : 'text-purple-950 hover:bg-purple-200/60'
                }`}
              >
                Ver Todos ({allRankings.length})
              </button>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              title="Atualizar lista do ranking"
              className="p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-purple-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Responsive Table / Cards */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-purple-100 text-[11px] font-black uppercase tracking-wider text-purple-950 bg-purple-50/50 rounded-xl">
                <th className="py-3 px-4 rounded-l-xl">Posição</th>
                <th className="py-3 px-4">Participante Anônimo</th>
                <th className="py-3 px-4 text-center">Conquistas</th>
                <th className="py-3 px-4">Patente Escolar</th>
                <th className="py-3 px-4 text-right rounded-r-xl">Data do Marco</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100 text-xs font-medium">
              {displayList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 font-medium bg-white">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Trophy className="w-8 h-8 text-purple-300 animate-bounce" />
                      <p className="font-bold text-slate-700 text-sm">Nenhum participante registrado ainda</p>
                      <p className="text-xs text-slate-500">Conclua quizzes e simulações para registrar sua pontuação no ranking real!</p>
                    </div>
                  </td>
                </tr>
              ) : (
                displayList.map((user, idx) => {
                  const position = user.rankPosition || idx + 1;
                  const isUser = user.isCurrentUser || user.id === anonymousIdentity.id;

                  return (
                    <tr 
                      key={user.id || `rank-${idx}`}
                      className={`transition-colors ${
                        isUser 
                          ? 'bg-purple-100/80 font-bold border-l-4 border-l-purple-600 text-purple-950' 
                          : idx % 2 === 0 
                          ? 'bg-white hover:bg-purple-50/40' 
                          : 'bg-purple-50/20 hover:bg-purple-50/60'
                      }`}
                    >
                      {/* Position */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          {position === 1 && (
                            <span className="w-7 h-7 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center font-black text-xs shadow-2xs">
                              🥇 1º
                            </span>
                          )}
                          {position === 2 && (
                            <span className="w-7 h-7 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 flex items-center justify-center font-black text-xs shadow-2xs">
                              🥈 2º
                            </span>
                          )}
                          {position === 3 && (
                            <span className="w-7 h-7 rounded-xl bg-orange-100 border border-orange-300 text-orange-900 flex items-center justify-center font-black text-xs shadow-2xs">
                              🥉 3º
                            </span>
                          )}
                          {position > 3 && (
                            <span className="w-7 h-7 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 flex items-center justify-center font-black text-xs">
                              #{position}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Anonymous Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-black text-sm ${isUser ? 'text-purple-950' : 'text-slate-900'}`}>
                            {user.displayName}
                          </span>
                          {isUser && (
                            <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
                              Você
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal">
                          ID: {user.id ? user.id.substring(0, 10) + '...' : 'anon'}
                        </span>
                      </td>

                      {/* Achievements Count & Mini Progress */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <span className="font-black text-slate-900 text-sm">
                            {user.unlockedCount} <span className="text-slate-500 font-normal text-xs">/ {totalPossible}</span>
                          </span>
                          <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-purple-600 rounded-full"
                              style={{ width: `${(user.unlockedCount / totalPossible) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Rank Tier */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs font-bold">
                          <span>{user.rankTierTitle || 'Aprendiz'}</span>
                        </span>
                      </td>

                      {/* Timestamp Reached */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="text-xs font-semibold text-slate-700">
                          {formatDate(user.lastCountReachedAt)}
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal">
                          data da conquista
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer info */}
        <div className="pt-3 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>
            Exibindo {displayList.length} de {allRankings.length} participantes da comunidade escolar
          </span>
          <span className="text-[11px] text-purple-700 font-bold">
            Última sincronização: {formatDate(rankingSummary?.lastUpdated)}
          </span>
        </div>

      </section>

      {/* Rules & Criteria Explanatory Card */}
      <section className="bg-purple-50/80 border border-purple-200 rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-purple-950">
              Regras Oficiais de Classificação e Desempate
            </h3>
            <p className="text-xs text-purple-800 font-medium">
              Transparência total, sem sorteios e com integridade determinística.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="bg-white p-4 rounded-2xl border border-purple-200 space-y-1.5 shadow-2xs">
            <div className="font-black text-purple-900 flex items-center gap-1.5 text-sm">
              <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs">1</span>
              <span>1º Critério: Total de Conquistas</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              Quem possui mais conquistas desbloqueadas (ex: 20 conquistas) sempre fica à frente de quem possui menos (ex: 18 conquistas).
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-purple-200 space-y-1.5 shadow-2xs">
            <div className="font-black text-purple-900 flex items-center gap-1.5 text-sm">
              <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs">2</span>
              <span>2º Critério: Desempate por Data</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              Em caso de mesmo número de conquistas, quem atingiu aquela quantidade <strong>primeiro (data/hora mais antiga)</strong> assume a posição superior.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-purple-200 space-y-1.5 shadow-2xs">
            <div className="font-black text-purple-900 flex items-center gap-1.5 text-sm">
              <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs">3</span>
              <span>3º Critério: Código Anônimo</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              O nome <em>"Anônimo 001"</em> é o código de identificação do usuário e <strong>não sua posição</strong>. O ranking nunca utiliza sorteio.
            </p>
          </div>

        </div>
      </section>

      {/* Rules Modal */}
      {showRulesModal && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in text-slate-800"
        >
          <div className="bg-white border-2 border-purple-300 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative animate-scale-up space-y-4">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="font-black text-lg text-slate-900">
                  Como Funciona o Ranking Anônimo?
                </h3>
              </div>
              <button
                onClick={() => setShowRulesModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-purple-50 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
                <div className="font-black text-purple-950">🔒 Sigilo Absoluto</div>
                <p>Nenhum aluno precisa criar conta, informar e-mail, telefone ou nome real. O sistema gera automaticamente um identificador anônimo permanente como <strong>Anônimo 001</strong>.</p>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <div className="font-black text-amber-950">🏆 Regra de Ouro do Desempate</div>
                <p>Se dois estudantes tiverem exatamente 18 conquistas, o sistema analisa a <strong>data e hora exata</strong> em que cada um desbloqueou a 18ª conquista. Quem completou mais cedo fica em 1º lugar.</p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <div className="font-black text-emerald-950">🎭 Como Subir de Posição?</div>
                <p>Basta explorar os 5 Quizzes Educativos, ler a Legislação Anti-Bullying, vivenciar as Simulações Interativas e praticar as sessões de respiração.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowRulesModal(false)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black text-sm py-3 px-6 rounded-2xl shadow-sm transition-all cursor-pointer"
              >
                Entendi! Voltar ao Ranking
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
