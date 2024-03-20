import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
      // Check if the user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      navigate("/private");
      }
    }, [navigate]);


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
        localStorage.setItem("token", data.token);
        //3. redirect user to Private Page
        navigate("/private");
      } else {
        {/*let data= await results.json();*/}
        setError("Invalid username or password");
        
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
      <h3 className="page-header">Hello, sign in!</h3>
      <div className="row create-form justify-content-center">
        <div className="col-9 offset-1">
          {isLoggedIn ? (
            <p>Already logged in!</p>
          ) : (
            <>
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
            Sign in
          </button>
          {error && <div className="text-danger text-center mt-2">{error}</div>}
        </>
        )}
      </div>
    </div>
    </div>
  );
}

export default Login;
