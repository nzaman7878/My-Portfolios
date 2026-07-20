import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Sparkles, CornerDownLeft } from 'lucide-react';
import { ChatMessage } from '../types.js';

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial',
      role: 'model',
      text: "Hi! I am the portfolio assistant, powered by Google Gemini. Ask me anything about the developer's education, skills, projects, or how to collaborate!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "What are your top MERN skills?",
    "Tell me about the AI Chatbot project.",
    "Where did you study?",
    "How can I contact and hire you?"
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    try {
      // Build correct history payload to feed the model conversation context
      const historyPayload = messages.slice(1).map(m => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, history: historyPayload })
      });

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        role: 'model',
        text: data.text || "I apologize, but I could not formulate an answer right now.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        role: 'model',
        text: "I am having trouble connecting to my cognitive server. Please make sure the backend is active.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mb-4 w-[22rem] sm:w-[26rem] h-[34rem] rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121215] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-neutral-900 dark:bg-[#070709] border-b border-neutral-800 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/5 border border-neutral-700/50 rounded-lg">
                  <Sparkles size={18} className="text-neutral-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm tracking-wide">Developer Companion</h3>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] text-neutral-400 font-medium tracking-wider">LIVE COMPANION</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Conversation list */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs select-text">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start space-x-2.5 ${m.role === 'user' ? 'justify-end' : ''}`}
                >
                  {m.role !== 'user' && (
                    <div className="h-8 w-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900">
                      <Bot size={16} />
                    </div>
                  )}
                  <div className={`p-3 max-w-[78%] rounded-2xl leading-relaxed shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-tl-none border border-neutral-200/50 dark:border-neutral-700/50'
                  }`}>
                    <p className="whitespace-pre-line font-normal">{m.text}</p>
                    <span className={`block text-[9px] mt-1 text-right ${m.role === 'user' ? 'text-indigo-200' : 'text-neutral-400'}`}>
                      {m.timestamp}
                    </span>
                  </div>
                  {m.role === 'user' && (
                    <div className="h-8 w-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                      <User size={16} />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start space-x-2.5">
                  <div className="h-8 w-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Bot size={16} />
                  </div>
                  <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-2xl rounded-tl-none border border-neutral-200/50 dark:border-neutral-700/50 flex space-x-1.5 items-center">
                    <span className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Chips Selection */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <span className="text-[10px] text-neutral-400 font-medium block mb-1.5 uppercase tracking-wide">Suggested Topics</span>
                <div className="flex flex-wrap gap-1.5">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-100 dark:border-indigo-900 rounded-full px-2.5 py-1 text-left transition active:scale-95"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Ask about my resume, MSc studies, MERN skills..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputVal)}
                className="flex-1 text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-neutral-400 dark:placeholder-neutral-500"
              />
              <button
                onClick={() => handleSendMessage(inputVal)}
                disabled={!inputVal.trim() || isTyping}
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white transition active:scale-95"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher trigger circle */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-lg flex items-center justify-center cursor-pointer border border-neutral-800 dark:border-neutral-200 relative"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500 text-[9px] font-bold text-white items-center justify-center">AI</span>
          </span>
        )}
      </motion.button>
    </div>
  );
};
