import React from "react";
import Axios from "axios";

function GetToken() {
    const appId = process.env["REACT_APP_ID"];
    const redirectHere = process.env["REACT_APP_SERVER"] + "/code";
    const secret = process.env["REACT_APP_SECRET"]
    const grant_type = "authorization_code"
    let currentCode = ""
    const postTokenRequest = "https://gitlab.techpm.guru/oauth/token?client_id=" + appId + "&client_secret=" + secret + "&code=" + currentCode + "&grant_type=" + grant_type + "&redirect_uri=" + redirectHere
    let token = ""

    Axios.post(postTokenRequest)
        .then(response => {
            console.log(response)
            token = response
        })
        .catch(error => {
            console.log(error)
        })

    return (
        token
    )
}

export default GetToken;