import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SmallButton from "./ui/SmallButton";
import Twemoji from "react-twemoji";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div id="login">
      <div className="title-emoji">
        <img src="/images/razzledazzle.svg"></img>
      </div>
      <div className="text-wrapper">Special Olympics ND Bowling</div>
      <div>
        <SmallButton emoji="🏃‍♂️" onClick={() => loginWithRedirect()}>
          Login
        </SmallButton>
      </div>
    </div>
  );
};

export default Login;
