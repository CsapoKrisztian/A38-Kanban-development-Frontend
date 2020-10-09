import React, { useContext } from "react";
import { AccessContext } from "../context/AccessContext";
import Loading from "../styled_components/Loading";
import Main from "../layout/Main";
import { getAuthorizationCodeUrl } from "../context/Urls";

function Auth() {
  const [gotToken, setGotToken] = useContext(AccessContext);

  let content = <Loading />;
  if (gotToken) {
    content = <Main />;
  } else {
    window.location = getAuthorizationCodeUrl;
  }

  return content;
}

export default Auth;
