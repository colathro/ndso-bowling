import React from "react";
import Twemoji from "react-twemoji";
import "./BackBar.scss";

const BackBar = (props) => {
  const back = () => {
    props.history.goBack();
  };
  return (
    <div className="backbar-wrapper">
      <div className="backbar-button" onClick={back}>
        <img className="button-img" src="/images/back.svg"></img>
      </div>
      <div className="backbar-text">{props.children}</div>
    </div>
  );
};

export default BackBar;
