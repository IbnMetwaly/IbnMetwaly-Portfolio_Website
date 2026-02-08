import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2 } from 'lucide-react';

export default function Playground() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase.from('playground_projects').select('*');
      if (data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <div className="pt-20 min-h-screen pb-2xl">
       <section className="bg-gradient-to-br from-indigo-50 to-neutral-50 dark:from-indigo-950/20 dark:to-background-dark-page py-2xl">
        <div className="max-w-container mx-auto px-lg text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-h1 font-bold mb-md"
          >
            EdTech Playground
          </motion.h1>
          <p className="text-body-large text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            A collection of educational applications and tools I've built to enhance the learning experience.
          </p>
        </div>
      </section>

      <div className="max-w-container mx-auto px-lg mt-2xl">
        {loading ? (
          <div className="text-center">Loading Projects...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white dark:bg-background-dark-elevated rounded-2xl overflow-hidden shadow-sm border border-neutral-100 dark:border-neutral-800 flex flex-col"
              >
                <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                      <Code2 size={48} />
                    </div>
                  )}
                </div>
                <div className="p-lg flex-1 flex flex-col">
                  <h3 className="text-h4 font-bold mb-sm group-hover:text-primary-600 transition-colors">{project.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-small mb-lg flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-xs mb-lg">
                    {project.tags?.map((tag: string) => (
                      <span key={tag} className="px-xs py-[2px] bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold rounded uppercase tracking-wider text-neutral-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-md">
                    <a
                      href={project.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center space-x-2 py-sm bg-primary-600 text-white rounded-lg text-small font-bold hover:bg-primary-700 transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span>Launch App</span>
                    </a>
                    {project.source_code_url && (
                      <a
                        href={project.source_code_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
