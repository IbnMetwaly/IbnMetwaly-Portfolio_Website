import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Footer from './Footer';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

// Mock i18n
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: 'en',
    },
  }),
}));

describe('Footer component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('should display the correct logo based on the theme', () => {
    const TestComponent = () => {
      const { theme, toggleTheme } = useTheme();
      return (
        <div>
          <button onClick={toggleTheme}>Toggle Theme</button>
          <Footer />
        </div>
      );
    };

    render(
      <BrowserRouter>
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      </BrowserRouter>
    );

    // Check light mode logo
    const logo = screen.getByAltText('Khalid Metwaly');
    expect(logo.src).toContain('/images/logo_light.png');

    // Toggle theme and check dark mode logo
    const toggleButton = screen.getByText('Toggle Theme');
    fireEvent.click(toggleButton);
    expect(logo.src).toContain('/images/logo_dark.png');
  });
});
