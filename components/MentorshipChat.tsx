import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { getMentorshipResponse } from '../services/geminiService';

const MentorshipChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello! I'm Dr. Ova, your virtual health mentor. I'm here to support you with information about PCOS, reproductive health, and wellness strategies. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Format history for Gemini
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await getMentorshipResponse(history, userMsg.text);

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      
      <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                <Bot size={24} />
             </div>
             <div>
                <h3 className="font-bold text-slate-800">Dr. Ova</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Online • AI Medical Mentor
                </p>
             </div>
          </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`
                max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed
                ${isUser 
                  ? 'bg-rose-500 text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-800 rounded-tl-none'
                }
              `}>
                {msg.text}
                <div className={`text-[10px] mt-2 opacity-70 ${isUser ? 'text-rose-100' : 'text-slate-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          );
        })}
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-slate-400" />
                    <span className="text-xs text-slate-500">Dr. Ova is typing...</span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-100">
        <div className="flex gap-2 items-end bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:border-rose-400 focus-within:ring-1 focus-within:ring-rose-100 transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about symptoms, diet, or health tips..."
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 p-2 text-sm text-slate-800 placeholder:text-slate-400"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`
              p-2 rounded-lg transition-colors
              ${!input.trim() || isLoading 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-rose-500 text-white hover:bg-rose-600'
              }
            `}
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-2">
            AI can make mistakes. Consider checking important information with a real doctor.
        </p>
      </div>
    </div>
  );
};

export default MentorshipChat;
