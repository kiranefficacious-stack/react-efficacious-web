import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { 
  collection, query, orderBy, onSnapshot, doc, updateDoc, 
  addDoc, serverTimestamp, getDoc 
} from 'firebase/firestore';
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

    useEffect(() => {
        if (!sessionId) return;

        // Fetch Session Data
        const unsubSession = onSnapshot(doc(db, 'chat_sessions', sessionId), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setSession({ id: docSnap.id, ...data });
                
                // --- INSTANT CONNECT ---
                // If the agent opens this link, instantly mark as joined 
                // so the user's widget morphs into "Live Support" immediately.
                if (data.adminJoined !== true) {
                    updateDoc(doc(db, 'chat_sessions', sessionId), { adminJoined: true });
                }
            } else {
                setSession(null);
            }
            setLoading(false);
        });

        // Fetch Messages
        const q = query(
            collection(db, `chat_sessions/${sessionId}/messages`), 
            orderBy('timestamp', 'asc')
        );
        const unsubMsgs = onSnapshot(q, (snap) => {
            setMessages(snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
        });

        return () => {
            unsubSession();
            unsubMsgs();
        };
    }, [sessionId]);

    const handleSendReply = async () => {
        if (!replyText.trim() || !sessionId) return;

        const text = replyText;
        setReplyText('');

        await addDoc(collection(db, `chat_sessions/${sessionId}/messages`), {
            text: text,
            sender: 'admin',
            timestamp: serverTimestamp()
        });

        await updateDoc(doc(db, 'chat_sessions', sessionId), {
            lastMessage: text,
            lastMessageTime: serverTimestamp(),
            unreadUser: 1,
            adminJoined: true // Ensure bot stays silent
        });
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
            <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 shadow-sm z-20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                        <Headphones size={20} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">Agent Support Case</h1>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block"></span> 
                            Chatting with {session.userName}
                        </p>
                    </div>
                </div>
                
                <div className="hidden md:block text-right">
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Visitor Contact</p>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{session.userContact}</p>
                </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-4">
                <div className="max-w-4xl mx-auto w-full flex flex-col flex-1">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex mb-6 ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                            {msg.sender === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 mr-2 mt-1 shrink-0">
                                    <User size={16} />
                                </div>
                            )}
                            <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl shadow-sm border ${
                                msg.sender === 'user' 
                                    ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-tl-none text-slate-800 dark:text-slate-100' 
                                    : msg.sender === 'bot' 
                                        ? 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-tr-none text-slate-600 dark:text-slate-400 italic'
                                        : 'bg-brand-600 border-brand-500 text-white rounded-tr-none shadow-brand-500/20'
                            }`}>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                    {typeof msg.text === 'string' ? msg.text : JSON.stringify(msg.text)}
                                </p>
                                <div className={`text-[9px] mt-2 flex items-center justify-end gap-1 ${msg.sender === 'admin' ? 'text-brand-100' : 'text-slate-400'}`}>
                                    {msg.sender === 'bot' && <span className="font-bold mr-1">🤖 AI Bot</span>}
                                    {msg.sender === 'admin' && <span className="font-bold mr-1">You (Agent)</span>}
                                    {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
                                    {msg.sender === 'admin' && <Check size={10} />}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            {/* Input Footer */}
            <footer className="p-4 md:p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-20">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <div className="flex-1 relative">
                        <input 
                            type="text" 
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                            placeholder={`Reply to ${session.userName}...`}
                            className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-slate-800 dark:text-white transition-all shadow-inner pl-12"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <MessageSquare size={18} />
                        </div>
                    </div>
                    <button 
                        onClick={handleSendReply}
                        disabled={!replyText.trim()}
                        className="p-4 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white rounded-2xl transition-all shadow-lg shadow-brand-500/30 flex items-center justify-center shrink-0"
                    >
                        <Send size={20} className="translate-x-0.5" />
                    </button>
                </div>
                <div className="max-w-4xl mx-auto mt-2 flex justify-between items-center px-1">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                        Efficacious Live Agent Link
                    </p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                        <Clock size={10} /> Real-time Encryption Active
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default DirectChat;
