import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShieldCheck, 
  MessageSquare, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle,
  FileText,
  UserCheck,
  Building,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useApp } from './AppContext';
import { IncidentReport, ReportStatus } from './types';

export const ProtocolTracker: React.FC = () => {
  const { 
    reports, 
    lastGeneratedProtocol, 
    addMessageToProtocol, 
    setActiveTab 
  } = useApp();

  const [inputProtocol, setInputProtocol] = useState<string>(lastGeneratedProtocol || '');
  const [selectedReport, setSelectedReport] = useState<IncidentReport | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>('');

  useEffect(() => {
    if (lastGeneratedProtocol) {
      const match = reports.find(r => r.id.toUpperCase() === lastGeneratedProtocol.toUpperCase());
      if (match) {
        setSelectedReport(match);
        setInputProtocol(lastGeneratedProtocol);
        setHasSearched(true);
      }
    }
  }, [lastGeneratedProtocol, reports]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const clean = inputProtocol.trim().toUpperCase();
    const found = reports.find(r => r.id.toUpperCase() === clean);
    setSelectedReport(found || null);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedReport) return;

    addMessageToProtocol(selectedReport.id, replyText.trim(), 'estudante');
    setReplyText('');
  };

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'novo':
        return { label: 'Recebido / Em Fila', color: 'bg-purple-100 text-purple-950 border-purple-300' };
      case 'em_analise':
        return { label: 'Em Análise Psicopedagógica', color: 'bg-purple-200 text-purple-950 border-purple-400' };
      case 'acao_em_andamento':
        return { label: 'Ações Preventivas em Andamento', color: 'bg-purple-300 text-purple-950 border-purple-500' };
      case 'resolvido':
        return { label: 'Acolhido & Concluído', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
    }
  };

  const formatTimestamp = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in text-slate-800">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-300/80 text-purple-950 text-xs font-bold uppercase tracking-wider mb-2 shadow-2xs">
          <Lock className="w-3.5 h-3.5 text-purple-700" />
          Canal Direto com o Conselho Escolar
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Acompanhe seu Protocolo Anônimo
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-2">
          Digite seu código de protocolo para visualizar o status de apuração da escola e responder mensagens dos orientadores em sigilo.
        </p>
      </div>

      {/* Protocol Input Box */}
      <form onSubmit={handleSearch} className="bg-white border border-purple-200/90 rounded-3xl p-6 mb-8 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-purple-700 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Digite seu código (Ex: SEC-2026-7841)..."
              value={inputProtocol}
              onChange={(e) => setInputProtocol(e.target.value)}
              className="w-full bg-purple-50/50 border border-purple-300/80 rounded-2xl pl-12 pr-4 py-3.5 text-slate-900 font-mono placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base font-semibold"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 flex-shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Consultar Protocolo</span>
          </button>
        </div>

        {/* Quick Demo Protocols */}
        <div className="mt-4 pt-3 border-t border-purple-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span>Exemplos para teste rápido:</span>
          {['SEC-2026-7841', 'SEC-2026-8912', 'SEC-2026-6430'].map(code => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setInputProtocol(code);
                const found = reports.find(r => r.id.toUpperCase() === code.toUpperCase());
                setSelectedReport(found || null);
                setHasSearched(true);
              }}
              className="px-2.5 py-1 rounded-xl bg-purple-100/70 hover:bg-purple-200 text-purple-950 font-mono font-semibold transition-colors border border-purple-300/70"
            >
              {code}
            </button>
          ))}
        </div>
      </form>

      {/* Results Display */}
      {hasSearched && !selectedReport && (
        <div className="bg-white border border-purple-200/90 rounded-3xl p-8 text-center text-slate-700 shadow-xs">
          <AlertCircle className="w-12 h-12 text-purple-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">Protocolo não localizado</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
            Verifique se o código foi digitado corretamente com o formato <code className="text-purple-800 font-mono font-bold">SEC-2026-XXXX</code>.
          </p>
          <button
            onClick={() => setActiveTab('report')}
            className="text-xs font-bold text-purple-800 hover:underline"
          >
            Deseja registrar uma nova denúncia anônima?
          </button>
        </div>
      )}

      {selectedReport && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Card Status */}
          <div className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs">
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-purple-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Protocolo</span>
                  <span className="font-mono text-lg sm:text-xl font-black text-purple-950">{selectedReport.id}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Registrado em {formatTimestamp(selectedReport.createdAt)}
                </p>
              </div>

              <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold border ${getStatusBadge(selectedReport.status).color}`}>
                {getStatusBadge(selectedReport.status).label}
              </span>
            </div>

            {/* Stepper of Institutional Actions */}
            <div className="py-6 border-b border-purple-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-4">
                Fluxo de Resolução Institucional:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                {[
                  { key: 'novo', title: '1. Recebido', done: true },
                  { key: 'em_analise', title: '2. Triagem Escolar', done: ['em_analise', 'acao_em_andamento', 'resolvido'].includes(selectedReport.status) },
                  { key: 'acao_em_andamento', title: '3. Ação Preventiva', done: ['acao_em_andamento', 'resolvido'].includes(selectedReport.status) },
                  { key: 'resolvido', title: '4. Concluído', done: selectedReport.status === 'resolvido' },
                ].map((step, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-2xl border transition-all ${
                      step.done 
                        ? 'bg-purple-100/90 border-purple-400 text-purple-950 font-bold shadow-2xs' 
                        : 'bg-purple-50/40 border-purple-100 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-1">
                      {step.done ? <CheckCircle className="w-4 h-4 text-purple-700" /> : <Clock className="w-4 h-4 text-slate-400" />}
                    </div>
                    <span>{step.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Incident Summary */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
              <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200/60">
                <span className="text-slate-500 block mb-1 font-medium">Tipologias Registradas:</span>
                <span className="font-bold text-slate-900 capitalize">{selectedReport.types.join(', ')}</span>
              </div>
              <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200/60">
                <span className="text-slate-500 block mb-1 font-medium">Local & Turno:</span>
                <span className="font-bold text-slate-900">{selectedReport.location} ({selectedReport.shift})</span>
              </div>
              <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200/60">
                <span className="text-slate-500 block mb-1 font-medium">Frequência Relatada:</span>
                <span className="font-bold text-slate-900 capitalize">{selectedReport.frequency.replace(/_/g, ' ')}</span>
              </div>
            </div>

            {selectedReport.description && (
              <div className="mt-4 bg-purple-50/40 p-4 rounded-2xl border border-purple-200/50 text-xs text-slate-700">
                <span className="text-slate-600 font-bold block mb-1">Seu Relato Inicial:</span>
                <p className="italic leading-relaxed">{selectedReport.description}</p>
              </div>
            )}

          </div>

          {/* Secure Messaging Channel with Council */}
          <div className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-purple-100">
              <div className="p-2 rounded-2xl bg-purple-100 text-purple-800">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Canal de Comunicação Anônima</h3>
                <p className="text-xs text-slate-500">Troque mensagens confidenciais diretamente com o Conselho Escolar</p>
              </div>
            </div>

            {/* Message Thread */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 mb-6 scrollbar-none">
              {selectedReport.messages.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <p className="font-medium">A equipe do Conselho Escolar está analisando seu caso.</p>
                  <p className="text-slate-400 mt-1">Assim que houver um retorno, ele aparecerá aqui com total sigilo.</p>
                </div>
              ) : (
                selectedReport.messages.map((msg) => {
                  const isSchool = msg.sender === 'conselho';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isSchool ? 'items-start' : 'items-end'}`}
                    >
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1 px-1">
                        {isSchool ? (
                          <>
                            <Building className="w-3 h-3 text-purple-700" />
                            <span className="font-bold text-purple-950">{msg.authorRoleTitle || 'Conselho Escolar'}</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span className="font-bold text-emerald-800">Você (Denunciante Anônimo)</span>
                          </>
                        )}
                        <span>•</span>
                        <span>{formatTimestamp(msg.timestamp)}</span>
                      </div>

                      <div
                        className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isSchool
                            ? 'bg-purple-50 text-slate-900 border border-purple-200/80 rounded-tl-xs shadow-2xs font-medium'
                            : 'bg-purple-600 text-white rounded-tr-xs font-semibold shadow-xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Reply Input Form */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Escreva uma mensagem ou informação complementar em sigilo..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 bg-purple-50/50 border border-purple-300/80 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl flex items-center gap-2 transition-all active:scale-95 shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Responder</span>
              </button>
            </form>

          </div>

        </div>
      )}

    </div>
  );
};
