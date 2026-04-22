import i18n from '../../i18n';

export type Category = "parents" | "students" | "colleagues";
export type FileType = "image" | "pdf";
export type CardHeight = "h-56" | "h-64" | "h-72" | "h-80" | "h-96";

export interface Testimonial {
  id: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  school: string;
  schoolAr: string;
  year: string;
  category: Category;
  filePath: string;
  fileType: FileType;
  cardHeight: CardHeight;
}

export const CATEGORIES: { value: Category | "all"; labelKey: string }[] = [
  { value: "all", labelKey: "testimonials.categories.all" },
  { value: "parents", labelKey: "testimonials.categories.parents" },
  { value: "students", labelKey: "testimonials.categories.students" },
  { value: "colleagues", labelKey: "testimonials.categories.colleagues" },
];

const cardHeights: CardHeight[] = ["h-56", "h-64", "h-72", "h-80", "h-96"];

/**
 * VERCEL BLOB CONFIGURATION
 * Using the provided Vercel Blob store URL.
 */
const VERCEL_BLOB_BASE_URL = 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com';

export const getTestimonials = (t: any): Testimonial[] => {
  const testimonialsList: Testimonial[] = [];
  const list = t('testimonials.list', { returnObjects: true });

  if (typeof list === 'object' && list !== null) {
    Object.entries(list).forEach(([key, value]: [string, any], index) => {
      // Determine category based on school or index fallback
      const category = (value.school === 'ENS UAE' || value.school === 'مدارس الإمارات الوطنية') ? 'parents' : 'students';

      const rawPath = value.certificatePath || `${key}.pdf`;
      // Clean path: ensure no leading slash if base URL has one, or vice versa
      const cleanPath = rawPath.startsWith('/') ? rawPath.substring(1) : rawPath;
      const fullPath = `${VERCEL_BLOB_BASE_URL}/${cleanPath}`;

      testimonialsList.push({
        id: key,
        name: value.name || key,
        nameAr: i18n.t(`testimonials.list.${key}.name`, { lng: 'ar', defaultValue: value.name }),
        role: value.role || 'Student / Colleague / Parent',
        roleAr: i18n.t(`testimonials.list.${key}.role`, { lng: 'ar', defaultValue: 'طالب / زميل / ولي أمر' }),
        school: value.school || '',
        schoolAr: i18n.t(`testimonials.list.${key}.school`, { lng: 'ar', defaultValue: value.school }),
        year: value.year || '',
        category: category as Category,
        filePath: fullPath,
        fileType: rawPath.toLowerCase().endsWith('.png') || rawPath.toLowerCase().endsWith('.jpg') || rawPath.toLowerCase().endsWith('.jpeg') ? 'image' : 'pdf',
        cardHeight: cardHeights[index % cardHeights.length]
      });
    });
  }

  return testimonialsList;
};
