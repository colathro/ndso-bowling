import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../components/ui/Button";

function LogoutButton() {
  const { isAuthenticated, logout } = useAuth0();

  return (
    isAuthenticated && (
      <Button
        emoji="🏃‍♀️"
        onClick={() => {
          logout({ returnTo: window.location.origin });
        }}
      >
        Log out
      </Button>
    )
  );
}

export default LogoutButton;
