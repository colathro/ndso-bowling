import React, { Component } from "react";
import DataAccess from "../../utils/DataAccess";
import {
  Typography,
  Form,
  Modal,
  message,
  Input,
  Select,
  Button,
  Row,
  Col,
} from "antd";

const { TextArea } = Input;
const { Option } = Select;
const { Link } = Typography;

class ReportIssue extends Component {
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

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit = (e) => {
    DataAccess.postData(
      `api/github?type=${e.type}&body=${e.description}`,
      null,
      () => {
        this.setState({
          visible: false,
        });
        message.success("Thanks for the report! We'll look at it!");
      }
    );
  };

  render() {
    return (
      <>
        <Link onClick={this.showModal}>Report Issue</Link>
        <Modal
          title="Report Issue"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleSubmit}
          footer={null}
          maskClosable={true}
          destroyOnClose={true}
        >
          <Form ref={this.state.ref} onFinish={this.handleSubmit}>
            <Form.Item initialValue={"Problem"} name="type">
              <Select>
                <Option value="Problem">Problem</Option>
                <Option value="Idea">Idea</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please leave a description here!",
                },
              ]}
            >
              <TextArea rows={4} placeholder="Description" />
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

export default ReportIssue;
