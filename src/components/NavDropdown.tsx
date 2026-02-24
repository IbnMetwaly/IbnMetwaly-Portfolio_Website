import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface NavLink {
  path: string;
  label: string;
}

interface NavDropdownProps {
  label: string;
  links: NavLink[];
}

export default function NavDropdown({ label, links }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = links.some(link => location.pathname === link.path);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`flex items-center space-x-1 text-small font-medium transition-colors duration-fast hover:text-primary-600 dark:hover:text-primary-400 ${
          isActive ? 'text-primary-600 dark:text-primary-400' : 'text-neutral-700 dark:text-neutral-300'
        }`}
      >
        <span>{label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-normal ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-56 backdrop-blur-md bg-white/90 dark:bg-neutral-900/90 rounded-md shadow-lg border border-neutral-200 dark:border-neutral-800 py-2 z-50"
          >
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2 text-sm transition-colors duration-fast ${
                  location.pathname === link.path
                    ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
