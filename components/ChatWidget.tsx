import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, Headphones } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { db } from '../lib/firebase';
import { 
  collection, query, orderBy, onSnapshot, doc, getDocs, 
  setDoc, addDoc, serverTimestamp, updateDoc, deleteDoc 
} from 'firebase/firestore';
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
        
        // Setup KB
        getDocs(collection(db, 'chatbot_qa')).then(snap => {
            setQaDb(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }).catch(e => console.log('Could not load QA'));
    }
  }, [isOpen, phase]);

  // Fetch Live Support System config
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'system', 'chatSettings'), (docSnap) => {
       if (docSnap.exists()) {
           setIsLiveSupportActive(docSnap.data().isLiveSupportActive !== false);
       }
    });
    return () => unsub();
  }, []);

  // Fetch Custom Q&A KB Real-Time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'chatbot_qa'), (snap) => {
        setQaDb(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  // Listen to Firestore when active
  useEffect(() => {
    if (!sessionId) return;
    
    // Listen to Messages subcollection
    const q = query(
      collection(db, `chat_sessions/${sessionId}/messages`), 
      orderBy('timestamp', 'asc')
    );
    const unsubMsgs = onSnapshot(q, (snap) => {
      const dbMsgs = snap.docs.map(doc => ({
          id: doc.id,
          text: doc.data().text,
          sender: doc.data().sender,
          timestamp: doc.data().timestamp,
      }));
      if (dbMsgs.length > 0) {
          setMessages(dbMsgs);
      }
    });

    // Listen to Parent Session for Admin Toggle 
    const unsubSession = onSnapshot(doc(db, 'chat_sessions', sessionId), (docSnap) => {
        if (docSnap.exists()) {
             setSessionAdminJoined(docSnap.data().adminJoined === true);
        }
    });

    return () => {
        unsubMsgs();
        unsubSession();
    };
  }, [phase, sessionId]);

  const initiateHumanHandoff = async () => {
      if (sessionId) {
          await addDoc(collection(db, `chat_sessions/${sessionId}/messages`), {
              text: "I'll connect you to a human agent. May I know your name first?",
              sender: 'bot',
              timestamp: serverTimestamp()
          });
      }
      setPhase('ask_name');
  };

  const generateBotReply = async (userText: string, currentSession: string | null) => {
    // 1. Silent Bot Rule: If the Admin's toggle has disabled the bot in this session, stay quiet!
    if (currentSession && sessionAdminJoined) {
        return; 
    }

    const text = userText.toLowerCase();
    
    // 1. Check Custom Q&A KB
    let matchedAnswer: string | null | React.ReactNode = null;
    let needsHuman = false;

    // First attempt EXACT custom rule match
    for (const qa of qaDb) {
        const keywords = qa.questionKeywords.toLowerCase().split(',').map((k:string) => k.trim()).filter(Boolean);
        // Uses regex word boundaries so that partial words (like 'hi' inside 'this') don't falsely trigger
        if (keywords.some((k:string) => new RegExp(`\\b${k}\\b`, 'i').test(text))) {
            matchedAnswer = qa.answerText;
            break;
        }
    }

    // 2. Fallbacks based on static site content (useContent)
    if (!matchedAnswer) {
        // A. Full Website Explanation
        if ((text.includes('explain') || text.includes('tell me about') || text.includes('what is')) && (text.includes('website') || text.includes('efficacious') || text.includes('all') || text.includes('everything') || text.includes('what do you do'))) {
            matchedAnswer = "Efficacious India Limited is a pioneering IT solutions company! We specialize in custom Web & Mobile App Development, UI/UX Design, and building powerful ERP products like eSmart School, eSmart Health, and eSmart Restaurant. Our mission is to deliver innovative digital transformation for education, healthcare, and retail businesses worldwide.";
        }
        
        // B. Deep Match Specific Services
        else if (siteData?.services?.some((s:any) => text.includes(s.title.toLowerCase()))) {
            const svc = siteData.services.find((s:any) => text.includes(s.title.toLowerCase()));
            if (svc) {
                matchedAnswer = `Absolutely! Our ${svc.title} service is designed to ${svc.description.toLowerCase()} We typically provide: ${svc.deliverables?.join(', ')}. Would you like more specific details on how we can implement this for you?`;
            }
        }

        // C. Deep Match Specific Products
        else if (siteData?.products?.some((p:any) => text.includes(p.title.toLowerCase()) || text.includes(p.title.toLowerCase().replace('esmart', '').trim()))) {
            const prod = siteData.products.find((p:any) => text.includes(p.title.toLowerCase()) || (p.title.toLowerCase().includes('esmart') && text.includes(p.title.toLowerCase().replace('esmart', '').trim())));
            if (prod) {
                const featureList = prod.features?.map((f:any) => f.title).join(', ');
                const moduleList = prod.modules?.map((m:any) => m.title).join(', ');
                matchedAnswer = `${prod.title} is one of our flagship solutions! ${prod.description} \n\nKey features include: ${featureList}. \n\nIt consists of modules like: ${moduleList}. \n\nWe've seen great results with this, including ${prod.stats?.[0]?.label}: ${prod.stats?.[0]?.value}. Would you like to see a demo?`;
            }
        }

        // D. Deep Match Specific Portfolio/Projects
        else if (siteData?.portfolio?.some((p:any) => text.includes(p.title.toLowerCase()) || text.includes(p.title.toLowerCase().split(' ')[0]))) {
            const proj = siteData.portfolio.find((p:any) => text.includes(p.title.toLowerCase()) || text.includes(p.title.toLowerCase().split(' ')[0]));
            if (proj) {
                matchedAnswer = `We're very proud of the ${proj.title} project! It was a ${proj.category} implementation where ${proj.description.toLowerCase()} Key results: ${proj.stats?.join(' | ')}. Are you looking for a similar solution?`;
            }
        }

        // E. General Categorical Lists
        else if (text.includes('service')) {
            const services = siteData?.services?.map((s:any) => s.title).join(', ') || 'Software Development, Web Design, and Mobile Apps';
            matchedAnswer = `We specialize in several key areas, primarily: ${services}. We love taking on challenging projects! Are you looking to build something specific?`;
        } else if (text.includes('product') || text.includes('project')) {
            const products = siteData?.products?.map((p:any) => p.title).join(', ') || 'eSmart School, eSmart Health, eSmart Restaurant, emart Queue';
            matchedAnswer = `We've developed some powerful industry-specific products and projects like ${products}. You can find download links and feature lists on our Products page. Are you interested in an ERP solution?`;
        } else if (text.includes('ceo') || text.includes('founder') || text.includes('director') || text.includes('owner') || text.includes('kamal')) {
            const founder = siteData?.team?.find((m:any) => m.role.toLowerCase().includes('founder') || m.role.toLowerCase().includes('ceo'));
            if (founder) {
                matchedAnswer = `Our Founder & CEO is ${founder.name}. ${founder.description} Is there anything specific you’d like to know about our team's background?`;
            } else {
                matchedAnswer = "Efficacious India Limited was founded by Kamal Agrawal. He's a visionary leader with a huge passion for innovative IT solutions. Can I help you with anything else about our leadership?";
            }
        } else if (text.includes('team') || text.includes('employee') || text.includes('developer')) {
            matchedAnswer = `Our fantastic team is made up of expert Developers (handling Flutter, .NET, iOS/Android), creative UI/UX specialists, and dedicated project managers. We work together to ensure smooth digital transformations for our clients! What kind of technical expertise are you looking for?`;
        } else if (text.includes('about') || text.includes('company') || text.includes('who are you')) {
            const miss = typeof siteData?.about?.mission?.content === 'string' ? siteData?.about?.mission?.content : "We are Efficacious India Limited.";
            matchedAnswer = `${miss} We'd love to learn more about you! How did you hear about us?`;
        } else if (text.includes('contact') || text.includes('phone') || text.includes('email') || text.includes('call')) {
            matchedAnswer = `We'd love to chat more! You can reach us via email at ${siteData?.contact?.email || 'info@efficacious.co.in'} or give us a call at ${siteData?.contact?.phone || '+91 8454943806'}. Also, I can connect you to someone right here if you'd like?`;
        } else if (text.includes('location') || text.includes('address') || text.includes('where') || text.includes('office') || text.includes('visit')) {
            matchedAnswer = `Our main office is located at ${siteData?.contact?.office || 'Sushma Niwas Plot no 7, Road no 6 Sector 1, New Panvel, Navi Mumbai 410206'}. Let us know if you plan to stop by!`;
        } else if (text.includes('job') || text.includes('hiring') || text.includes('career') || text.includes('vacancy')) {
            matchedAnswer = "That's exciting! We are always looking for passionate IT professionals to join the Efficacious family. You can find our current job openings on the Careers page. What kind of role are you mostly interested in?";
        } else if (text.includes('partner') || text.includes('reseller') || text.includes('franchise')) {
            const partnerCount = siteData?.partners?.items?.length || 'multiple';
            matchedAnswer = `We're proud to work with ${partnerCount} trusted channel partners across India. We're always open to expanding our network. Would you like me to connect you with our partnership team?`;
        } else if (text.includes('news') || text.includes('update') || text.includes('event')) {
            const latestNews = siteData?.news?.[0]?.title || 'innovations';
            matchedAnswer = `Recently, we've been very excited about "${latestNews}"! You can read all the details in our News & Events section.`;
        } else if (text.includes('portfolio') || text.includes('client') || text.includes('project') || text.includes('case study')) {
            const client = siteData?.portfolio?.[0]?.title || 'top educational institutions';
            matchedAnswer = `We've had the pleasure of delivering solutions like the ${client}. Our Portfolio highlights our end-to-end capabilities beautifully. Are you looking to start a new project?`;
        } else if (text.includes('blog') || text.includes('article') || text.includes('newsletter')) {
            matchedAnswer = "Our tech leaders love sharing their knowledge! They frequently write blogs covering EdTech AI, Cybersecurity, and Software Architecture. You should definitely check out our Blogs page. Do you have a favorite topic?";
        } else if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
            matchedAnswer = "Hi there! 👋 It's great to meet you. How is your day going? How can I help you today?";
        } else if (text.includes('thank')) {
            matchedAnswer = "You're very welcome! 😊 Feel free to ask if you need anything else, or I can connect you to a live human agent!";
        } else {
            needsHuman = true;
            if (currentSession) {
                matchedAnswer = "Our human agent has been notified and will jump into this chat with you shortly! Thank you for your patience.";
            } else {
                if (isLiveSupportActive) {
                    matchedAnswer = "Hmm, I'm actually not totally sure about that one! Would you like me to connect you to a human agent so they can assist you better?";
                } else {
                    matchedAnswer = "Hmm, I'm actually not totally sure about that one! Our live agents are currently offline, but please feel free to explore our website for more information!";
                }
            }
        }
    }

    // Delay bot response slightly
    setIsTyping(true);
    setTimeout(async () => {
        setIsTyping(false);
        
        if (currentSession) {
            await addDoc(collection(db, `chat_sessions/${currentSession}/messages`), {
                text: matchedAnswer,
                sender: 'bot',
                timestamp: serverTimestamp()
            });
            await updateDoc(doc(db, 'chat_sessions', currentSession), {
                lastMessage: matchedAnswer,
                lastMessageTime: serverTimestamp()
            });
        }
            
        if (needsHuman && isLiveSupportActive && phase === 'bot_only') {
           setTimeout(() => initiateHumanHandoff(), 1500);
        }
    }, 1500);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');

    // --- NEW LOGIC: Instant Session Creation ---
    let activeSessionId = sessionId;
    if (!activeSessionId) {
        activeSessionId = Date.now().toString();
        setSessionId(activeSessionId);
        
        await setDoc(doc(db, 'chat_sessions', activeSessionId), {
            userName: 'Anonymous Visitor',
            userContact: 'N/A',
            status: 'active',
            createdAt: serverTimestamp(),
            lastMessage: userText,
            lastMessageTime: serverTimestamp(),
            unreadAdmin: 1,
            adminJoined: false
        });
        
        // Append Bot's initial welcome message first to preserve context
        await addDoc(collection(db, `chat_sessions/${activeSessionId}/messages`), {
            text: "Hello! 👋 Welcome to Efficacious. How can I help you today? You can ask me about our services, products, or company.",
            sender: 'bot',
            timestamp: serverTimestamp()
        });
    }

    if (phase === 'ask_name') {
        await addDoc(collection(db, `chat_sessions/${activeSessionId}/messages`), { text: userText, sender: 'user', timestamp: serverTimestamp() });
        setUserDetails(prev => ({ ...prev, name: userText }));
        setIsTyping(true);
        setTimeout(async () => {
            setIsTyping(false);
            await addDoc(collection(db, `chat_sessions/${activeSessionId}/messages`), {
                text: `Nice to meet you, ${userText}! Please share your Email or Mobile Number so our team can reach you.`,
                sender: 'bot', timestamp: serverTimestamp()
            });
            setPhase('ask_contact');
        }, 800);
        return;
    }

    if (phase === 'ask_contact') {
        await addDoc(collection(db, `chat_sessions/${activeSessionId}/messages`), { text: userText, sender: 'user', timestamp: serverTimestamp() });
        setUserDetails(prev => ({ ...prev, contact: userText }));
        
        setIsTyping(true);
        setTimeout(async () => {
            // Check and delete previous sessions with same name or contact
            try {
                const qContact = query(collection(db, 'chat_sessions'));
                const snap = await getDocs(qContact);
                const toDelete = snap.docs.filter(d => 
                    d.id !== activeSessionId && (
                    d.data().userContact?.toLowerCase() === userText.toLowerCase() || 
                    d.data().userName?.toLowerCase() === userDetails.name.toLowerCase() )
                );
                for (const oldDoc of toDelete) {
                    await deleteDoc(oldDoc.ref);
                }
            } catch (e) {
                console.error("Error clearing old sessions: ", e);
            }

            // Update existing session
            await updateDoc(doc(db, 'chat_sessions', activeSessionId as string), {
                userName: userDetails.name,
                userContact: userText,
            });

            // Add initial handoff message to DB
            const introMsg = `Thank you ${userDetails.name}. Your chat has been routed to our agents. They will reply here momentarily!`;
            await addDoc(collection(db, `chat_sessions/${activeSessionId}/messages`), {
                text: introMsg,
                sender: 'bot',
                timestamp: serverTimestamp()
            });

            // EMAIL NOTIFICATION TRIGGER (EmailJS Free API)
            try {
               await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({
                       service_id: 'YOUR_SERVICE_ID_HERE',   
                       template_id: 'YOUR_TEMPLATE_ID_HERE', 
                       user_id: 'YOUR_PUBLIC_KEY_HERE',      
                       template_params: {
                           user_name: userDetails.name,
                           user_contact: userText,
                           message: 'A new user has requested live support on the Efficacious website!',
                           session_id: activeSessionId
                       }
                   })
               });
            } catch (e) {
               console.log("EmailJS check failed", e);
            }

            setPhase('live_support');
            setIsTyping(false);
        }, 1500);
        return;
    }

    // Normal Bot Request Processing
    await addDoc(collection(db, `chat_sessions/${activeSessionId}/messages`), {
        text: userText,
        sender: 'user',
        timestamp: serverTimestamp()
    });
    await updateDoc(doc(db, 'chat_sessions', activeSessionId), {
        lastMessage: userText,
        lastMessageTime: serverTimestamp(),
        unreadAdmin: 1
    });

    generateBotReply(userText, activeSessionId);
  };

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
            <div className={`p-4 flex items-center gap-3 relative overflow-hidden transition-colors ${phase === 'live_support' ? 'bg-gradient-to-r from-emerald-600 to-emerald-700' : 'bg-gradient-to-r from-brand-600 to-brand-700'}`}>
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
                   {phase === 'live_support' && sessionAdminJoined ? <Headphones size={28} /> : <Bot size={28} />}
                </motion.div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white/20 animate-pulse"></div>
              </div>
              <div className="relative z-10 flex-1">
                <h3 className="text-white font-bold text-base tracking-wide flex items-center gap-2">
                    {phase === 'live_support' && sessionAdminJoined ? 'Live Support' : 'Efficacious Bot'} <Sparkles size={14} className="text-yellow-300" />
                </h3>
                <p className="text-white/80 text-xs font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" /> 
                    {phase === 'live_support' && sessionAdminJoined ? 'Connected to Agent' : 'Automated Assistant'}
                </p>
              </div>
              
              {phase === 'bot_only' && isLiveSupportActive && (
                 <button 
                   onClick={initiateHumanHandoff}
                   className="absolute bottom-3 right-12 z-20 text-[10px] bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded border border-white/30 transition-colors"
                 >
                   Talk to Human
                 </button>
              )}

              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-20 text-white/80 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="h-[380px] p-4 overflow-y-auto bg-slate-50 dark:bg-slate-900/50 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
               {messages.map((msg) => (
                   <motion.div 
                     key={msg.id} 
                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                   >
                       {(msg.sender === 'bot' || msg.sender === 'admin') && (
                           <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 border shrink-0 shadow-sm ${
                             msg.sender === 'bot' 
                             ? 'bg-brand-100 text-brand-600 border-brand-200 dark:bg-brand-900/50 dark:border-brand-800' 
                             : 'bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-900/50 dark:border-emerald-800'
                           }`}>
                               {msg.sender === 'bot' ? <Bot size={16} /> : <Headphones size={16} />}
                           </div>
                       )}
                       
                       <div className={`max-w-[80%] p-3.5 rounded-2xl shadow-sm border ${
                           msg.sender === 'user' 
                           ? 'bg-brand-600 text-white rounded-tr-none border-brand-500' 
                           : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border-slate-100 dark:border-slate-700'
                       }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{typeof msg.text === 'object' ? JSON.stringify(msg.text) : msg.text}</p>
                          <span className={`text-[9px] mt-1.5 block ${msg.sender === 'user' ? 'text-right opacity-70' : 'text-left text-slate-400'}`}>
                              {msg.sender === 'admin' && <span className="font-bold text-emerald-500 mr-1">Agent</span>}
                              {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : (msg.timestamp instanceof Date ? msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '')}
                          </span>
                       </div>
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
                               <motion.div className="w-2 h-2 bg-brand-500 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                               <motion.div className="w-2 h-2 bg-brand-500 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} />
                               <motion.div className="w-2 h-2 bg-brand-500 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} />
                           </div>
                       </div>
                   </motion.div>
               )}
               <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
               <div className="flex items-end gap-2 bg-slate-50 dark:bg-slate-900 rounded-3xl p-1.5 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500 transition-all shadow-inner">
                   <textarea
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     onKeyDown={(e) => {
                       if (e.key === 'Enter' && !e.shiftKey) {
                         e.preventDefault();
                         handleSend();
                       }
                     }}
                     placeholder={phase === 'ask_name' ? "Type your name..." : phase === 'ask_contact' ? "Type your email or phone..." : "Type a message..."} 
                     rows={1}
                     className="flex-1 bg-transparent text-slate-900 dark:text-white text-sm px-4 py-2.5 focus:outline-none placeholder:text-slate-400 resize-none max-h-24 scrollbar-hide"
                   />
                   <motion.button 
                      onClick={handleSend}
                      disabled={!inputValue.trim()}
                      className={`p-2.5 rounded-full transition-all shadow-md flex items-center justify-center ${
                          inputValue.trim() 
                          ? (phase === 'live_support' ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/30' : 'bg-brand-600 text-white hover:bg-brand-700 shadow-brand-500/30')
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
            <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}>
                        <X size={28} />
                    </motion.div>
                ) : (
                    <motion.div key="chat" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="relative">
                        <MessageCircle size={28} className="fill-white/20" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

export default ChatWidget;
