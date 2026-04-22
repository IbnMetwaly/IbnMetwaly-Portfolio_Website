import { motion } from "framer-motion";
import { FileText, Eye, GraduationCap, Users, Briefcase, Calendar, School, Share2 } from "lucide-react";
import { Testimonial, Category } from "./data";
import { useTranslation } from "react-i18next";
import { cn } from "../../lib/utils";
import { toast } from "sonner";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  onClick: () => void;
}

const categoryConfig: Record<Category, { icon: any; color: string; bg: string; border: string }> = {
  parents: {
    icon: Users,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/30",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  students: {
    icon: GraduationCap,
    color: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-50 dark:bg-sky-900/30",
    border: "border-sky-200 dark:border-sky-800",
  },
  colleagues: {
    icon: Briefcase,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-900/30",
    border: "border-violet-200 dark:border-violet-800",
  },
};

export function TestimonialCard({ testimonial, index, onClick }: TestimonialCardProps) {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const cat = categoryConfig[testimonial.category];
  const CatIcon = cat.icon;

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(testimonial.filePath);
    toast.success(t('common.linkCopied', { defaultValue: 'Link copied to clipboard!' }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="break-inside-avoid mb-6 group"
    >
      <motion.div
        whileHover={{ y: -6 }}
        onClick={onClick}
        className={cn(
          "relative overflow-hidden rounded-2xl cursor-pointer bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md hover:shadow-2xl-light dark:hover:shadow-2xl-dark transition-all duration-normal",
          testimonial.cardHeight
        )}
      >
        {/* Visual content */}
        {testimonial.fileType === "image" ? (
          <img
            src={testimonial.filePath}
            alt={testimonial.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center justify-center p-8 text-center space-y-4">
             <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-3xl flex items-center justify-center shadow-inner">
                <FileText className="w-10 h-10 text-primary-600 dark:text-primary-400" />
             </div>
             <div>
                <p className="text-body font-bold text-neutral-900 dark:text-neutral-100">{isRTL ? testimonial.nameAr : testimonial.name}</p>
                <p className="text-small text-neutral-500 dark:text-neutral-400 mt-1 uppercase tracking-wider font-semibold">{t('nav.viewCertificate')}</p>
             </div>
          </div>
        )}

        {/* Category Badge */}
        <div className={cn("absolute top-4 z-20 flex items-center gap-2", isRTL ? "left-4 flex-row-reverse" : "right-4")}>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            title="Share"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <div className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full border backdrop-blur-md text-[10px] font-black uppercase tracking-tighter shadow-sm", cat.bg, cat.border, cat.color)}>
            <CatIcon className="w-3 h-3" />
            <span>{t(`testimonials.categories.${testimonial.category}`)}</span>
          </div>
        </div>

        {/* Hover metadata overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-transparent flex flex-col justify-end p-8 text-white"
        >
          <div className="space-y-4 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-normal">
            <div>
              <p className="text-h3 font-bold leading-none mb-2">{isRTL ? testimonial.nameAr : testimonial.name}</p>
              <div className="flex items-center gap-2">
                 <div className="w-4 h-0.5 bg-primary-500 rounded-full" />
                 <p className="text-small text-primary-300 font-bold uppercase tracking-widest">{isRTL ? testimonial.roleAr : testimonial.role}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutral-300 font-medium">
              <span className="flex items-center gap-2">
                <School className="w-4 h-4 text-primary-400" />
                {isRTL ? testimonial.schoolAr : testimonial.school}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-400" />
                {testimonial.year}
              </span>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white text-xs font-black uppercase tracking-widest hover:bg-primary-700 transition-colors shadow-lg shadow-primary-900/40">
                <Eye className="w-4 h-4" />
                <span>{testimonial.fileType === "pdf" ? t('nav.viewCertificate') : t('common.view', { defaultValue: 'View' })}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
