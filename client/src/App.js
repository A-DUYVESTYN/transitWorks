// import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import TTC from "./components/TTC";

function App() {

  const [devView, setDevView] = useState(false)
  const toggleDevView = () => {
    console.log("changing devView=", devView, " to ", !devView)
    setDevView(!devView)
  }

  return (
    <div className="flex flex-col mb-10">

      <div className="grow">
        <h1 className="p-2 text-xl">
          Transit Service Disruptions
        </h1>
        <div className="flex flex-row justify-evenly">
          <TTC devView={devView} className="w-60"/>
          <div className="w-60">GO Transit</div>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 z-20 p-2 w-full bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-2 dark:bg-gray-800 dark:border-gray-600">
        <ul className="flex flex-wrap h-6 items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <label className="inline-flex relative items-center cursor-pointer">
              <input type="checkbox" value="" onClick={toggleDevView} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-2 place-self-end mr-8 md:mr-6">Developer View</span>
            </label>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Contact</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
