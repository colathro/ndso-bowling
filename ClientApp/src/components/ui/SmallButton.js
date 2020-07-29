import React from "react";
import Twemoji from "react-twemoji";
import "./SmallButton.scss";

const SmallButton = (props) => {
  return (
    <div className="small-button-wrapper" onClick={props.onClick}>
      <Twemoji options={{ className: "emoji" }}>{props.emoji}</Twemoji>
      <span className="button-text">{props.children}</span>
    </div>
  );
};

export default SmallButton;
