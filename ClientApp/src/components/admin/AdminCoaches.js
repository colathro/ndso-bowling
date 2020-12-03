import React, { Component } from "react";
import DataAccess from "../../utils/DataAccess";
import AdminViewCoach from "./AdminViewCoach";
import AdminAthletesFilter from "./AdminAthletesFilter";
import { Divider, Table, Row, Col, Input } from "antd";

class AdminCoaches extends Component {
  constructor(props) {
    super(props);
    this.state = { coaches: null, filter: "" };
    DataAccess.RefetchCoaches = () => {
      this.getCoaches(this.state.filter);
    };
  }

  async getCoaches(filter) {
    DataAccess.getData(
      `api/admin/allcoaches?lastname=${filter}`,
      this.setAthletes.bind(this)
    );
  }

  setAthletes(body) {
    this.setState({ coaches: body });
  }

  setFilter(filter) {
    this.setState({ filter: filter });
  }

  async componentDidMount() {
    this.getCoaches("");
  }

  render() {
    return (
      <div>
        <Row justify="end" gutter={[8, 8]}>
          <Col>
            <AdminAthletesFilter
              callback={this.getCoaches.bind(this)}
              setFilter={this.setFilter.bind(this)}
            ></AdminAthletesFilter>
          </Col>
        </Row>
        <Table dataSource={this.state.coaches} columns={columns} />
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
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: (c) => <AdminViewCoach coach={c}></AdminViewCoach>,
  },
];

export default AdminCoaches;
