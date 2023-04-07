
TransitWorks App Dev Notes

APIs used
  - twitter to get ttc service disruptions.
  - GO Transit via opendata http://api.openmetrolinx.com/OpenDataAPI/Help
    in General Transit Feed Specification (GTFS) format. get a key from them.
API requests are done on backend.
react frontend
mongodb database

  display alerts in a list on a simple page
  classify the notice by rail line / route
  let user customize their routes

  automatically generate their TTC & GO routes based on the users commute startpoint and destination

## TODO:
 {[(<>)]}_ DEPLOY _{[(<>)]} to digital ocean, use mongodb atlas 
      [optional] (currently usingatlas - investigate whether it's worth it to change db host)



 - [DONE] SETTINGS - show a list of My Routes with add/delete buttons
 - [DONE] SETTINGS - delete route when button is pressed
 - [DONE] SETTINGS - for "add", show a scrollable list of TTC routes to follow, 
  [DONE] SETTINGS - Save this to userpref state.
  SETTINGS - classify as Subway, Bus, Streetcar, blueNight and show appropriate colour
  [DONE] SETTINGS - update database with user's preferences. use mongoDB.
  [DONE] filter route list on main page by userPref
  [DONE] "show all routes" on main page
  provide toggle for "show all routes" on main page
  Add go transit routes (similarly) 
  good guide for CRUD with mongoDB & mongoose
  https://dev.to/halented/part-2-creating-models-for-mongodb-with-mongoose-575d

  Add header to individual TTC and GO components with styling (horizontal lines): 
    Route, Notice

  [DONE]save userid with cookie


##  TODO (frontend api calls that use the database):
  [DONE] get user's userdata, forcing a userID for development
  [DONE] Update users ttcroutes array from frontend
  []

  [DONE]create user in db
  [] delete user
  [] check for duplicate username on signup
  [] login



STRETCH
  in settings, allow clicking multiple routes at once to add


COLOR CODES:
  Line 1: f8c300, rgb(248, 195, 0)
  Line 2: 00923f, rgb(0, 146, 63)
  Line 3: 0082c9, rgb(0, 130, 201)
  Line 4: a21a68, rgb(162, 26, 104)
  TTC streetcar: da251d, rgb(218, 37, 29)
  blue night bus: 024182, rgb(2, 65, 130)
  400 series community bus: 808080, rgb(128, 128, 128)
  express bus: 00923f, rgb(0, 146, 63)

  GO TRANSIT
  light green: 68952d,  rgba(104,149,45)


try to get service disruptions alternatively from TTC website using a webscraper 
https://www.ttc.ca/service-alerts 