import React, { Component } from "react";
import DataAccess from "../../utils/DataAccess";
import AdminViewAthlete from "./AdminViewAthlete";
import AdminScoreSubmit from "./AdminScoreSubmit";
import AdminAddAthlete from "./AdminAddAthlete";
import AdminAthletesFilter from "./AdminAthletesFilter";
import { Divider, Table, Row, Col, Input } from "antd";

class AdminAthletes extends Component {
  constructor(props) {
    super(props);
    this.state = { athletes: null, filter: "" };
    DataAccess.RefetchAthletes = () => {
      this.getMyAthletes(this.state.filter);
    };
  }

  async getMyAthletes(filter) {
    DataAccess.getData(
      `api/admin/allathletes?lastname=${filter}`,
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
    this.getMyAthletes("");
  }

  render() {
    return (
      <div>
        <Row justify="end" gutter={[8, 8]}>
          <Col>
            <AdminAddAthlete user={this.state.user}></AdminAddAthlete>
          </Col>
          <Col>
            {this.state.athletes != null && (
              <AdminScoreSubmit
                athletes={this.state.athletes}
                user={this.props.user}
              />
            )}
          </Col>
        </Row>
        <Row justify="end" gutter={[8, 8]}>
          <Col>
            <AdminAthletesFilter
              callback={this.getMyAthletes.bind(this)}
              setFilter={this.setFilter.bind(this)}
            ></AdminAthletesFilter>
          </Col>
        </Row>
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
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: (a) => <AdminViewAthlete athlete={a}></AdminViewAthlete>,
  },
];

export default AdminAthletes;
