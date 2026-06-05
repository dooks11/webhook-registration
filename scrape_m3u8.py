import os
import sys
import time
import json
import argparse
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

TARGET_URL = os.environ.get("TARGET_URL", "https://news.abplive.com/live-tv")
TIMEOUT_SECONDS = int(os.environ.get("TIMEOUT", "30"))


def main():
    parser = argparse.ArgumentParser(description="Extract .m3u8 URLs from a live stream page.")
    parser.add_argument("--quiet", "-q", action="store_true", help="Suppress non-essential output.")
    args = parser.parse_args()
    quiet = args.quiet

    def log_info(msg):
        if not quiet:
            print(f"[INFO] {msg}")

    def log_found(msg):
        if not quiet:
            print(f"[FOUND] {msg}")

    def log_warn(msg):
        print(f"[WARN] {msg}")

    def log_error(msg):
        print(f"[ERROR] {msg}")

    def log_result(msg):
        print(f"[RESULT] {msg}")

    log_info(f"Starting scraper for: {TARGET_URL}")
    log_info(f"Timeout: {TIMEOUT_SECONDS}s")

    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_argument("--window-size=1920,1080")
    options.add_argument(
        "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    )
    options.set_capability("goog:loggingPrefs", {"performance": "ALL", "browser": "ALL"})

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    m3u8_urls = set()

    try:
        driver.get(TARGET_URL)
        log_info(f"Page loaded: {TARGET_URL}")

        driver.execute_cdp_cmd("Network.enable", {})
        log_info("CDP Network enabled")

        end_time = time.time() + TIMEOUT_SECONDS
        while time.time() < end_time:
            try:
                logs = driver.get_log("performance")
                for log in logs:
                    message = json.loads(log["message"])
                    params = message.get("message", {}).get("params", {})
                    method = message.get("message", {}).get("method", "")

                    # Capture network request URLs
                    if method in ("Network.requestWillBeSent", "Network.responseReceived"):
                        url = params.get("request", {}).get("url", "")
                        if not url:
                            url = params.get("response", {}).get("url", "")
                        if url and ".m3u8" in url:
                            m3u8_urls.add(url)
                            log_found(f"Request/Response .m3u8: {url}")

                    # Capture response body for .m3u8 URLs
                    if method == "Network.responseReceived":
                        response_url = params.get("response", {}).get("url", "")
                        if response_url and ".m3u8" in response_url:
                            request_id = params.get("requestId", "")
                            try:
                                body = driver.execute_cdp_cmd(
                                    "Network.getResponseBody", {"requestId": request_id}
                                )
                                if body and body.get("body"):
                                    log_found(f"Response Body .m3u8: {response_url}")
                                    m3u8_urls.add(response_url)
                            except Exception:
                                pass

            except Exception as e:
                log_warn(f"Log processing error: {e}")

            time.sleep(1)

        log_info(f"Scrape complete. Total unique .m3u8 URLs found: {len(m3u8_urls)}")
        for url in m3u8_urls:
            log_result(url)

        if not m3u8_urls:
            log_warn(
                "No .m3u8 URLs found. The page may not have a live stream, or it may use a different streaming format."
            )
            return 1

        return 0

    except Exception as e:
        log_error(str(e))
        return 1

    finally:
        driver.quit()


if __name__ == "__main__":
    sys.exit(main())
