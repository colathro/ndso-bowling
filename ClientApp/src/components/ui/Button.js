import React from "react";
import Twemoji from "react-twemoji";
import "./Button.scss";

const Button = (props) => {
  return (
    <div className="button-wrapper" onClick={props.onClick}>
      <div className="emoji-aside">
        <div className="emoji-wrapper">
          <Twemoji options={{ className: "emoji" }}>🏆</Twemoji>
        </div>
      </div>
      <div className="button-text">{props.children}</div>
    </div>
  );
};

export default Button;
