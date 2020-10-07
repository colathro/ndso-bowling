import React, { Component } from "react";
import DataAccess from "../../utils/DataAccess";
import { Button, Modal, Form, Input, DatePicker, Row, Col } from "antd";
import { PhoneOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";
import moment from "moment";

class CoachEditAthlete extends Component {
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

  handleSubmit = (e) => {
    console.log(e);
    DataAccess.putData(
      "api/coach/athlete",
      {
        id: this.props.athlete.id,
        firstName: e.firstName,
        lastName: e.lastName,
        email: e.email,
        phoneNumber: e.phoneNumber,
        city: e.city,
        birthday: e.birthday?._d.toDateString(),
      },
      () => {
        this.setState({
          visible: false,
        });
        DataAccess.RefetchAthletes();
      }
    );
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button type="secondary" onClick={this.showModal}>
          Edit
        </Button>
        <Modal
          title={
            this.props.athlete.firstName + " " + this.props.athlete.lastName
          }
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <Form ref={this.state.ref} onFinish={this.handleSubmit}>
            <Form.Item
              name="firstName"
              initialValue={this.props.athlete.firstName}
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              initialValue={this.props.athlete.lastName}
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item
              name="email"
              initialValue={this.props.athlete.email}
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item name="city" initialValue={this.props.athlete.city}>
              <Input prefix={<HomeOutlined />} placeholder="City" />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              initialValue={this.props.athlete.phoneNumber}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
            </Form.Item>
            <Form.Item
              name="birthday"
              initialValue={moment(this.props.athlete.birthday)}
            >
              <DatePicker placeholder="Birthday" />
            </Form.Item>
            <Form.Item>
              <Row>
                <Col offset={10}>
                  <Button type="secondary" onClick={this.handleCancel}>
                    Cancel
                  </Button>
                </Col>
                <Col offset={1}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default CoachEditAthlete;
