import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))
        page.on("requestfailed", lambda request: print(f"REQUEST_FAILED: {request.url} {request.failure.error_text}"))
        page.on("response", lambda response: print(f"RESPONSE: {response.status} {response.url}"))

        try:
            await page.goto('http://localhost:5173/awards', wait_until='networkidle')
            # Scroll down to testimonials
            await page.evaluate("window.scrollTo(0, 1500)")
            await asyncio.sleep(5) # Give it more time to load
            await page.screenshot(path='testimonials_section_retry.png', full_page=True)
            print("Screenshot saved to testimonials_section_retry.png")

            # Check if testimonials are present in DOM
            has_testimonials = await page.query_selector_all('.masonry-grid-item')
            print(f"Number of masonry items: {len(has_testimonials)}")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            await browser.close()

asyncio.run(run())
