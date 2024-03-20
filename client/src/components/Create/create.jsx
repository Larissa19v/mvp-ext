/* eslint-disable react/prop-types */
import { useState } from "react";
import { Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
// import Button from "./src/App.jsx";

function Create() {
  const navigate = useNavigate();
  
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <div className="container">
        <div className="row create-form justify-content-center">
          <p>
            <h4>
              You should Sign in <br />
              to create your project
            </h4>
            <br />

            <Link to="/login/" className="home-button ">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Create;
