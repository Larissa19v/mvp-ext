import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Navbar";
import "./UserView.css";

function UserView() {
  const [privateData, setPrivateData] = useState(null);

  // get private user data on page load -> useEffect()!
  useEffect(() => {
    requestData();
  }, []);

  const navigate = useNavigate();
  const requestData = async () => {
    //0. if no token then redirect to login, don't let the user see the page
    let token = localStorage.getItem("token");
    if(!token) navigate("/login");
    //1. send post request including authorization header
    let options = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    };
    try {
      let results = await fetch("/api/users/private", options);
      if (results.ok) {
        let data = await results.json();
        //2. store response private data
        setPrivateData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const logout = () => {
    //do the logout
    //1. remove token from local storage
    localStorage.removeItem("token");
    //2. redirect to login page
    navigate("/login");
  };


  return (
    <div>
      <Navbar />
      <br />
      <br/>
      <br/>
      <div class="container">
        <div className="cre">
          <div className="row create-form justify-content-center">
            <h3 className="page-header">Create a project:</h3>
            <Link to="/create1/" className="home-button ">
              Create
            </Link>
          </div>
        </div>
        <div className="mod">
          <div className="row create-form justify-content-center">
            <h3 className="page-header">
              Modify projects:
            </h3>
            <Link to="/gallery1/" className="home-button ">
              Modify
            </Link>
          </div>
        </div>
      </div>
      <button
        className="home-button"
        onClick={logout}
        style={{ position: "absolute", top: 10, right: 10 }}
      >
        Sign out
      </button>
    </div>
  );
}

export default UserView;
