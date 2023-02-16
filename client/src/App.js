// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
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
  const [userPref, setUserPref] = useState({
    TTCroutes: [1, 2, 80, 76, 15],  // temp default set to [1,2,80,76,15]
    TTCstations: [], // Royal York, St George
  })
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
    else setTheme('light');
  }, [])
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }, [theme])

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
