# Description

## General info
Project have been built with express.js and typescript. For tests have used a jest framework. There is possibility to pack app in a docker container.

**All further operations should be done in a source folder** 

## Run app

Install dependencies `npm i`

Run app on host machine `npm start` 

App will be available at `localhost:9090`

## Run tests

Install dependencies `npm i`

Run tests with `npm run tests`

Run coverage with `npm run coverage`

P.S. Tests written only for business logic 
## App Containerization | Docker
Build image:
```
docker build -t maze-api:latest .
```

Run container
```
docker run -d -p 9090:9090 --name mazesolver maze-api:latest
```

App will be available at `localhost:9090`

## Endpoints

* `/` - generic greeting
* `/maze` - info to make POST request
* `POST /maze` - triggers maze min. steps counter logic. Requires maze data as request body
