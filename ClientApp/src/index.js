import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

ReactDOM.render(
  <Auth0Provider
    domain="colathro.us.auth0.com"
    clientId="9c2Os4Hnr81V5AdcQ2hXl9jD7CX0ltfv"
    redirectUri={window.location.origin}
    audience="https://localhost:5001/"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
