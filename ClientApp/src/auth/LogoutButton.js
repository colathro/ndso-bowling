import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LogoutButton() {
  const { isAuthenticated, logout, getAccessTokenSilently } = useAuth0();

  const fetchGet = async () => {
    fetch("api/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
      },
    });
  };

  return (
    isAuthenticated && (
      <div>
        <button
          onClick={() => {
            logout({ returnTo: window.location.origin });
          }}
        >
          Log out
        </button>
        <button onClick={fetchGet}>Get Api</button>
      </div>
    )
  );
}

export default LogoutButton;
