
export default function Settings(props) {
  const { userName, ttcRoutes, addTtcRoute, logout, removeTtcRoute, getRouteColor, routeList, updating } = props;

  const onOptionChangeHandler = (event) => {
    addTtcRoute(Number(event.target.value))
  }

  const filterRouteList = function (allRoutesArr, usersRoutesArr) {
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
          <div className="grow">

            <form>
              <label>Add a TTC Route</label>
              {updating && 
              <div class="alert shadow-lg h-12 p-3 my-1 border">
                <div>
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Updating</span>
                </div>
              </div>
              }

              {!updating && 
              <select
                id="addTtcRoute"
                value="defaultAddRoute"
                onChange={onOptionChangeHandler}
                className="select text-gray-700 w-full my-1">
                <option key="default" value="defaultAddRoute">Select a route</option>
                {filterRouteList(routeList.ttcRouteArr, ttcRoutes).map((routeNum, index) => (
                  <option key={index} value={routeNum}>
                    {routeNum}
                  </option>
                ))}
              </select>
              }
            </form>
            <div className="overflow-x-auto">
              <table className="table text-gray-700 table-compact w-text-center text-center">
                <thead>
                  <tr>
                    <th>Route No.</th>
                    <th>Type</th>
                    <th className="">Delete</th>
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
                      <td className="font-bold py-1">{getRouteColor(routeNum)[1]}</td>
                      <td className="w-12 py-1">
                        <button className="btn btn-xs btn-square btn-outline" onClick={() => removeTtcRoute(routeNum)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
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
