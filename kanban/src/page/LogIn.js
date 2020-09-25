import React from "react";
import Axios from "axios";

function LogIn(props) {
  const appId =
    "bf4d532fe1efb0ca152242664404a275e9440424dda0144c7cb5eeb347c0004e";
  const redirectHere = "http://localhost:8080/";

  const redirect = (e) => {
    e.preventDefault();
    Axios.get("http://localhost:8080/auth/signin").then((response) => {
      redirect(
        "https://gitlab.com/oauth/authorize?client_id=" +
          appId +
          "&redirect_uri=" +
          redirectHere +
          "&response_type=code"
      );
    });
  };

  return <div>yaaay</div>;
}
export default LogIn;
