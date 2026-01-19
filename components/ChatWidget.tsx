
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Paperclip, Bot, User, Sparkles, Smile } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 Welcome to Efficacious. How can we assist you with our ERP solutions today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot reply
    setTimeout(() => {
      setIsTyping(false);
      const botResponses = [
        "That's a great question! Our team specializes in that.",
        "Could you provide more details so I can help you better?",
        "We offer a comprehensive suite of ERP modules tailored for that need.",
        "Let me connect you with a sales representative for a detailed demo.",
        "You can check our Products page for more in-depth features."
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const newBotMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newBotMessage]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Only show on Home Page
  if (location.pathname !== '/') {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-[380px] max-w-[calc(100vw-3rem)] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[600px] shadow-brand-500/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-600 to-brand-700 p-4 flex items-center gap-3 relative overflow-hidden">
              {/* Animated Background Decor */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full border border-white/20 border-dashed"
              />
              
              <div className="relative z-10">
                <motion.div 
                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm shadow-inner border border-white/20"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                >
                   <Bot size={28} />
                </motion.div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-brand-600 animate-pulse"></div>
              </div>
              <div className="relative z-10">
                <h3 className="text-white font-bold text-base tracking-wide flex items-center gap-2">
                    Efficacious Bot <Sparkles size={14} className="text-yellow-300" />
                </h3>
                <p className="text-brand-100 text-xs font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" /> 
                    Online • Replies instantly
                </p>
              </div>
              
              {/* Close Button Mobile Friendly */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white md:hidden"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="h-[380px] p-4 overflow-y-auto bg-slate-50 dark:bg-slate-900/50 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
               <div className="flex justify-center mb-2">
                  <span className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full uppercase font-bold tracking-wider shadow-sm">Today</span>
               </div>

               {messages.map((msg) => (
                   <motion.div 
                     key={msg.id} 
                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                   >
                       {msg.sender === 'bot' && (
                           <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center text-brand-600 dark:text-brand-400 mr-2 border border-brand-200 dark:border-brand-800 shrink-0 shadow-sm">
                               <Bot size={16} />
                           </div>
                       )}
                       
                       <div className={`max-w-[80%] p-3.5 rounded-2xl shadow-sm border ${
                           msg.sender === 'user' 
                           ? 'bg-brand-600 text-white rounded-tr-none border-brand-500' 
                           : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border-slate-100 dark:border-slate-700'
                       }`}>
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                          <span className={`text-[10px] mt-1.5 block text-right opacity-70`}>
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                       </div>

                       {msg.sender === 'user' && (
                           <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 ml-2 border border-slate-300 dark:border-slate-600 shrink-0">
                               <User size={16} />
                           </div>
                       )}
                   </motion.div>
               ))}

               {isTyping && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="flex justify-start"
                   >
                       <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center text-brand-600 dark:text-brand-400 mr-2 border border-brand-200 dark:border-brand-800 shrink-0">
                           <Bot size={16} />
                       </div>
                       <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-700">
                           <div className="flex gap-1.5">
                               <motion.div 
                                 className="w-2 h-2 bg-brand-500 rounded-full"
                                 animate={{ y: [0, -6, 0] }}
                                 transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                               />
                               <motion.div 
                                 className="w-2 h-2 bg-brand-500 rounded-full"
                                 animate={{ y: [0, -6, 0] }}
                                 transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                               />
                               <motion.div 
                                 className="w-2 h-2 bg-brand-500 rounded-full"
                                 animate={{ y: [0, -6, 0] }}
                                 transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                               />
                           </div>
                       </div>
                   </motion.div>
               )}
               <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
               <div className="flex items-end gap-2 bg-slate-50 dark:bg-slate-900 rounded-3xl p-1.5 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500 transition-all shadow-inner">
                   <button className="p-2.5 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors rounded-full hover:bg-white dark:hover:bg-slate-800">
                      <Paperclip size={18} />
                   </button>
                   <textarea
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     onKeyDown={(e) => {
                       if (e.key === 'Enter' && !e.shiftKey) {
                         e.preventDefault();
                         handleSend();
                       }
                     }}
                     placeholder="Type a message..." 
                     rows={1}
                     className="flex-1 bg-transparent text-slate-900 dark:text-white text-sm px-2 py-2.5 focus:outline-none placeholder:text-slate-400 resize-none max-h-24 scrollbar-hide"
                   />
                   <button className="p-2.5 text-slate-400 hover:text-yellow-500 transition-colors rounded-full hover:bg-white dark:hover:bg-slate-800 hidden sm:block">
                      <Smile size={18} />
                   </button>
                   <motion.button 
                      onClick={handleSend}
                      disabled={!inputValue.trim()}
                      className={`p-2.5 rounded-full transition-all shadow-md flex items-center justify-center ${
                          inputValue.trim() 
                          ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-brand-500/30' 
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                      }`}
                      whileHover={inputValue.trim() ? { scale: 1.1 } : {}}
                      whileTap={inputValue.trim() ? { scale: 0.9 } : {}}
                   >
                      <Send size={18} className={inputValue.trim() ? "fill-white/20 translate-x-0.5" : "translate-x-0.5"} />
                   </motion.button>
               </div>
               <div className="text-center mt-2">
                   <span className="text-[9px] text-slate-400 flex items-center justify-center gap-1 opacity-70">
                       Powered by <span className="font-bold text-brand-600 dark:text-brand-400">Efficacious AI</span>
                   </span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-brand-500 to-brand-600 text-white rounded-full shadow-[0_8px_30px_rgba(14,165,233,0.4)] hover:shadow-[0_8px_40px_rgba(14,165,233,0.6)] transition-all duration-300 z-50 border-2 border-white/20 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle Chat"
        >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />

            <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <X size={28} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="chat"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                    >
                        <MessageCircle size={28} className="fill-white/20" />
                        {/* Status Dot with Ripple */}
                        <div className="absolute top-0 right-0">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-brand-600"></span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Outer Ripple Effect (Decorative - Pointer Events None) */}
            {!isOpen && (
                <>
                    <motion.span 
                        className="absolute inset-0 rounded-full border border-white/40 pointer-events-none"
                        animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.span 
                        className="absolute inset-0 rounded-full border border-white/20 pointer-events-none"
                        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                    />
                </>
            )}
        </motion.button>

        {/* Notification Badge - Placed outside the overflow-hidden button */}
        {!isOpen && (
            <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-[3px] border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold text-white shadow-md z-[60] pointer-events-none"
            >
                1
            </motion.span>
        )}
      </div>
    </div>
  );
};

export default ChatWidget;
