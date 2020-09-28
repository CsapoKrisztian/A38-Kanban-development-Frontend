import React from "react";

function LogIn() {
    const appId = process.env["REACT_APP_ID"];
    const redirectHere = process.env["REACT_APP_SERVER"] + "/code";
    const getTokenURL = "https://gitlab.techpm.guru/oauth/authorize?client_id=" + appId + "&redirect_uri=" + redirectHere + "&response_type=code"


    const redirect = e => {
        window.location.href = getTokenURL;
    }

    return (<input type="submit" onClick={redirect} value="Log in" className="button" style={{marginBottom: "10%"}}/>)
}

export default LogIn;