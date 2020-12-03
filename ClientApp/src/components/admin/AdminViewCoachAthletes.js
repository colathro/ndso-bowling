import React, { Component } from "react";
import DataAccess from "../../utils/DataAccess";
import { Divider, Table, Row, Col, Input } from "antd";

class AdminViewCoachAthletes extends Component {
  constructor(props) {
    super(props);
    this.state = { athletes: null, filter: "" };
  }

  async getCoachAthletes(filter) {
    DataAccess.getData(
      `api/admin/allcoachathletes?id=${this.props.coachId}`,
      this.setAthletes.bind(this)
    );
  }

  setAthletes(body) {
    this.setState({ athletes: body });
  }

  setFilter(filter) {
    this.setState({ filter: filter });
  }

  async componentDidMount() {
    this.getCoachAthletes("");
  }

  render() {
    return (
      <div>
        <Table dataSource={this.state.athletes} columns={columns} />
      </div>
    );
  }
}

const columns = [
  {
    title: "Name",
    key: "1",
    sorter: function (a, b) {
      if (a.firstName + a.lastName > b.firstName + b.lastName) {
        return 1;
      }
      if (a.firstName + a.lastName < b.firstName + b.lastName) {
        return -1;
      }
      return 0;
    },
    render: (i) => <div>{i.firstName + " " + i.lastName}</div>,
  },
];

export default AdminViewCoachAthletes;
