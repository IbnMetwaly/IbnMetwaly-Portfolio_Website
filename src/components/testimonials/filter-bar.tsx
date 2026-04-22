import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { CATEGORIES, Category } from "./data";
import { useTranslation } from "react-i18next";
import { cn } from "../../lib/utils";

interface FilterBarProps {
  activeCategory: Category | "all";
  searchQuery: string;
  onCategoryChange: (cat: Category | "all") => void;
  onSearchChange: (q: string) => void;
  resultCount: number;
  totalCount: number;
  categoryCounts: Record<string, number>;
}

const categoryColors: Record<Category | "all", { pill: string; active: string; dot: string }> = {
  all: {
    pill: "border-primary-500/40 text-primary-600 dark:text-primary-400 hover:bg-primary-500/10",
    active: "bg-primary-600 text-white border-primary-600 dark:bg-primary-400 dark:text-neutral-900",
    dot: "bg-primary-500",
  },
  parents: {
    pill: "border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10",
    active: "bg-emerald-500 text-white border-emerald-500",
    dot: "bg-emerald-500",
  },
  students: {
    pill: "border-sky-500/40 text-sky-600 dark:text-sky-400 hover:bg-sky-500/10",
    active: "bg-sky-500 text-white border-sky-500",
    dot: "bg-sky-500",
  },
  colleagues: {
    pill: "border-violet-500/40 text-violet-600 dark:text-violet-400 hover:bg-violet-500/10",
    active: "bg-violet-500 text-white border-violet-500",
    dot: "bg-violet-500",
  },
};

export function FilterBar({
  activeCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
  resultCount,
  totalCount,
  categoryCounts
}: FilterBarProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="w-full space-y-6">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <div className={cn("flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 mr-2", isRTL && "mr-0 ml-2")}>
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">{t('common.filter', { defaultValue: 'Filter' })}</span>
        </div>

        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.value;
          const colors = categoryColors[cat.value];
          const count = categoryCounts[cat.value] || 0;

          return (
            <motion.button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-semibold transition-all duration-normal cursor-pointer select-none",
                isActive ? colors.active : colors.pill
              )}
            >
              <span className="relative flex items-center gap-2">
                {cat.value !== "all" && !isActive && (
                  <span className={cn("w-1.5 h-1.5 rounded-full", colors.dot)} />
                )}
                <span>{t(cat.labelKey)}</span>
                <span
                  className={cn(
                    "text-xs px-1.5 py-0.5 rounded-full font-bold",
                    isActive
                      ? "bg-black/10 dark:bg-white/20"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                  )}
                >
                  {count}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Search + Result Count Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md w-full group">
          <div className={cn("absolute inset-y-0 flex items-center pointer-events-none", isRTL ? "right-3" : "left-3")}>
            <Search className="w-4 h-4 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('testimonials.searchPlaceholder', { defaultValue: 'Search by name or school...' })}
            className={cn(
              "w-full py-3 text-sm rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all shadow-sm",
              isRTL ? "pr-10 pl-10 text-right" : "pl-10 pr-10"
            )}
          />

          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => onSearchChange("")}
                className={cn("absolute inset-y-0 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors", isRTL ? "left-3" : "right-3")}
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Result Count */}
        <div className="text-small text-neutral-500 dark:text-neutral-400">
          {t('testimonials.showing', {
            defaultValue: 'Showing {{count}} of {{total}} testimonials',
            count: resultCount,
            total: totalCount
          })}
        </div>
      </div>
    </div>
  );
}
