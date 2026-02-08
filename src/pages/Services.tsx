import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { Languages, Cpu, Globe, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const services = [
  {
    id: 'translation',
    title: 'Translation & Localization',
    description: 'Expert Arabic-English translation services for educational content, documents, and digital platforms.',
    icon: Languages
  },
  {
    id: 'edtech',
    title: 'EdTech Integration',
    description: 'Consultation on integrating AI, LMS, and digital tools into the classroom to enhance learning outcomes.',
    icon: Cpu
  },
  {
    id: 'content',
    title: 'Content Development',
    description: 'Creating engaging curriculum materials and digital educational content tailored to student needs.',
    icon: Globe
  }
];

export default function Services() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const { error } = await supabase.from('inquiries').insert([data]);
    if (error) {
      toast.error('Failed to send inquiry. Please try again.');
    } else {
      setSubmitted(true);
      toast.success('Inquiry sent successfully!');
    }
    setLoading(false);
  };

  return (
    <div className="pt-20 min-h-screen">
      <section className="bg-neutral-50 dark:bg-background-dark-page py-2xl">
        <div className="max-w-container mx-auto px-lg">
          <div className="text-center mb-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-h1 font-bold mb-md"
            >
              Professional Services
            </motion.h1>
            <p className="text-body-large text-neutral-600 dark:text-neutral-400">
              Leveraging 13+ years of expertise to help you achieve excellence in education and communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl mb-3xl">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-background-dark-elevated p-xl rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 transition-all hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 mb-lg">
                  <service.icon size={24} />
                </div>
                <h3 className="text-h4 font-bold mb-md">{service.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-white dark:bg-background-dark-elevated p-2xl rounded-2xl shadow-lg border border-neutral-100 dark:border-neutral-800">
            {submitted ? (
              <div className="text-center py-xl" aria-live="polite">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-md" />
                <h2 className="text-h3 font-bold mb-sm">Thank You!</h2>
                <p className="text-neutral-600 dark:text-neutral-400">Your inquiry has been received. I will get back to you shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-xl text-primary-600 font-medium hover:underline focus-visible:ring-2 focus-visible:ring-primary-600 outline-none rounded"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-h3 font-bold mb-xl">Service Inquiry</h2>
                <form onSubmit={handleSubmit} className="space-y-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <div>
                      <label htmlFor="name" className="block text-small font-medium mb-xs">Full Name</label>
                      <input id="name" name="name" required className="w-full p-sm rounded-lg border dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-primary-600 outline-none" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-small font-medium mb-xs">Email Address</label>
                      <input id="email" type="email" name="email" required className="w-full p-sm rounded-lg border dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-primary-600 outline-none" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="service_type" className="block text-small font-medium mb-xs">Service Type</label>
                    <select id="service_type" name="service_type" className="w-full p-sm rounded-lg border dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-primary-600 outline-none">
                      {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-small font-medium mb-xs">Message</label>
                    <textarea id="message" name="message" required rows={4} className="w-full p-sm rounded-lg border dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-primary-600 outline-none" placeholder="Tell me about your project..." />
                  </div>
                  <button
                    disabled={loading}
                    className="w-full py-md bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="animate-pulse">Sending...</span>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
