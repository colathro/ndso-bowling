import React from "react";
import Twemoji from "react-twemoji";
import "./Input.scss";

const Input = (props) => {
  return (
    <div className="input-wrapper">
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
