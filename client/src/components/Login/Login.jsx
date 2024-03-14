import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    //do the login

    try {
      //1. send credentials to server
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      };

      let results = await fetch("/api/login", options);
      //if I got a 200 ok, then user was authorized
      if (results.ok) {
        //2. get token from server and store in localStorage
        let data = await results.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        //3. redirect user to Private Page
        navigate("/private");
      } else {
        console.log(data);
        setError(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="container"></div>
      <div>
        <Navbar />
      </div>

      <h3 className="page-header">Login form</h3>
      <div className="row create-form justify-content-center"></div>

        <div className="col-9 offset-1">
          <input
            value={credentials.username}
            onChange={handleChange}
            name="username"
            type="text"
            className="form-control mb-3"
            placeholder="your username"
          />
          <input
            value={credentials.password}
            onChange={handleChange}
            name="password"
            type="password"
            className="form-control mb-3"
            placeholder="your password"
          />
          <button className="home-button" onClick={login}>
            Log in
          </button>
        </div>
      <div className="text-danger text-center mt-5">{error}</div>
    </div>
  );
}

export default Login;
