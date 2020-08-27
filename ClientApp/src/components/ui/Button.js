import React from "react";
import Twemoji from "react-twemoji";
import "./Button.scss";

const Button = (props) => {
  const delay = (callback) => {
    setTimeout(callback, 400);
  };
  return (
    <div
      className="button-wrapper"
      onClick={() => {
        delay(props.onClick);
      }}
    >
      <div className="button-inner">
        <div className="button-text">{props.children}</div>
      </div>
    </div>
  );
};

export default Button;
