import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";


function Register() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const register = async () => {
    try {
      //1. send new user info to server
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      };
      let results = await fetch(
        "/api/register",
        options
      );
      //if I got a 200 ok, then user was correctly created
      if (results.ok) {
        //2. redirect user to Login Page
        navigate("/login");
      } else {
        setError(results.error);
      }
    } catch (err) {
      console.log("Error:", err);

    }
  };

  return (
    <div>
      <div className="container"></div>
      <div>
        <Navbar />
      </div>

      <h3 className="page-header">Register form</h3>
      <div className="row create-form justify-content-center"></div>
      {/*<div className="row"> */}
      <div className="col-9 offset-1">
        <input
          value={newUser.name}
          onChange={handleChange}
          name="name"
          type="text"
          className="form-control mb-3"
          placeholder="your name"
        />

        <input
          value={newUser.email}
          onChange={handleChange}
          name="email"
          type="email"
          className="form-control mb-3"
          placeholder="your email"
        />
        <input
          value={newUser.username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-3"
          placeholder="your username"
        />
        <input
          value={newUser.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-3"
          placeholder="your password"
        />
        <button className="home-button " onClick={register}>
          Register
        </button>
        <br />
        <br />
        <br />
        <p>
          <h3>Have an account? </h3>
          <Link to="/login/" className="home-button ">
            Log in
          </Link>
        </p>
        {/*</div>*/}
      </div>

      <div className="text-danger text-center mt-5">{error}</div>
    </div>
  );
}

export default Register;
