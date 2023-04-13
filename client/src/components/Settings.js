import { useState } from "react";

export default function Settings(props) {
  const { userName, ttcRoutes, addTtcRoute, logout, removeTtcRoute, routeList } = props;
  const [selected, setSelected] = useState("defaultAddRoute");



  const filterRouteList = function (allRoutesArr,usersRoutesArr) {
    // console.log(usersRoutesArr)
    const notUsersRoutes = allRoutesArr.filter(e => !usersRoutesArr.includes(e))
    // console.log(routesOtherThanUsers)
    return notUsersRoutes
  }
  // adapted from DaisyUI component "Model with custom width"
  return (
    <div>
      <label htmlFor="my-modal-5" className="btn m-2">User Settings</label>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-slate-300 dark:bg-slate-800  text-gray-700 dark:text-gray-200">
          <h3 className="font-bold text-lg text-center">Settings</h3>
         
          <h4 className="mt-2 py-2 border-t-4 text-center">My Routes</h4>
          <div className="">
            <select 
              value={selected} 
              onBlur={event => event.preventDefault()}
              onChange={() => setSelected("defaultAddRoute")} 
              className="select text-gray-700 w-full my-1">
              <option value="defaultAddRoute"> Add a TTC Route</option>
              {filterRouteList(routeList.ttcRouteArr,ttcRoutes).map((routeNum, index) => (
                <option key={index} value={routeNum} onClick={(e) => addTtcRoute(routeNum)}>{routeNum}
                </option>
              ))}
            </select>
            <div className="overflow-x-auto">
              <table className="table text-gray-700 table-compact w-text-center text-center">
                <thead>
                  <tr>
                    <th>My Routes</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {ttcRoutes.length === 0 && 
                    <tr>
                      <td align="center" colSpan="3">None added</td>
                    </tr>
                  }
                  {[...ttcRoutes].sort((a, b) => (a - b)).map((routeNum, index) => (
                    <tr key={index} value={routeNum}>
                      <td className="font-bold py-1">{routeNum}</td>
                      <td className="w-12 py-1">
                        <button className="btn btn-xs btn-square btn-outline" onClick={() => removeTtcRoute(routeNum)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify justify-center items-center mt-2 py-2 border-y-4">
            {userName && <div className="">Logged in as: {userName} </div>}
            <button className="btn btn-sm btn-error mx-4" onClick={logout} >Logout</button>
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal-5" className="btn">Close</label>
          </div>
        </div>
      </div>
    </div>
  )
}
