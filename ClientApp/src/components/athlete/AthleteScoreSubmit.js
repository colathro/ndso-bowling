import React, { Component } from "react";
import DataAccess from "../../utils/DataAccess";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Row,
  Col,
} from "antd";
import { PhoneOutlined } from "@ant-design/icons";

class AthleteScoreSubmit extends Component {
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
    DataAccess.postData(
      "api/game/submitmygame",
      {
        witness: e.witness,
        score: e.score,
        witnessPhone: e.witnessPhone,
        location: e.location,
        date: e.date._d.toDateString(),
      },
      () => {
        this.setState({
          visible: false,
        });
        DataAccess.RefetchScores();
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
        <Button type="primary" onClick={this.showModal}>
          New Score Entry
        </Button>
        <Modal
          title="Submit Score"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <Form ref={this.state.ref} onFinish={this.handleSubmit}>
            <Form.Item
              name="score"
              rules={[
                { required: true, message: "Please input your score!" },
                { type: "integer", message: "The score must be a number!" },
              ]}
            >
              <InputNumber placeholder="Score" />
            </Form.Item>
            <Form.Item
              name="location"
              rules={[
                {
                  required: true,
                  message: "Please input the location of the bowling lane!",
                },
              ]}
            >
              <Input placeholder="Location" />
            </Form.Item>
            <Form.Item name="date">
              <DatePicker placeholder="Date" />
            </Form.Item>
            <Form.Item name="witness">
              <Input placeholder="Witness" />
            </Form.Item>
            <Form.Item name="witnessPhone">
              <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
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

  formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
}

export default AthleteScoreSubmit;
