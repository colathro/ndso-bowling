import React, { Component } from "react";
import { Descriptions, Button } from "antd";
import CoachEditProfile from "./CoachEditProfile";

class CoachProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Descriptions
          title={`${this.props.user.coach.firstName} ${this.props.user.coach.lastName}`}
          extra={<CoachEditProfile user={this.props.user} />}
          size="small"
        >
          <Descriptions.Item label="Birthday">
            {this.props.user.coach.birthday}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {this.props.user.coach.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {this.props.user.coach.email}
          </Descriptions.Item>
          <Descriptions.Item label="City">
            {this.props.user.coach.city}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}

export default CoachProfile;
