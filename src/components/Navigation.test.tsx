import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navigation from './Navigation';
import { ThemeProvider } from '../context/ThemeContext';

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

describe('Navigation component', () => {
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

  it('renders the Download CV button as a download link', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </BrowserRouter>
    );

    const downloadLinkElement = screen.getByText('nav.downloadCV');
    const downloadLink = downloadLinkElement.closest('a');
    expect(downloadLink).not.toBeNull();
    expect(downloadLink?.tagName).toBe('A');
    expect(downloadLink).toHaveAttribute('href', '/Khalid_Metwaly_CV.pdf');
    expect(downloadLink).toHaveAttribute('download', 'Khalid_Metwaly_CV.pdf');
  });

  it('should close the mobile menu when resizing to desktop view', async () => {
    // Set initial viewport to mobile
    window.innerWidth = 768;

    render(
      <BrowserRouter>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </BrowserRouter>
    );

    // Open the mobile menu
    const menuButton = screen.getByLabelText('Open menu');
    fireEvent.click(menuButton);

    // Check if the mobile menu is open
    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(within(mobileMenu).getAllByText('nav.home').length).toBeGreaterThan(0);

    // Resize to desktop view
    window.innerWidth = 1024;
    fireEvent(window, new Event('resize'));

    // Wait for the animation to complete
    await waitFor(() => {
      expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
    });
  });

  it('should have focus-visible styles on toggle buttons', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </BrowserRouter>
    );

    const languageButton = screen.getByLabelText('Switch to Arabic');
    const themeButton = screen.getByLabelText('Switch to dark theme');

    expect(languageButton.className).toContain('focus-visible:ring-2 focus-visible:ring-primary-500');
    expect(themeButton.className).toContain('focus-visible:ring-2 focus-visible:ring-primary-500');
  });
});
