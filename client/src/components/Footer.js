import React from "react";

function Footer (props) {
  const { toggleDevView, handleThemeSwitch } = props

  return (
    <footer className="fixed bottom-0 left-0 z-20 p-2 mt-0 w-full bg-slate-300 border-t border-gray-200 shadow flex items-center justify-between p-2 dark:bg-gray-800 dark:border-gray-600 text-xs text-gray-500 dark:text-gray-400">
    <ul className="flex flex-wrap h-6 items-center">
      <li>
        <label className="inline-flex relative items-center cursor-pointer">
          <input type="checkbox" value="" onClick={toggleDevView} className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-2 mr-8 md:mr-6">Developer View</span>
        </label>
      </li>
      <li>
        <span className="mr-4 hover:underline md:mr-6 ">About</span>
      </li>
      <li>
        <span className="hover:underline">Contact</span>
      </li>
    </ul>
    <ul className="flex flex-wrap h-6 items-center">
      <li>
        <button className="dark:text-gray-400 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 p-1 rounded-xl cursor-pointer" onClick={handleThemeSwitch}>
          Dark Mode
        </button>
      </li>
    </ul>
  </footer>
  )
}

export default Footer;