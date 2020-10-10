import React, { Component } from "react";
import DataAccess from "../../utils/DataAccess";
import { Button, Modal, Descriptions, Row, Col } from "antd";
import AdminViewAthleteScores from "./AdminViewAthleteScores";
import AdminEditAthlete from "./AdminEditAthlete";
import AdminDeleteAthlete from "./AdminDeleteAthlete";

class AdminViewAthlete extends Component {
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
          title={
            this.props.athlete.firstName + " " + this.props.athlete.lastName
          }
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
                  <AdminEditAthlete
                    athlete={this.props.athlete}
                  ></AdminEditAthlete>
                </Col>
                <Col>
                  <AdminDeleteAthlete
                    id={this.props.athlete.id}
                    callback={this.handleCancel}
                  ></AdminDeleteAthlete>
                </Col>
              </Row>
            }
            size="small"
          >
            <Descriptions.Item label="Birthday">
              {this.props.athlete.birthday}
            </Descriptions.Item>
            <Descriptions.Item label="Phone Number">
              {this.props.athlete.phoneNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {this.props.athlete.email}
            </Descriptions.Item>
            <Descriptions.Item label="City">
              {this.props.athlete.city}
            </Descriptions.Item>
          </Descriptions>
          <AdminViewAthleteScores
            athlete={this.props.athlete}
          ></AdminViewAthleteScores>
        </Modal>
      </>
    );
  }
}

export default AdminViewAthlete;
