import React from "react";
import Twemoji from "react-twemoji";
import "./Button.scss";

const Button = (props) => {
  return (
    <div className="button-wrapper" onClick={props.onClick}>
      <div className="button-inner">
        <div className="emoji-aside">
          <div className="emoji-wrapper">
            <Twemoji options={{ className: "emoji" }}>{props.emoji}</Twemoji>
          </div>
        </div>
        <div className="button-text">{props.children}</div>
      </div>
    </div>
  );
};

export default Button;
