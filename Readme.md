# TransitWorks  
### Delivers up to the minute service notices for your daily transit routes
#
## Project Description
Get a no-nonsense list of the latest delays, cancellations, or advisories on your public transit systems.
Customize your app to see only notices from your selected routes.

Currently Supports Toronto Transit Comission (TTC) and GO Transit (Metrolinx).

## Screenshots
 <p align="center" width="100%">
    <img width="30%" src="https://github.com/A-DUYVESTYN/transitWorks/blob/main/client/public/Screen%20Shot%202023-04-07%20at%2019.25.20.png" alt="Welcome Screen">
</p>

#### Dashboard
<p align="center" width="100%">
    <img width="40%" src="https://github.com/A-DUYVESTYN/transitWorks/blob/main/client/public/Screen%20Shot%202023-04-07%20at%2019.25.38%20-%20main%20screen%20(phone).png" alt="Dashboard">
</p>

#### Set your usual transit routes
<p align="center" width="100%">
    <img width="40%" src="https://github.com/A-DUYVESTYN/transitWorks/blob/main/client/public/Screen%20Shot%202023-04-07%20at%2019.27.14.png" alt="Customize the transit routes on the dashboard">
</p>

#### Tablet Dashboard with TTC and GO feeds
<p align="center" width="100%">
    <img width="66%" src="https://github.com/A-DUYVESTYN/transitWorks/blob/main/client/public/Screen%20Shot%202023-04-07%20at%2019.46.59%20-%20main%20screen%20(tablet%20-%20landscape).png" alt="Dashboard on Ipad">
</p>

## Project Stack

__Front-End:__ JavaScript, React, Axios, TailwindCSS, DiasyUI

__Back-End:__ Express, Node.js, MongoDB Atlas

## Client Setup

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Install dependencies with `npm install`.
- Create .env file and ensure all necessary API keys from *.env.example* are present. This includes
    - GO transit GTFL
    - twitter (ttcnotices)

## API server Setup

- Install dependencies with `npm install`.
- Create .env file and ensure all necessary API keys from **.env.example** are present.
- Once run `npm start` from the root directory of the project to launch the server. 
- Alternatively run `npm run dev` to use nodemon

## Database:
- install and run a mongodb instance and create a database, add the `MONGO_URL` used for databse connection as an environment variable in **.env**
- reset and seed the mongodb database using the script `npm run db:reset`

**Note** : _For full functionality of the web application, both the client and the API server applications must be running_


