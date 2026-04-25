import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Certifications from './Certifications';
import { ThemeProvider } from '../context/ThemeContext';

// Mock i18n
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock components
vi.mock('../components/CertificateModal', () => ({
  default: ({ certificateUrl, trigger }: any) => <div data-testid="cert-modal" data-url={certificateUrl}>{trigger}</div>,
}));

// Mock framer-motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
      p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    },
  };
});

describe('Certifications page', () => {
  beforeEach(() => {
    // Fix window.matchMedia is not a function
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('renders certifications title', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Certifications />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('certifications.title')).toBeInTheDocument();
  });

  it('uses Vercel Blob URL for certificates', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Certifications />
        </ThemeProvider>
      </BrowserRouter>
    );

    const certModals = screen.getAllByTestId('cert-modal');
    expect(certModals[0]).toHaveAttribute('data-url', expect.stringContaining('https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/'));
  });
});
