import React from "react";

function Footer(props) {
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
        <li className="pb-1">
          <a className="mr-4 hover:underline md:mr-6" href="#my-modal-2">About</a>
          <div className="modal" id="my-modal-2">
            <div className="modal-box">
              <h3 className="font-bold text-lg">About</h3>
              <p className="py-4"> Data sources include:
                <ul className="list-inside">
                  <li> GO Transit/Metrolinx GTFL </li>
                  <a className="mr-4 underline md:mr-6 " href="http://api.openmetrolinx.com/OpenDataAPI/Help"> CLICK HERE </a>
                  <li>ttcnotices on Twitter</li>
                  <a className="mr-4 underline md:mr-6 " href="https://twitter.com/TTCnotices?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"> CLICK HERE </a>
                </ul>
              </p>
              <p className="py-4"> For issues or requests, contact transitworksdev@gmail.com </p>
              <p className="py-4"> Thank you for visiting! </p>
              <div className="modal-action">
                {/* eslint-disable-next-line */}
                <a href="#" className="btn">Close</a>
              </div>
            </div>
          </div>
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