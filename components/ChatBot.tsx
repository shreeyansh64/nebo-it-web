import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, ChevronDown, Loader2, RotateCcw } from 'lucide-react';
import { GEMINI_API_KEY, GEMINI_MODEL, NEBO_SYSTEM_PROMPT } from '../chatbot-config';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const FAQ_CHIPS = [
  'What services does Nebo IT offer?',
  'Tell me about your AI products',
  'How can AI transform my business?',
  'What projects have you delivered?',
  'How do I start a project with you?',
  'What makes Nebo IT AI-first?',
  'Tell me about CogniFlow',
  'What is FluentAI?',
  'How can I contact Nebo IT?',
];

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: `Hello! I'm your AI assistant 🤖✨

I can tell you everything about our AI products: **FluentAI**, **CogniFlow**, and **OpticSight**. How can I help you?`,
  timestamp: new Date(),
};

// Markdown-lite renderer for bold and newlines
const renderMarkdown = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
};

const MessageBubble: React.FC<{ message: Message; isLatest: boolean }> = ({ message, isLatest }) => {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
          <Bot size={15} className="text-white" />
        </div>
      )}
      {/* Bubble */}
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-br-sm shadow-lg shadow-purple-500/20'
            : 'bg-white/[0.05] border border-white/[0.07] text-gray-300 rounded-bl-sm'
        }`}
      >
        {isUser
          ? <span className="whitespace-pre-wrap">{message.content}</span>
          : <span className="whitespace-pre-wrap">{renderMarkdown(message.content)}</span>
        }
      </div>
    </motion.div>
  );
};

const TypingIndicator: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 8 }}
    className="flex gap-3 items-end"
  >
    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
      <Bot size={15} className="text-white" />
    </div>
    <div className="bg-white/[0.05] border border-white/[0.07] rounded-2xl rounded-bl-sm px-4 py-3">
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-purple-400"
            animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

async function callGemini(userMessage: string, history: Message[]): Promise<string> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  // Build conversation history for Gemini (alternating user/model)
  const conversationHistory = history
    .filter(m => m.id !== 'welcome')
    .map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

  const body = {
    system_instruction: {
      parts: [{ text: NEBO_SYSTEM_PROMPT }],
    },
    contents: [
      ...conversationHistory,
      { role: 'user', parts: [{ text: userMessage }] },
    ],
    generationConfig: {
      temperature: 0.75,
      maxOutputTokens: 600,
      topP: 0.95,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
    ],
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from Gemini');
  return text;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isLoading, isOpen, scrollToBottom]);

  // Show unread badge after first open hint
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setHasUnread(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await callGemini(trimmed, [...messages, userMsg]);
      const aiMsg: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
      if (!isOpen) setHasUnread(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setError(null);
    setInput('');
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200, damping: 20 }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0c0c1d] border border-purple-500/20 rounded-2xl px-4 py-2.5 shadow-xl shadow-purple-500/10 flex items-center gap-2 cursor-pointer hover:border-purple-500/40 transition-colors"
              onClick={() => setIsOpen(true)}
            >
              <Sparkles size={14} className="text-purple-400" />
              <span className="text-sm font-medium text-gray-200 whitespace-nowrap">Ask NeboAI</span>
              <ChevronDown size={14} className="text-gray-500" />
            </motion.div>
          )}
        </AnimatePresence>

        <button
  onClick={() => setIsOpen(prev => !prev)}
  className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-purple-500/50 hover:scale-110 transition-all duration-300"
>
  {/* NEW: Aggressive Pulse + Rotation Animation */}
  <motion.div
    className="absolute inset-0 rounded-2xl border-2 border-purple-400"
    animate={{ 
      scale: [1, 1.4], 
      opacity: [0.5, 0],
      rotate: [0, 180] 
    }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
  />
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-purple-500/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={22} className="text-white" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Bot size={22} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
          {/* Unread badge */}
          {hasUnread && !isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-[#06060e] animate-pulse" />
          )}
        </button>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-[998] w-[calc(100vw-3rem)] sm:w-[420px] max-h-[80vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/40"
            style={{
              background: 'linear-gradient(135deg, rgba(12,12,29,0.97) 0%, rgba(18,18,42,0.97) 100%)',
              border: '1px solid rgba(124,58,237,0.15)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Bot size={18} className="text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0c0c1d]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm leading-none">NeboAI</h3>
                  <p className="text-emerald-400 text-[11px] mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetChat}
                  className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-gray-400 hover:text-white transition-all"
                  title="Reset conversation"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-gray-400 hover:text-white transition-all"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 min-h-0" style={{ scrollbarWidth: 'none' }}>
              {messages.map((msg, idx) => (
                <MessageBubble key={msg.id} message={msg} isLatest={idx === messages.length - 1} />
              ))}
              <AnimatePresence>{isLoading && <TypingIndicator />}</AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2"
                >
                  ⚠️ {error}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* FAQ Chips */}
            {messages.length <= 1 && (
              <div className="px-4 pb-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-600 mb-2">Quick questions</p>
                <div className="flex flex-wrap gap-2">
                  {FAQ_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => sendMessage(chip)}
                      disabled={isLoading}
                      className="text-xs px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/15 text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/30 hover:text-white transition-all duration-200 disabled:opacity-40"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="px-4 pb-4 pt-2 border-t border-white/[0.06]">
              <div className="flex items-end gap-2 bg-white/[0.04] border border-white/[0.07] rounded-2xl px-4 py-3 focus-within:border-purple-500/30 transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about Nebo IT..."
                  rows={1}
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 resize-none outline-none min-h-[20px] max-h-[100px] overflow-y-auto disabled:opacity-50"
                  style={{ scrollbarWidth: 'none' }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-all flex-shrink-0 shadow-md shadow-purple-500/20"
                >
                  {isLoading
                    ? <Loader2 size={14} className="animate-spin" />
                    : <Send size={14} />
                  }
                </button>
              </div>
              <p className="text-[10px] text-gray-700 text-center mt-2">
                NeboAI may occasionally make errors
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
