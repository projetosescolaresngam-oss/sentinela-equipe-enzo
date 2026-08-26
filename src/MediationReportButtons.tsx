import React, { useState } from 'react';
import { 
  FileText, 
  Shield, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Download,
  Eye
} from 'lucide-react';
import { IncidentReport } from './types';
import { downloadReportDocx } from './utils/docxReportGenerator';
import { SVG_ALFREDO_MACHADO, SVG_CONSELHO_TUTELAR } from './utils/logoAssets';

interface MediationReportButtonsProps {
  report: IncidentReport;
  className?: string;
  variant?: 'full' | 'compact';
}

export const MediationReportButtons: React.FC<MediationReportButtonsProps> = ({
  report,
  className = '',
  variant = 'full'
}) => {
  const [exportingType, setExportingType] = useState<'alfredo' | 'conselho' | null>(null);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
    filename?: string;
  } | null>(null);

  const handleExport = async (type: 'alfredo_machado' | 'conselho_tutelar') => {
    const key = type === 'alfredo_machado' ? 'alfredo' : 'conselho';
    setExportingType(key);
    setFeedback(null);

    try {
      const result = await downloadReportDocx(report, type);

      if (result.success) {
        setFeedback({
          type: 'success',
          message: type === 'alfredo_machado' 
            ? 'Relatório Alfredo Machado gerado com sucesso em 1 folha A4 com o Brasão Oficial anexado.' 
            : 'Relatório Conselho Tutelar gerado com sucesso em 1 folha A4 com a Logo Oficial anexada.',
          filename: result.filename
        });
      } else {
        setFeedback({
          type: 'error',
          message: result.error || 'Não foi possível gerar o relatório. Verifique os dados da ocorrência e tente novamente.'
        });
      }
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: 'Não foi possível gerar o relatório. Verifique os dados da ocorrência e tente novamente.'
      });
    } finally {
      setExportingType(null);
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex flex-wrap items-center gap-2">
          {/* Botão Alfredo Machado Compacto */}
          <button
            type="button"
            onClick={() => handleExport('alfredo_machado')}
            disabled={exportingType !== null}
            title="Exportar Relatório — Alfredo Machado em Word (.docx de 1 folha A4)"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white text-xs font-bold transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
          >
            {exportingType === 'alfredo' ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Gerando A4...</span>
              </>
            ) : (
              <>
                <div 
                  className="w-4 h-4 rounded-full overflow-hidden bg-white shrink-0 shadow-2xs flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: SVG_ALFREDO_MACHADO }}
                />
                <span>Exportar Relatório — Alfredo Machado</span>
              </>
            )}
          </button>

          {/* Botão Conselho Tutelar Compacto */}
          <button
            type="button"
            onClick={() => handleExport('conselho_tutelar')}
            disabled={exportingType !== null}
            title="Exportar Relatório — Conselho Tutelar em Word (.docx de 1 folha A4)"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white text-xs font-bold transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
          >
            {exportingType === 'conselho' ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Gerando A4...</span>
              </>
            ) : (
              <>
                <div 
                  className="w-4.5 h-3 rounded bg-white shrink-0 shadow-2xs flex items-center justify-center p-0.5"
                  dangerouslySetInnerHTML={{ __html: SVG_CONSELHO_TUTELAR }}
                />
                <span>Exportar Relatório — Conselho Tutelar</span>
              </>
            )}
          </button>
        </div>

        {feedback && (
          <div 
            className={`p-2 rounded-xl text-xs flex items-center gap-2 border animate-fade-in ${
              feedback.type === 'success' 
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300' 
                : 'bg-rose-50 text-rose-900 border-rose-300'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span className="font-medium text-[11px]">{feedback.message}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-purple-50/40 border border-purple-200/90 shadow-2xs ${className}`}>
      
      {/* Header do Módulo de Exportação */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-purple-100">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-purple-100 text-purple-900 border border-purple-300">
            <Download className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-black text-xs sm:text-sm text-slate-900 tracking-tight">
              Relatórios Automáticos da Mediação (.DOCX — 1 Página A4)
            </h4>
            <p className="text-[11px] text-slate-500">
              Documentos oficiais formatados com as logos anexadas e dados do Caso #{report.id}
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-200">
          1 Folha A4 • Word Editável
        </span>
      </div>

      {/* Grid de Botões Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        
        {/* BOTÃO 1: ALFREDO MACHADO */}
        <button
          type="button"
          onClick={() => handleExport('alfredo_machado')}
          disabled={exportingType !== null}
          className="group relative p-3.5 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 active:scale-[0.98] disabled:opacity-60 text-white text-left transition-all border border-emerald-600/80 shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between min-h-[96px]"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-full overflow-hidden bg-white shadow-sm border border-emerald-300 flex items-center justify-center shrink-0 p-0.5 group-hover:scale-105 transition-transform"
                dangerouslySetInnerHTML={{ __html: SVG_ALFREDO_MACHADO }}
              />
              <div>
                <span className="font-black text-xs sm:text-sm tracking-tight text-white block">
                  Exportar Relatório — Alfredo Machado
                </span>
                <span className="text-[10px] text-emerald-200 block font-medium">
                  Com Brasão Oficial da Escola
                </span>
              </div>
            </div>
            {exportingType === 'alfredo' ? (
              <Loader2 className="w-4 h-4 animate-spin text-emerald-200 shrink-0 mt-1" />
            ) : (
              <Download className="w-4 h-4 text-emerald-200 opacity-80 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
            )}
          </div>
          <div className="flex items-center justify-between text-[11px] text-emerald-100/90 leading-tight pt-1 border-t border-emerald-600/60">
            <span>Protocolo institucional interno e parecer da mediação.</span>
            <span className="text-[10px] font-mono bg-emerald-900/70 px-1.5 py-0.5 rounded text-emerald-200 shrink-0 ml-1">1 Pág A4</span>
          </div>
        </button>

        {/* BOTÃO 2: CONSELHO TUTELAR */}
        <button
          type="button"
          onClick={() => handleExport('conselho_tutelar')}
          disabled={exportingType !== null}
          className="group relative p-3.5 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 active:scale-[0.98] disabled:opacity-60 text-white text-left transition-all border border-blue-600/80 shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between min-h-[96px]"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-10 h-7 rounded-md overflow-hidden bg-white shadow-sm border border-blue-300 flex items-center justify-center shrink-0 p-0.5 group-hover:scale-105 transition-transform"
                dangerouslySetInnerHTML={{ __html: SVG_CONSELHO_TUTELAR }}
              />
              <div>
                <span className="font-black text-xs sm:text-sm tracking-tight text-white block">
                  Exportar Relatório — Conselho Tutelar
                </span>
                <span className="text-[10px] text-blue-200 block font-medium">
                  Com Logo Oficial do Conselho Tutelar
                </span>
              </div>
            </div>
            {exportingType === 'conselho' ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-200 shrink-0 mt-1" />
            ) : (
              <Download className="w-4 h-4 text-blue-200 opacity-80 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
            )}
          </div>
          <div className="flex items-center justify-between text-[11px] text-blue-100/90 leading-tight pt-1 border-t border-blue-600/60">
            <span>Ofício formal de encaminhamento (ECA e Lei 13.185).</span>
            <span className="text-[10px] font-mono bg-blue-900/70 px-1.5 py-0.5 rounded text-blue-200 shrink-0 ml-1">1 Pág A4</span>
          </div>
        </button>

      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div 
          className={`p-3 rounded-xl text-xs flex items-start gap-2.5 border transition-all animate-fade-in ${
            feedback.type === 'success' 
              ? 'bg-emerald-50 text-emerald-950 border-emerald-300 shadow-2xs' 
              : 'bg-rose-50 text-rose-950 border-rose-300 shadow-2xs'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="font-bold">{feedback.message}</p>
            {feedback.filename && (
              <p className="text-[11px] text-emerald-800 font-mono mt-0.5 truncate">
                Arquivo baixado: {feedback.filename} (Abrir no Word ou Google Docs)
              </p>
            )}
          </div>
        </div>
      )}

      {/* Nota Informativa de Privacidade e Configuração A4 */}
      <p className="text-[10px] text-slate-500 mt-2 text-center sm:text-left flex items-center justify-between">
        <span>🔒 <strong>Privacidade:</strong> Processamento 100% no seu navegador com proteção de dados.</span>
        <span className="font-medium text-slate-400">Padrão A4 • Margens otimizadas para 1 folha</span>
      </p>

    </div>
  );
};
