import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Play } from 'lucide-react';

export default function Gallery() {
  const { t } = useTranslation();
  const [workplaces, setWorkplaces] = useState<any[]>([]);
  const [selectedWorkplace, setSelectedWorkplace] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: wp } = await supabase.from('workplaces').select('*').order('order_index');
      if (wp) {
        setWorkplaces(wp);
        if (wp.length > 0) setSelectedWorkplace(wp[0].id);
      }

      const { data: ev } = await supabase.from('events').select('*');
      if (ev) setEvents(ev);

      const { data: md } = await supabase.from('media').select('*');
      if (md) setMedia(md);

      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredEvents = events.filter(e => e.workplace_id === selectedWorkplace);

  if (loading) return <div className="pt-32 text-center" aria-live="polite">Loading Gallery...</div>;

  return (
    <div className="pt-20 min-h-screen pb-2xl">
      <section className="bg-gradient-to-br from-primary-50 to-neutral-50 dark:from-background-dark-surface dark:to-background-dark-page py-2xl">
        <div className="max-w-container mx-auto px-lg text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-h1 font-bold mb-md"
          >
            Media Gallery
          </motion.h1>
          <p className="text-body-large text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            A collection of memories, achievements, and moments shared with students and colleagues across different institutions.
          </p>
        </div>
      </section>

      <div className="max-w-container mx-auto px-lg mt-xl">
        {/* Workplace Tabs */}
        <div className="flex flex-wrap gap-sm justify-center mb-2xl" role="tablist" aria-label="Workplaces">
          {workplaces.map((wp) => (
            <button
              key={wp.id}
              role="tab"
              aria-selected={selectedWorkplace === wp.id}
              aria-controls={`panel-${wp.id}`}
              onClick={() => setSelectedWorkplace(wp.id)}
              className={`px-lg py-sm rounded-full transition-all focus-visible:ring-2 focus-visible:ring-primary-600 outline-none ${
                selectedWorkplace === wp.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white dark:bg-background-dark-elevated text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {wp.name}
            </button>
          ))}
        </div>

        {/* Events & Media */}
        <div className="space-y-2xl min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedWorkplace}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              id={`panel-${selectedWorkplace}`}
              role="tabpanel"
            >
              {filteredEvents.length === 0 ? (
                <div className="text-center py-3xl text-neutral-500">No media found for this workplace.</div>
              ) : (
                filteredEvents.map((event) => {
                  const eventMedia = media.filter(m => m.event_id === event.id);
                  if (eventMedia.length === 0) return null;

                  return (
                    <div key={event.id} className="mb-2xl last:mb-0">
                      <div className="mb-lg">
                        <h2 className="text-h3 font-bold text-neutral-900 dark:text-neutral-100">{event.name}</h2>
                        {event.description && <p className="text-neutral-600 dark:text-neutral-400">{event.description}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
                        {eventMedia.map((m) => (
                          <motion.div
                            key={m.id}
                            whileHover={{ scale: 1.02, translateY: -4 }}
                            className="group relative aspect-video bg-neutral-200 dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                          >
                            {m.type === 'image' ? (
                              <img src={m.url} alt={m.title} className="w-full h-full object-cover" loading="lazy" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-black">
                                 <Play className="text-white w-12 h-12 opacity-50 group-hover:opacity-100 transition-opacity" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-md">
                              <p className="text-white font-medium text-small translate-y-2 group-hover:translate-y-0 transition-transform">{m.title}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
