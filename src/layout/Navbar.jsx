import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Popover from "./infoPopover";

export default function Navbar(props) {
  const userName = props.userName;
  const admin = props.admin;
  const loginStatus = props.loginStatus;
  const links = [];

  const userLogout = () => {
    Axios.post("https://mall-buddy-pro-server.herokuapp.com/api/logout", {
      withCredentials: true,
    }).then(() => {
      window.location.reload(false);
      props.setLoginStatus(false);
      props.setUserName("");
      props.setAdmin(false);
    });
  };

  //All links
  const loginLink = (
    <Link className="btn btn-outline-light m-1" to="/login" key="login">
      Login
    </Link>
  );
  const logoutLink = (
    <Link
      className="btn btn-outline-light m-1"
      to="/"
      onClick={userLogout}
      key="logut">
      Logout
    </Link>
  );

  const adminLink = (
    <Link className="m-1 btn btn-outline-light ml-1" to="/admin" key="admin">
      Admin
    </Link>
  );
  const signUpLink = (
    <Link className="m-1 btn btn-outline-light" to="/signup" key="signup">
      Sign up
    </Link>
  );
  const searchPageLink = (
    <Link className="m-1 btn btn-outline-light" to="/mallSearch" key="search">
      Search
    </Link>
  );

  if (loginStatus === true) {
    console.log("Logged in");
    if (admin) {
      links.push(adminLink);
    }
    links.push(logoutLink);
  } else if (loginStatus === false) {
    console.log("not logged in");
    links.push(loginLink);
    links.push(signUpLink);
  }
  links.push(searchPageLink);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <div className="row">
            <div className="col-10 text-center">
              <a className="navbar-brand" href="/">
                MallBuddy Pro
              </a>
            </div>
            <div className="col-2">
              <Popover />
            </div>
          </div>
          <div className="">{links}</div>
        </div>
      </nav>
    </div>
  );
}
