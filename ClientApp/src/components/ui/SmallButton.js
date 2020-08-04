import React from "react";
import Twemoji from "react-twemoji";
import "./SmallButton.scss";

const SmallButton = (props) => {
  var inner = "small-button-inner";
  if (props.primary) {
    inner += " purple";
  }
  return (
    <div
      className="small-button-wrapper"
      onClick={props.onClick}
      aria-label={props.ariaLabel}
    >
      <div className={inner}>
        <Twemoji options={{ className: "emoji" }}>{props.emoji}</Twemoji>
        <span className="button-text">{props.children}</span>
      </div>
    </div>
  );
};

export default SmallButton;
