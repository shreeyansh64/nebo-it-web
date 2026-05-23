import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", '7a54dd7f-aa73-4bc5-a833-122420bd0cac');
    const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
    const result = await response.json();
    if (result.success) {
      setFormState('success');
      e.currentTarget.reset();
    } else {
      setFormState('idle');
      alert("Something went wrong");
    }
  };

  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-16">
          <span className="section-label">Get In Touch</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Let's Build Something <span className="gradient-text">Extraordinary</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Ready to start your next digital project? Reach out and let's discuss how we can bring your vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="lg:col-span-3">
            <div className="nebo-card p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Full Name</label>
                    <input required name="name" type="text" placeholder="John Doe"
                      className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-5 py-4 text-white placeholder-gray-600 outline-none transition-all focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Email Address</label>
                    <input required name="email" type="email" placeholder="john@company.com"
                      className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-5 py-4 text-white placeholder-gray-600 outline-none transition-all focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Project Details</label>
                  <textarea required name="message" rows={5} placeholder="Tell us about your project..."
                    className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-5 py-4 text-white placeholder-gray-600 outline-none transition-all focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 resize-none" />
                </div>
                <button disabled={formState !== 'idle'}
                  className={`w-full py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-3 transition-all ${
                    formState === 'success'
                      ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/20 hover:translate-y-[-2px]'
                  }`}>
                  {formState === 'idle' && <><Send size={18} />Send Message</>}
                  {formState === 'sending' && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  {formState === 'success' && <><CheckCircle size={18} />Message Sent Successfully</>}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="lg:col-span-2 space-y-6">
            <div className="nebo-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0"><MapPin size={18} /></div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Delhi Office</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">R-18 1st Floor, Vikas Marg, Shakarpur, Delhi-110092</p>
                </div>
              </div>
            </div>
            <div className="nebo-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0"><MapPin size={18} /></div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Greater Noida Office</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">K-422, SITE 5 KASNA IND AREA, Greater Noida - 201310</p>
                </div>
              </div>
            </div>
            <div className="nebo-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0"><Phone size={18} /></div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Phone</h4>
                  <p className="text-gray-500 text-sm">+91 8802239746</p>
                  <p className="text-gray-500 text-sm">+91 8700449133</p>
                </div>
              </div>
            </div>
            <div className="nebo-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0"><Mail size={18} /></div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Email</h4>
                  <p className="text-gray-500 text-sm">contact@neboengineering.in</p>
                  <p className="text-gray-500 text-sm">neboitsolutions@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="nebo-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0"><Clock size={18} /></div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Business Hours</h4>
                  <p className="text-gray-500 text-sm">Mon – Sat: 9:00 AM – 6:00 PM IST</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
