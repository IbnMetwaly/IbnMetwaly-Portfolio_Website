import asyncio
from playwright.async_api import async_playwright

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        print("Navigating to Awards page...")
        await page.goto('http://localhost:5173/awards')

        # Wait for images to load
        await page.wait_for_timeout(2000)

        # Check for images inside the masonry grid section
        # The section has the heading "Voices of impact from our community"
        testimonial_section = page.locator('h2:has-text("Voices of impact from our community")').locator('xpath=..')
        images = page.locator('img[loading="lazy"]')
        count = await images.count()
        print(f"Number of lazy-loaded images (testimonials): {count}")

        if count > 0:
            print("SUCCESS: Testimonials found.")
        else:
            print("FAILURE: No testimonials found.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
