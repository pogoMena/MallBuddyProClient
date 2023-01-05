import React, { useEffect, useState } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

//Layout
import Navbar from "./layout/Navbar";

//Pages
import MainPage from "./pages";
import NotFoundPage from "./pages/404";
import CreateUser from "./pages/createUser";
import Login from "./pages/login";
import Admin from "./pages/admin";
import MallSearch from "./pages/mallSearch";
import ItemSearch from "./pages/itemSearch";
import Axios from "axios";

function App() {
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [mallSelection, setMallSelection] = useState("");

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  
  Axios.defaults.withCredentials = true;

  const axios = Axios.create({
    baseURL: "https://mall-buddy-pro-server.herokuapp.com/",
    withCredentials: true,
  });

  useEffect(() => {
    console.log("Initial useEffect with config")
    /*
    axios
      .get("api/login", config)
      .then((response) => {
        if (response.data.loggedIn === true) {
          setUserName(response.data.user[0].username);
          setAdmin(response.data.user[0].admin);
          setLoginStatus(true);
          console.log("in if");
        } else {
          setLoginStatus(false);
          console.log("in the else");
        }
      })
      .catch((err) => console.log(err));
      */
  }, []);

  return (
    <Router>
      <Navbar
        loginStatus={loginStatus}
        userName={userName}
        admin={admin}
        setLoginStatus={setLoginStatus}
        setUserName={setUserName}
        setAdmin={setAdmin}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <MainPage
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              userName={userName}
              setUserName={setUserName}
              setAdmin={setAdmin}
            />
          }
        />
        <Route
          exact
          path="/signup"
          element={<CreateUser loginStatus={loginStatus} userName={userName} />}
        />
        <Route
          exact
          path="/login"
          element={<Login loginStatus={loginStatus} userName={userName} />}
        />
        <Route
          exact
          path="/admin"
          element={
            <Admin
              loginStatus={loginStatus}
              userName={userName}
              admin={admin}
            />
          }
        />
        <Route
          exact
          path="/mallSearch"
          element={
            <MallSearch
              loginStatusSent={loginStatus}
              userName={userName}
              setSelection={setMallSelection}
            />
          }
        />
        <Route
          exact
          path="/itemSearch"
          element={
            <ItemSearch
              loginStatus={loginStatus}
              userName={userName}
              selection={mallSelection}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
