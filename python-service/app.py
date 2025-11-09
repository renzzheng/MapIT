# create flask app to scrape data from a website and return it as json
# from flask import Flask, jsonify
# from scraper import scrape_data
# app = Flask(__name__)
# @app.route('/scrape', methods=['GET'])
# def scrape_endpoint():
#     data = scrape_data()
#     return jsonify(data)
# if __name__ == '__main__':

from flask import Flask, request, jsonify
from scraper import extract_addresses
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/scrape", methods=["POST"])
def scrape():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "URL is required"}), 400

    result = extract_addresses(url)
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
