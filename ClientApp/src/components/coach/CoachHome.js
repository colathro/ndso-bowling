import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Button, Col, Divider, Layout, Row } from "antd";
import CoachScoreSubmit from "./CoachScoreSubmit";
import FooterBar from "../ui/FooterBar";
import CoachAthletes from "./CoachAthletes";
import CoachProfile from "./CoachProfile";

const { Header } = Layout;

class CoachHome extends Component {
  constructor(props) {
    super(props);
    this.state = { enableAdmin: false, user: this.props.user };
  }

  render() {
    return (
      <div id="coachhome">
        <Header>
          <Row justify="space-between">
            <Col xs={{ span: 12 }} lg={{ span: 9 }}>
              <img
                id="logo"
                src="images/SO_NorthDakota_Mark_red-black.jpg"
              ></img>
            </Col>
            <Col></Col>
          </Row>
        </Header>
        <Row justify="center">
          <Col xs={{ span: 23 }} lg={{ span: 18 }}>
            <CoachProfile user={this.props.user}></CoachProfile>
            <Divider />
            <CoachAthletes user={this.state.user}></CoachAthletes>
          </Col>
        </Row>
        <FooterBar />
      </div>
    );
  }
}

export default withAuth0(CoachHome);
