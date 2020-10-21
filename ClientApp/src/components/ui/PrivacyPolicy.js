import React, { Component } from "react";
import DataAccess from "../../utils/DataAccess";
import {
  Typography,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Row,
  Col,
} from "antd";

const { Link } = Typography;

class PrivacyPolicy extends Component {
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

  render() {
    return (
      <>
        <Link onClick={this.showModal}>Privacy Policy</Link>
        <Modal
          title="Privacy Policy"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        ></Modal>
      </>
    );
  }
}

export default PrivacyPolicy;
