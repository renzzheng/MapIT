# scraping + regex logic for extracting data from web pages
# scraper.py
import re
import requests
from requests_html import HTMLSession
from bs4 import BeautifulSoup

def extract_addresses(url: str):
    session = HTMLSession()
    res = session.get(url)
    res.html.render(timeout=20)   # executes the JS

    text = res.html.text
    pattern = r"\d{1,5}\s+[A-Za-z0-9\.\s]+(?:St|Street|Ave|Avenue|Rd|Road|Blvd|Drive|Dr|Lane|Ln|Way|Plaza|Plz|Center|Ctr|Court|Ct|Circle|Cir|Parkway|Pkwy|Highway|Hwy)[,]?\s+[A-Za-z\s]+,\s+[A-Z]{2}\s+\d{5}"

    matches = re.findall(pattern, text)
    unique_addresses = list(set(m.strip() for m in matches))
    return {"addresses": unique_addresses}
