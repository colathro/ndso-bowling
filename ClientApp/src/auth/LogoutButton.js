import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SmallButton from "../components/ui/SmallButton";

function LogoutButton() {
  const { isAuthenticated, logout } = useAuth0();

  return (
    isAuthenticated && (
      <SmallButton
        emoji="👋"
        onClick={() => {
          logout({ returnTo: window.location.origin });
        }}
      >
        Log out
      </SmallButton>
    )
  );
}

export default LogoutButton;
