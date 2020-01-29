# racemap
A small graphical application, which assembles a view into local sail races for the season. 

Conseptually I want to index all local races and clubs registered at the manage2sail service.
Based on a search for races (possibly filtered by class or time), they will be presented in a 
leaflet map portal.

## Backend
The backend parsing data from manage2sail is written in node. To build and test:
```
cd server
npm ci
npm run test
```

## Search
Not yet written. Planned implemented with elasticsearch.

## Frontend
Not yet added. Planned implemented with leaflet.
