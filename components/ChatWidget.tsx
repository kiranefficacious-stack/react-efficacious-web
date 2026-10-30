import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, Headphones } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { api } from '../services/api';
import { useContent } from '../hooks/useContent';

interface Message {
  id: string | number;
  text: string;
  sender: 'user' | 'bot' | 'admin';
  timestamp?: any;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // -- Chat Phases --
  const [phase, setPhase] = useState<'idle' | 'bot_only' | 'ask_name' | 'ask_contact' | 'live_support'>('idle');
  const [userDetails, setUserDetails] = useState({ name: '', contact: '' });
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLiveSupportActive, setIsLiveSupportActive] = useState(true);
  const [sessionAdminJoined, setSessionAdminJoined] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // -- Data Context --
  const { data: siteData } = useContent(); 
  const [qaDb, setQaDb] = useState<any[]>([]);

  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen, phase]);

  // Initial Boot Sequence
  useEffect(() => {
    if (phase === 'idle' && isOpen) {
        setMessages([{
            id: 'bot_init_1',
            text: "Hello! 👋 Welcome to Efficacious. How can I help you today? You can ask me about our services, products, or company.",
            sender: 'bot',
            timestamp: new Date()
        }]);
        setPhase('bot_only');
    }
  }, [isOpen, phase]);

  // Poll for updates in live support mode
  useEffect(() => {
    if (!sessionId || phase !== 'live_support') return;
    
    const interval = setInterval(async () => {
      try {
        const session = await api.getChatSession(sessionId);
        if (session?.messagesJson) {
          const parsed = JSON.parse(session.messagesJson);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          }
        }
      } catch {}
    }, 4000);

    return () => clearInterval(interval);
  }, [sessionId, phase]);

  const initiateHumanHandoff = async () => {
      if (sessionId) {
          const botMsg: Message = {
            id: Date.now(),
            text: "I'll connect you to a human agent. May I know your name first?",
            sender: 'bot',
            timestamp: new Date().toISOString()
          };
          setMessages(prev => [...prev, botMsg]);
          api.sendChatMessage(sessionId, { text: botMsg.text, sender: 'bot' }).catch(() => {});
      }
      setPhase('ask_name');
  };

  const generateBotReply = async (userText: string, currentSession: string | null) => {
    if (currentSession && sessionAdminJoined) return;

    const lower = userText.toLowerCase().trim();
    let matchedAnswer = "Thank you for reaching out! A specialist will assist you. Would you like to connect with our live team?";
    let needsHuman = false;

    if (lower.includes('school') || lower.includes('esmart school')) {
      matchedAnswer = "eSmart School is our comprehensive ERP for educational institutions featuring fee management, student tracking, attendance, and exam grading.";
    } else if (lower.includes('health') || lower.includes('hospital')) {
      matchedAnswer = "eSmart Health delivers end-to-end hospital management, patient scheduling, OPD/IPD records, and pharmacy billing.";
    } else if (lower.includes('restaurant') || lower.includes('pos')) {
      matchedAnswer = "eSmart Restaurant POS supports cloud and offline billing, inventory control, and multi-outlet kitchen management.";
    } else if (lower.includes('queue') || lower.includes('token')) {
      matchedAnswer = "eSmart Queue optimizes waiting lines and token dispatch for banks, clinics, and customer service counters.";
    } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('support')) {
      matchedAnswer = "You can reach us directly at info@efficacious.co.in or call +91 9820943806. I can also connect you to our live chat right now!";
      needsHuman = true;
    } else {
      needsHuman = true;
    }

    setIsTyping(true);
    setTimeout(async () => {
        setIsTyping(false);
        const botMsg: Message = {
          id: Date.now(),
          text: matchedAnswer,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, botMsg]);

        if (currentSession) {
          api.sendChatMessage(currentSession, { text: matchedAnswer, sender: 'bot' }).catch(() => {});
        }
            
        if (needsHuman && isLiveSupportActive && phase === 'bot_only') {
           setTimeout(() => initiateHumanHandoff(), 1500);
        }
    }, 1200);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');

    let activeSessionId = sessionId;
    if (!activeSessionId) {
        activeSessionId = Date.now().toString();
        setSessionId(activeSessionId);
    }

    const userMsg: Message = {
      id: Date.now(),
      text: userText,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMsg]);

    if (phase === 'ask_name') {
        setUserDetails(prev => ({ ...prev, name: userText }));
        api.sendChatMessage(activeSessionId, { text: userText, sender: 'user', userName: userText }).catch(() => {});
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            const promptMsg: Message = {
              id: Date.now() + 1,
              text: `Nice to meet you, ${userText}! Please share your Email or Mobile Number so our team can reach you.`,
              sender: 'bot',
              timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, promptMsg]);
            api.sendChatMessage(activeSessionId!, { text: promptMsg.text, sender: 'bot' }).catch(() => {});
            setPhase('ask_contact');
        }, 800);
        return;
    }

    if (phase === 'ask_contact') {
        setUserDetails(prev => ({ ...prev, contact: userText }));
        api.sendChatMessage(activeSessionId, { text: userText, sender: 'user', userName: userDetails.name, userEmail: userText }).catch(() => {});
        
        setIsTyping(true);
        setTimeout(() => {
            const introMsg: Message = {
              id: Date.now() + 2,
              text: `Thank you ${userDetails.name}. Your chat has been routed to our team. An agent will respond shortly!`,
              sender: 'bot',
              timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, introMsg]);
            api.sendChatMessage(activeSessionId!, { text: introMsg.text, sender: 'bot' }).catch(() => {});
            setPhase('live_support');
            setIsTyping(false);
        }, 1200);
        return;
    }

    // Normal Bot Processing
    api.sendChatMessage(activeSessionId, { text: userText, sender: 'user' }).catch(() => {});
    if (phase === 'bot_only') {
      generateBotReply(userText, activeSessionId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              className="bg-brand-600 hover:bg-brand-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105"
              aria-label="Open Live Chat"
            >
              <MessageCircle size={28} />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-[90vw] sm:w-[380px] h-[520px] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Efficacious Assistant</h3>
                    <p className="text-xs text-brand-100 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Online • Instant Support
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white p-1 rounded-lg transition-colors"
                  aria-label="Close Chat"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-950">
                {messages.map((msg, i) => (
                  <div
                    key={msg.id || i}
                    className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender !== 'user' && (
                      <div className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs flex-shrink-0">
                        <Bot size={14} />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] p-3 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-brand-600 text-white rounded-br-none'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-end gap-2">
                    <div className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs">
                      <Bot size={14} />
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    phase === 'ask_name' 
                      ? 'Type your name...' 
                      : phase === 'ask_contact' 
                        ? 'Type your email or phone...' 
                        : 'Type your message...'
                  }
                  className="flex-1 bg-slate-100 dark:bg-slate-800 border-0 rounded-full px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white p-2.5 rounded-full transition-colors"
                  aria-label="Send Message"
                >
                  <Send size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ChatWidget;
