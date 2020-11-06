import React, { Component } from "react";
import DataAccess from "../../utils/DataAccess";
import { Button, Modal, Descriptions } from "antd";

class AthleteScoreView extends Component {
  constructor(props) {
    super(props);
    let formRef = React.createRef();
    this.state = { visible: false, game: props.game, ref: formRef };
  }

  delete = () => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this game?",
      okText: "Delete",
      cancelText: "Cancel",
      onOk: this.reallyDelete,
    });
  };

  reallyDelete = () => {
    DataAccess.deleteData(
      `api/game/deletemygame?gameId=${this.props.game.id}`,
      null,
      () => {
        DataAccess.RefetchScores();
        this.handleCancel();
      }
    );
  };

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
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          footer={null}
          closeIcon={<></>}
          maskClosable={true}
        >
          <Descriptions size="small">
            <Descriptions.Item label="Date">
              {this.props.game.date}
            </Descriptions.Item>
            <Descriptions.Item label="Score">
              {this.props.game.score}
            </Descriptions.Item>
            <Descriptions.Item label="Witness">
              {this.props.game.witness}
            </Descriptions.Item>
            <Descriptions.Item label="Witness Phone Number">
              {this.props.game.witnessPhone}
            </Descriptions.Item>
            <Descriptions.Item label="Location">
              {this.props.game.location}
            </Descriptions.Item>
          </Descriptions>
          <Button onClick={this.delete}>Delete</Button>
        </Modal>
      </>
    );
  }
}

export default AthleteScoreView;
