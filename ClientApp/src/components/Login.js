import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "./ui/Button";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div id="login" role="main">
      <img
        src="/images/SportIcon_Bowling.png"
        alt="Special Olympics ND Logo"
      ></img>
      <img
        src="/images/SO_NorthDakota_Mark_resized.png"
        alt="Special Olympics ND Logo"
      ></img>
      <div className="login-button">
        <Button emoji="🏃‍♂️" onClick={() => loginWithRedirect()}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
