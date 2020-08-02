import React from "react";
import Twemoji from "react-twemoji";
import "./Input.scss";

const Input = (props) => {
  if (props.inError) {
    var addonClassName = " red-border";
  } else {
    var addonClassName = "";
  }
  var calculatedClass = "input-wrapper" + addonClassName;

  return (
    <div className={calculatedClass}>
      <div className="emoji-wrapper">
        <Twemoji options={{ className: "emoji" }}>{props.emoji}</Twemoji>
      </div>
      <input
        className="input-text"
        disabled={props.editable != null && !props.editable}
        type={props.type}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      ></input>
    </div>
  );
};

export default Input;
