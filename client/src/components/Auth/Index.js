import React, { useState } from "react";
import classnames from "classnames";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const Index = (props) => {
  const [selection, setSelection] = useState("login");

  const signUpClass = classnames({
    "w-1/2 pt-4 pb-2  border-b border-l border-solid  hover:bg-streetcar rounded-tr-3xl": true,
    "bg-streetcar": selection === "signup",
  });
  const loginClass = classnames({
    "w-1/2 pt-4 pb-2  border-b border-r border-solid  hover:bg-streetcar rounded-tl-3xl": true,
    "bg-streetcar": selection === "login",
  });

  // change selection to "login" or "signup" on click when clicking on the login or signup button
  const changeStatus = (status) => {
    setSelection(status);
  };

  return (
    <div className=" flex flex-row justify-center mt-52">
      <div className="bg-base-200 shadow-2xl w-96 h-[370px] border-neutral-content border-solid border rounded-3xl">
        <div className="flex flex-row ">
          <button className={loginClass} onClick={() => changeStatus("login")}>
            LogIn
          </button>
          <button
            className={signUpClass}
            onClick={() => changeStatus("signup")}
          >
            SignUp
          </button>
        </div>
        {selection === "login" && <LogIn  userID={props.userID} handleLogin={props.handleLogin} />}
        {selection === "signup" && <SignUp userID={props.userID} handleLogin={props.handleLogin} />}
      </div>
    </div>
  );
};

export default Index;
