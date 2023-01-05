import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MBPIcon from "../images/MBP_logo.png";

export default function MainPage(props) {
  const navigate = useNavigate();
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [loggedIn, setLoggedIn] = useState("");
  Axios.defaults.withCredentials = true;
  //const loginStatus = props.loginStatus;
  //const username = props.userName;

  const axios = Axios.create({
    baseURL: "https://mall-buddy-pro-server.herokuapp.com/",
    withCredentials: true,
    timeout: 30000, // Increase timeout to 30 seconds
  });
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  const userLogin = () => {
    axios
      .post("api/login",{
        username: usernameLog,
        password: passwordLog,
      },config)
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
            console.log(response.data);
          setLoginStatus(response.data[0].username);
          props.setUserName(response.data[0].username);
          props.setLoginStatus(true);
          setLoggedIn(true)
          if(response.data[0].admin === 1){
            console.log("its true")
            props.setAdmin(true)
          }else{
            props.setAdmin(false);
          }

          //setLoginStatus(true);
          //navigate("/");
          //window.location.reload(true);
        }
      });
  };

  useEffect(() => {
    console.log("useeffect from index")
    axios.get("api/login", config).then((response) => {
      console.log(response);
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
        setLoggedIn(true);
      }
    });
  }, []);

  if(loggedIn === true){
    return (
      <div>
        <div className="text-center my-5">
          <img src={MBPIcon} alt="MBPIcon" id="mbpiconmain" />
        </div>
        <div className="text-center my-5">
            <h3>Welcome {loginStatus}</h3>
        </div>
      </div>
    );
  }else{

  return (
    <div>
      <div>
        <div className="text-center my-5">
          <img src={MBPIcon} alt="MBPIcon" id="mbpiconmain" />
        </div>
        <div className="row text-center">
          <h3>Login</h3>
        </div>
        <div className="row mx-auto w-50">
          <input
            type="text"
            name="username"
            placeholder="Username..."
            onChange={(e) => {
              setUsernameLog(e.target.value);
            }}
          />
        </div>
        <div className="row mx-auto w-50">
          <input
            className=""
            type="password"
            name="password"
            placeholder="Password..."
            onChange={(e) => {
              setPasswordLog(e.target.value);
            }}
          />
        </div>
        <div className="row mx-auto w-50">
          <button onClick={userLogin} href="/" className="btn btn-outline-primary">
            Login
          </button>
        </div>
        <div className="row text-center">
          <h3>{loginStatus}</h3>
        </div>
        <div className="row text-center">
          <h6>
            Dont have an account?
            <Link
              className="m-1 btn btn-outline-primary"
              to="/signup"
              key="signup">
              Sign up
            </Link>
          </h6>
        </div>
        <div className="row text-center">
          <p>
            Or, <a href="/mallSearch">Continue as guest</a>
          </p>
        </div>
      </div>
    </div>
  );
        }
}
