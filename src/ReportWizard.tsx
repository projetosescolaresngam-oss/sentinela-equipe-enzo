import React, { useState, useEffect } from 'react';
import { 
  Send, 
  ShieldCheck, 
  Check, 
  Copy, 
  AlertTriangle, 
  HelpCircle, 
  MessageSquareWarning, 
  Smartphone, 
  ShieldAlert, 
  Brain, 
  Users, 
  PackageX, 
  HeartHandshake, 
  Clock, 
  MapPin, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  FileCheck,
  Paperclip,
  CheckCircle2,
  Camera,
  Image as ImageIcon,
  FileText,
  UploadCloud,
  Trash2,
  Info,
  Lock,
  AlertCircle
} from 'lucide-react';
import { useApp } from './AppContext';
import { BullyingCategory, IncidentFrequency, SchoolShift, ReporterRole, UrgencyLevel } from './types';

export const ReportWizard: React.FC = () => {
  const { submitReport, setActiveTab } = useApp();

  // Wizard state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedTypes, setSelectedTypes] = useState<BullyingCategory[]>([]);
  const [frequency, setFrequency] = useState<IncidentFrequency>('2_a_3_vezes');
  const [location, setLocation] = useState<string>('Pátio / Recreio');
  const [customLocation, setCustomLocation] = useState<string>('');
  const [shift, setShift] = useState<SchoolShift>('manha');
  const [role, setRole] = useState<ReporterRole>('vitima');
  const [urgency, setUrgency] = useState<UrgencyLevel>('media');
  const [targetGrade, setTargetGrade] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [hasEvidenceAttachment, setHasEvidenceAttachment] = useState<boolean>(false);
  const [attachedFiles, setAttachedFiles] = useState<{ id: string; name: string; size: string; type: 'foto' | 'print' | 'bilhete' | 'outro' }[]>([]);
  const [generatedProtocol, setGeneratedProtocol] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Rolagem suave para o topo sempre que a etapa da denúncia for alterada
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [currentStep]);

  const categoriesConfig: { id: BullyingCategory; name: string; icon: any; desc: string }[] = [
    { id: 'verbal', name: 'Verbal', icon: MessageSquareWarning, desc: 'Apelidos, ofensas, piadas humilhantes' },
    { id: 'cyberbullying', name: 'Cyberbullying', icon: Smartphone, desc: 'Ataques no WhatsApp, redes, prints, memes' },
    { id: 'fisico', name: 'Físico', icon: ShieldAlert, desc: 'Empurrões, socos, tropeções intencionais' },
    { id: 'psicologico', name: 'Psicológico', icon: Brain, desc: 'Ameaças, chantagens, perseguição' },
    { id: 'social', name: 'Social / Exclusão', icon: Users, desc: 'Isolamento combinado, ignorar de propósito' },
    { id: 'material', name: 'Material', icon: PackageX, desc: 'Destruição de cadernos, furto de itens' },
    { id: 'sexual', name: 'Assédio / Sexual', icon: HeartHandshake, desc: 'Toques indesejados, comentários invasivos' },
  ];

  const frequencyOptions: { id: IncidentFrequency; label: string; sub: string }[] = [
    { id: 'primeira_vez', label: 'Primeira vez', sub: 'Ocorreu recentemente como fato novo' },
    { id: '2_a_3_vezes', label: '2 a 3 vezes', sub: 'Já se repetiu em ocasiões diferentes' },
    { id: 'semanal', label: 'Semanalmente', sub: 'Acontece toda semana de forma recorrente' },
    { id: 'diario', label: 'Diariamente', sub: 'Acontece todos os dias letivos' },
    { id: 'ha_meses', label: 'Há vários meses', sub: 'Situação crônica e prolongada no tempo' },
  ];

  const locationPresets = [
    'Pátio / Recreio',
    'Sala de Aula (durante aula ou troca)',
    'Banheiros Escolares',
    'Corredores e Escadas',
    'Redes Sociais / Grupos de WhatsApp',
    'Quadra de Esportes',
    'Entrada / Saída do Colégio',
    'Transporte / Ônibus Escolar',
    'Outro Local'
  ];

  const toggleCategory = (cat: BullyingCategory) => {
    if (selectedTypes.includes(cat)) {
      setSelectedTypes(selectedTypes.filter(c => c !== cat));
    } else {
      setSelectedTypes([...selectedTypes, cat]);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1 && selectedTypes.length === 0) {
      alert('Por favor, selecione pelo menos uma forma de bullying.');
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalLocation = location === 'Outro Local' && customLocation.trim() 
      ? customLocation.trim() 
      : location;

    const protocol = submitReport({
      types: selectedTypes,
      frequency,
      location: finalLocation,
      shift,
      role,
      urgency,
      targetGrade: targetGrade.trim() || undefined,
      description: description.trim() || undefined,
      hasEvidenceAttachment
    });

    setGeneratedProtocol(protocol);
    setCurrentStep(5); // Completion step
  };

  const handleCopyProtocol = () => {
    if (!generatedProtocol) return;
    navigator.clipboard.writeText(generatedProtocol);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-5xl w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 animate-fade-in text-slate-800">
      
      {/* Header */}
      <div className="text-center mb-8 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-300/80 text-purple-950 text-xs font-bold uppercase tracking-wider mb-2 shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
          Sigilo 100% Garantido • Sem Cadastro Obrigatório
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Formulário de Denúncia e Acolhimento Anônimo
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
          Nenhum dado pessoal (nome, IP, telefone) é exigido. Você receberá um código de protocolo secreto para acompanhar as medidas tomadas pelo conselho escolar.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      {currentStep < 5 && (
        <div className="mb-8 w-full max-w-full overflow-hidden">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold text-slate-500 mb-2.5 w-full max-w-full">
            <span className={`shrink-0 px-3 py-1 rounded-xl transition-all ${currentStep === 1 ? 'bg-purple-600 text-white font-extrabold shadow-xs' : currentStep > 1 ? 'bg-purple-100 text-purple-950 border border-purple-300' : 'bg-purple-50 text-slate-400'}`}>
              1. Tipos de Agressão
            </span>
            <span className="text-purple-300 shrink-0">→</span>
            <span className={`shrink-0 px-3 py-1 rounded-xl transition-all ${currentStep === 2 ? 'bg-purple-600 text-white font-extrabold shadow-xs' : currentStep > 2 ? 'bg-purple-100 text-purple-950 border border-purple-300' : 'bg-purple-50 text-slate-400'}`}>
              2. Frequência & Local
            </span>
            <span className="text-purple-300 shrink-0">→</span>
            <span className={`shrink-0 px-3 py-1 rounded-xl transition-all ${currentStep === 3 ? 'bg-purple-600 text-white font-extrabold shadow-xs' : currentStep > 3 ? 'bg-purple-100 text-purple-950 border border-purple-300' : 'bg-purple-50 text-slate-400'}`}>
              3. Gravidade & Papel
            </span>
            <span className="text-purple-300 shrink-0">→</span>
            <span className={`shrink-0 px-3 py-1 rounded-xl transition-all ${currentStep === 4 ? 'bg-purple-600 text-white font-extrabold shadow-xs' : currentStep > 4 ? 'bg-purple-100 text-purple-950 border border-purple-300' : 'bg-purple-50 text-slate-400'}`}>
              4. Relato & Provas
            </span>
          </div>
          <div className="w-full bg-purple-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-purple-600 h-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Step 1: Types */}
      {currentStep === 1 && (
        <div className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs">
          <h2 className="text-lg sm:text-xl font-extrabold mb-2 text-slate-900 flex items-center gap-2">
            <span>Passo 1: Quais formas de agressão estão ocorrendo?</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            Você pode marcar mais de uma opção se houver diferentes práticas combinadas.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {categoriesConfig.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedTypes.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCategory(item.id)}
                  className={`text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-purple-100/80 border-purple-400 shadow-xs text-slate-900 ring-1 ring-purple-400'
                      : 'bg-white border-purple-200 text-slate-700 hover:bg-purple-50/60 hover:border-purple-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl flex-shrink-0 ${
                    isSelected ? 'bg-purple-600 text-white font-bold' : 'bg-purple-100 text-purple-800'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        isSelected ? 'bg-purple-600 border-purple-700 text-white' : 'border-purple-300 bg-purple-50/50'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-snug">{item.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleNextStep}
              className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-xs active:scale-95"
            >
              <span>Avançar para Frequência</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Frequency & Location */}
      {currentStep === 2 && (
        <div className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs">
          <h2 className="text-lg sm:text-xl font-extrabold mb-2 text-slate-900 flex items-center gap-2">
            <span>Passo 2: Quantas vezes ocorreu e em qual local?</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            Essas informações ajudam a coordenação a identificar a gravidade e o foco de vigilância.
          </p>

          {/* Frequency */}
          <div className="mb-6">
            <label className="text-xs font-bold uppercase tracking-wider text-purple-950 block mb-2.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-700" />
              Frequência / Recorrência do Bullying:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {frequencyOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFrequency(opt.id)}
                  className={`text-left p-3.5 rounded-2xl border transition-all ${
                    frequency === opt.id
                      ? 'bg-purple-100/90 border-purple-400 text-slate-900 ring-1 ring-purple-400 font-medium'
                      : 'bg-white border-purple-200 text-slate-700 hover:bg-purple-50/60 hover:border-purple-300'
                  }`}
                >
                  <span className="font-bold text-sm block text-slate-900">{opt.label}</span>
                  <span className="text-xs text-slate-500 block mt-0.5">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="text-xs font-bold uppercase tracking-wider text-purple-950 block mb-2.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-purple-700" />
              Onde costuma acontecer?
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-purple-50/50 border border-purple-300/90 rounded-2xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
            >
              {locationPresets.map((loc, i) => (
                <option key={i} value={loc}>{loc}</option>
              ))}
            </select>

            {location === 'Outro Local' && (
              <input
                type="text"
                placeholder="Especifique o local do incidente..."
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                className="mt-3 w-full bg-purple-50/50 border border-purple-300/90 rounded-2xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
              />
            )}
          </div>

          {/* Shift */}
          <div className="mb-8">
            <label className="text-xs font-bold uppercase tracking-wider text-purple-950 block mb-2.5">
              Turno escolar:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'manha', label: 'Manhã' },
                { id: 'tarde', label: 'Tarde' },
                { id: 'integral', label: 'Integral' },
                { id: 'noite', label: 'Noite' },
                { id: 'virtual', label: 'Online / Redes' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setShift(s.id as SchoolShift)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    shift === s.id
                      ? 'bg-purple-600 border-purple-700 text-white shadow-xs'
                      : 'bg-white border-purple-200 text-slate-700 hover:bg-purple-50'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(1)}
              className="bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold text-sm px-5 py-2.5 rounded-2xl flex items-center gap-2 transition-colors border border-purple-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
            <button
              onClick={handleNextStep}
              className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-xs active:scale-95"
            >
              <span>Avançar para Gravidade</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Role & Urgency */}
      {currentStep === 3 && (
        <div className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs">
          <h2 className="text-lg sm:text-xl font-extrabold mb-2 text-slate-900 flex items-center gap-2">
            <span>Passo 3: Quem está relatando e qual a urgência?</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            Isso permite priorizar a triagem pedagógica caso haja risco imediato.
          </p>

          {/* Role */}
          <div className="mb-6">
            <label className="text-xs font-bold uppercase tracking-wider text-purple-950 block mb-2.5">
              Qual o seu papel nesta situação?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'vitima', title: 'Sou a Vítima', desc: 'Estou sofrendo com essa situação diretamente' },
                { id: 'testemunha', title: 'Sou Testemunha', desc: 'Vi ou soube que um colega está sofrendo' },
                { id: 'responsavel', title: 'Responsável / Colega', desc: 'Familiar ou amigo prestando auxílio' },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id as ReporterRole)}
                  className={`p-4 text-left rounded-2xl border transition-all ${
                    role === r.id
                      ? 'bg-purple-100/90 border-purple-400 text-slate-900 ring-1 ring-purple-400 font-medium shadow-xs'
                      : 'bg-white border-purple-200 text-slate-700 hover:bg-purple-50/60'
                  }`}
                >
                  <span className="font-bold text-sm block text-slate-900">{r.title}</span>
                  <span className="text-xs text-slate-500 mt-1 block">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Urgency */}
          <div className="mb-6">
            <label className="text-xs font-bold uppercase tracking-wider text-purple-950 block mb-2.5">
              Nível de Urgência / Gravidade:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'baixa', title: 'Baixa', sub: 'Conflito inicial', color: 'border-emerald-300 bg-emerald-50 text-emerald-950' },
                { id: 'media', title: 'Média', sub: 'Incômodo frequente', color: 'border-purple-300 bg-purple-50 text-purple-950' },
                { id: 'alta', title: 'Alta', sub: 'Ameaças ou cyber', color: 'border-orange-300 bg-orange-50 text-orange-950' },
                { id: 'critica_sos', title: '⚠️ Crítica SOS', sub: 'Violência física iminente', color: 'border-rose-400 bg-rose-50 text-rose-950' },
              ].map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setUrgency(u.id as UrgencyLevel)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    urgency === u.id
                      ? `${u.color} ring-2 ring-purple-500 font-bold shadow-xs`
                      : 'bg-white border-purple-200 text-slate-700 hover:bg-purple-50'
                  }`}
                >
                  <span className="text-xs font-bold block">{u.title}</span>
                  <span className="text-[11px] opacity-80 block">{u.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Target Grade (Optional) */}
          <div className="mb-8">
            <label className="text-xs font-bold uppercase tracking-wider text-purple-950 block mb-1.5">
              Turma ou Ano Escolar Envolvido (Opcional):
            </label>
            <input
              type="text"
              placeholder="Ex: 8º Ano B, 1º Ano Ensino Médio, Turma da tarde..."
              value={targetGrade}
              onChange={(e) => setTargetGrade(e.target.value)}
              className="w-full bg-purple-50/50 border border-purple-300/90 rounded-2xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(2)}
              className="bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold text-sm px-5 py-2.5 rounded-2xl flex items-center gap-2 transition-colors border border-purple-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
            <button
              onClick={handleNextStep}
              className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-xs active:scale-95"
            >
              <span>Avançar para Detalhes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Narrative Description & Submit */}
      {currentStep === 4 && (
        <form onSubmit={handleSubmit} className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-purple-700" />
              <span>Passo 4: Descrição dos Detalhes & Anexo de Provas <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-950 border border-purple-300 font-mono">(Opcional)</span></span>
            </h2>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-700" />
              Sigilo Absoluto & Proteção
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            Você pode relatar com suas próprias palavras o ocorrido e, se tiver, anexar evidências. <strong>Tanto o relato quanto os anexos são opcionais</strong>.
          </p>

          {/* CRITICAL CALLOUT: PROOFS ARE IMPORTANT, BUT NEVER MANDATORY */}
          <div className="mb-8 rounded-3xl bg-purple-50/80 border-2 border-purple-300 p-5 sm:p-6 shadow-xs relative overflow-hidden">
            
            {/* Reassurance Banner: Lack of proof should NEVER stop a report */}
            <div className="mb-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs sm:text-sm flex items-start gap-3 shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-black uppercase tracking-wide text-emerald-900 block mb-0.5">
                  Não possui provas? NÃO DEIXE DE DENUNCIAR!
                </span>
                <span className="text-slate-700 leading-relaxed block">
                  Você <strong>NÃO é obrigado(a) a apresentar provas</strong> para fazer a denúncia. A falta de fotos ou prints jamais deve impedir você de pedir ajuda. O seu depoimento e sua segurança são a prioridade máxima da escola.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 mb-3.5">
              <div className="p-2.5 rounded-2xl bg-purple-200 text-purple-950 border border-purple-300 flex-shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5 text-purple-800" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-purple-950 tracking-wide uppercase flex items-center gap-2">
                  <span>Por que as provas são valiosas quando você as possui?</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                  Quando disponíveis, <strong>fotos, bilhetes ou prints aceleram muito a investigação</strong>, ajudando a comissão pedagógica e o conselho tutelar a <strong>identificar os responsáveis com rapidez e aplicar as medidas cabíveis</strong> sem margem para dúvidas.
                </p>
              </div>
            </div>

            {/* 3 Evidence Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              <div className="p-3.5 rounded-2xl bg-white border border-purple-200 shadow-2xs hover:border-purple-400 transition-colors">
                <div className="flex items-center gap-2 text-purple-950 font-bold text-xs mb-1.5">
                  <Camera className="w-4 h-4 text-purple-700" />
                  <span>1. Fotos de Bilhetes & Danos</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Se houver: fotografe <strong>bilhetes com ofensas ou ameaças</strong> deixados em cadernos/mochilas, carteiras riscadas ou pertences danificados.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-purple-200 shadow-2xs hover:border-purple-400 transition-colors">
                <div className="flex items-center gap-2 text-purple-950 font-bold text-xs mb-1.5">
                  <Smartphone className="w-4 h-4 text-purple-700" />
                  <span>2. Prints de Telas & Mensagens</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Se houver: prints de <strong>WhatsApp, Instagram, TikTok ou Discord</strong> com usuário dos envolvidos, datas e horários legíveis.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-purple-200 shadow-2xs hover:border-purple-400 transition-colors">
                <div className="flex items-center gap-2 text-purple-950 font-bold text-xs mb-1.5">
                  <FileText className="w-4 h-4 text-purple-700" />
                  <span>3. Histórico e Testemunhas</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Conte no campo de texto se houve testemunhas que presenciaram os fatos ou se a agressão já ocorre repetidamente.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Evidence Upload Area (Clearly Marked as Opcional) */}
          <div className="mb-6 p-4 sm:p-5 rounded-3xl bg-purple-50/60 border border-purple-200">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-purple-800" />
                <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                  Anexar Provas (Fotos, Bilhetes ou Prints)
                </span>
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-purple-200 text-purple-950 border border-purple-300">
                  Opcional
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                {attachedFiles.length > 0 ? `${attachedFiles.length} anexo(s) pronto(s)` : 'Nenhum anexo (opcional)'}
              </span>
            </div>

            {/* Upload Buttons / Dropzone simulation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3">
              <label className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-white hover:bg-purple-100/50 border border-purple-300 cursor-pointer text-xs font-bold text-purple-950 transition-all text-center shadow-2xs">
                <UploadCloud className="w-4 h-4 text-purple-700" />
                <span>Escolher Arquivo (Opcional)</span>
                <input 
                  type="file" 
                  accept="image/*,.pdf,.txt,.doc,.docx"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const filesList = Array.from(e.target.files) as File[];
                      const newFiles = filesList.map(f => ({
                        id: Math.random().toString(36).substring(2, 9),
                        name: f.name,
                        size: `${(f.size / 1024).toFixed(1)} KB`,
                        type: (f.name.toLowerCase().includes('print') ? 'print' : f.name.toLowerCase().includes('bilhete') ? 'bilhete' : 'foto') as 'foto' | 'print' | 'bilhete'
                      }));
                      setAttachedFiles(prev => [...prev, ...newFiles]);
                      setHasEvidenceAttachment(true);
                    }
                  }}
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  const samplePrint = {
                    id: Math.random().toString(36).substring(2, 9),
                    name: `print_conversa_whatsapp_${Math.floor(Math.random()*899+100)}.png`,
                    size: '245 KB',
                    type: 'print' as const
                  };
                  setAttachedFiles(prev => [...prev, samplePrint]);
                  setHasEvidenceAttachment(true);
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-white hover:bg-purple-100/50 border border-purple-300 text-xs font-bold text-slate-800 transition-all shadow-2xs"
              >
                <Smartphone className="w-4 h-4 text-purple-700" />
                <span>+ Simular Print (Opcional)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const sampleBilhete = {
                    id: Math.random().toString(36).substring(2, 9),
                    name: `foto_bilhete_ameaca_${Math.floor(Math.random()*899+100)}.jpg`,
                    size: '610 KB',
                    type: 'bilhete' as const
                  };
                  setAttachedFiles(prev => [...prev, sampleBilhete]);
                  setHasEvidenceAttachment(true);
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-white hover:bg-purple-100/50 border border-purple-300 text-xs font-bold text-slate-800 transition-all shadow-2xs"
              >
                <Camera className="w-4 h-4 text-purple-700" />
                <span>+ Simular Foto (Opcional)</span>
              </button>
            </div>

            {/* List of Attached Evidence Files */}
            {attachedFiles.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-purple-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Provas Anexadas com Sucesso:</span>
                </div>
                {attachedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-2.5 rounded-2xl bg-white border border-emerald-300 text-xs shadow-2xs">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      {file.type === 'print' ? (
                        <Smartphone className="w-4 h-4 text-purple-700 flex-shrink-0" />
                      ) : file.type === 'bilhete' ? (
                        <FileText className="w-4 h-4 text-purple-700 flex-shrink-0" />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-purple-700 flex-shrink-0" />
                      )}
                      <span className="font-mono text-slate-800 font-semibold truncate">{file.name}</span>
                      <span className="text-[10px] text-slate-500">({file.size})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const filtered = attachedFiles.filter(f => f.id !== file.id);
                        setAttachedFiles(filtered);
                        if (filtered.length === 0) setHasEvidenceAttachment(false);
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-xl hover:bg-rose-50"
                      title="Remover anexo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description Textarea */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-950 block">
                Descreva o ocorrido com suas palavras:
              </label>
              <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-950 border border-purple-300">
                Opcional
              </span>
            </div>
            <textarea
              rows={5}
              placeholder="Conte como aconteceu, o que foi dito ou feito, se houve ameaças, apelidos, mensagens em redes sociais ou testemunhas presentes... Seu relato será lido exclusivamente pela equipe responsável pela apuração e mediação da escola."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-purple-50/40 border border-purple-300/90 rounded-2xl p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed font-medium"
            />
          </div>

          {/* Summary Box */}
          <div className="bg-purple-100/60 border border-purple-300/80 rounded-2xl p-4 mb-8 text-xs text-purple-950">
            <h4 className="font-bold text-purple-950 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-700" />
              Garantias do Sentinela Escolar:
            </h4>
            <ul className="space-y-1.5 text-slate-700">
              <li>• O envio e os anexos são 100% criptografados ponta-a-ponta e não gravam endereço IP ou dados do seu dispositivo.</li>
              <li>• Após clicar em enviar, você receberá um <strong>Protocolo Privado</strong>. Guarde esse código para acompanhar a resposta e o andamento da apuração do Conselho Escolar.</li>
            </ul>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold text-sm px-5 py-2.5 rounded-2xl flex items-center gap-2 transition-colors border border-purple-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm px-7 py-3.5 rounded-2xl flex items-center gap-2 shadow-xs transition-transform active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Denúncia com Sigilo Total</span>
            </button>
          </div>
        </form>
      )}

      {/* Step 5: Success & Cryptographic Protocol Token */}
      {currentStep === 5 && generatedProtocol && (
        <div className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-10 text-slate-800 shadow-xs text-center animate-fade-in">
          
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
            Denúncia Registrada com Sucesso!
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto mb-6">
            A equipe de orientação pedagógica e conselho escolar foi notificada e já iniciará os procedimentos protetivos em sigilo.
          </p>

          {/* Protocol Card */}
          <div className="bg-purple-50 border-2 border-dashed border-purple-400 rounded-3xl p-6 max-w-md mx-auto mb-6 shadow-xs">
            <span className="text-xs uppercase tracking-widest font-extrabold text-purple-950 block mb-1">
              Seu Código de Protocolo Confidencial
            </span>
            <div className="font-mono text-2xl sm:text-3xl font-black text-slate-950 tracking-widest my-2">
              {generatedProtocol}
            </div>
            <p className="text-[11px] text-slate-600 mb-4">
              Guarde este código em um lugar seguro (tire print ou anote). É com ele que você consultará as respostas do Conselho sem revelar quem você é.
            </p>

            <button
              onClick={handleCopyProtocol}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs py-2.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xs"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Código Copiado com Sucesso!' : 'Copiar Código do Protocolo'}</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setActiveTab('tracker')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-95"
            >
              <FileCheck className="w-4 h-4" />
              <span>Abrir Canal com o Conselho Escolar</span>
            </button>

            <button
              onClick={() => {
                setCurrentStep(1);
                setSelectedTypes([]);
                setDescription('');
                setGeneratedProtocol(null);
              }}
              className="bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl transition-colors border border-purple-300"
            >
              Fazer Outra Denúncia
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
