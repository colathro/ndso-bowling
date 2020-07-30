import React from "react";
import Twemoji from "react-twemoji";
import "./Select.scss";

const Select = (props) => {
  return (
    <div className="select-wrapper">
      <div className="emoji-wrapper">
        <Twemoji options={{ className: "emoji" }}>{props.emoji}</Twemoji>
      </div>
      <select
        className="input-text"
        disabled={props.editable != null && !props.editable}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      >
        {props.children}
      </select>
    </div>
  );
};

export default Select;
