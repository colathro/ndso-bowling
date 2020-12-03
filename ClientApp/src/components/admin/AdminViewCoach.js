import React, { Component } from "react";
import DataAccess from "../../utils/DataAccess";
import { Button, Modal, Descriptions, Row, Col } from "antd";
import AdminEditCoach from "./AdminEditCoach";
import AdminDeleteCoach from "./AdminDeleteCoach";
import AdminViewCoachAthletes from "./AdminViewCoachAthletes";

class AdminViewCoach extends Component {
  constructor(props) {
    super(props);
    let formRef = React.createRef();
    this.state = { visible: false, user: this.props.user, ref: formRef };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleSubmit = (e) => {};

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button type="secondary" onClick={this.showModal}>
          View
        </Button>
        <Modal
          title={this.props.coach.firstName + " " + this.props.coach.lastName}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <Descriptions
            extra={
              <Row gutter={[16, 0]}>
                <Col>
                  <AdminEditCoach coach={this.props.coach}></AdminEditCoach>
                </Col>
                <Col>
                  <AdminDeleteCoach
                    id={this.props.coach.id}
                    callback={this.handleCancel}
                  ></AdminDeleteCoach>
                </Col>
              </Row>
            }
            size="large"
          >
            <Descriptions.Item label="Birthday" span={3}>
              {this.props.coach.birthday}
            </Descriptions.Item>
            <Descriptions.Item label="Phone Number" span={3}>
              {this.props.coach.phoneNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Email" span={3}>
              {this.props.coach.email}
            </Descriptions.Item>
            <Descriptions.Item label="City" span={3}>
              {this.props.coach.city}
            </Descriptions.Item>
          </Descriptions>
          <AdminViewCoachAthletes
            coachId={this.props.coach.id}
          ></AdminViewCoachAthletes>
        </Modal>
      </>
    );
  }
}

export default AdminViewCoach;
