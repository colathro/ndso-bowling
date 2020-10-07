import React, { Component } from "react";
import DataAccess from "../../utils/DataAccess";
import CoachViewAthlete from "./CoachViewAthlete";
import CoachScoreSubmit from "./CoachScoreSubmit";
import CoachAddAthlete from "./CoachAddAthlete";
import { Divider, Table, Row, Col } from "antd";

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
    render: (a) => <CoachViewAthlete athlete={a}></CoachViewAthlete>,
  },
];

class CoachAthletes extends Component {
  constructor(props) {
    super(props);
    this.state = { athletes: null };
    DataAccess.RefetchAthletes = this.getMyAthletes.bind(this);
  }

  async getMyAthletes() {
    DataAccess.getData("api/coach/athletes", this.setAthletes.bind(this));
  }

  setAthletes(body) {
    this.setState({ athletes: body });
  }

  async componentDidMount() {
    this.getMyAthletes();
  }

  render() {
    return (
      <div>
        <Row justify="space-around">
          <Col>
            <CoachAddAthlete user={this.state.user}></CoachAddAthlete>
          </Col>
          <Col>
            {this.state.athletes != null && (
              <CoachScoreSubmit
                athletes={this.state.athletes}
                user={this.props.user}
              />
            )}
          </Col>
        </Row>
        <Divider />
        <Table dataSource={this.state.athletes} columns={columns} />
      </div>
    );
  }
}

export default CoachAthletes;
