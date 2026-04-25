import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Testimonials from './Testimonials';
import { ThemeProvider } from '../context/ThemeContext';

// Mock i18n
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: 'en',
    },
  }),
}));

// Mock MasonryGrid since it might have complex layout logic
vi.mock('../components/MasonryGrid', () => ({
  MasonryGrid: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Testimonials page', () => {
  beforeEach(() => {
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

  it('renders testimonials title and search bar', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Testimonials />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('testimonials.title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('testimonials.searchPlaceholder')).toBeInTheDocument();
  });

  it('filters testimonials by search query', async () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Testimonials />
        </ThemeProvider>
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('testimonials.searchPlaceholder');
    fireEvent.change(searchInput, { target: { value: 'Robert Chen' } });

    expect(screen.getByText('Dr. Robert Chen')).toBeInTheDocument();
    expect(screen.queryByText('Sarah Jenkins')).not.toBeInTheDocument();
  });

  it('filters testimonials by category', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Testimonials />
        </ThemeProvider>
      </BrowserRouter>
    );

    const studentsButton = screen.getByText('testimonials.categories.students');
    fireEvent.click(studentsButton);

    expect(screen.getByText('د. ليلى منصور')).toBeInTheDocument();
    expect(screen.queryByText('Dr. Robert Chen')).not.toBeInTheDocument();
  });

  it('shows empty state when no matches found', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Testimonials />
        </ThemeProvider>
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('testimonials.searchPlaceholder');
    fireEvent.change(searchInput, { target: { value: 'NonExistentPerson' } });

    expect(screen.getByText('No testimonials found matching your criteria.')).toBeInTheDocument();
  });
});
