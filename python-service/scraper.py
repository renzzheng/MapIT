# scraping + regex logic for extracting data from web pages
import re
import requests
from bs4 import BeautifulSoup

def extract_addresses(url: str):
    """Scrape the given URL and extract potential addresses using regex."""
    try:
        res = requests.get(url, timeout=10)
        res.raise_for_status()
        soup = BeautifulSoup(res.text, "html.parser")

        text = soup.get_text(separator="\n")
        # USA address regex pattern
        pattern = r"\d{1,5}\s+[A-Za-z0-9\.\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Lane|Ln|Way|Plaza|Plz|Center|Ctr|Court|Ct|Circle|Cir|Parkway|Pkwy|Highway|Hwy)[,]?\s+[A-Za-z\s]+,\s+[A-Z]{2}\s+\d{5}"

        matches = re.findall(pattern, text)
        unique_addresses = list(set([m.strip() for m in matches]))
        return {"addresses": unique_addresses}

    except Exception as e:
        return {"error": str(e)}
