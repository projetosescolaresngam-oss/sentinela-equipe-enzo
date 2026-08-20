import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  IncidentReport, 
  AdminNotification, 
  ChatMessage, 
  BullyingCategory, 
  IncidentFrequency, 
  SchoolShift, 
  ReporterRole, 
  UrgencyLevel, 
  ReportStatus 
} from './types';
import { INITIAL_REPORTS, INITIAL_NOTIFICATIONS } from './initialData';

interface AppContextType {
  reports: IncidentReport[];
  notifications: AdminNotification[];
  chatMessages: ChatMessage[];
  activeTab: 'home' | 'education' | 'report' | 'tracker' | 'support' | 'admin';
  setActiveTab: (tab: 'home' | 'education' | 'report' | 'tracker' | 'support' | 'admin') => void;
  selectedCategoryDetail: BullyingCategory | null;
  setSelectedCategoryDetail: (cat: BullyingCategory | null) => void;
  lastGeneratedProtocol: string | null;
  setLastGeneratedProtocol: (protocol: string | null) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
  isBreathingModalOpen: boolean;
  setIsBreathingModalOpen: (open: boolean) => void;
  isLoadingScreen: boolean;
  setIsLoadingScreen: (loading: boolean) => void;
  
  // Actions
  submitReport: (params: {
    types: BullyingCategory[];
    frequency: IncidentFrequency;
    location: string;
    shift: SchoolShift;
    role: ReporterRole;
    urgency: UrgencyLevel;
    description?: string;
    targetGrade?: string;
    hasEvidenceAttachment?: boolean;
  }) => string; // Returns protocol ID
  
  getReportByProtocol: (protocolId: string) => IncidentReport | undefined;
  addMessageToProtocol: (reportId: string, text: string, sender: 'conselho' | 'estudante', authorRoleTitle?: string) => void;
  updateReportStatus: (reportId: string, status: ReportStatus, adminNotes?: string) => void;
  markNotificationAsRead: (notifId: string) => void;
  sendChatMessage: (content: string) => void;
  clearChat: () => void;
  deleteReport: (reportId: string) => void;
  deleteAllReports: () => void;
  exportReportsCSV: () => void;
  resetAllDataToDefault: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_REPORTS = 'sentinela_reports_v3';
const STORAGE_KEY_NOTIFS = 'sentinela_notifs_v3';
const STORAGE_KEY_CHAT = 'sentinela_chat_v3';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'education' | 'report' | 'tracker' | 'support' | 'admin'>('home');
  const [selectedCategoryDetail, setSelectedCategoryDetail] = useState<BullyingCategory | null>(null);
  const [lastGeneratedProtocol, setLastGeneratedProtocol] = useState<string | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isBreathingModalOpen, setIsBreathingModalOpen] = useState<boolean>(false);
  const [isLoadingScreen, setIsLoadingScreen] = useState<boolean>(true);

  // Initialize reports from LocalStorage or Seed (empty)
  const [reports, setReports] = useState<IncidentReport[]>(() => {
    try {
      // Clean legacy caches
      localStorage.removeItem('sentinela_reports_v2');
      localStorage.removeItem('sentinela_reports');
      const saved = localStorage.getItem(STORAGE_KEY_REPORTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_REPORTS;
  });

  // Initialize notifications
  const [notifications, setNotifications] = useState<AdminNotification[]>(() => {
    try {
      // Clean legacy caches
      localStorage.removeItem('sentinela_notifs_v2');
      localStorage.removeItem('sentinela_notifs');
      const saved = localStorage.getItem(STORAGE_KEY_NOTIFS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Initialize emotional chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHAT);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'welcome-msg',
        sender: 'apoio_ia',
        content: 'Olá! Eu sou a Sentinela, seu assistente de acolhimento e suporte emocional confidencial. Este é um espaço seguro onde você pode desabafar, aprender a se acalmar ou entender seus sentimentos. Como você está se sentindo hoje?',
        timestamp: new Date().toISOString(),
        quickOptions: [
          'Estou muito ansioso(a)',
          'Sofri bullying hoje',
          'Quero fazer um exercício de respiração',
          'Como falar com o Conselho Escolar?'
        ]
      }
    ];
  });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(reports));
    } catch {
      // ignore
    }
  }, [reports]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(notifications));
    } catch {
      // ignore
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHAT, JSON.stringify(chatMessages));
    } catch {
      // ignore
    }
  }, [chatMessages]);

  // Submit anonymous report
  const submitReport = (params: {
    types: BullyingCategory[];
    frequency: IncidentFrequency;
    location: string;
    shift: SchoolShift;
    role: ReporterRole;
    urgency: UrgencyLevel;
    description?: string;
    targetGrade?: string;
    hasEvidenceAttachment?: boolean;
  }): string => {
    // Generate unique anonymous protocol ID (e.g. SEC-2026-X841)
    const randomHex = Math.floor(1000 + Math.random() * 9000).toString();
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const protocolId = `SEC-2026-${letter}${randomHex}`;

    const newReport: IncidentReport = {
      id: protocolId,
      types: params.types,
      frequency: params.frequency,
      location: params.location,
      shift: params.shift,
      role: params.role,
      urgency: params.urgency,
      description: params.description || '',
      targetGrade: params.targetGrade || 'Não informado',
      hasEvidenceAttachment: !!params.hasEvidenceAttachment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'novo',
      messages: []
    };

    setReports(prev => [newReport, ...prev]);
    setLastGeneratedProtocol(protocolId);

    // Create admin notification
    const newNotif: AdminNotification = {
      id: `notif-${Date.now()}`,
      reportId: protocolId,
      title: params.urgency === 'critica_sos' 
        ? '⚠️ ALERTA SOS: Denúncia de Emergência Registrada' 
        : `Nova Denúncia #${protocolId}`,
      message: `Incidente de ${params.types.join(', ')} relatado em ${params.location}.`,
      urgency: params.urgency,
      timestamp: new Date().toISOString(),
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);

    return protocolId;
  };

  const getReportByProtocol = (protocolId: string): IncidentReport | undefined => {
    const cleanId = protocolId.trim().toUpperCase();
    return reports.find(r => r.id.toUpperCase() === cleanId);
  };

  const addMessageToProtocol = (
    reportId: string, 
    text: string, 
    sender: 'conselho' | 'estudante',
    authorRoleTitle?: string
  ) => {
    setReports(prev => prev.map(rep => {
      if (rep.id === reportId) {
        const newMsg = {
          id: `msg-${Date.now()}`,
          sender,
          authorRoleTitle: sender === 'conselho' ? (authorRoleTitle || 'Conselho Escolar') : undefined,
          text,
          timestamp: new Date().toISOString()
        };
        return {
          ...rep,
          updatedAt: new Date().toISOString(),
          messages: [...rep.messages, newMsg]
        };
      }
      return rep;
    }));
  };

  const updateReportStatus = (reportId: string, status: ReportStatus, adminNotes?: string) => {
    setReports(prev => prev.map(rep => {
      if (rep.id === reportId) {
        return {
          ...rep,
          status,
          adminNotes: adminNotes !== undefined ? adminNotes : rep.adminNotes,
          updatedAt: new Date().toISOString()
        };
      }
      return rep;
    }));
  };

  const markNotificationAsRead = (notifId: string) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const sendChatMessage = async (userContent: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'usuario',
      content: userContent,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMsg]);

    const fallbackResponse = (text: string): { reply: string; quickOptions: string[] } => {
      const lower = text.toLowerCase();
      if (lower.includes('ansios') || lower.includes('medo') || lower.includes('nervos') || lower.includes('panico')) {
        return {
          reply: 'É perfeitamente compreensível você se sentir assim. Respire fundo: você está seguro(a) aqui e não está sozinho(a). Gostaria de fazer uma breve pausa com nosso exercício de respiração guiada ou prefere que eu te oriente sobre como relatar o que aconteceu?',
          quickOptions: ['Fazer exercício de respiração', 'Quero denunciar anonimamente', 'Como falar com o CVV 188?']
        };
      } else if (lower.includes('respir') || lower.includes('calma') || lower.includes('exercicio')) {
        setIsBreathingModalOpen(true);
        return {
          reply: 'Excelente escolha. A técnica de respiração 4-7-8 ajuda a desacelerar seus batimentos e trazer alívio para a mente. Você pode abrir o exercício interativo clicando no botão abaixo ou nas ferramentas rápidas!',
          quickOptions: ['Abrir Respiração Guiada', 'Fazer Denúncia Anônima', 'Ver Tipos de Bullying']
        };
      } else if (lower.includes('denunci') || lower.includes('conselho') || lower.includes('fazer')) {
        return {
          reply: 'Você pode registrar uma denúncia totalmente anônima clicando na aba "Fazer Denúncia". O sistema gera um código de protocolo secreto que só você tem acesso, permitindo receber respostas do conselho escolar sem ninguém saber quem você é.',
          quickOptions: ['Ir para Formulário de Denúncia', 'Como funciona o sigilo?', 'Ver Tipos de Bullying']
        };
      } else if (lower.includes('cvv') || lower.includes('188') || lower.includes('ajuda') || lower.includes('morrer') || lower.includes('suicid')) {
        return {
          reply: 'Sua vida e seu bem-estar são preciosos. Se você estiver passando por um momento de grande dor ou desespero, por favor ligue agora mesmo para o CVV no número 188 (ligação gratuita 24h) ou busque a sala de orientação da escola. Há pessoas prontas para te ouvir com carinho e respeito.',
          quickOptions: ['Ligar para o CVV 188', 'Fazer Denúncia Anônima', 'Conversar mais']
        };
      }
      return {
        reply: 'Estou ouvindo você. Lembre-se: você tem direito a um ambiente escolar onde seja respeitado(a) e valorizado(a). Se algo estiver te machucando ou a algum colega, o Sentinela Escolar existe exatamente para te apoiar com total sigilo.',
        quickOptions: ['Fazer Denúncia Anônima', 'Identificar se é Bullying', 'Exercício de Respiração']
      };
    };

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userContent,
          history: chatMessages.slice(-6)
        })
      });

      if (!response.ok) {
        throw new Error('Falha no endpoint da IA');
      }

      const data = await response.json();
      if (data.reply) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'apoio_ia',
          content: data.reply,
          timestamp: new Date().toISOString(),
          quickOptions: data.quickOptions || ['Fazer Denúncia Anônima', 'Acompanhar Protocolo', 'Exercício de Respiração']
        };
        setChatMessages(prev => [...prev, botMsg]);
        return;
      }
    } catch {
      // Fallback gracioso offline/local
      const fallback = fallbackResponse(userContent);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'apoio_ia',
        content: fallback.reply,
        timestamp: new Date().toISOString(),
        quickOptions: fallback.quickOptions
      };
      setChatMessages(prev => [...prev, botMsg]);
    }
  };

  const clearChat = () => {
    setChatMessages([
      {
        id: 'welcome-msg-reset',
        sender: 'apoio_ia',
        content: 'Conversa reiniciada. Como posso te apoiar neste momento?',
        timestamp: new Date().toISOString(),
        quickOptions: [
          'Estou muito ansioso(a)',
          'Sofri bullying hoje',
          'Quero fazer um exercício de respiração'
        ]
      }
    ]);
  };

  const exportReportsCSV = () => {
    const headers = ['Protocolo', 'Tipos', 'Frequência', 'Local', 'Turno', 'Papel', 'Urgência', 'Status', 'Data_Criacao', 'Descricao'];
    const rows = reports.map(r => [
      r.id,
      `"${r.types.join('; ')}"`,
      r.frequency,
      `"${r.location}"`,
      r.shift,
      r.role,
      r.urgency,
      r.status,
      r.createdAt,
      `"${(r.description || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `relatorio_estatistico_bullying_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteReport = (reportId: string) => {
    setReports(prev => prev.filter(r => r.id !== reportId));
    setNotifications(prev => prev.filter(n => n.reportId !== reportId));
  };

  const deleteAllReports = () => {
    setReports([]);
    setNotifications([]);
    localStorage.removeItem(STORAGE_KEY_REPORTS);
    localStorage.removeItem(STORAGE_KEY_NOTIFS);
  };

  const resetAllDataToDefault = () => {
    setReports(INITIAL_REPORTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    clearChat();
    localStorage.removeItem(STORAGE_KEY_REPORTS);
    localStorage.removeItem(STORAGE_KEY_NOTIFS);
    localStorage.removeItem(STORAGE_KEY_CHAT);
  };

  return (
    <AppContext.Provider value={{
      reports,
      notifications,
      chatMessages,
      activeTab,
      setActiveTab,
      selectedCategoryDetail,
      setSelectedCategoryDetail,
      lastGeneratedProtocol,
      setLastGeneratedProtocol,
      isAdminAuthenticated,
      setIsAdminAuthenticated,
      isBreathingModalOpen,
      setIsBreathingModalOpen,
      isLoadingScreen,
      setIsLoadingScreen,
      submitReport,
      getReportByProtocol,
      addMessageToProtocol,
      updateReportStatus,
      markNotificationAsRead,
      sendChatMessage,
      clearChat,
      deleteReport,
      deleteAllReports,
      exportReportsCSV,
      resetAllDataToDefault
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
