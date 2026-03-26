from playwright.sync_api import sync_playwright, expect
import re
import time

def run_verification():
    # Give the server a moment to start up before launching the browser
    print("Waiting for server to initialize...")
    time.sleep(15)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Listen for all console events and print them
        page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.type}: {msg.text()}"))

        # Navigate to the root, which should redirect to the latest game date
        print("Navigating to http://localhost:3000/")
        page.goto("http://localhost:3000/", timeout=60000, wait_until="networkidle")

        print(f"Current URL: {page.url}")

        # The redirect might have already happened, or might be happening.
        # So we check if we are already there, if not, we wait.
        if not re.search(r'/date/\d{4}-\d{2}-\d{2}', page.url):
            print("Waiting for redirect to /date/...")
            expect(page).to_have_url(re.compile(r'/date/\d{4}-\d{2}-\d{2}'), timeout=30000)

        print(f"Redirected to {page.url}")

        # Wait for the main container to be visible
        print("Waiting for game grid...")
        # Use a more specific locator to make sure we're waiting for our content
        expect(page.locator(".bg-white.border.border-gray-200").first).to_be_visible(timeout=30000)
        print("Game grid content is visible.")

        # Find the first game card that is 'finished'
        cards = page.locator(".grid > div").all()
        finished_card = None
        for card in cards:
            # A finished game should not have 'Live' or a time string.
            # It should have a score.
            status_text_locator = card.locator(".text-sm.font-bold")
            if status_text_locator.count() > 0:
                status_text = status_text_locator.inner_text()
                if status_text == 'Live':
                    continue

            score_visible = card.locator("p[style*='font-size: 2rem']").is_visible()

            if score_visible:
                 finished_card = card
                 print("Found a finished game card to verify.")
                 break

        if not finished_card:
            no_games_message = page.locator("p:text('この日は試合がありませんでした')")
            if no_games_message.is_visible():
                print("No games scheduled for today. This is not an error.")
                page.screenshot(path="jules-scratch/verification/no_games_today.png")
                browser.close()
                return
            else:
                page.screenshot(path="jules-scratch/verification/verification_error.png")
                raise AssertionError("Could not find a finished game card, and no 'no games' message was found.")

        # Verify summary is present and has some text
        summary = finished_card.locator("p.text-xs.text-gray-600")
        expect(summary).to_be_visible()
        expect(summary).not_to_be_empty()
        summary_text = summary.inner_text()
        print(f"Summary found: {summary_text}")

        # Assert that the summary now contains pitcher info
        assert '[勝]' in summary_text or '[敗]' in summary_text, f"Summary does not contain pitcher info: {summary_text}"
        print("Pitcher info correctly found in summary.")

        # Take a screenshot of the whole page
        print("Taking final screenshot...")
        page.screenshot(path="jules-scratch/verification/verification.png")

        browser.close()
        print("Verification script finished successfully.")

if __name__ == "__main__":
    run_verification()
