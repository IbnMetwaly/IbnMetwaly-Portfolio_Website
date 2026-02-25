import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function PublicLayout() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-background-dark-page text-neutral-900 dark:text-neutral-100 transition-colors duration-normal">
            <Navigation />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
