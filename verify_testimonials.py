import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        try:
            await page.goto('http://localhost:5173/awards', wait_until='networkidle')
            # Scroll down to testimonials
            await page.evaluate("window.scrollTo(0, 1500)")
            await asyncio.sleep(2)
            await page.screenshot(path='testimonials_section.png', full_page=True)
            print("Screenshot saved to testimonials_section.png")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            await browser.close()

asyncio.run(run())
