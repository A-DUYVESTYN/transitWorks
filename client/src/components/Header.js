import React from "react";

function Header(props) {
  return (
    <header className=''>
      <h1 className="font-extrabold text-2xl p-2 mx-2 text-streetcar">
        TransitWorks
        <p className="text-sm font-light text-gray-700 dark:text-gray-200">your latest updates on transit service</p>
      </h1>
    </header>
  )
}

export default Header;