import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import {
  LayoutDashboard,
  Clock,
  Image as ImageIcon,
  Award,
  Briefcase,
  Gamepad2,
  LogOut,
  Mail
} from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/admin/timeline', icon: Clock, label: 'Timeline' },
    { to: '/admin/gallery', icon: ImageIcon, label: 'Gallery' },
    { to: '/admin/qualifications', icon: Award, label: 'Qualifications' },
    { to: '/admin/services', icon: Briefcase, label: 'Services' },
    { to: '/admin/inquiries', icon: Mail, label: 'Inquiries' },
    { to: '/admin/playground', icon: Gamepad2, label: 'Playground' },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-background-dark-page">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-background-dark-surface border-r border-neutral-200 dark:border-neutral-800 flex flex-col fixed h-full">
        <div className="p-xl border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-h4 font-bold text-primary-600">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-md space-y-sm overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-sm rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-md border-t border-neutral-200 dark:border-neutral-800">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full p-sm text-neutral-600 dark:text-neutral-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/10 dark:hover:text-red-400 rounded-md transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 overflow-auto p-xl">
        <Outlet />
      </main>
    </div>
  );
}
