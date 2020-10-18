import React, { Component } from "react";
import DataAccess from "../../utils/DataAccess";
import { Divider, Table } from "antd";
import AdminViewAthleteScoreStatistics from "./AdminViewAthleteScoreStatistics";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    sorter: (a, b) => Date.parse(a.date) - Date.parse(b.date),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
    sorter: (a, b) => a.score - b.score,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
];


class AdminViewAthleteScores extends Component {
  constructor(props) {
    super(props);
    this.state = { scores: null, athlete: this.props.athlete };
    DataAccess.RefetchScores = this.getMyScores.bind(this);
  }

  async getMyScores() {
    DataAccess.getData(
      `api/admin/GameFromAthlete?id=${this.props.athlete.id}`,
      this.setScores.bind(this)
    );
  }

  setScores(body) {
    this.setState({ scores: body });
  }

  async componentDidMount() {
    this.getMyScores();
  }

  render() {
    return (
      <div>
        {this.state.scores && (
          <AdminViewAthleteScoreStatistics
            scores={this.state.scores}
          ></AdminViewAthleteScoreStatistics>
        )}
        <Divider />
        <Table dataSource={this.state.scores} columns={columns} />
      </div>
    );
  }
}

export default AdminViewAthleteScores;
