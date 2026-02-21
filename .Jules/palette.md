
## UX Learning: Navigation Density
- **Issue**: Navigation bar was limited to 5 items, causing important tabs to be hidden on desktop.
- **Solution**: Removed the slice to show all 10 tabs, while reducing horizontal spacing (`space-x-6` to `space-x-4`) and font size (`text-body` to `text-small`) to ensure they fit within the 1400px container.
- **Result**: Improved discoverability of all site sections without compromising the layout.

## UX Learning: Dynamic Certificate Linking
- **Issue**: Awards and certifications were static text without proof of achievement.
- **Solution**: Integrated Supabase storage to link each item to its corresponding PDF certificate. Added a consistent "View Certificate" action with an `ExternalLink` icon.
- **Benefit**: Increases credibility of the portfolio and provides easy access to credentials for prospective employers or collaborators.
- **Pattern**: Used a structured URL pattern `public/certificates/[category]/[id].pdf` to maintain organization in the storage bucket.

## UX Learning: Color Contrast on Gradients
- **Issue**: Text colors on accent gradients in dark mode had insufficient contrast (e.g., `neutral-400` on `accent-900`), making them nearly unreadable.
- **Solution**: Increased text contrast by using `neutral-200` for secondary text and `primary-300` for primary/accent text. Ensured the background gradient had a defined dark base (`accent-900`).
- **Benefit**: Improved accessibility and readability for users using dark mode.
- **Accessibility**: Enhanced contrast for small text on complex backgrounds.

## UX Learning: Fallback for Missing Translations
- **Issue**: i18next `t()` returns the full key string when a translation is missing, which leaked into the UI (e.g., showing `certifications.licenses.license1.organization`).
- **Solution**: Implemented a fallback using the `defaultValue` option in `t()` to return an empty string if the key is missing.
- **Result**: Cleaner UI that doesn't expose internal key structures to users when optional metadata is unavailable.

## UX Learning: Design System Consistency
- **Issue**: License cards were using a custom amber gradient background that clashed with the primary teal brand colors and provided poor text contrast in dark mode.
- **Solution**: Replaced the custom gradient with standard surface backgrounds (`bg-white` / `bg-background-dark-surface`) and used a top border with the `accent` color (`border-t-4 border-accent-500`).
- **Result**: Licenses now match the "Awards" design pattern established on the Home page, creating a more cohesive and professional "overall theme" across the site.
- **Accessibility**: Standardizing on the theme's surface colors automatically resolved the contrast issues by utilizing the pre-defined high-contrast text pairs for those surfaces.
