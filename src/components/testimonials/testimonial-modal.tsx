import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Download, School, Calendar, ExternalLink } from "lucide-react";
import { Testimonial } from "./data";
import { useTranslation } from "react-i18next";
import { cn } from "../../lib/utils";

interface TestimonialModalProps {
  testimonial: Testimonial | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export function TestimonialModal({
  testimonial,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: TestimonialModalProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  if (!testimonial) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/95 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="relative w-full max-w-6xl max-h-[95vh] bg-white dark:bg-neutral-900 rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row"
        >
          {/* Main Content Area */}
          <div className="flex-1 relative bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center min-h-[300px] group/content">
            {testimonial.fileType === "image" ? (
              <img
                src={testimonial.filePath}
                alt={testimonial.name}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <iframe
                src={`${testimonial.filePath}#toolbar=0`}
                className="w-full h-full border-0 min-h-[500px]"
                title={testimonial.name}
              />
            )}

            {/* Navigation Arrows */}
            {hasPrev && (
              <button
                onClick={onPrev}
                className={cn("absolute top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-primary-600 backdrop-blur-xl flex items-center justify-center text-white transition-all shadow-2xl opacity-0 group-hover/content:opacity-100", isRTL ? "right-6" : "left-6")}
              >
                <ChevronLeft className={cn("w-7 h-7", isRTL && "rotate-180")} />
              </button>
            )}
            {hasNext && (
              <button
                onClick={onNext}
                className={cn("absolute top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-primary-600 backdrop-blur-xl flex items-center justify-center text-white transition-all shadow-2xl opacity-0 group-hover/content:opacity-100", isRTL ? "left-6" : "right-6")}
              >
                <ChevronRight className={cn("w-7 h-7", isRTL && "rotate-180")} />
              </button>
            )}
          </div>

          {/* Info Sidebar */}
          <div className="w-full md:w-96 p-10 flex flex-col border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
            <div className="flex justify-between items-start mb-10">
               <div className="px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-black uppercase tracking-widest border border-primary-200 dark:border-primary-800">
                  {t(`testimonials.categories.${testimonial.category}`)}
               </div>
               <button onClick={onClose} className="p-2.5 hover:bg-white dark:hover:bg-neutral-800 rounded-full transition-all shadow-sm border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700">
                  <X className="w-6 h-6" />
               </button>
            </div>

            <div className="space-y-8 flex-grow">
               <div className="space-y-4">
                  <h3 className="text-h2 font-black text-neutral-900 dark:text-neutral-100 leading-[1.1] tracking-tight">
                    {isRTL ? testimonial.nameAr : testimonial.name}
                  </h3>
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-1 bg-primary-500 rounded-full" />
                     <p className="text-body-large text-primary-600 dark:text-primary-400 font-bold italic">
                       {isRTL ? testimonial.roleAr : testimonial.role}
                     </p>
                  </div>
               </div>

               <div className="space-y-6 pt-10 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-4 text-neutral-700 dark:text-neutral-300">
                     <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm border border-neutral-100 dark:border-neutral-700">
                        <School className="w-5 h-5 text-primary-500" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">School</span>
                        <span className="text-body font-bold">{isRTL ? testimonial.schoolAr : testimonial.school}</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 text-neutral-700 dark:text-neutral-300">
                     <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm border border-neutral-100 dark:border-neutral-700">
                        <Calendar className="w-5 h-5 text-primary-500" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Year</span>
                        <span className="text-body font-bold">{testimonial.year}</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="pt-10 space-y-4">
               <a
                 href={testimonial.filePath}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-primary-600 text-white font-black uppercase tracking-widest hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/30 active:scale-[0.98]"
               >
                 <ExternalLink className="w-5 h-5" />
                 {t('common.open', { defaultValue: 'Open Original' })}
               </a>
               <a
                 href={testimonial.filePath}
                 download
                 className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 font-black uppercase tracking-widest hover:bg-white dark:hover:bg-neutral-800 transition-all active:scale-[0.98]"
               >
                 <Download className="w-5 h-5" />
                 {t('common.download', { defaultValue: 'Download' })}
               </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
