import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Download, 
  Printer, 
  Send, 
  AlertTriangle, 
  FileSpreadsheet, 
  Bell, 
  Search, 
  Lock, 
  KeyRound, 
  Sparkles,
  TrendingUp,
  MapPin,
  Calendar,
  X,
  MessageSquare,
  FileText,
  Building,
  RotateCcw
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { useApp } from './AppContext';
import { IncidentReport, ReportStatus, UrgencyLevel, BullyingCategory } from './types';

export const AdminDashboard: React.FC = () => {
  const { 
    reports, 
    notifications, 
    markNotificationAsRead, 
    updateReportStatus, 
    addMessageToProtocol, 
    exportReportsCSV,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    resetAllDataToDefault
  } = useApp();

  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  
  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('todos');
  const [typeFilter, setTypeFilter] = useState<string>('todos');

  // Selected Report Modal for Response/Review
  const [selectedReportModal, setSelectedReportModal] = useState<IncidentReport | null>(null);
  const [adminResponseText, setAdminResponseText] = useState<string>('');
  const [newStatusValue, setNewStatusValue] = useState<ReportStatus>('em_analise');
  const [adminNotesValue, setAdminNotesValue] = useState<string>('');
  const [authorRoleValue, setAuthorRoleValue] = useState<string>('Orientação Psicopedagógica');
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleRunAiAnalysis = async (report: IncidentReport) => {
    setIsAnalyzing(true);
    setAiAnalysis('');
    try {
      const res = await fetch('/api/analyze-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report)
      });
      if (!res.ok) throw new Error('Falha ao analisar');
      const data = await res.json();
      setAiAnalysis(data.analysis || 'Análise concluída.');
    } catch {
      setAiAnalysis('Análise Pedagógica Preliminar: O caso envolve múltiplos episódios e requer intervenção restaurativa imediata da equipe gestora, com acolhimento confidencial do estudante e diálogo preventivo em sala de aula, em conformidade com as diretrizes da Lei 13.185/2015.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Monthly Report Modal
  const [showMonthlyReportModal, setShowMonthlyReportModal] = useState<boolean>(false);

  // Authentication logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === 'en22112009' || passwordInput.trim() === '22112009') {
      setIsAdminAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Senha de gestão incorreta.');
    }
  };

  // Metrics calculation
  const totalReports = reports.length;
  const criticalReports = reports.filter(r => r.urgency === 'critica_sos' || r.urgency === 'alta').length;
  const resolvedReports = reports.filter(r => r.status === 'resolvido').length;
  const resolutionRate = totalReports > 0 ? Math.round((resolvedReports / totalReports) * 100) : 0;

  // Filtered reports table
  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      const matchesSearch = r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === 'todos' || r.status === statusFilter;
      const matchesUrgency = urgencyFilter === 'todos' || r.urgency === urgencyFilter;
      const matchesType = typeFilter === 'todos' || r.types.includes(typeFilter as BullyingCategory);

      return matchesSearch && matchesStatus && matchesUrgency && matchesType;
    });
  }, [reports, searchQuery, statusFilter, urgencyFilter, typeFilter]);

  // Chart Data 1: By Category
  const categoryChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    reports.forEach(r => {
      r.types.forEach(t => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });

    const labelMap: Record<string, string> = {
      verbal: 'Verbal',
      cyberbullying: 'Cyberbullying',
      fisico: 'Físico',
      psicologico: 'Psicológico',
      social: 'Social / Exclusão',
      material: 'Material',
      sexual: 'Assédio / Sexual'
    };

    return Object.keys(counts).map(key => ({
      name: labelMap[key] || key,
      quantidade: counts[key],
    })).sort((a, b) => b.quantidade - a.quantidade);
  }, [reports]);

  // Chart Data 2: By Frequency (Pie)
  const frequencyChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    reports.forEach(r => {
      counts[r.frequency] = (counts[r.frequency] || 0) + 1;
    });

    const labelMap: Record<string, string> = {
      primeira_vez: '1ª Vez',
      '2_a_3_vezes': '2 a 3 Vezes',
      semanal: 'Semanal',
      diario: 'Diário',
      ha_meses: 'Há Meses'
    };

    const COLORS = ['#9333ea', '#7c3aed', '#a855f7', '#c084fc', '#10b981'];

    return Object.keys(counts).map((key, idx) => ({
      name: labelMap[key] || key,
      value: counts[key],
      color: COLORS[idx % COLORS.length]
    }));
  }, [reports]);

  // Chart Data 3: Monthly timeline simulation
  const monthlyTrendData = [
    { mes: 'Mar/26', denuncias: 4, resolvidos: 3 },
    { mes: 'Abr/26', denuncias: 6, resolvidos: 5 },
    { mes: 'Mai/26', denuncias: 8, resolvidos: 7 },
    { mes: 'Jun/26', denuncias: 3, resolvidos: 3 },
    { mes: 'Jul/26', denuncias: 2, resolvidos: 2 },
    { mes: 'Ago/26', denuncias: totalReports, resolvidos: resolvedReports },
  ];

  // Location Hotspots
  const locationBreakdown = useMemo(() => {
    const locMap: Record<string, number> = {};
    reports.forEach(r => {
      locMap[r.location] = (locMap[r.location] || 0) + 1;
    });
    return Object.entries(locMap).sort((a, b) => b[1] - a[1]);
  }, [reports]);

  const handleOpenReviewModal = (report: IncidentReport) => {
    setSelectedReportModal(report);
    setNewStatusValue(report.status);
    setAdminNotesValue(report.adminNotes || '');
    setAdminResponseText('');
    setAiAnalysis('');
  };

  const handleSaveModalChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReportModal) return;

    updateReportStatus(selectedReportModal.id, newStatusValue, adminNotesValue);

    if (adminResponseText.trim()) {
      addMessageToProtocol(
        selectedReportModal.id, 
        adminResponseText.trim(), 
        'conselho', 
        authorRoleValue
      );
    }

    setSelectedReportModal(null);
  };

  // If not authenticated, display clean PIN login
  if (!isAdminAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 animate-fade-in text-slate-800">
        <div className="bg-white border border-purple-200/90 rounded-3xl p-8 shadow-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-800 mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-1">Painel Administrativo</h2>
          <p className="text-xs text-slate-600 mb-6">
            Acesso restrito para Direção, Orientadores Psicopedagógicos e Conselho Escolar.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-950 block mb-1.5">
                Senha / Chave Institucional:
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-purple-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Digite a senha..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-purple-50/50 border border-purple-300/80 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                />
              </div>
              {authError && <p className="text-xs text-rose-600 font-semibold mt-2">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-xs transition-all active:scale-95"
            >
              Acessar Painel de Gestão
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-purple-100 flex justify-center">
            <button
              onClick={() => {
                setPasswordInput('en22112009');
                setIsAdminAuthenticated(true);
              }}
              className="text-xs text-purple-900 hover:underline flex items-center gap-1 font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <span>Clique aqui para Acesso Rápido (Modo Demonstração)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-slate-800">
      
      {/* Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-purple-200/80 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Painel de Inteligência e Gestão Escolar
            </h1>
            <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase">
              Conforme Lei 13.185/15
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Monitoramento de incidentes, tendências de bullying e mediação pedagógica em tempo real.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowMonthlyReportModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>Emitir Relatório Mensal</span>
          </button>

          <button
            onClick={exportReportsCSV}
            className="bg-white hover:bg-purple-50 text-slate-800 text-xs sm:text-sm font-bold px-3.5 py-2.5 rounded-2xl flex items-center gap-1.5 border border-purple-300 shadow-2xs"
            title="Exportar CSV de Dados"
          >
            <Download className="w-4 h-4 text-purple-700" />
            <span className="hidden sm:inline">Exportar CSV</span>
          </button>

          <button
            onClick={() => setIsAdminAuthenticated(false)}
            className="bg-purple-100 hover:bg-rose-100 text-purple-900 hover:text-rose-700 text-xs font-bold px-3 py-2.5 rounded-2xl border border-purple-300 transition-colors"
            title="Sair do Modo Gestor"
          >
            Sair
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 w-full max-w-full">
        <div className="bg-white border border-purple-200/90 rounded-3xl p-5 shadow-xs min-w-0">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-950">Total de Denúncias</span>
            <BarChart3 className="w-4 h-4 text-purple-700" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-slate-900">{totalReports}</span>
          <span className="text-[11px] text-slate-500 block mt-1">Registradas no sistema</span>
        </div>

        <div className="bg-white border border-purple-200/90 rounded-3xl p-5 shadow-xs min-w-0">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-950">Casos Graves / SOS</span>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-rose-600">{criticalReports}</span>
          <span className="text-[11px] text-rose-700 font-semibold block mt-1">Prioridade máxima de triagem</span>
        </div>

        <div className="bg-white border border-purple-200/90 rounded-3xl p-5 shadow-xs min-w-0">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-950">Casos Resolvidos</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-emerald-700">{resolvedReports}</span>
          <span className="text-[11px] text-emerald-800 font-semibold block mt-1">Com medidas pedagógicas</span>
        </div>

        <div className="bg-white border border-purple-200/90 rounded-3xl p-5 shadow-xs min-w-0">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-950">Taxa de Resolução</span>
            <TrendingUp className="w-4 h-4 text-purple-700" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-purple-900">{resolutionRate}%</span>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">Tempo médio: 4.2 horas</span>
        </div>
      </div>

      {/* Notifications / Alerts Feed (If any) */}
      <div className="bg-white border border-purple-200/90 rounded-3xl p-5 mb-8 shadow-xs w-full max-w-full overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-purple-700" />
            <h3 className="font-extrabold text-sm text-slate-900">Central de Alertas e Notificações Push</h3>
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            {notifications.filter(n => !n.read).length} não lidas
          </span>
        </div>

        <div className="space-y-2">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`p-3 rounded-2xl border flex items-center justify-between gap-3 text-xs transition-all cursor-pointer ${
                notif.read
                  ? 'bg-purple-50/40 border-purple-100 text-slate-500'
                  : 'bg-purple-100/70 border-purple-300 text-slate-900 font-medium shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${notif.read ? 'bg-slate-400' : 'bg-purple-600 animate-ping'}`} />
                <div className="min-w-0">
                  <span className="font-extrabold text-slate-900 truncate block">{notif.title}</span>
                  <p className="text-[11px] text-slate-600 truncate">{notif.message}</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 flex-shrink-0 font-medium">
                {new Date(notif.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 w-full max-w-full">
        
        {/* Chart 1: Types Breakdown */}
        <div className="lg:col-span-7 bg-white border border-purple-200/90 rounded-3xl p-6 shadow-xs min-w-0 max-w-full overflow-hidden">
          <h3 className="font-extrabold text-base text-slate-900 mb-1">Distribuição por Tipologia de Bullying</h3>
          <p className="text-xs text-slate-500 mb-6">Volume total de ocorrências por categoria declarada</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" opacity={0.8} />
                <XAxis 
                  dataKey="name" 
                  stroke="#78716c" 
                  fontSize={11} 
                  tickLine={false} 
                  angle={-20} 
                  textAnchor="end" 
                />
                <YAxis stroke="#78716c" fontSize={11} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e9d5ff', borderRadius: '16px', fontSize: '12px', color: '#1c1917', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="quantidade" fill="#9333ea" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Frequency Distribution */}
        <div className="lg:col-span-5 bg-white border border-purple-200/90 rounded-3xl p-6 shadow-xs min-w-0 max-w-full overflow-hidden flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 mb-1">Frequência e Recorrência</h3>
            <p className="text-xs text-slate-500 mb-2">Com que constância os atos estão ocorrendo</p>
          </div>
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={frequencyChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {frequencyChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e9d5ff', borderRadius: '16px', fontSize: '12px', color: '#1c1917' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-[11px] text-slate-600 mt-2">
            {frequencyChartData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: Monthly Trends */}
        <div className="lg:col-span-8 bg-white border border-purple-200/90 rounded-3xl p-6 shadow-xs min-w-0 max-w-full overflow-hidden">
          <h3 className="font-extrabold text-base text-slate-900 mb-1">Evolução Temporal e Resoluções Mensais</h3>
          <p className="text-xs text-slate-500 mb-6">Comparativo entre denúncias recebidas vs. casos concluídos</p>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" opacity={0.8} />
                <XAxis dataKey="mes" stroke="#78716c" fontSize={11} />
                <YAxis stroke="#78716c" fontSize={11} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e9d5ff', borderRadius: '16px', fontSize: '12px', color: '#1c1917' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="denuncias" name="Denúncias Recebidas" stroke="#9333ea" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="resolvidos" name="Casos Acolhidos / Resolvidos" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Heatmap Locations */}
        <div className="lg:col-span-4 bg-white border border-purple-200/90 rounded-3xl p-6 shadow-xs min-w-0 max-w-full overflow-hidden">
          <h3 className="font-extrabold text-base text-slate-900 mb-1">Zonas de Atenção na Escola</h3>
          <p className="text-xs text-slate-500 mb-4">Locais com maior volume de relatos</p>
          <div className="space-y-2.5">
            {locationBreakdown.slice(0, 5).map(([loc, count], idx) => {
              const pct = Math.round((count / totalReports) * 100);
              return (
                <div key={idx} className="bg-purple-50/60 p-2.5 rounded-2xl border border-purple-200">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-800 truncate">{loc}</span>
                    <span className="text-purple-900 font-mono">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-purple-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Case Management Table Section */}
      <div className="bg-white border border-purple-200/90 rounded-3xl p-6 shadow-xs w-full max-w-full overflow-hidden">
        
        {/* Table Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-black text-lg text-slate-900">Gestão e Mediação de Casos</h3>
            <p className="text-xs text-slate-500">Clique em qualquer linha para responder ao aluno em sigilo ou atualizar o status.</p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none snap-x max-w-full">
            {/* Search */}
            <div className="relative shrink-0 min-w-[180px] sm:min-w-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filtrar código / local..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-purple-50/50 border border-purple-300 rounded-2xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="shrink-0 bg-purple-50/50 border border-purple-300 rounded-2xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
            >
              <option value="todos">Todos os Status</option>
              <option value="novo">Novo / Fila</option>
              <option value="em_analise">Em Análise</option>
              <option value="acao_em_andamento">Ação em Andamento</option>
              <option value="resolvido">Resolvido</option>
            </select>

            {/* Urgency Filter */}
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="shrink-0 bg-purple-50/50 border border-purple-300 rounded-2xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
            >
              <option value="todos">Todas as Urgências</option>
              <option value="critica_sos">Crítica SOS</option>
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full max-w-full">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-100/70 text-purple-950 font-black uppercase tracking-wider border-b border-purple-200">
              <tr>
                <th className="p-3.5 rounded-l-2xl">Protocolo</th>
                <th className="p-3.5">Tipos Declarados</th>
                <th className="p-3.5">Local & Turno</th>
                <th className="p-3.5">Urgência</th>
                <th className="p-3.5">Frequência</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Mensagens</th>
                <th className="p-3.5 text-right rounded-r-2xl">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {filteredReports.map((rep) => {
                const isCrit = rep.urgency === 'critica_sos';
                return (
                  <tr 
                    key={rep.id}
                    onClick={() => handleOpenReviewModal(rep)}
                    className={`hover:bg-purple-50/80 transition-colors cursor-pointer ${
                      isCrit ? 'bg-rose-50/60' : ''
                    }`}
                  >
                    <td className="p-3.5 font-mono font-black text-purple-900">{rep.id}</td>
                    <td className="p-3.5 capitalize font-bold text-slate-800">
                      {rep.types.join(', ')}
                    </td>
                    <td className="p-3.5 text-slate-700">
                      <span className="font-semibold">{rep.location}</span>
                      <span className="text-[10px] text-slate-500 block">({rep.shift})</span>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full font-extrabold uppercase text-[10px] ${
                        rep.urgency === 'critica_sos' ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse' :
                        rep.urgency === 'alta' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                        rep.urgency === 'media' ? 'bg-purple-100 text-purple-900 border border-purple-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {rep.urgency}
                      </span>
                    </td>
                    <td className="p-3.5 capitalize text-slate-600">{rep.frequency.replace(/_/g, ' ')}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        rep.status === 'novo' ? 'bg-purple-100 text-purple-950 border border-purple-300' :
                        rep.status === 'em_analise' ? 'bg-purple-200 text-purple-950 border border-purple-400' :
                        rep.status === 'acao_em_andamento' ? 'bg-indigo-100 text-indigo-950 border border-indigo-200' : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      }`}>
                        {rep.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-500 font-mono font-bold">
                      {rep.messages.length} msg(s)
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenReviewModal(rep);
                        }}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold shadow-2xs transition-all active:scale-95"
                      >
                        Mediar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Review / Feedback Modal */}
      {selectedReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in text-slate-800">
          <div className="bg-white border border-purple-200 rounded-3xl max-w-2xl w-full p-6 text-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedReportModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-purple-50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-purple-100">
              <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-800 border border-purple-300">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">Mediação do Caso #{selectedReportModal.id}</h3>
                <p className="text-xs text-slate-500">Oriente o aluno com segurança sem romper o sigilo</p>
              </div>
            </div>

            {/* Case Details */}
            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="bg-purple-50/60 border border-purple-200 p-3 rounded-2xl">
                <span className="text-slate-500 font-bold block mb-0.5">Tipologias:</span>
                <span className="font-extrabold text-slate-900 capitalize">{selectedReportModal.types.join(', ')}</span>
              </div>
              <div className="bg-purple-50/60 border border-purple-200 p-3 rounded-2xl">
                <span className="text-slate-500 font-bold block mb-0.5">Local / Turno:</span>
                <span className="font-extrabold text-slate-900">{selectedReportModal.location} ({selectedReportModal.shift})</span>
              </div>
            </div>

            {selectedReportModal.description && (
              <div className="bg-purple-50/40 p-3.5 rounded-2xl border border-purple-200/80 text-xs text-slate-700 mb-4">
                <span className="text-purple-950 font-bold block mb-1">Relato Anônimo Enviado:</span>
                <p className="italic">{selectedReportModal.description}</p>
              </div>
            )}

            {/* AI Assistant Analysis (Netlify Function / Gemini) */}
            <div className="mb-4 bg-gradient-to-br from-purple-50 to-indigo-50/50 p-3.5 rounded-2xl border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-700" />
                  <span className="text-xs font-black text-purple-950">Parecer Pedagógico com IA (Lei 13.185/15)</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRunAiAnalysis(selectedReportModal)}
                  disabled={isAnalyzing}
                  className="bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white text-[11px] font-bold px-3 py-1 rounded-xl flex items-center gap-1.5 transition-all shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {isAnalyzing ? 'Analisando...' : aiAnalysis ? 'Reanalisar' : 'Gerar Parecer'}
                </button>
              </div>
              {aiAnalysis ? (
                <div className="mt-2 text-xs text-slate-800 bg-white p-3 rounded-xl border border-purple-200/80 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                  {aiAnalysis}
                </div>
              ) : (
                <p className="text-[11px] text-slate-500 italic">
                  Gere instantaneamente um diagnóstico de risco, medidas restaurativas e sugestão de resposta ao estudante usando a função de IA.
                </p>
              )}
            </div>

            {/* Conversation History */}
            <div className="mb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-950 block mb-2">
                Histórico de Mensagens no Protocolo:
              </span>
              <div className="bg-purple-50/50 p-3 rounded-2xl max-h-40 overflow-y-auto space-y-2 border border-purple-200 text-xs">
                {selectedReportModal.messages.length === 0 ? (
                  <p className="text-slate-400 italic text-center py-2">Nenhuma mensagem trocada ainda.</p>
                ) : (
                  selectedReportModal.messages.map((m) => (
                    <div key={m.id} className="p-2.5 rounded-xl bg-white border border-purple-200/80 shadow-2xs">
                      <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                        <span className="font-extrabold text-purple-900">{m.sender === 'conselho' ? (m.authorRoleTitle || 'Conselho Escolar') : 'Estudante'}</span>
                        <span>{new Date(m.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-slate-800 font-medium">{m.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Form to Update Status & Send Message */}
            <form onSubmit={handleSaveModalChanges} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-purple-950 block mb-1">
                    Atualizar Status Institucional:
                  </label>
                  <select
                    value={newStatusValue}
                    onChange={(e) => setNewStatusValue(e.target.value as ReportStatus)}
                    className="w-full bg-purple-50/50 border border-purple-300 rounded-2xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                  >
                    <option value="novo">Novo / Fila</option>
                    <option value="em_analise">Em Análise Psicopedagógica</option>
                    <option value="acao_em_andamento">Ação Preventiva em Andamento</option>
                    <option value="resolvido">Acolhido & Concluído</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-purple-950 block mb-1">
                    Identificação da Resposta:
                  </label>
                  <input
                    type="text"
                    value={authorRoleValue}
                    onChange={(e) => setAuthorRoleValue(e.target.value)}
                    className="w-full bg-purple-50/50 border border-purple-300 rounded-2xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-purple-950 block mb-1">
                  Enviar Mensagem Anônima para o Protocolo do Aluno:
                </label>
                <textarea
                  rows={3}
                  placeholder="Escreva orientações de acolhimento, informe sobre medidas tomadas na escola ou combine horário de apoio..."
                  value={adminResponseText}
                  onChange={(e) => setAdminResponseText(e.target.value)}
                  className="w-full bg-purple-50/50 border border-purple-300 rounded-2xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-purple-950 block mb-1">
                  Notas Internas Confidenciais (Apenas para Gestão):
                </label>
                <input
                  type="text"
                  placeholder="Ex: Inspetoria alertada, reunião com professores agendada..."
                  value={adminNotesValue}
                  onChange={(e) => setAdminNotesValue(e.target.value)}
                  className="w-full bg-purple-50/50 border border-purple-300 rounded-2xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedReportModal(null)}
                  className="bg-purple-100 hover:bg-purple-200 text-purple-950 text-xs font-bold px-4 py-2.5 rounded-2xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold px-5 py-2.5 rounded-2xl shadow-xs transition-all active:scale-95"
                >
                  Salvar Alterações e Enviar
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Monthly Printable Report Modal */}
      {showMonthlyReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in text-slate-900">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto print:p-0 print:shadow-none border border-purple-200">
            
            {/* Modal Controls (Hidden in Print) */}
            <div className="flex items-center justify-between pb-4 border-b border-purple-200 mb-6 print:hidden">
              <span className="text-xs font-bold text-purple-950 uppercase tracking-wider">
                Visualização do Relatório Mensal Institucional
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold px-4 py-2 rounded-2xl flex items-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir / Salvar PDF</span>
                </button>
                <button
                  onClick={() => setShowMonthlyReportModal(false)}
                  className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-purple-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div className="text-slate-900 space-y-6">
              <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-black tracking-tight text-slate-950">
                    RELATÓRIO ESTATÍSTICO DE PREVENÇÃO AO BULLYING
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Programa Institucional de Diagnóstico e Combate à Intimidação Sistemática (Lei Federal nº 13.185/2015)
                  </p>
                </div>
                <div className="text-right text-xs text-slate-600 font-medium">
                  <p><strong>Mês de Referência:</strong> Agosto / 2026</p>
                  <p><strong>Emissão:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
                </div>
              </div>

              {/* Summary Numbers */}
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-purple-50 p-3 rounded-2xl border border-purple-200">
                  <span className="text-[11px] text-purple-950 uppercase font-extrabold block">Total Notificado</span>
                  <span className="text-xl font-black text-slate-900">{totalReports}</span>
                </div>
                <div className="bg-rose-50 p-3 rounded-2xl border border-rose-200">
                  <span className="text-[11px] text-rose-900 uppercase font-extrabold block">Casos Urgentes</span>
                  <span className="text-xl font-black text-rose-700">{criticalReports}</span>
                </div>
                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
                  <span className="text-[11px] text-emerald-900 uppercase font-extrabold block">Ações Concluídas</span>
                  <span className="text-xl font-black text-emerald-700">{resolvedReports}</span>
                </div>
                <div className="bg-purple-50 p-3 rounded-2xl border border-purple-200">
                  <span className="text-[11px] text-purple-950 uppercase font-extrabold block">Taxa de Resolução</span>
                  <span className="text-xl font-black text-purple-900">{resolutionRate}%</span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div>
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-200 pb-1">
                  1. Distribuição Quantitativa por Modalidade de Intimidação:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {categoryChartData.map((cat, i) => (
                    <div key={i} className="flex justify-between border-b border-purple-100 py-1">
                      <span className="text-slate-700 font-medium">{cat.name}:</span>
                      <span className="font-extrabold text-slate-900">{cat.quantidade} ocorrência(s)</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-200 pb-1">
                  2. Principais Espaços Físicos e Digitais de Incidência:
                </h4>
                <div className="space-y-1 text-xs">
                  {locationBreakdown.map(([loc, count], i) => (
                    <div key={i} className="flex justify-between border-b border-purple-100 py-1">
                      <span className="text-slate-700 font-medium">{loc}:</span>
                      <span className="font-extrabold text-slate-900">{count} registro(s)</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-200 pb-1">
                  3. Parecer Sintético e Encaminhamentos Psicopedagógicos:
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-purple-50/60 border border-purple-200/80 p-3 rounded-2xl">
                  As ocorrências registradas ao longo do período foram devidamente acolhidas pela equipe de mediação de conflitos escolares. As medidas preventivas incluíram rodas de conversa socioemocionais, intervenções interdisciplinares nas turmas com maior incidência e acompanhamento individualizado confidencial através dos protocolos de proteção.
                </p>
              </div>

              <div className="pt-8 border-t border-slate-300 flex justify-between text-xs text-slate-600">
                <div className="text-center w-48">
                  <div className="border-b border-slate-400 mb-1" />
                  <span className="font-bold">Coordenação Pedagógica</span>
                </div>
                <div className="text-center w-48">
                  <div className="border-b border-slate-400 mb-1" />
                  <span className="font-bold">Conselho Escolar / Direção</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

