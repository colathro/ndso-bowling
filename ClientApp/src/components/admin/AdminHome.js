import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Button, Col, Divider, Layout, Row, Tabs, Typography } from "antd";
import FooterBar from "../ui/FooterBar";
import AdminAddAthlete from "./AdminAddAthlete";
import AdminAthletes from "./AdminAthletes";
import AdminDownloadData from "./AdminDownloadData";

import { CoffeeOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = { enableAdmin: false, user: this.props.user };
  }

  render() {
    return (
      <div id="adminhome">
        <Tabs
          tabBarExtraContent={{
            left: (
              <span className="tabs-extra-demo-button">
                <img
                  id="logo"
                  src="images/SO_NorthDakota_Mark_red-black.jpg"
                ></img>
              </span>
            ),
          }}
        >
          <TabPane tab="Athletes" key="1">
            <Row justify="center">
              <Col xs={{ span: 23 }} lg={{ span: 18 }}>
                <AdminDownloadData></AdminDownloadData>
                <Divider></Divider>
                <AdminAthletes user={this.state.user}></AdminAthletes>
                <FooterBar />
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Coaches" key="2">
            <Row justify="center">
              <Col>
                <Title>Check back later!</Title>
              </Col>
            </Row>
            <Row justify="center">
              <Col>
                <CoffeeOutlined style={{ fontSize: "80px" }} />
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default withAuth0(AdminHome);
