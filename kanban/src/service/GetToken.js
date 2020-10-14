import React, { useContext } from "react";
import Loading from "../components/reuseables/Loading";
import useToken from "../hooks/useToken";
import { AccessContext } from "../context/AccessContext";
import { Redirect } from "react-router-dom";

/**
 * Code parameter is acquired from the location
 * Request access token from the backend using useToken hook
 * When authentication is successful redirects to the main Route
 */
const GetToken = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let code = params.get("code");

  const getTokenUrl = `${process.env["REACT_APP_SERVER"]}${process.env["REACT_APP_SERVER_TOKEN"]}?code=${code}`;
  const [gotToken, setGotToken] = useContext(AccessContext);
  const [isToken, tokenIsLoading] = useToken(getTokenUrl);

  let content = <Loading />;

  if (!tokenIsLoading && isToken) {
    setGotToken(true);
    content = <Redirect to="/" />;
  }
  return content;
};

export default GetToken;
