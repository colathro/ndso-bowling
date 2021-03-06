import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Col, Divider, Layout, Row } from "antd";
import AthleteScoreTable from "./AthleteScoreTable";
import AthleteProfile from "./AthleteProfile";
import AthleteScoreSubmit from "./AthleteScoreSubmit";
import FooterBar from "../ui/FooterBar";

const { Header } = Layout;

class AthleteHome extends Component {
  constructor(props) {
    super(props);
    this.state = { enableAdmin: false, user: this.props.user };
  }

  render() {
    return (
      <div id="athletehome">
        <Header>
          <Row justify="center">
            <Col xs={{ span: 12 }} lg={{ span: 9 }}>
              <img
                id="logo"
                src="images/SO_NorthDakota_Mark_red-black.jpg"
              ></img>
            </Col>
            <Col xs={{ span: 12 }} lg={{ span: 9 }}>
              <AthleteScoreSubmit />
            </Col>
          </Row>
        </Header>
        <Row justify="center">
          <Col xs={{ span: 23 }} lg={{ span: 18 }}>
            <AthleteProfile user={this.props.user}></AthleteProfile>
            <Divider />
            <AthleteScoreTable></AthleteScoreTable>
          </Col>
        </Row>
        <FooterBar />
      </div>
    );
  }
}

export default withAuth0(AthleteHome);
