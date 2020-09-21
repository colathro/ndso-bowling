import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography } from "antd";

const { Link } = Typography;

function LogoutButton() {
  const { isAuthenticated, logout } = useAuth0();

  return (
    isAuthenticated && (
      <Link
        onClick={() => {
          logout({ returnTo: window.location.origin });
        }}
      >
        Log out
      </Link>
    )
  );
}

export default LogoutButton;
