import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Send, Star, ChevronDown, CheckCircle2 } from 'lucide-react';

const REPLIES: Record<string, string> = {
  'No llego a fin de mes aunque trabajo mucho': 'Eso es agotador y muy frustrante. Trabajar tanto y no ver los resultados en tu cuenta... El Método 3R empieza exactamente aquí: entendiendo por qué el dinero "desaparece" y creando un sistema que lo retiene. ✨',
  'Tengo deudas que no puedo saldar': 'Las deudas pesan emocionalmente más que económicamente. Ese peso te paraliza y te hace sentir que nunca saldrás. En el método vas a encontrar un plan paso a paso para recuperar el control, sin sacrificar tu paz. ✨',
  'No sé cómo empezar a invertir': 'Esa sensación de que invertir es "para otras" es un bloqueo muy común. En el Método 3R te llevo de la mano desde cero, sin tecnicismos, hasta tus primeros $1,000 invertidos. ✨',
  'Siento que el dinero no es para mí': 'Eso es una creencia profunda, no una realidad. Probablemente la escuchaste de alguien que amabas. En el método la identificamos juntas y la reprogramamos. Mereces abundancia. ✨'
};

const CHAT_OPTIONS = [
  'No llego a fin de mes aunque trabajo mucho',
  'Tengo deudas que no puedo saldar',
  'No sé cómo empezar a invertir',
  'Siento que el dinero no es para mí'
];

const HOTMART_LINK = "https://pay.hotmart.com/G104495229H";

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hola, soy Luna. Estoy aquí para escucharte sin juicios. ✨', sender: 'bot' }
  ]);
  const [showSecondMsg, setShowSecondMsg] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsTyping(false);
      setShowSecondMsg(true);
      setMessages(prev => [...prev, { id: 2, text: '¿Cuál es el bloqueo financiero que hoy no te deja dormir?', sender: 'bot' }]);
      setShowOptions(true);
    }, 1800);
    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleOptionSelect = (option: string) => {
    setShowOptions(false);
    const userMsg: Message = { id: Date.now(), text: option, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const replyText = REPLIES[option] || 'Gracias por compartir eso. Lo que describes es más común de lo que crees, y tiene solución. El Método 3R fue diseñado para acompañarte exactamente en esto. ✨';
      setMessages(prev => [...prev, { id: Date.now() + 1, text: replyText, sender: 'bot' }]);
      setIsFinished(true);
    }, 1700);
  };

  const handleSendCustom = () => {
    if (!userInput.trim()) return;
    const text = userInput;
    setUserInput('');
    handleOptionSelect(text);
  };

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF8E6] via-[#FDF9F0] to-[#F4F0FF] pt-18 pb-20 text-center">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-radial-[circle] from-[rgba(91,63,212,0.05)] to-transparent pointer-events-none" />
        
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center gap-3 mb-6"
          >
            <span className="tag bg-gold-light text-gold">⏳ Oferta limitada</span>
            <span className="tag bg-purple-light text-purple">✨ Método 3R®</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-[clamp(36px,6vw,56px)] font-black leading-[1.05] tracking-tight text-text mb-5"
          >
            Ahorra tus primeros <em className="italic text-gold">$1,000</em> para invertir, simple, sin caos y sin estrés
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="font-serif text-[clamp(18px,3vw,24px)] text-purple mb-2.5 italic"
          >
            aunque hoy sientas que el dinero se escapa
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="text-lg text-muted max-w-[600px] mx-auto mb-9 font-light leading-[1.65]"
          >
            El método paso a paso para hombres y mujeres latinos que quieren tomar el control de su dinero, organizarse sin estrés e invertir con confianza desde cero.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.46 }}
            className="mb-8"
          >
            <div className="text-[15px] text-[#AAA] line-through mb-1">Valor real: $197 USD</div>
            <div className="font-serif text-[64px] font-bold text-gold leading-none">
              <sup className="text-[28px] align-super">$</sup>17 <span className="text-[22px] font-sans font-normal text-gold-dark/60">USD</span>
            </div>
            <div className="text-sm text-muted mt-1.5">Acceso completo · Descarga inmediata</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.58 }}
          >
            <a href={HOTMART_LINK} target="_blank" rel="noopener noreferrer" className="cta-primary">Sí, quiero empezar hoy →</a>
            <div className="flex gap-6 justify-center flex-wrap mt-5.5">
              <span className="text-[13px] text-muted flex items-center gap-1.5"><Check size={14} className="text-green" /> Descarga inmediata</span>
              <span className="text-[13px] text-muted flex items-center gap-1.5"><Check size={14} className="text-green" /> 3 bonos incluidos</span>
              <span className="text-[13px] text-muted flex items-center gap-1.5"><Check size={14} className="text-green" /> Garantía de 7 días</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PAIN SECTION */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-3"><span className="tag bg-gold-light text-gold">¿Te suena familiar?</span></div>
          <h2 className="font-serif text-[clamp(26px,4vw,38px)] font-bold text-center mb-3 leading-[1.2]">Dime si esto te ha pasado...</h2>
          <p className="text-center text-muted mb-13 text-base">Porque si asientes con la cabeza, este método fue diseñado exactamente para ti.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: '💼', title: 'Trabajas mucho... pero el dinero no se queda', text: 'Tu cuenta bancaria no refleja todo el esfuerzo que haces, sin importar cuántas horas trabajes o cuántas responsabilidades cargues.' },
              { icon: '😔', title: 'Gastas en ti y sientes culpa', text: 'Siempre aparece una voz diciendo "mejor guarda ese dinero por si alguien lo necesita". Te cuesta comprarte algo solo para ti.' },
              { icon: '🏦', title: 'Eres el banco de todos menos de ti', text: 'Si alguien de la familia necesita ayuda, todos saben a quién llamar. Y sin darte cuenta, terminas en cero otra vez.' }
            ].map((card, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -4 }}
                className="bg-white border border-border rounded-[20px] p-7 relative transition-shadow hover:shadow-[0_12px_40px_rgba(200,134,10,0.1)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:rounded-t-[20px] before:bg-gradient-to-r before:from-gold before:to-gold-mid"
              >
                <div className="text-[32px] mb-3.5">{card.icon}</div>
                <h3 className="text-[15px] font-semibold mb-2 text-text leading-[1.3]">{card.title}</h3>
                <p className="text-[13px] text-muted leading-[1.55]">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CHATBOT SECTION */}
      <section className="pb-20">
        <div className="container">
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

          <div className="bg-white border border-border rounded-[24px] overflow-hidden shadow-[0_8px_48px_rgba(91,63,212,0.12)] max-w-[620px] mx-auto mt-4">
            <div className="bg-gradient-to-br from-purple-dark to-purple p-4.5 px-6 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-[22px] border-2 border-white/30 shrink-0">✨</div>
              <div className="text-white">
                <div className="text-[15px] font-semibold">Luna · Coach de abundancia</div>
                <div className="text-[12px] text-white/70 flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5DCAA5] animate-pulse" />
                  En línea contigo ahora
                </div>
              </div>
            </div>

            <div className="p-6 pb-2 flex flex-col gap-3.5 max-h-[400px] overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2.5 items-end ${msg.sender === 'bot' ? 'self-start max-w-[88%]' : 'self-end flex-row-reverse max-w-[78%]'}`}>
                  {msg.sender === 'bot' && <div className="w-[30px] h-[30px] rounded-full bg-purple-light flex items-center justify-center text-sm shrink-0">✨</div>}
                  <div className={`p-3 px-4.5 rounded-[18px] text-sm leading-[1.55] ${msg.sender === 'bot' ? 'bg-purple-light text-purple-dark rounded-bl-[4px]' : 'bg-purple text-white rounded-br-[4px]'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-2.5 items-end self-start">
                  <div className="w-[30px] h-[30px] rounded-full bg-purple-light flex items-center justify-center text-sm shrink-0">✨</div>
                  <div className="flex gap-1.5 items-center p-3 px-4.5 bg-purple-light rounded-[18px] rounded-bl-[4px]">
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} className="w-2 h-2 rounded-full bg-purple-mid" />
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-2 h-2 rounded-full bg-purple-mid" />
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-2 h-2 rounded-full bg-purple-mid" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <AnimatePresence>
              {showOptions && !isFinished && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 px-5"
                >
                  <p className="text-[12px] text-muted text-center mb-2.5">Elige la que más resuena contigo 👇</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CHAT_OPTIONS.map((opt, i) => (
                      <button 
                        key={i}
                        onClick={() => handleOptionSelect(opt)}
                        className="bg-white border border-border rounded-xl p-3 px-3.5 text-[13px] text-text cursor-pointer text-left leading-tight transition-all hover:bg-purple-light hover:border-purple hover:text-purple-dark"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!isFinished && (
              <div className="flex gap-2 px-5 pb-5">
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendCustom()}
                  placeholder="O escribe tu bloqueo aquí..."
                  className="flex-1 border border-border rounded-[28px] p-2.5 px-4.5 text-sm bg-gold-light/20 text-text outline-none focus:border-gold focus:bg-white transition-colors"
                />
                <button 
                  onClick={handleSendCustom}
                  className="w-[42px] h-[42px] rounded-full bg-gold border-none cursor-pointer flex items-center justify-center shrink-0 transition-opacity hover:opacity-85 text-white"
                >
                  <Send size={18} />
                </button>
              </div>
            )}

            {isFinished && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-5 pb-6 text-center"
              >
                <a href="#cta-final" className="cta-primary text-[15px] px-8 py-3.5">Ver cómo el Método 3R resuelve esto →</a>
              </motion.div>
            )}
          </div>

          <div className="flex flex-col items-center pt-6 gap-1.5 max-w-[620px] mx-auto">
            <span className="text-[13px] text-gold font-medium">El método que resuelve exactamente eso 👇</span>
            <div className="w-[2px] h-10 bg-gradient-to-b from-gold to-transparent" />
          </div>
        </div>
      </section>

      {/* METHOD SECTION */}
      <section className="pb-20">
        <div className="container">
          <div className="text-center mb-2.5"><span className="tag bg-purple-light text-purple">El Método 3R®</span></div>
          <h2 className="font-serif text-[clamp(28px,4vw,42px)] font-bold text-center mb-2.5 leading-[1.15]">Una forma clara de construir<br />estabilidad financiera real</h2>
          <p className="text-center text-muted mb-13 text-base">Sin tecnicismos. Sin sacrificios eternos. Sin teorías complicadas.</p>
          
          <div className="flex flex-col">
            {[
              { num: 1, title: 'Reconocer — entiende tu relación con el dinero', text: 'Muchos crecimos escuchando "el dinero cambia a la gente" o "los ricos son egoístas" o "hay que sacrificarse siempre". Primero identificamos y rompemos esas creencias invisibles que nos frenan antes de que puedas hacer cualquier otra cosa.' },
              { num: 2, title: 'Reprogramar — organiza tu dinero sin estrés', text: 'Creas un sistema simple para ahorrar, ordenar tus gastos y empezar tu fondo personal. Todo paso a paso, sin sentir que es un sacrificio. Aprendes a darle a tu dinero una dirección clara para que deje de "desaparecer".' },
              { num: 3, title: 'Rentabilizar — empieza a invertir con confianza', text: 'Con tu base financiera clara, aprenderás a invertir de manera sencilla y segura. Sin apuestas arriesgadas. Solo estrategias claras para empezar a construir tus primeros $1,000 invertidos y hacer que tu dinero trabaje para ti.' }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`flex gap-7 py-8 border-border ${i !== 2 ? 'border-b' : ''}`}
              >
                <div className="shrink-0 w-[54px] h-[54px] rounded-full bg-gold-light border-2 border-gold-mid flex items-center justify-center font-serif text-[22px] font-bold text-gold">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-text leading-[1.25]">{step.title}</h3>
                  <p className="text-[15px] text-muted leading-[1.65]">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUDES SECTION */}
      <section className="py-20 bg-gradient-to-b from-bg to-[#FFF8E6]">
        <div className="container">
          <div className="text-center mb-2.5"><span className="tag bg-gold-light text-gold">Todo lo que recibes</span></div>
          <h2 className="font-serif text-[clamp(26px,4vw,38px)] font-bold text-center mb-2.5">No es solo un ebook.<br />Es una guía completa.</h2>
          <p className="text-center text-muted mb-13 text-base">Todo lo que necesitas para pasar del caos financiero a la claridad y la acción.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              { icon: '📘', label: 'Ebook principal', text: 'Tus primeros $1,000 — guía paso a paso para construir tu base financiera desde cero.' },
              { icon: '📊', label: 'Guía extra', text: 'Organiza tus finanzas sin estrés con un sistema que realmente funciona mes a mes.' },
              { icon: '💳', label: 'Plan anti-deudas', text: 'Sal de deudas y recupera tu estabilidad financiera con pasos concretos y sin agobio.' },
              { icon: '📈', label: 'Guía de brokers', text: 'Brokers confiables y cómo comenzar a invertir desde montos pequeños, sin miedo.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -3 }}
                className="bg-white border border-border rounded-2xl p-5.5 flex gap-3.5 items-start transition-transform"
              >
                <div className="text-[28px] shrink-0 mt-0.5">{item.icon}</div>
                <div>
                  <div className="text-[11px] font-semibold tracking-wider uppercase text-gold mb-1">{item.label}</div>
                  <p className="text-[13px] text-muted leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white border border-gold rounded-2xl p-7 px-8">
            <p className="text-base font-semibold mb-4 text-text">🎁 3 bonos incluidos sin costo adicional</p>
            {[
              { badge: 'BONO 1', text: 'Plan de inversión personalizado' },
              { badge: 'BONO 2', text: 'Ritual financiero de 7 días para sanar tu relación con el dinero' },
              { badge: 'BONO 3', text: 'Checklist de abundancia diaria' }
            ].map((bono, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-t border-gold-light text-[15px] text-text">
                <span className="bg-gold-light text-gold text-[11px] font-semibold px-2.5 py-0.5 rounded-md shrink-0 border border-gold-mid">{bono.badge}</span>
                {bono.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-2.5"><span className="tag bg-purple-light text-purple">Resultados reales</span></div>
          <h2 className="font-serif text-[clamp(26px,4vw,38px)] font-bold text-center mb-13">Ellos ya cambiaron su historia</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { text: '"En un mes logré organizar mis finanzas por primera vez. Ya no siento que el dinero se me va de las manos."', author: 'María Elena Rodríguez', photo: 'https://picsum.photos/seed/woman1/100/100' },
              { text: '"Nunca pensé que podría ahorrar tanto en tan poco tiempo. El sistema es tan simple que cualquiera puede seguirlo."', author: 'Juan Carlos Pérez', photo: 'https://picsum.photos/seed/man1/100/100' },
              { text: '"Aprendí a poner límites. Antes siempre ayudaba a todos y me quedaba en cero. Ahora me pongo primero."', author: 'Carmen Lucía Méndez', photo: 'https://picsum.photos/seed/woman2/100/100' }
            ].map((testi, i) => (
              <div key={i} className="bg-white border border-border rounded-[20px] p-6.5 relative before:content-['\201C'] before:font-serif before:text-[64px] before:text-gold-mid/30 before:absolute before:top-2.5 before:right-5 before:leading-none">
                <div className="text-gold-mid text-sm mb-4 flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-sm text-muted leading-[1.65] mb-6 italic">{testi.text}</p>
                <div className="flex items-center gap-3">
                  <img src={testi.photo} alt={testi.author} referrerPolicy="no-referrer" className="w-10 h-10 rounded-full object-cover border border-gold-mid" />
                  <div className="text-[13px] font-semibold text-text">{testi.author}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIO SECTION */}
      <section className="py-20 border-y border-border bg-gold-light/10">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-9 items-center md:items-start">
            <div className="shrink-0 relative">
              <img 
                src="https://scontent.fbog10-1.fna.fbcdn.net/v/t39.30808-6/404974811_188341407684526_4014068170333291071_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeEPthfr2N-rQKhMUleX2if3_IQ3hOA4QpX8hDeE4DhClUvR7ZyuSbw7KwD5oc4GxbxvVb00LEUwXAV1BCijfxwk&_nc_ohc=ysEkRwAr8UcQ7kNvwHkKXth&_nc_oc=Adreov_wHTTHbmbGR9nn2kvOxGWAE6vcVhNlwp2gSP2OdzrEEHLKAukEwmUgNIYZKHLkyw7Z7Ca7MMVncLNS5wO3&_nc_zt=23&_nc_ht=scontent.fbog10-1.fna&_nc_gid=rfDHPPbPmU0q_pmxRBFLfg&_nc_ss=7a3a8&oh=00_Af11-NdiuJcZl5i9EqseREUw4yDP3AkKWhI8lRQBICmxMQ&oe=69E2DF32" 
                alt="Alexandra Cook" 
                referrerPolicy="no-referrer"
                className="w-[200px] h-[250px] md:w-[240px] md:h-[300px] object-cover rounded-2xl shadow-xl border-4 border-white"
              />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gold rounded-full flex items-center justify-center font-serif text-white text-2xl font-bold border-4 border-white">
                AC
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-serif text-[32px] font-bold mb-1">Alexandra Cook</h3>
              <p className="text-base text-purple font-medium mb-5">Educadora financiera · Mentalidad de abundancia · Inversiones para latinos</p>
              <div className="text-[16px] text-muted leading-[1.7] space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-purple shrink-0 mt-1" size={20} />
                    <p>Me certifiqué en un coaching innovador y disruptivo creado fuera del mercado latino.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-purple shrink-0 mt-1" size={20} />
                    <p>Estudié finanzas bajo un sistema estructurado que solo se enseña en Estados Unidos.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-purple shrink-0 mt-1" size={20} />
                    <p>Aprendí inversiones desde el estándar del mercado americano, no desde la improvisación.</p>
                  </div>
                </div>
                <p className="font-medium text-text pt-2">
                  Y luego hice algo que muy pocas personas hacen… Lo adapté estratégicamente para hombres y mujeres latinos en USA, Canadá y Latinoamérica.
                </p>
                <p>Durante años estudié mentalidad financiera, inversiones y educación económica en Estados Unidos. Me di cuenta de algo importante: la mayoría de la información no está pensada para nuestra comunidad latina.</p>
                <p>Por eso decidí simplificar todo ese conocimiento y convertirlo en un método claro que cualquier persona puede aplicar. Sin palabras complicadas. Sin teorías eternas. Solo herramientas reales para empezar.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 text-center" id="cta-final">
        <div className="container">
          <div className="text-center mb-3"><span className="tag bg-gold-light text-gold">Tu libertad financiera empieza hoy</span></div>
          <h2 className="font-serif text-[clamp(28px,4vw,42px)] font-bold mb-3">Es el momento de<br /><em className="italic text-gold">cambiar tu historia.</em></h2>
          <p className="text-[17px] text-muted max-w-[500px] mx-auto mb-10">Una persona trabajadora, valiente y responsable como tú merece construir estabilidad, tranquilidad y abundancia.</p>

          <div className="bg-gold-light border border-gold-mid rounded-[24px] p-9 max-w-[440px] mx-auto mb-8">
            <p className="text-[15px] text-[#AAA] line-through mb-1">Valor real del programa: $197 USD</p>
            <div className="font-serif text-[72px] font-bold text-gold leading-none">
              <sup className="text-[32px] align-super">$</sup>17
            </div>
            <p className="text-sm text-muted mt-1.5 mb-7">USD · pago único · acceso inmediato · todos los bonos incluidos</p>
            <a href={HOTMART_LINK} target="_blank" rel="noopener noreferrer" className="cta-primary w-full text-center text-lg py-5">Sí, quiero aprender a manejar mi dinero →</a>
            <p className="text-[13px] text-green mt-4.5 flex items-center justify-center gap-1.5">
              <Check size={14} /> Garantía total de 7 días — si no te encanta, te devolvemos tu dinero
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 text-center">
        <div className="container">
          <p className="text-sm text-muted mb-1.5">Método 3R® · Alexandra Cook · Finanzas para latinos</p>
          <p className="italic text-purple text-[15px]">Dinero con paz. Abundancia sin culpa. Inversión sin miedo.</p>
        </div>
      </footer>
    </div>
  );
}
