from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('http://localhost:5173/certifications')

        # Set dark theme
        page.evaluate("() => { localStorage.setItem('theme', 'dark'); document.documentElement.classList.add('dark'); }")

        # Reload to ensure theme is applied (though class addition should be enough)
        page.reload()

        # Wait for animations
        time.sleep(2)

        # Take screenshot
        page.screenshot(path='certifications_dark.png', full_page=True)

        browser.close()

if __name__ == '__main__':
    run()
