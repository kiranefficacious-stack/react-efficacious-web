import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { 
  Send, User, Clock, Check, Headphones, Bot, MessageSquare, ArrowLeft, X 
} from 'lucide-react';

const DirectChat: React.FC = () => {
    const { sessionId } = useParams<{ sessionId: string }>();
    const navigate = useNavigate();
    const [session, setSession] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [replyText, setReplyText] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchSession = async () => {
        if (!sessionId) return;
        try {
            const data = await api.getChatSession(sessionId);
            if (data) {
                setSession(data);
                if (data.messagesJson) {
                    try {
                        const parsed = JSON.parse(data.messagesJson);
                        if (Array.isArray(parsed)) setMessages(parsed);
                    } catch {}
                }
            } else {
                setSession(null);
            }
        } catch {
            setSession(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSession();
        const timer = setInterval(fetchSession, 3000);
        return () => clearInterval(timer);
    }, [sessionId]);

    const handleSendReply = async () => {
        if (!replyText.trim() || !sessionId) return;

        const text = replyText;
        setReplyText('');

        const newMsg = {
            id: Date.now(),
            text: text,
            sender: 'admin',
            timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, newMsg]);

        try {
            await api.sendChatMessage(sessionId, { text, sender: 'admin' });
        } catch (e) {
            console.error("Failed to send reply:", e);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="flex flex-col items-center gap-4 text-slate-500">
                    <div className="w-12 h-12 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-bold text-sm tracking-widest uppercase">Initializing Secure Chat...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 max-w-md w-full">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/10 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <X size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Session Not Found</h2>
                    <p className="text-slate-500 text-sm mb-6">This chat session may have been deleted or the link is invalid.</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="w-full py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={18} /> Return to Homepage
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950">
            {/* Header */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 px-6 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/20 text-brand-600 flex items-center justify-center font-bold">
                        {session.customerName ? session.customerName.charAt(0).toUpperCase() : 'V'}
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-900 dark:text-white text-base">
                            {session.customerName || 'Anonymous Visitor'}
                        </h2>
                        <p className="text-xs text-slate-500 flex items-center gap-2">
                            <span>ID: #{session.id.slice(-6)}</span>
                            {session.email && <span>• {session.email}</span>}
                            {session.mobile && <span>• {session.mobile}</span>}
                        </p>
                    </div>
                </div>
                <button 
                    onClick={() => navigate('/')}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, index) => {
                    const isAdmin = msg.sender === 'admin';
                    const isBot = msg.sender === 'bot';

                    return (
                        <div key={msg.id || index} className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}>
                            <div className="flex items-center gap-1.5 mb-1 px-1">
                                <span className="text-[11px] font-bold text-slate-400">
                                    {isAdmin ? 'Efficacious Support' : (isBot ? 'Automated Bot' : session.customerName || 'Customer')}
                                </span>
                            </div>
                            <div className={`p-4 rounded-2xl max-w-lg text-sm leading-relaxed shadow-sm ${
                                isAdmin 
                                    ? 'bg-brand-600 text-white rounded-tr-none' 
                                    : isBot
                                        ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-900/40 rounded-tl-none'
                                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Reply Footer */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 max-w-5xl mx-auto">
                    <input 
                        type="text" 
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                        placeholder="Type reply as Efficacious Support..."
                        className="flex-1 bg-slate-100 dark:bg-slate-800 border-0 rounded-2xl p-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <button 
                        onClick={handleSendReply}
                        disabled={!replyText.trim()}
                        className="bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white p-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DirectChat;
