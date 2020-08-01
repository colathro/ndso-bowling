import React, { Component } from "react";
import ReactDOM from "react-dom";
import SmallButton from "./SmallButton";
import Twemoji from "react-twemoji";
import "./Modal.scss";

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { showing: true };
  }

  destroyModal() {
    this.setState({ showing: !this.state.showing });
  }

  render() {
    return (
      this.state.showing && (
        <div id="modal-wrapper" onClick={this.destroyModal.bind(this)}>
          <div className="modal-body">
            <Twemoji>😟</Twemoji>
            <h4>{this.props.message}</h4>
            <SmallButton>Go back</SmallButton>
          </div>
        </div>
      )
    );
  }
}

export function showError() {
  ReactDOM.unmountComponentAtNode(document.getElementById("modal"));
  ReactDOM.render(
    <Modal message="Something went wrong, try again later!"></Modal>,
    document.getElementById("modal")
  );
}
