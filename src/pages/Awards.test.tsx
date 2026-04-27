import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Awards from './Awards';
import { ThemeProvider } from '../context/ThemeContext';

// Mock i18n
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock components
vi.mock('../components/MasonryGrid', () => ({
  MasonryGrid: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock('../components/ImageModal', () => ({
  default: ({ src, alt, trigger }: any) => <div>{trigger}</div>,
}));
vi.mock('../components/CertificateModal', () => ({
  default: ({ certificateUrl, trigger }: any) => <div data-testid="cert-modal" data-url={certificateUrl}>{trigger}</div>,
}));

// Mock framer-motion to avoid IntersectionObserver issues
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  const stripMotionProps = ({ whileInView, viewport, variants, initial, animate, exit, transition, layoutId, ...props }: any) => props;
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: any) => <div {...stripMotionProps(props)}>{children}</div>,
      h1: ({ children, ...props }: any) => <h1 {...stripMotionProps(props)}>{children}</h1>,
      p: ({ children, ...props }: any) => <p {...stripMotionProps(props)}>{children}</p>,
    },
  };
});

describe('Awards page', () => {
  beforeEach(() => {
    vi.clearAllMocks();

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

  it('renders awards title and list', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Awards />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('awards.title')).toBeInTheDocument();
    expect(screen.getByText('awards.list.award1.title')).toBeInTheDocument();
  });

  it('displays testimonials from hardcoded list', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Awards />
        </ThemeProvider>
      </BrowserRouter>
    );

    const images = screen.getAllByRole('img');
    // It should render images from the TESTIMONIAL_URLS list
    expect(images.length).toBeGreaterThan(0);
    expect(images[0]).toHaveAttribute('src', expect.stringContaining('https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/'));
  });

  it('uses Vercel Blob URL for certificates', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Awards />
        </ThemeProvider>
      </BrowserRouter>
    );

    const certModals = screen.getAllByTestId('cert-modal');
    expect(certModals[0]).toHaveAttribute('data-url', expect.stringContaining('https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/'));
  });
});
