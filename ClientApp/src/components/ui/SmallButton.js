import React from "react";
import Twemoji from "react-twemoji";
import "./SmallButton.scss";

const SmallButton = (props) => {
  var wrapper = "small-button-wrapper";
  if (props.primary) {
    wrapper += " purple";
  }
  return (
    <div className={wrapper} onClick={props.onClick}>
      <Twemoji options={{ className: "emoji" }}>{props.emoji}</Twemoji>
      <span className="button-text">{props.children}</span>
    </div>
  );
};

export default SmallButton;
