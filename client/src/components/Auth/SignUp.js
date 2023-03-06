import axios from "axios";
import React, { useState } from "react";
// Create Signup Component which will take username, email and password as input and will send a post request to the backend to create a new user

const SignUp = (props) => {
  const [signupUser, setSignupUser] = useState({
    username: "",
    email: "",
    password: "",
    home_location: "",
    work_location: "",
  });

  // Axios put to send data to backend and create new user to localhost:8080/api/users
  const handleSubmit = (e) => {
    e.preventDefault();
    //send post request to backend to create new user
    axios
      .put("http://localhost:8080/api/users", {
        username: signupUser.username,
        email: signupUser.email,
        password: signupUser.password,
      })
      .then((res) => {
        props.handleLogin(res.data.id);
        localStorage.setItem("user_id", res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Example: JohnDoe"
              className="input input-bordered w-full max-w-xs"
              name="username"
              value={signupUser.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email:</span>
            </label>
            <input
              type="email"
              placeholder="Example: JohnDoe@email.com "
              className="input input-bordered w-full max-w-xs"
              name="email"
              value={signupUser.email}
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
              value={signupUser.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-row justify-end mr-8 mt-4">
          <button className="btn btn-sm btn-primary" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
