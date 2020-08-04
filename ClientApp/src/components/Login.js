import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SmallButton from "./ui/SmallButton";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div id="login" role="main">
      <div className="title-emoji">
        <img
          src="/images/razzledazzle.svg"
          alt="Trophy with sparkles around it!"
        ></img>
      </div>
      <div className="text-wrapper">
        <h1>Special Olympics ND Bowling</h1>
      </div>
      <div>
        <SmallButton emoji="🏃‍♂️" onClick={() => loginWithRedirect()}>
          Login
        </SmallButton>
      </div>
    </div>
  );
};

export default Login;
