import bs4
from bs4 import BeautifulSoup as soup
from urllib.request import urlopen
from datetime import datetime

def scrape_news(input_from_click):
    input_from_click_processed = input_from_click.replace(" ","\%20")
    country_name = input_from_click_processed
    search_term=country_name+'\%20happiness'
    news_url=f"https://news.google.com/rss/search?q={search_term}"
    Client=urlopen(news_url)
    xml_page=Client.read()
    Client.close()

    soup_page=soup(xml_page,"xml")
    news_list=soup_page.findAll("item")

    news_articles = ""
    # Print news title, url and publish date
    for news in news_list[:25]:
        #print(news.title.text)
        news_articles+=news.title.text+'</br>'
        #print(news.link.text)
        news_articles+=news.link.text+'</br>'
        #print(news.pubDate.text)
        news_articles+=news.pubDate.text+'</br>'
        #print("-"*60)
        news_articles+="-"*60+'</br>'
        
    #print(f"Number of articles: {len(news_list)}")
    return news_articles


