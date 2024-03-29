import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import TTC from "./components/TTC";
import GoTransit from "./components/GoTransit";
import Footer from "./components/Footer";
import Settings from "./components/Settings";
import routeList from "./data/routeList";
import Header from "./components/Header";
import { default as Auth } from "./components/Auth/Index";

function App() {
  axios.defaults.withCredentials = true;

  const [devView, setDevView] = useState(false)
  const toggleDevView = () => {
    console.log("changing devView=", devView, " to ", !devView)
    setDevView(!devView)
  }

  const [theme, setTheme] = useState("light")
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark")
    console.log(window.matchMedia('(prefers-color-scheme: dark)'))
    console.log(document.documentElement.classList)
  }
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
    else setTheme('light');
  }, [])
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }, [theme])

  // user data setup
  const [userID, setUserID] = useState("LOADING"); // for development, defualt to user 63eeba3b390423a6f5c7e96f, userName "Pat"
  const [updating, setUpdating] = useState(false)

  const [userPref, setUserPref] = useState({
    _id: null,
    userName: null,
    userEmail: null,
    userPassword: null,
    ttcRoutes: [],
    ttcStations: [],
  })

  const handleLogin = (id) => {
    setUserID(id);
  };
  //function to logout and clear cookie
  const clearUserSession = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/users/logout`)
    .then((res) => {
      setUserID(null);
      console.log(res.data)
    })
    // localStorage.removeItem("user_id");
    
  };

  const addTtcRoute = function (route) { 
    setUpdating(true)
    const newRouteArr = [...userPref.ttcRoutes, route]
    axios.put(`${process.env.REACT_APP_SERVER_URL}/users/update/${userID}`, {...userPref,  ttcRoutes: newRouteArr})
    .then(() => {
      setUserPref(prev => {
        console.log("Added TTC route:", route,". Updated array:", newRouteArr)
        setUpdating(false)
        return {...prev, ttcRoutes: newRouteArr}
      })
    })
    .catch((err) => {
      console.log("Error message on PUT:", err)
    })
  }

  const removeTtcRoute = function (route) {
    setUpdating(true)
    const newRouteArr = [...userPref.ttcRoutes.filter(e => e !== route)]
    axios.put(`${process.env.REACT_APP_SERVER_URL}/users/update/${userID}`, {...userPref,  ttcRoutes: newRouteArr})
    .then(() => {
      setUserPref(prev => {
        console.log("Removed TTC route. Updated array:", newRouteArr)
        setUpdating(false)
        return {...prev, ttcRoutes: newRouteArr}
      })
    })
    .catch((err) => {
      console.log("Error message on PUT:", err)
    })
  }

  const getRouteColor = function (num) {
    //NOTE: the className must appear entirety (e.g. 'bg-[#f8c300]') for tailwind to extract & compile it
    //TTC red colour info and tones: https://www.color-hex.com/color/da251d
    if (num === 1) return ['bg-[#f8c300]', "Subway"]
    if (num === 2) return ['bg-[#00923f]', "Subway"]
    if (num === 3) return ['bg-[#0082c9]', "Subway"]
    if (num === 4) return ['bg-[#a21a68]', "Subway"]
    if (num < 300) return ['bg-[#e56660]', "Bus"]
    if (num < 400) return ['bg-[#024182]', "Blue-night"]
    if (num < 500) return ['bg-[#808080]', "Community-bus"]
    if (num < 900) return ['bg-[#da251d]', "Streetcar"]
    if (num > 900) return ['bg-[#00923f]', "Express"]
    return ['bg-[#d7dbd3]', 'non-route']
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/users/login`)
      .then((res) => {
        console.log(`Checking if user is logged in. server response:`)
        console.log(res)
        if (res.data.loggedIn) setUserID(res.data.user)
        if (!res.data.loggedIn) setUserID(null)
      })
      .catch((err) => {
        console.log(err)
        setUserID(null)
      })
  }, [])
  
  useEffect(() => {
    // console.log("inside Appjs useEffect, userID=", userID)
    if (userID && userID !== "LOADING") {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/users/data/${userID}`)
        .then((res) => {
          if (res.data) {
            setUserPref((prev) => {
              return res.data
            })
          }
          if (!res.data) console.log(`Unable to retrieve user data for user ID ${userID}`)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userID])
  //   // ttcRoutes: [1, 2, 80, 76, 15],  // temp default set to [1,2,80,76,15]
  //   // ttcStations: [], // Royal York, St George

  if (!userID) return (<><Header/><Auth userID={userID} handleLogin={handleLogin} /></>)
  if (userID === "LOADING") return <Header/>
  if (userID) return (
    <>
    {userID && (
      <div className="flex flex-col mb-10 bg-slate-300 dark:bg-slate-800">
        <div className="">
          <div className='flex flex-row justify-between'>
            <Header/>
            <Settings
              userName={userPref.userName}
              ttcRoutes={userPref.ttcRoutes}
              addTtcRoute={addTtcRoute}
              removeTtcRoute={removeTtcRoute}
              routeList={routeList}
              logout={clearUserSession}
              getRouteColor={getRouteColor}
              updating={updating}
              setUpdating={setUpdating}
              >
            </Settings>
          </div>
          <div className="flex flex-col md:flex-row justify-evenly">
            <TTC 
              devView={devView} 
              userPref={userPref} 
              getRouteColor={getRouteColor} 
              className="w-60"
            />
            <GoTransit devView={devView} userPref={userPref} className="w-60" />
          </div>
        </div>
        <Footer handleThemeSwitch={handleThemeSwitch} toggleDevView={toggleDevView} />

      </div>
    )}
    </>

  )
}

export default App;
