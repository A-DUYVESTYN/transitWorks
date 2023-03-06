import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //axios request to send data to backend and login user
  const handleSubmit = (e) => {
    e.preventDefault();
    //send post request to backend to login user
    axios
      .put("http://localhost:8080/api/login", {
        email: loginUser.email,
        password: loginUser.password,
      })
      .then((res) => {
        props.handleLogin(res.data.id);
        localStorage.setItem("user_id", res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form className="w-full h-full" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <div className="form-control w-full max-w-xs mt-8">
            <label className="label">
              <span className="label-text">Email:</span>
            </label>
            <input
              type="email"
              placeholder="Example: JohnDoe@email.com "
              className="input input-bordered w-full max-w-xs"
              name="email"
              value={loginUser.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password:</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              name="password"
              value={loginUser.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-row justify-end mr-8 mt-4 h-[5.2rem] items-end">
          <button className="btn btn-sm btn-primary" type="submit">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
