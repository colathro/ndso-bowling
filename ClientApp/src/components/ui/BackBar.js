import React from "react";
import Twemoji from "react-twemoji";
import "./BackBar.scss";

const BackBar = (props) => {
  const back = () => {
    props.history.goBack();
  };
  return (
    <div className="backbar-wrapper" role="navigation">
      <div className="backbar-button" onClick={back}>
        <img
          className="button-img"
          src="/images/back.svg"
          aria-label="back button"
        ></img>
      </div>
      <h1 className="backbar-text">{props.children}</h1>
    </div>
  );
};

export default BackBar;
