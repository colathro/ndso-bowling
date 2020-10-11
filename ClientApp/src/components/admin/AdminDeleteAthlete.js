import React, { Component } from "react";
import DataAccess from "../../utils/DataAccess";
import { Button, Modal, Typography, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

class AdminDeleteAthlete extends Component {
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
      `api/admin/deleteathlete?id=${this.props.id}`,
      null,
      () => {
        this.setState({
          visible: false,
        });
        this.props.callback();
        message.success("Successfully Deleted Athlete!");
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
          Delete
        </Button>
        <Modal
          title="Confirm Delete"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          okText="Confirm"
          cancelText="Cancel"
          maskClosable={false}
          icon={<ExclamationCircleOutlined></ExclamationCircleOutlined>}
        >
          <Text>Are you sure you want to delete this athlete?</Text>
        </Modal>
      </>
    );
  }
}

export default AdminDeleteAthlete;
