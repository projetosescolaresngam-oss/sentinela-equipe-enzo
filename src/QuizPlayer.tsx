import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  Trophy, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  HelpCircle,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { EducationalQuiz, QuizOption, QuizOptionLetter } from './types';
import { useApp } from './AppContext';
import { smoothScrollToElement } from './utils/scrollHelper';

interface QuizPlayerProps {
  quiz: EducationalQuiz;
  onBackToList: () => void;
  onGoToAchievements: () => void;
}

interface QuestionAnswerState {
  selectedOptionId: QuizOptionLetter;
  isCorrect: boolean;
  explanation: string;
}

export const QuizPlayer: React.FC<QuizPlayerProps> = ({ 
  quiz, 
  onBackToList, 
  onGoToAchievements 
}) => {
  const { recordQuizCompletion, educationalProgress } = useApp();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState<boolean>(false);
  const [answersHistory, setAnswersHistory] = useState<Record<number, QuestionAnswerState>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isNewRecordEarned, setIsNewRecordEarned] = useState<boolean>(false);
  const [showReviewAccordion, setShowReviewAccordion] = useState<boolean>(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progressPercent = Math.round(((currentQuestionIndex + (hasSubmittedAnswer ? 1 : 0)) / totalQuestions) * 100);

  // Existing stats for this quiz
  const existingRecord = educationalProgress.quizzesProgress?.[quiz.id];

  // Reset state when quiz changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setHasSubmittedAnswer(false);
    setAnswersHistory({});
    setIsCompleted(false);
    setIsNewRecordEarned(false);
  }, [quiz.id]);

  const handleSelectOption = (option: QuizOption) => {
    if (hasSubmittedAnswer) return; // Prevent changing after revealing
    setSelectedOption(option);
    setHasSubmittedAnswer(true);

    const isCorrect = option.isCorrect;
    setAnswersHistory(prev => ({
      ...prev,
      [currentQuestionIndex]: {
        selectedOptionId: option.id,
        isCorrect,
        explanation: option.explanation
      }
    }));

    smoothScrollToElement('#quiz-feedback-box', { position: 'auto', delay: 50 });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setHasSubmittedAnswer(false);
      smoothScrollToElement('#quiz-card-container', { position: 'top', delay: 40 });
    } else {
      // Calculate final score
      const finalAnswers = { ...answersHistory };
      if (selectedOption && !finalAnswers[currentQuestionIndex]) {
        finalAnswers[currentQuestionIndex] = {
          selectedOptionId: selectedOption.id,
          isCorrect: selectedOption.isCorrect,
          explanation: selectedOption.explanation
        };
      }

      const totalCorrect = (Object.values(finalAnswers) as QuestionAnswerState[]).filter(a => a.isCorrect).length;
      const { isNewRecord } = recordQuizCompletion(quiz.id, totalCorrect, totalQuestions);
      
      setIsNewRecordEarned(isNewRecord);
      setIsCompleted(true);
      smoothScrollToElement('#quiz-completed-card', { position: 'center', delay: 50 });
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setHasSubmittedAnswer(false);
    setAnswersHistory({});
    setIsCompleted(false);
    setIsNewRecordEarned(false);
    smoothScrollToElement('#quiz-card-container', { position: 'top', delay: 40 });
  };

  // Completed State View
  if (isCompleted) {
    const totalCorrect = (Object.values(answersHistory) as QuestionAnswerState[]).filter(a => a.isCorrect).length;
    const scorePercentage = Math.round((totalCorrect / totalQuestions) * 100);

    let feedbackTitle = 'Parabéns!';
    let feedbackMessage = 'Você ampliou seus conhecimentos sobre segurança, respeito e convivência escolar.';
    let feedbackBg = 'bg-purple-50 border-purple-200 text-purple-950';

    if (scorePercentage >= 80) {
      feedbackTitle = '🎉 Desempenho Excepcional!';
      feedbackMessage = 'Excelente! Você demonstrou pleno domínio sobre práticas seguras, empatia e combate ao bullying no ambiente escolar.';
      feedbackBg = 'bg-emerald-50 border-emerald-200 text-emerald-950';
    } else if (scorePercentage >= 60) {
      feedbackTitle = '👏 Muito Bom Aproveitamento!';
      feedbackMessage = 'Muito bem! Você compreendeu os princípios fundamentais e pode revisar os conceitos para fortalecer ainda mais sua atuação.';
      feedbackBg = 'bg-purple-50 border-purple-200 text-purple-950';
    } else {
      feedbackTitle = '💪 Bom Esforço!';
      feedbackMessage = 'Aprender a lidar com o bullying é um processo contínuo. Recomendamos revisar os conteúdos do Guia Educativo e refazer o quiz quando desejar!';
      feedbackBg = 'bg-amber-50 border-amber-200 text-amber-950';
    }

    return (
      <div id="quiz-completed-card" className="max-w-2xl mx-auto bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 shadow-xs animate-fade-in text-slate-800">
        
        {/* Completion Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-800 mx-auto mb-4 shadow-2xs">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500" aria-hidden="true" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-black uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Quiz Concluído</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {quiz.title}
          </h2>
        </div>

        {/* Score Card */}
        <div className="bg-gradient-to-br from-purple-50/80 to-indigo-50/80 border border-purple-200 rounded-2xl p-5 mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Seu Resultado:
          </p>
          <div className="text-3xl sm:text-4xl font-black text-purple-950 mb-1">
            {totalCorrect} de {totalQuestions} perguntas
          </div>
          <div className="text-base font-extrabold text-purple-700 mb-4">
            {scorePercentage}% de aproveitamento
          </div>

          {/* Progress Bar */}
          <div 
            role="progressbar"
            aria-valuenow={scorePercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Aproveitamento de ${scorePercentage}%`}
            className="w-full bg-purple-200/80 h-3.5 rounded-full overflow-hidden p-0.5 max-w-md mx-auto"
          >
            <div 
              className={`h-full rounded-full transition-all duration-700 ${
                scorePercentage >= 80 ? 'bg-emerald-500' : scorePercentage >= 60 ? 'bg-purple-600' : 'bg-amber-500'
              }`}
              style={{ width: `${scorePercentage}%` }}
            />
          </div>

          {isNewRecordEarned && (
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Novo recorde pessoal registrado!</span>
            </div>
          )}
        </div>

        {/* Pedagogical Feedback Banner */}
        <div className={`p-4 sm:p-5 rounded-2xl border mb-6 ${feedbackBg}`}>
          <h4 className="font-extrabold text-sm sm:text-base mb-1">
            {feedbackTitle}
          </h4>
          <p className="text-xs sm:text-sm leading-relaxed opacity-90">
            {feedbackMessage}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            onClick={handleRestart}
            className="px-5 py-3 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-purple-300 transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Refazer Quiz</span>
          </button>

          <button
            onClick={onGoToAchievements}
            className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <Trophy className="w-4 h-4" />
            <span>Ver Minhas Conquistas</span>
          </button>

          <button
            onClick={onBackToList}
            className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-300 transition-all cursor-pointer active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-slate-500" />
            <span>Voltar aos Quizzes</span>
          </button>
        </div>

        {/* Review Questions Accordion */}
        <div className="border-t border-purple-100 pt-4">
          <button
            onClick={() => setShowReviewAccordion(prev => !prev)}
            className="w-full py-2.5 flex items-center justify-between text-xs sm:text-sm font-bold text-purple-900 hover:text-purple-950 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-700" />
              <span>Gabarito Comentado e Explicações Pedagógicas</span>
            </span>
            {showReviewAccordion ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showReviewAccordion && (
            <div className="mt-4 space-y-4 animate-fade-in">
              {quiz.questions.map((q, idx) => {
                const answer = answersHistory[idx];
                const isUserCorrect = answer?.isCorrect;
                const correctOption = q.options.find(opt => opt.isCorrect);

                return (
                  <div 
                    key={q.id}
                    className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200 text-xs sm:text-sm text-slate-700"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-extrabold text-slate-900">
                        {idx + 1}. {q.question}
                      </span>
                      {isUserCorrect ? (
                        <span className="shrink-0 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Acertou</span>
                        </span>
                      ) : (
                        <span className="shrink-0 px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[11px] flex items-center gap-1">
                          <XCircle className="w-3 h-3 text-rose-600" />
                          <span>Revisar</span>
                        </span>
                      )}
                    </div>

                    <div className="text-xs bg-white p-3 rounded-xl border border-purple-100 text-slate-600">
                      <p className="font-bold text-slate-900 mb-1">
                        Resposta Correta ({correctOption?.id}): {correctOption?.text}
                      </p>
                      <p className="text-slate-600 italic">
                        {correctOption?.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    );
  }

  // Active Quiz Question View
  return (
    <div id="quiz-card-container" className="max-w-2xl mx-auto bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 shadow-xs animate-fade-in text-slate-800">
      
      {/* Top Header Navigation & Progress Bar */}
      <div className="mb-6 pb-4 border-b border-purple-100">
        <div className="flex items-center justify-between gap-3 mb-3">
          <button
            onClick={onBackToList}
            className="text-xs font-bold text-slate-600 hover:text-purple-800 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar aos Quizzes</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-purple-900 bg-purple-100 px-2.5 py-1 rounded-full border border-purple-200">
              Pergunta {currentQuestionIndex + 1} de {totalQuestions}
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div 
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progresso do quiz: ${progressPercent}%`}
          className="w-full bg-purple-100 h-2 rounded-full overflow-hidden"
        >
          <div 
            className="bg-purple-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Header */}
      <div className="mb-6">
        {currentQuestion.conceptTag && (
          <span className="inline-block text-[11px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 mb-2">
            {currentQuestion.conceptTag}
          </span>
        )}
        <h3 className="text-base sm:text-lg sm:leading-snug font-black text-slate-900">
          {currentQuestion.question}
        </h3>
      </div>

      {/* 4 Options Grid (A, B, C, D) */}
      <div className="space-y-3 mb-6" role="radiogroup" aria-label={currentQuestion.question}>
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOption?.id === option.id;
          const isCorrect = option.isCorrect;

          let buttonStyle = 'bg-purple-50/40 hover:bg-purple-100/60 border-purple-200 text-slate-800';
          let badgeStyle = 'bg-purple-100 text-purple-900 border-purple-300';
          let icon = null;

          if (hasSubmittedAnswer) {
            if (isCorrect) {
              buttonStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-1 ring-emerald-300';
              badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
              icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-label="Opção correta" />;
            } else if (isSelected && !isCorrect) {
              buttonStyle = 'bg-rose-50 border-rose-300 text-rose-950 font-medium';
              badgeStyle = 'bg-rose-600 text-white border-rose-600';
              icon = <XCircle className="w-5 h-5 text-rose-600 shrink-0" aria-label="Opção incorreta" />;
            } else {
              buttonStyle = 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-60';
              badgeStyle = 'bg-slate-200 text-slate-600 border-slate-300';
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option)}
              disabled={hasSubmittedAnswer}
              role="radio"
              aria-checked={isSelected}
              className={`w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm flex items-start gap-3.5 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-2xs ${buttonStyle}`}
            >
              {/* Option Letter Indicator */}
              <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 border mt-0.5 ${badgeStyle}`}>
                {option.id}
              </div>

              <div className="flex-1 min-w-0 pr-2">
                <span className="leading-relaxed block">
                  {option.text}
                </span>
              </div>

              {icon}
            </button>
          );
        })}
      </div>

      {/* Pedagogical Feedback Box upon Answering */}
      {hasSubmittedAnswer && selectedOption && (
        <div id="quiz-feedback-box" className="mb-6 animate-fade-in">
          {selectedOption.isCorrect ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950">
              <div className="flex items-center gap-2 font-black text-xs sm:text-sm mb-1 text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Resposta Correta!</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedOption.explanation}
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950">
              <div className="flex items-center gap-2 font-black text-xs sm:text-sm mb-1 text-amber-900">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Orientação Educativa:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-2">
                {selectedOption.explanation}
              </p>
              {/* Also show the correct answer explanation */}
              {currentQuestion.options.find(o => o.isCorrect) && (
                <div className="pt-2 border-t border-amber-200/80 text-xs text-slate-600">
                  <span className="font-bold text-amber-900">Conduta recomendada: </span>
                  {currentQuestion.options.find(o => o.isCorrect)?.explanation}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Bottom Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-purple-100">
        <div className="text-xs text-slate-500 font-medium">
          {hasSubmittedAnswer ? 'Leia o feedback e avance' : 'Selecione uma alternativa para responder'}
        </div>

        {hasSubmittedAnswer && (
          <button
            onClick={handleNextQuestion}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <span>{currentQuestionIndex + 1 < totalQuestions ? 'Próxima Pergunta' : 'Finalizar Quiz & Ver Resultado'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
};
