# happiness-inc

## Purpose:
We developed a 3-tier application that shows different happiness measurements around the world and some of the effects the measurements may have on different countries. These effects may range from the economy to levels of public trust. We then connected a news organization's database to see if there are any significant events that may have contributed to the happiness of a country. 

## How?:
We used Leaflet.js and Plotly to create a Choropleth that shows the amount of happiness that was discovered in a recent study. We give the user the option to browse happiness data from each country from 2015 to 2017. We also used Plotly to create graphs to show any sort of regression between happiness and other various factors. We used an API from a news organization to pull the recent news stories in relation to each country. 

## Data Sources:
https://www.kaggle.com/unsdsn/world-happiness#2017.csv  
https://www.kaggle.com/zillow/zecon#all_available_metrics.json  
https://www.kaggle.com/worldbank/world-development-indicators  
https://newsapi.org/sources

## Tools used:
Python  
Flask  
MongoDB  
PyMongo  
JavaScript  
leaflet.js  
Plotly  
D3.js  
HTML  
CSS  
API  
Bootstrap  

## Database Considerations:
We used MongoDB because it was easier to store our datasets. It was not necessary to merge any primary or foreign keys therefore we did not need a relational database.

## Code Snippet for Front-End side of application:

## Code snippet for Back-End side of application:
