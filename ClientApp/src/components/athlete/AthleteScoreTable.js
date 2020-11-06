import React, { Component } from "react";
import DataAccess from "../../utils/DataAccess";
import { Divider, Table, Space } from "antd";
import AthleteStatistics from "./AthleteStatistics";
import AthleteScoreView from "./AthleteScoreView";

class AthleteScoreTable extends Component {
  columns = [
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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <AthleteScoreView game={record}></AthleteScoreView>
        </Space>
      ),
    },
  ];

  constructor(props) {
    super(props);
    this.state = { scores: null };
    DataAccess.RefetchScores = this.getMyScores.bind(this);
  }

  async getMyScores() {
    DataAccess.getData("api/game/mygames", this.setScores.bind(this));
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
          <AthleteStatistics scores={this.state.scores}></AthleteStatistics>
        )}
        <Divider />
        <Table
          dataSource={this.state.scores}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {}, // click row
            };
          }}
          columns={this.columns}
        />
      </div>
    );
  }
}

export default AthleteScoreTable;
