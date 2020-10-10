import React, { Component } from "react";
import DataAccess from "../../utils/DataAccess";
import { Button, Modal, Descriptions, Row, Col } from "antd";

class AdminDownloadData extends Component {
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

  downloadScores = {};

  downloadAthletes = {};

  render() {
    return (
      <Row gutter={[8, 8]} justify="end">
        <Col>
          <Button type="secondary" onClick={this.showModal}>
            Download Data
          </Button>
          <Modal
            title={"Download Data"}
            visible={this.state.visible}
            onOk={this.handleSubmit}
            onCancel={this.handleCancel}
            footer={null}
          >
            <Row gutter={[8, 8]}>
              <Col>
                <Button>Download Athletes</Button>
              </Col>
              <Col>
                <Button>Download Games</Button>
              </Col>
            </Row>
          </Modal>
        </Col>
      </Row>
    );
  }
}

export default AdminDownloadData;
