
## UX Learning: Navigation Density
- **Issue**: Navigation bar was limited to 5 items, causing important tabs to be hidden on desktop.
- **Solution**: Removed the slice to show all 10 tabs, while reducing horizontal spacing (`space-x-6` to `space-x-4`) and font size (`text-body` to `text-small`) to ensure they fit within the 1400px container.
- **Result**: Improved discoverability of all site sections without compromising the layout.

## UX Learning: Dynamic Certificate Linking
- **Issue**: Awards and certifications were static text without proof of achievement.
- **Solution**: Integrated Supabase storage to link each item to its corresponding PDF certificate. Added a consistent "View Certificate" action with an `ExternalLink` icon.
- **Benefit**: Increases credibility of the portfolio and provides easy access to credentials for prospective employers or collaborators.
- **Pattern**: Used a structured URL pattern `public/certificates/[category]/[id].pdf` to maintain organization in the storage bucket.
