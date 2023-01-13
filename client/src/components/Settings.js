


export default function Settings(props) {
  const { userPref, setUserPref } = props;
  const removeTtcRoute = function (route) {
    setUserPref(prev => {
      return {...prev, ttCroutes: prev.ttCroutes.filter(e => e !== route)}
    })
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
            <div className="overflow-x-auto">
              <table className="table table-compact w-2/5">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Route</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {userPref.ttCroutes.map((route, index) => (
                    <tr key={index} value={route}>
                      <th>{index + 1}</th>
                      <td>{route}</td>
                      <td className="w-12">
                        <button className="btn btn-xs btn-square btn-outline" onClick={() => removeTtcRoute(route)}>
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
