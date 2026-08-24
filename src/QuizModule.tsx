import React, { useState } from 'react';
import { 
  HelpCircle, 
  Trophy, 
  ShieldCheck, 
  Award, 
  Smartphone, 
  HeartHandshake, 
  BookOpen, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  Sparkles, 
  ArrowRight,
  Zap,
  Target
} from 'lucide-react';
import { EDUCATIONAL_QUIZZES } from './quizData';
import { EducationalQuiz, UserQuizProgress } from './types';
import { QuizPlayer } from './QuizPlayer';
import { useApp } from './AppContext';

interface QuizModuleProps {
  initialQuizId?: string;
  onGoToAchievements: () => void;
  onNavigateToTab?: (tab: 'types' | 'quiz' | 'legislation' | 'achievements') => void;
}

export const QuizModule: React.FC<QuizModuleProps> = ({ 
  initialQuizId, 
  onGoToAchievements,
  onNavigateToTab 
}) => {
  const { educationalProgress, achievements } = useApp();

  const [activeQuiz, setActiveQuiz] = useState<EducationalQuiz | null>(() => {
    if (initialQuizId) {
      return EDUCATIONAL_QUIZZES.find(q => q.id === initialQuizId) || null;
    }
    return null;
  });

  const quizzesProgress = educationalProgress.quizzesProgress || {};
  const progressList = Object.values(quizzesProgress) as UserQuizProgress[];
  const totalCompletedQuizzes = progressList.filter(q => q.completed).length;
  const totalAvailableQuizzes = EDUCATIONAL_QUIZZES.length;
  
  // Calculate average score across completed quizzes
  const completedRecords = progressList.filter(q => q.completed && q.totalQuestions > 0);
  const avgAccuracy = completedRecords.length > 0 
    ? Math.round(completedRecords.reduce((acc: number, curr: UserQuizProgress) => acc + (curr.bestScore / curr.totalQuestions), 0) / completedRecords.length * 100)
    : 0;

  const totalQuestionsAnswered = educationalProgress.totalQuestionsAnswered || (completedRecords.reduce((sum: number, r: UserQuizProgress) => sum + (r.attempts * r.totalQuestions), 0));

  const renderQuizIcon = (iconType: EducationalQuiz['iconType']) => {
    switch (iconType) {
      case 'smartphone':
        return <Smartphone className="w-6 h-6 text-indigo-600" aria-hidden="true" />;
      case 'users':
        return <HeartHandshake className="w-6 h-6 text-purple-600" aria-hidden="true" />;
      case 'heart':
        return <Sparkles className="w-6 h-6 text-rose-600" aria-hidden="true" />;
      case 'book':
        return <BookOpen className="w-6 h-6 text-amber-600" aria-hidden="true" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-purple-600" aria-hidden="true" />;
    }
  };

  const getDifficultyBadge = (difficulty: EducationalQuiz['difficulty']) => {
    switch (difficulty) {
      case 'Iniciante':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
            Iniciante
          </span>
        );
      case 'Intermediário':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-900 border border-purple-300">
            Intermediário
          </span>
        );
      case 'Avançado':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-900 border border-indigo-300">
            Avançado
          </span>
        );
    }
  };

  // If a quiz is active, render the Player
  if (activeQuiz) {
    return (
      <QuizPlayer
        quiz={activeQuiz}
        onBackToList={() => setActiveQuiz(null)}
        onGoToAchievements={onGoToAchievements}
      />
    );
  }

  return (
    <div className="w-full max-w-full space-y-8 animate-fade-in text-slate-800">
      
      {/* Hero / Overview Header */}
      <div className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-300 text-purple-950 text-xs font-black uppercase tracking-wider mb-3 shadow-2xs">
              <Target className="w-3.5 h-3.5 text-purple-700" aria-hidden="true" />
              <span>Aprendizado Prático & Conquistas</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
              🎯 Quiz Anti-Bullying
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Teste seus conhecimentos sobre respeito, prevenção e segurança escolar. Responda às perguntas educativas, aprenda condutas seguras para o dia a dia e desbloqueie insígnias exclusivas no seu Sistema de Conquistas.
            </p>
          </div>

          {/* User Progress Stats Pill Group */}
          <div className="grid grid-cols-3 gap-3 bg-purple-50/70 border border-purple-200 rounded-2xl p-4 sm:p-5 shrink-0 text-center">
            <div className="px-2">
              <span className="text-xs font-bold text-slate-500 block mb-0.5">Concluídos</span>
              <span className="text-lg sm:text-xl font-black text-purple-950 font-mono">
                {totalCompletedQuizzes}/{totalAvailableQuizzes}
              </span>
            </div>

            <div className="px-2 border-x border-purple-200">
              <span className="text-xs font-bold text-slate-500 block mb-0.5">Média Acerto</span>
              <span className="text-lg sm:text-xl font-black text-emerald-700 font-mono">
                {avgAccuracy > 0 ? `${avgAccuracy}%` : '—'}
              </span>
            </div>

            <div className="px-2">
              <span className="text-xs font-bold text-slate-500 block mb-0.5">Badges</span>
              <span className="text-lg sm:text-xl font-black text-amber-700 font-mono">
                {achievements.filter(a => a.isUnlocked).length}/{achievements.length}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Quizzes List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {EDUCATIONAL_QUIZZES.map((quiz) => {
          const progress = quizzesProgress[quiz.id];
          const isCompleted = progress?.completed;
          const bestScore = progress?.bestScore || 0;
          const totalQ = quiz.questionCount;
          const bestPercent = isCompleted ? Math.round((bestScore / totalQ) * 100) : 0;

          return (
            <div 
              key={quiz.id}
              className={`bg-white border rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all shadow-xs ${
                isCompleted 
                  ? 'border-purple-300 ring-1 ring-purple-200' 
                  : 'border-purple-200 hover:border-purple-300 hover:shadow-sm'
              }`}
            >
              <div>
                
                {/* Top Strip: Icon + Difficulty Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100/90 border border-purple-300 flex items-center justify-center shrink-0 shadow-2xs">
                    {renderQuizIcon(quiz.iconType)}
                  </div>

                  <div className="flex items-center gap-2">
                    {getDifficultyBadge(quiz.difficulty)}
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                      {quiz.questionCount} perguntas
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mb-2 leading-snug">
                  {quiz.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {quiz.description}
                </p>

              </div>

              {/* Progress & Action Bottom Section */}
              <div className="pt-4 border-t border-purple-100">
                {isCompleted ? (
                  <div className="mb-4 bg-purple-50/60 p-3 rounded-2xl border border-purple-200/80">
                    <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 mb-1.5">
                      <span className="flex items-center gap-1.5 text-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Melhor Resultado:</span>
                      </span>
                      <span className="font-mono text-purple-950 font-black">
                        {bestScore}/{totalQ} ({bestPercent}%)
                      </span>
                    </div>

                    <div 
                      role="progressbar"
                      aria-valuenow={bestPercent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Aproveitamento de ${bestPercent}%`}
                      className="w-full bg-purple-200/80 h-2 rounded-full overflow-hidden"
                    >
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          bestPercent >= 80 ? 'bg-emerald-500' : 'bg-purple-600'
                        }`}
                        style={{ width: `${bestPercent}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 flex items-center gap-1.5 text-xs font-bold text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span>Status: Não iniciado</span>
                  </div>
                )}

                <button
                  onClick={() => setActiveQuiz(quiz)}
                  className={`w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shadow-2xs ${
                    isCompleted
                      ? 'bg-purple-100 hover:bg-purple-200 text-purple-950 border border-purple-300'
                      : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <RotateCcw className="w-4 h-4 text-purple-800" />
                      <span>Refazer Quiz</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Iniciar Quiz</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Footer Banner linking to Achievements and Educational Guidelines */}
      <div className="bg-gradient-to-r from-purple-100/80 via-indigo-50/80 to-purple-100/80 border border-purple-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-purple-300 flex items-center justify-center text-purple-700 shrink-0 shadow-2xs">
            <Trophy className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h4 className="font-extrabold text-base text-slate-900">
              Ciclo Educativo Completo
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              <strong>Aprender → Responder → Concluir → Desbloquear Conquista</strong>. Acompanhe todas as suas insígnias na aba de Conquistas.
            </p>
          </div>
        </div>

        <button
          onClick={onGoToAchievements}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shrink-0 shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>Ver Minhas Conquistas</span>
        </button>
      </div>

    </div>
  );
};
