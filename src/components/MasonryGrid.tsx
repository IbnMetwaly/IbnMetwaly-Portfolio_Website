import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface MasonryGridProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The number of columns to display.
     * @default 3
     */
    columns?: number;
    /**
     * The gap between items in the grid, corresponding to Tailwind's spacing scale.
     * @default 4
     */
    gap?: number;
}

const MasonryGrid = React.forwardRef<HTMLDivElement, MasonryGridProps>(
    ({ className, columns = 3, gap = 4, children, ...props }, ref) => {
        // Animation variants for child elements
        const cardVariants = {
            hidden: { opacity: 0, y: 20 },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.5,
                    ease: "easeOut",
                },
            },
        };

        // Map gap and columns to Tailwind classes to avoid inline styles
        const columnClass = columns === 1 ? 'columns-1' : columns === 2 ? 'columns-2' : columns === 4 ? 'columns-4' : 'columns-3';
        const gapClass = gap === 2 ? 'gap-2' : gap === 4 ? 'gap-4' : gap === 6 ? 'gap-6' : gap === 8 ? 'gap-8' : 'gap-4';

        return (
            <div
                ref={ref}
                className={cn('w-full', columnClass, gapClass, className)}
                {...props}
            >
                {React.Children.map(children, (child) => (
                    <motion.div
                        className="mb-4 break-inside-avoid" // Prevents items from breaking across columns
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }} // Animate when 20% of the item is visible
                    >
                        {child}
                    </motion.div>
                ))}
            </div>
        );
    }
);

MasonryGrid.displayName = 'MasonryGrid';

export { MasonryGrid };
