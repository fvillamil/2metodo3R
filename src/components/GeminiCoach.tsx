import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, ChevronDown } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { Message } from '../types';

const GeminiCoach: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hola, mujer poderosa. ❤️\nSoy tu coach de abundancia. Estoy aquí para ayudarte a identificar y destruir esos bloqueos financieros que te impiden brillar. ¿Qué es lo que hoy te detiene?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Seguridad Invisible
  const [honeypot, setHoneypot] = useState('');
  const loadTime = useRef(Date.now());
  const interactionCount = useRef(0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const logToBackend = (role: string, message: string) => {
    fetch('/api/log-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        role, 
        message, 
        timestamp: new Date().toLocaleString('es-ES') 
      })
    }).catch(err => console.error('Logging error:', err));
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    // Security checks
    if (honeypot) return; // Bot detected
    if (Date.now() - loadTime.current < 2000) return; // Too fast
    if (interactionCount.current === 0) return; // No interaction recorded

    const userText = input.trim();
    setInput('');
    setIsLoading(true);

    const userMsg: Message = { role: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    logToBackend('user', userText);

    const response = await getGeminiResponse(userText, messages);
    const botMsg: Message = { role: 'model', text: response.text };
    
    setMessages(prev => [...prev, botMsg]);
    logToBackend('model', response.text);
    setIsLoading(false);
  };

  return (
    <section className="pb-10 bg-bg relative overflow-hidden">
      <div className="container relative z-10">
        <div className="flex flex-col items-center gap-0 mb-0">
          <div className="w-[2px] h-12 bg-gradient-to-b from-gold-mid to-gold" />
          <motion.div 
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-gold text-xl -mt-1"
          >
            <ChevronDown />
          </motion.div>
        </div>

        <div className="text-center my-6">
          <span className="tag bg-purple-light text-purple">Luna · Coach de abundancia</span>
        </div>

        <div className="bg-white border border-border rounded-[32px] overflow-hidden shadow-[0_20px_80px_rgba(91,63,212,0.15)] max-w-[800px] mx-auto mt-4 min-h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-br from-purple-dark to-purple p-5 px-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-white/30 overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" 
                alt="Luna" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-white">
              <div className="text-lg font-semibold">Luna · Coach de abundancia</div>
              <div className="text-sm text-white/70 flex items-center gap-1.5 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-[#5DCAA5] animate-pulse" />
                En línea contigo ahora
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 p-8 pb-4 flex flex-col gap-6 overflow-y-auto scrollbar-thin scrollbar-thumb-purple/10 bg-[#F9F9FB]"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-4 items-start ${msg.role === 'model' ? 'self-start max-w-[90%]' : 'self-end flex-row-reverse max-w-[85%]'}`}>
                {msg.role === 'model' && (
                  <div className="w-12 h-12 rounded-full border-2 border-fuchsia-400 p-0.5 shrink-0 bg-white">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" 
                      alt="Luna" 
                      className="w-full h-full rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <div className={`relative p-5 px-7 rounded-[24px] shadow-sm ${
                  msg.role === 'model' 
                    ? 'bg-white text-text rounded-tl-none border border-border' 
                    : 'bg-purple text-white rounded-tr-none'
                }`}>
                  {msg.role === 'model' && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-fuchsia-500 uppercase tracking-widest">Conciencia Millonaria</span>
                      <span className="text-[10px] text-muted">• Ahora</span>
                    </div>
                  )}
                  <div className="text-[15px] leading-[1.6]">
                    {msg.text.split('\n').map((line, idx) => (
                      <p key={idx} className={idx > 0 ? 'mt-2' : ''}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 items-start self-start">
                <div className="w-12 h-12 rounded-full border-2 border-fuchsia-400 p-0.5 shrink-0 bg-white">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" 
                    alt="Luna" 
                    className="w-full h-full rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 px-7 bg-white border border-border rounded-[24px] rounded-tl-none shadow-sm">
                  <div className="flex gap-1.5 items-center">
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} className="w-2 h-2 rounded-full bg-purple/20" />
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-2 h-2 rounded-full bg-purple/20" />
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-2 h-2 rounded-full bg-purple/20" />
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Input Area */}
          <div className="p-8 pt-4 bg-white border-t border-border">
            <div className="relative flex gap-3">
              <input 
                type="text" 
                value={honeypot} 
                onChange={e => setHoneypot(e.target.value)} 
                className="hidden" 
                tabIndex={-1} 
                autoComplete="off"
              />
              
              <input 
                type="text" 
                value={input}
                onChange={e => { setInput(e.target.value); interactionCount.current++; }}
                onKeyDown={e => { interactionCount.current++; if(e.key === 'Enter') handleSend(); }}
                placeholder="Escribe tu mensaje aquí..."
                className="flex-1 border border-border rounded-[32px] p-4 px-7 text-base bg-gold-light/10 text-text outline-none focus:border-gold focus:bg-white transition-all shadow-inner"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-[56px] h-[56px] rounded-full bg-gold border-none cursor-pointer flex items-center justify-center shrink-0 transition-all hover:scale-105 active:scale-95 text-white shadow-lg disabled:opacity-50"
              >
                <Send size={24} />
              </button>
            </div>
            <p className="text-center text-[10px] text-muted mt-5 uppercase tracking-widest opacity-40">
              Seguridad Invisible Activada · Conversación Privada
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <span className="text-gold font-medium text-lg">El método que resuelve exactamente eso 👇</span>
          <div className="w-[2px] h-16 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default GeminiCoach;
