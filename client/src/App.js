import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import TTC from "./components/TTC";
import GoTransit from "./components/GoTransit";
import Footer from "./components/Footer";
import Settings from "./components/Settings";
import routeList from "./data/routeList";

function App() {
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
  const [userID, setUserID] = useState("63ffa2f47a7eaadef8696748"); // for development, defualt to user 63eeba3b390423a6f5c7e96f, userName "Pat"
  const [userPref, setUserPref] = useState({
    _id: null,
    userName: null,
    userEmail: null,
    userPassword: null,
    ttcRoutes: [],
    ttcStations: [],
  })

  useEffect(() => {
    if (userID) {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${userID}`)
      .then((res) => {
        if (res.data) {
          setUserPref((prev) => {
            console.log(`changing user pref from: ${JSON.stringify(prev)} to ${JSON.stringify(res.data)}`)
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


  return (
    <div className="flex flex-col mb-10 bg-slate-300 dark:bg-slate-800">
      <div className="grow">
        <div className='flex flex-row justify-between'>
          <h1 className="p-2 mx-4 text-gray-700 dark:text-gray-200">
            TransitWorks
            <p className="text-sm">your latest updates on transit service</p>
          </h1>
          <Settings userPref={userPref} setUserPref={setUserPref} routeList={routeList}></Settings>
        </div>
        <div className="flex flex-col md:flex-row justify-evenly">
          <TTC devView={devView} userPref={userPref} className="w-60" />
          <GoTransit devView={devView} userPref={userPref} className="w-60" />
        </div>
      </div>

      <Footer handleThemeSwitch={handleThemeSwitch} toggleDevView={toggleDevView} />
    </div>
  );
}

export default App;
