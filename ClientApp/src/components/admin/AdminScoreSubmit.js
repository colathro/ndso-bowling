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
  Select,
} from "antd";

const { Option } = Select;

class AdminScoreSubmit extends Component {
  constructor(props) {
    super(props);
    let formRef = React.createRef();
    this.state = {
      visible: false,
      user: this.props.user,
      ref: formRef,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleSubmit = (e) => {
    DataAccess.postData(
      `api/admin/athletegame?id=${e.id}`,
      {
        score: e.score,
        location: e.location,
        date: e.date._d.toDateString(),
      },
      () => {
        this.setState({
          visible: false,
        });
        //DataAccess.RefetchScores();
      }
    );
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    console.log(this.props.athletes);
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
              name="id"
              rules={[{ required: true, message: "Please select an athlete!" }]}
            >
              <Select placeholder="Athlete">
                {this.props.athletes.map((athlete, index) => (
                  <Option value={athlete.id}>
                    {athlete.firstName + " " + athlete.lastName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
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

export default AdminScoreSubmit;
