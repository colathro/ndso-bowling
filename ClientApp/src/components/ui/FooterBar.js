import React, { Component } from "react";
import { Layout, Row, Col, Typography } from "antd";
import LogoutButton from "../../auth/LogoutButton";
import PrivacyPolicy from "./PrivacyPolicy";
import ReportIssue from "./ReportIssue";

const { Footer } = Layout;
const { Text, Link } = Typography;

class FooterBar extends Component {
  constructor(props) {
    super(props);
    this.state = { enableAdmin: false, user: null };
  }

  render() {
    return (
      <Footer>
        <Row justify="space-around">
          <Col>
            <LogoutButton />
          </Col>
          <Col>
            <ReportIssue />
          </Col>
          <Col>
            <PrivacyPolicy></PrivacyPolicy>
          </Col>
          <Col>
            <Text disabled>Copyright © 2020 Special Olympics</Text>
          </Col>
        </Row>
      </Footer>
    );
  }
}

export default FooterBar;
