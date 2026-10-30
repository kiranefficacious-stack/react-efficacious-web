import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import { 
  MessageSquare, Users, Settings, Search, Trash2, Edit2, 
  Plus, Check, X, Send, Bot, User, Clock, Share2, RefreshCw
} from 'lucide-react';

const ChatManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'qa'>('live');
  
  // -- LIVE CHAT STATE --
  const [sessions, setSessions] = useState<any[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(
      new URLSearchParams(window.location.search).get('session')
  );
  const [messages, setMessages] = useState<any[]>([]);
  const [replyText, setReplyText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // -- Q&A KB STATE --
  const [qaList, setQaList] = useState<any[]>([]);
  const [editingQaId, setEditingQaId] = useState<string | null>(null);
  const [newQa, setNewQa] = useState({ questionKeywords: '', answerText: '' });
  const [isAddingQa, setIsAddingQa] = useState(false);

  // Sound Notification setup
  const playNotificationSound = () => {
    try {
        const audio = new Audio('/notification.mp3'); 
        audio.play().catch(e => {
          if (import.meta.env.DEV) console.log('Audio disabled by browser policy', e);
        });
    } catch (e) {}
  };
  const prevSessionsLengthRef = useRef(0);

  // -- SYSTEM SETTINGS --
  const [isLiveSupportActive, setIsLiveSupportActive] = useState(true);
  const [confirmClear, setConfirmClear] = useState(false);
  const [shareCopiedId, setShareCopiedId] = useState<string | null>(null);

  // Fetch Settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await api.getChatSettings();
        if (settings && typeof settings.isLiveSupportActive === 'boolean') {
          setIsLiveSupportActive(settings.isLiveSupportActive);
        }
      } catch (err) {
        console.error('Failed to load chat settings:', err);
      }
    };
    fetchSettings();
  }, []);

  const toggleLiveSupport = async () => {
    const nextVal = !isLiveSupportActive;
    setIsLiveSupportActive(nextVal);
    try {
      await api.saveChatSettings({ isLiveSupportActive: nextVal });
    } catch (err) {
      console.error('Failed to update live support setting:', err);
    }
  };

  // 1. Fetch Chat Sessions (with polling for live chats)
  const fetchSessions = async () => {
    try {
      const data = await api.getChatSessions();
      const active = (data || []).filter((d: any) => d.status !== 'deleted');
      setSessions(active);

      // Notification logic
      if (active.length > prevSessionsLengthRef.current && prevSessionsLengthRef.current > 0) {
        playNotificationSound();
      }
      prevSessionsLengthRef.current = active.length;
    } catch (err) {
      console.error('Failed to fetch chat sessions:', err);
    }
  };

  useEffect(() => {
    if (activeTab !== 'live') return;
    fetchSessions();
    const interval = setInterval(fetchSessions, 4000);
    return () => clearInterval(interval);
  }, [activeTab]);

  // 2. Fetch Active Session Messages (with polling)
  const fetchActiveMessages = async () => {
    if (!activeSessionId) return;
    try {
      const session = await api.getChatSession(activeSessionId);
      if (session) {
        let msgs: any[] = [];
        if (session.messagesJson) {
          try {
            msgs = typeof session.messagesJson === 'string' ? JSON.parse(session.messagesJson) : session.messagesJson;
          } catch {}
        }
        setMessages(Array.isArray(msgs) ? msgs : []);
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

        // Mark as read for admin if needed
        if (session.unreadAdmin > 0) {
          api.updateChatSession(activeSessionId, { unreadAdmin: 0 }).catch(() => {});
        }
      }
    } catch (err) {
      console.error('Failed to fetch session messages:', err);
    }
  };

  useEffect(() => {
    if (!activeSessionId) return;
    fetchActiveMessages();
    const interval = setInterval(fetchActiveMessages, 3000);
    return () => clearInterval(interval);
  }, [activeSessionId]);

  // 3. Fetch Q&A Knowledge Base
  const fetchQa = async () => {
    try {
      const list = await api.getQaList();
      setQaList(list || []);
    } catch (err) {
      console.error('Failed to fetch QA list:', err);
    }
  };

  useEffect(() => {
    if (activeTab === 'qa') {
      fetchQa();
    }
  }, [activeTab]);

  const handleSendReply = async () => {
    if (!replyText.trim() || !activeSessionId) return;

    const currentText = replyText;
    setReplyText('');

    try {
      await api.sendChatMessage(activeSessionId, {
        text: currentText,
        sender: 'admin'
      });
      await fetchActiveMessages();
      await fetchSessions();
    } catch (err) {
      console.error('Failed to send reply:', err);
      setReplyText(currentText);
    }
  };

  const resolveChat = async (id: string) => {
    try {
      await api.updateChatSession(id, { status: 'resolved' });
      await fetchSessions();
    } catch (err) {
      console.error('Failed to resolve chat:', err);
    }
  };

  const clearAllChats = async () => {
    if (!confirmClear) {
       setConfirmClear(true);
       setTimeout(() => setConfirmClear(false), 4000); // Wait 4 seconds for confirmation
       return;
    }
    
    setConfirmClear(false);

    try {
      await api.clearInactiveSessions();
      if (sessions.find(s => s.id === activeSessionId)?.status === 'resolved') {
        setActiveSessionId(null);
      }
      await fetchSessions();
    } catch (error: any) {
      console.error("Error clearing inactive chats:", error);
      alert("Failed to clear inactive chats: " + (error.message || 'Error'));
    }
  };

  const toggleSessionBotActive = async (id: string, currentlyAdminJoined: boolean | undefined) => {
    try {
      await api.updateChatSession(id, {
        adminJoined: !currentlyAdminJoined 
      });
      await fetchSessions();
    } catch (err) {
      console.error('Failed to toggle bot status:', err);
    }
  };

  const shareChatLink = (id: string) => {
    const url = `${window.location.origin}/#/direct-chat/${id}`;
    navigator.clipboard.writeText(url).then(() => {
        setShareCopiedId(id);
        setTimeout(() => setShareCopiedId(null), 3000);
    }).catch(err => {
        console.error('Failed to copy link: ', err);
    });
  };

  const hardDeleteSingleChat = async (id: string) => {
    if (window.confirm("Permanently delete this user's history?")) {
      try {
        await api.deleteChatSession(id);
        if (activeSessionId === id) setActiveSessionId(null);
        await fetchSessions();
      } catch (err: any) {
        alert("Failed to delete chat: " + (err.message || 'Error'));
      }
    }
  };

  // -- Q&A Functions --
  const saveNewQa = async () => {
    if (!newQa.questionKeywords.trim() || !newQa.answerText.trim()) return;
    
    try {
      if (editingQaId) {
        await api.updateQa(editingQaId, newQa);
        setQaList(qaList.map(q => q.id === editingQaId ? { ...q, ...newQa } : q));
        setEditingQaId(null);
      } else {
        const created = await api.createQa(newQa);
        setQaList([created, ...qaList]);
      }
      setNewQa({ questionKeywords: '', answerText: '' });
      setIsAddingQa(false);
    } catch (err: any) {
      alert("Failed to save Q&A rule: " + (err.message || 'Error'));
    }
  };

  const startEditingQa = (qa: any) => {
    setEditingQaId(qa.id);
    setNewQa({ questionKeywords: qa.questionKeywords, answerText: qa.answerText });
    setIsAddingQa(true);
  };

  const deleteQa = async (id: string) => {
    if (window.confirm("Delete this Q&A pair?")) {
      try {
        await api.deleteQa(id);
        setQaList(qaList.filter(q => q.id !== id));
      } catch (err: any) {
        alert("Failed to delete Q&A rule: " + (err.message || 'Error'));
      }
    }
  };

  const formatTimestamp = (ts: any) => {
    if (!ts) return '';
    try {
      if (typeof ts === 'string') return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      if (ts.toDate) return new Date(ts.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      if (ts.seconds) return new Date(ts.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  const activeSession = sessions.find(s => s.id === activeSessionId);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 h-[calc(100vh-8rem)] flex flex-col overflow-hidden">
      
      {/* Header Tabs & Settings */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 justify-between items-center pr-6">
        <div className="flex w-2/3">
            <button
              onClick={() => setActiveTab('live')}
              className={`flex-1 py-4 px-6 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'live' 
                ? 'border-b-2 border-brand-600 text-brand-600 bg-brand-50/50 dark:bg-brand-900/10' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <MessageSquare size={18} /> Live Visitor Chats
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`flex-1 py-4 px-6 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'qa' 
                ? 'border-b-2 border-brand-600 text-brand-600 bg-brand-50/50 dark:bg-brand-900/10' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Bot size={18} /> Chatbot Q&A Knowledge Base
            </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live Support:</span>
          <button 
             onClick={toggleLiveSupport}
             className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isLiveSupportActive ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
          >
             <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isLiveSupportActive ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          <span className={`text-xs font-bold ${isLiveSupportActive ? 'text-emerald-600' : 'text-slate-400'}`}>
             {isLiveSupportActive ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {activeTab === 'live' && (
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-1/3 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50 dark:bg-slate-900/50">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-200 flex items-center justify-between bg-white dark:bg-slate-900 border-r">
              <div className="flex items-center gap-2">
                 <span>Active Sessions</span>
                 <span className="text-xs bg-brand-100 text-brand-600 px-2 py-0.5 rounded-full">{sessions.filter(s => s.status !== 'resolved').length} Open</span>
              </div>
              {sessions.filter(s => s.status === 'resolved').length > 0 && (
                 <button 
                   onClick={clearAllChats} 
                   className={`text-[10px] px-2.5 py-1 rounded-md transition-all uppercase tracking-wider font-bold border ${
                       confirmClear 
                       ? 'bg-red-600 text-white border-red-700 animate-pulse' 
                       : 'bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 border-red-100'
                   }`}
                 >
                   {confirmClear ? '- SURE? CLICK AGAIN -' : 'Clear Inactive'}
                 </button>
              )}
            </div>
            <div className="flex-1 overflow-y-auto">
              {sessions.map(session => (
                <div 
                  key={session.id}
                  onClick={() => setActiveSessionId(session.id)}
                  className={`p-4 border-b border-slate-100 dark:border-slate-800 cursor-pointer transition-colors ${
                    activeSessionId === session.id 
                    ? 'bg-brand-50 dark:bg-brand-900/20' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex flex-col gap-1 items-start mb-1">
                    <div className="flex justify-between items-center w-full">
                      <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                        {session.customerName || session.userName || 'Visitor'}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {formatTimestamp(session.lastMessageTime)}
                      </span>
                    </div>
                    {session.status === 'resolved' && (
                       <div className="flex items-center gap-2">
                           <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[9px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">Resolved</span>
                           <button 
                             onClick={(e) => { e.stopPropagation(); hardDeleteSingleChat(session.id); }}
                             className="text-slate-400 hover:text-red-500 transition-colors p-1"
                             title="Permanently Delete"
                           >
                             <Trash2 size={12} />
                           </button>
                       </div>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 truncate mb-1">
                    {session.mobile || session.email || session.userContact || 'No contact provided'}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-slate-500 truncate w-3/4 opacity-80 italic">
                      {typeof session.lastMessage === 'string' ? session.lastMessage : JSON.stringify(session.lastMessage || '')}
                    </span>
                    {session.unreadAdmin > 0 && (
                      <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full z-10 animate-bounce">
                        {session.unreadAdmin}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {sessions.length === 0 && (
                <div className="p-8 text-center text-slate-400 text-sm">No chat sessions found.</div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="w-2/3 flex flex-col bg-white dark:bg-slate-900">
            {activeSessionId ? (
              <>
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center shadow-sm z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600">
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white leading-tight">
                        {activeSession?.customerName || activeSession?.userName || 'Visitor'}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {activeSession?.mobile || activeSession?.email || activeSession?.userContact || 'Visitor'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end mr-2 border-r border-slate-200 dark:border-slate-800 pr-4">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{activeSession?.customerName || 'Visitor'}'s AI Assistant</span>
                        <div className="flex items-center gap-2">
                           <span className={`text-[10px] font-bold ${!activeSession?.adminJoined ? 'text-brand-600' : 'text-slate-400'}`}>
                             {!activeSession?.adminJoined ? 'ACTIVE' : 'PAUSED'}
                           </span>
                           <button 
                             onClick={() => toggleSessionBotActive(activeSessionId, activeSession?.adminJoined)}
                             className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${!activeSession?.adminJoined ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                             title="Toggle AI Bot for this user"
                           >
                             <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${!activeSession?.adminJoined ? 'translate-x-5' : 'translate-x-1'}`} />
                           </button>
                        </div>
                    </div>
                    {activeSession?.status !== 'resolved' && (
                      <>
                        <button 
                          onClick={() => shareChatLink(activeSessionId)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all flex items-center gap-1 border ${
                              shareCopiedId === activeSessionId
                              ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                              : 'text-brand-600 dark:text-brand-400 bg-brand-50 hover:bg-brand-100 dark:bg-brand-900/30 dark:hover:bg-brand-900/50 border-brand-200 dark:border-brand-800'
                          }`}
                        >
                          {shareCopiedId === activeSessionId ? <Check size={14} /> : <Share2 size={14} />}
                          {shareCopiedId === activeSessionId ? 'Copied!' : 'Share'}
                        </button>
                        <button 
                          onClick={() => resolveChat(activeSessionId)}
                          className="text-xs font-semibold text-white bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 shadow-sm"
                        >
                          <Check size={14} /> Resolve
                        </button>
                      </>
                    )}
                    {activeSession?.status === 'resolved' && (
                      <span className="text-xs font-bold text-slate-500 bg-slate-200 dark:bg-slate-800 px-3 py-1.5 rounded-full flex items-center gap-1 border border-slate-300 dark:border-slate-700 shadow-inner">
                        <Check size={14} /> Resolved
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-900/20">
                  {messages.map(msg => (
                    <div key={msg.id} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[70%] p-3 rounded-2xl ${
                        msg.sender === 'user' 
                          ? 'bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 rounded-tl-none text-slate-800 dark:text-slate-200' 
                          : msg.sender === 'bot' 
                            ? 'bg-slate-200 dark:bg-slate-700 rounded-tr-none text-slate-800 dark:text-slate-200 opacity-80'
                            : 'bg-brand-600 text-white rounded-tr-none shadow-md shadow-brand-500/20'
                      }`}>
                         <p className="text-sm">{typeof msg.text === 'string' ? msg.text : JSON.stringify(msg.text)}</p>
                         <div className={`text-[9px] mt-1 text-right ${msg.sender === 'admin' ? 'text-brand-200' : 'text-slate-400'}`}>
                           {msg.sender === 'bot' && <span className="mr-1 inline-block">🤖 Bot</span>}
                           {formatTimestamp(msg.timestamp)}
                         </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSendReply()}
                      placeholder="Type a message to reply..."
                      disabled={activeSession?.status === 'resolved'}
                      className="flex-1 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 text-sm disabled:opacity-50"
                    />
                    <button 
                      onClick={handleSendReply}
                      disabled={!replyText.trim()}
                      className="p-3 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 text-white rounded-xl transition-all"
                    >
                      <Send size={18} className="translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center">
                <MessageSquare size={48} className="mb-4 opacity-20" />
                <p>Select an active session from the sidebar to view the conversation and reply instantly.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'qa' && (
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50 dark:bg-slate-900/50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Knowledge Base Configuration</h2>
              <p className="text-sm text-slate-500">Add keywords and the automated responses the bot will use.</p>
            </div>
            <button 
              onClick={() => { setIsAddingQa(true); setEditingQaId(null); setNewQa({ questionKeywords: '', answerText: '' }); }}
              className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-brand-500/30 hover:bg-brand-500 transition-colors"
            >
              <Plus size={16} /> Add Q&A Rule
            </button>
          </div>

          {isAddingQa && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-brand-200 dark:border-brand-800/50 mb-6">
              <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                 <Bot size={18} className="text-brand-500"/> 
                 {editingQaId ? 'Edit Knowledge Base Entry' : 'New Knowledge Base Entry'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Trigger Keywords (comma separated)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. pricing, cost, fees, charges"
                    value={newQa.questionKeywords}
                    onChange={e => setNewQa({ ...newQa, questionKeywords: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-brand-500 text-sm"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">The bot will reply with the answer below if the user's message contains ANY of these keywords.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Bot Answer</label>
                  <textarea 
                    placeholder="Type the response here..."
                    rows={4}
                    value={newQa.answerText}
                    onChange={e => setNewQa({ ...newQa, answerText: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-brand-500 text-sm resize-none"
                  />
                </div>
                <div className="flex gap-3 justify-end mt-4">
                  <button onClick={() => { setIsAddingQa(false); setEditingQaId(null); setNewQa({ questionKeywords: '', answerText: '' }); }} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl">Cancel</button>
                  <button onClick={saveNewQa} className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold rounded-xl shadow-md">
                     {editingQaId ? 'Update Rule' : 'Save Rule'}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {qaList.map(qa => (
              <div key={qa.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-6 justify-between items-start">
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-[10px] font-bold text-brand-600 bg-brand-50 border border-brand-100 px-2 py-0.5 rounded uppercase tracking-wider">Keywords</span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      "{qa.questionKeywords}"
                    </span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded uppercase tracking-wider shrink-0 mt-0.5">Answer</span>
                    <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{qa.answerText}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button 
                    onClick={() => startEditingQa(qa)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"
                    title="Edit Rule"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => deleteQa(qa.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    title="Delete Rule"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {qaList.length === 0 && !isAddingQa && (
               <div className="text-center p-10 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 border-dashed">
                  <Bot size={40} className="mx-auto mb-3 text-slate-300" />
                  <p className="text-slate-500 text-sm">No Q&A rules found. Add some knowledge to make the bot smarter!</p>
               </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ChatManager;
