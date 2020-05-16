# racemap
A small graphical application, which assembles a view into local sail races for the season. 

Conseptually I want to index all local races and clubs registered at the manage2sail service.
Based on a search for races (possibly filtered by boat class or time), they will be presented in a 
leaflet map portal.

## Search
The service requires an available, running elasticsearch instance.

## Backend
The backend parsing data from manage2sail is written in node. To build and test:
```
cd server
npm ci
npm run test
```
Scrape race data and feed to index:
```
npm run all
```

## Frontend
A node express server with a map from kartverket presented with leaflet.
```
cd front
npm start
```

