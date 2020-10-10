import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Button, Col, Divider, Layout, Row } from "antd";
import FooterBar from "../ui/FooterBar";
import AdminAddAthlete from "./AdminAddAthlete";
import AdminAthletes from "./AdminAthletes";
import AdminDownloadData from "./AdminDownloadData";

const { Header } = Layout;

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = { enableAdmin: false, user: this.props.user };
  }

  render() {
    return (
      <div id="adminhome">
        <Header>
          <Row justify="space-between">
            <Col>
              <img
                id="logo"
                src="images/SO_NorthDakota_Mark_red-black.jpg"
              ></img>
            </Col>
            <Col></Col>
          </Row>
        </Header>
        <AdminDownloadData></AdminDownloadData>
        <Divider></Divider>
        <AdminAthletes user={this.state.user}></AdminAthletes>
        <FooterBar />
      </div>
    );
  }
}

export default withAuth0(AdminHome);
