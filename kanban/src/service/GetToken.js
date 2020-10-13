import React, { useContext } from "react";
import { serverUrl } from "../context/Urls";
import Loading from "../styled_components/Loading";
import useToken from "../hooks/useToken";
import { AccessContext } from "../context/AccessContext";
import { Redirect } from "react-router-dom";

const GetToken = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let code = params.get("code");

  const getTokenUrl = `${serverUrl}/getToken?code=${code}`;
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
