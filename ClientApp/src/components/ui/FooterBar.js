import React, { Component } from "react";
import { Layout, Row, Col, Typography } from "antd";
import LogoutButton from "../../auth/LogoutButton";

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
            <Text disabled>Copyright © 2020 Special Olympics</Text>
          </Col>
        </Row>
      </Footer>
    );
  }
}

export default FooterBar;
