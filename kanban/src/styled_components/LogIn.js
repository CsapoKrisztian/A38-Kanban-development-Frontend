import React from "react";

function LogIn(props) {
    const appId = "bf4d532fe1efb0ca152242664404a275e9440424dda0144c7cb5eeb347c0004e";
    const redirectHere = "http://localhost:8080/";

    const redirect = e => {
        e.preventDefault();
        window.location.href = "https://gitlab.com/oauth/authorize?client_id=" + appId + "&redirect_uri=" + redirectHere + "&response_type=code"
    }
    return (<input type="submit" onClick={redirect} value="Log in" className="button" style={{marginBottom: "10%"}}/>
    )
}

export default LogIn;