# TransitWorks - Delivers up to the minute service notices for your daily transit routes
## Project Description

Get a no-nonsense list of the latest delays, cancellations, or advisories on your public transit systems.
Customize your app to see only notices from your selected routes.

Currently Supports Toronto Transit Comission (TTC) and GO Transit (Metrolinx).

## Client Setup

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Install dependencies with `npm install`.
- Create .env file and ensure all necessary API keys from .env.example are present.

## API server Setup

- Install dependencies with `npm install`.
- Create .env file and ensure all necessary API keys from .env.example are present.
- Once run `npm start` from the root directory of the project to launch the server. 
- Alternatively run `npm run dev` to use nodemon

## Database:
- install and run a mongodb instance and create a database, add the MONGO_URL used for databse connection as an environment variable in .env
- reset and seed the mongodb database using the script `npm run db:reset`

**Note** : _For full functionality of the web application, both the client and the API server applications must be running_

## Project Stack

__Front-End:__ JavaScript, HTML, React, Axios, TailwindCSS, DiasyUI

__Back-End:__ Express, Node.js,
