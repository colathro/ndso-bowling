import React, { Component } from "react";
import { Descriptions, Button } from "antd";
import AthleteEditProfile from "./AthleteEditProfile";

class AthleteProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Descriptions
          title={`${this.props.user.athlete.firstName} ${this.props.user.athlete.lastName}`}
          extra={<AthleteEditProfile user={this.props.user} />}
          size="small"
        >
          <Descriptions.Item label="Birthday">
            {this.props.user.athlete.birthday}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {this.props.user.athlete.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {this.props.user.athlete.email}
          </Descriptions.Item>
          <Descriptions.Item label="City">
            {this.props.user.athlete.city}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}

export default AthleteProfile;
