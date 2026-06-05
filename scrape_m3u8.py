import os
import sys
import time
import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

TARGET_URL = os.environ.get("TARGET_URL", "https://news.abplive.com/live-tv")
TIMEOUT_SECONDS = int(os.environ.get("TIMEOUT", "30"))

def extract_m3u8_urls():
    print(f"[INFO] Starting scraper for: {TARGET_URL}")
    print(f"[INFO] Timeout: {TIMEOUT_SECONDS}s")

    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")
    options.set_capability("goog:loggingPrefs", {"performance": "ALL", "browser": "ALL"})

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    m3u8_urls = set()

    try:
        driver.get(TARGET_URL)
        print(f"[INFO] Page loaded: {TARGET_URL}")

        driver.execute_cdp_cmd("Network.enable", {})
        print("[INFO] CDP Network enabled")

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
                            print(f"[FOUND] Request/Response .m3u8: {url}")

                    # Capture response body for .m3u8 URLs
                    if method == "Network.responseReceived":
                        response_url = params.get("response", {}).get("url", "")
                        if response_url and ".m3u8" in response_url:
                            request_id = params.get("requestId", "")
                            try:
                                body = driver.execute_cdp_cmd("Network.getResponseBody", {"requestId": request_id})
                                if body and body.get("body"):
                                    print(f"[FOUND] Response Body .m3u8: {response_url}")
                                    m3u8_urls.add(response_url)
                            except Exception:
                                pass

            except Exception as e:
                print(f"[WARN] Log processing error: {e}")

            time.sleep(1)

        print(f"[INFO] Scrape complete. Total unique .m3u8 URLs found: {len(m3u8_urls)}")
        for url in m3u8_urls:
            print(f"[RESULT] {url}")

        if not m3u8_urls:
            print("[WARN] No .m3u8 URLs found. The page may not have a live stream, or it may use a different streaming format.")
            return 1

        return 0

    except Exception as e:
        print(f"[ERROR] {e}")
        return 1

    finally:
        driver.quit()

if __name__ == "__main__":
    sys.exit(extract_m3u8_urls())
