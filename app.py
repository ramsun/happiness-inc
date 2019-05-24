from flask import Flask, render_template, request, jsonify, send_from_directory
from scraper import scrape_news
import random

app = Flask(__name__)
app._static_folder = '/Users/richard/Desktop/Site/templates/static'


@app.route('/',methods=["GET", "POST"])
def process():
	if request.method == 'POST':
		data = request.json
		articles = scrape_news(data['name'])
		data['name']=articles
		#print(articles)
		return jsonify(data)
	return render_template("index.html")

if __name__ == "__main__":
	app.run(debug=True)