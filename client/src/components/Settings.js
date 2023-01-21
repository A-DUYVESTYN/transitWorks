import { useState } from "react";

export default function Settings(props) {
  const { userPref, setUserPref, routeList } = props;
  const [selected, setSelected] = useState("defaultAddRoute");

  const removeTtcRoute = function (route) {
    setUserPref(prev => {
      return {...prev, ttCroutes: prev.ttCroutes.filter(e => e !== route)}
    })
  }

  const addTtcRoute = function (route) {
    setUserPref(prev => {
      console.log("[...prev.ttCroutes, route]", [...prev.ttCroutes, route])
      return {...prev, ttCroutes: [...prev.ttCroutes, route]}
    })
  }

  const filterRouteList = function (allRoutesArr,usersRoutesArr) {
    // console.log(usersRoutesArr)
    const routesOtherThanUsers = allRoutesArr.filter(e => !usersRoutesArr.includes(e))
    // console.log(routesOtherThanUsers)
    return routesOtherThanUsers
  }

  return (
    <div>
      <label htmlFor="my-modal-5" className="btn">Settings</label>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Settings</h3>
          <h4 className="py-4">My Routes</h4>
          <div className="">
            <div>TTC</div>
            <select value={selected} onChange={() => setSelected("defaultAddRoute")} className="select select-primary w-full max-w-xs my-1">
              <option value="defaultAddRoute"> Add a route</option>
              {filterRouteList(routeList.ttcRouteArr,userPref.ttCroutes).map((routeNum, index) => (
                <option key={index} value={routeNum} onClick={(e) => addTtcRoute(routeNum)}>{routeNum}</option>
              ))}
            </select>
            <div className="overflow-x-auto">
              <table className="table table-compact w-1/4 text-center">
                <thead>
                  <tr>
                    <th>Route Number</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {userPref.ttCroutes.map((routeNum, index) => (
                    <tr key={index} value={routeNum}>
                      <td className="font-bold">{routeNum}</td>
                      <td className="w-12">
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


          <div className="modal-action">
            <label htmlFor="my-modal-5" className="btn">Close</label>
          </div>
        </div>
      </div>
    </div>
  )
}
