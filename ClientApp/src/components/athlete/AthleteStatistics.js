import React, { Component } from "react";
import { Statistic, Row, Col, Divider } from "antd";
import { Chart } from "@antv/g2";

class AthleteScoreTable extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.chart = new Chart({
      container: "c1",
      height: 200,
      width: 600,
      autoFit: true,
    });

    this.chart.data(this.chartData(this.props.scores));

    this.chart.axis(true);

    this.chart.scale({
      score: {
        min: 0,
      },
    });

    this.chart.line().position("date*score").color("#ff0000");
    this.chart.render();
  }

  async componentDidUpdate() {
    this.chart.data(this.chartData(this.props.scores));
    this.chart.render();
  }

  chartData(scores) {
    var newScores = {};
    scores.forEach((score) => {
      var scoreIndex = Object.keys(newScores).findIndex(check, score);
      if (scoreIndex === -1) {
        newScores[score.date] = [score];
      } else {
        newScores[score.date].push(score);
      }
    });

    var output = [];
    Object.keys(newScores).forEach((key) => {
      var total = 0;
      newScores[key].forEach((score) => {
        total += score.score;
      });
      output.push({ date: key, score: total / newScores[key].length });
    });
    output.sort(function (a, b) {
      var keyA = new Date(a.date),
        keyB = new Date(b.date);
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

    return output;
  }

  average() {
    let total = 0;
    let count = 0;
    this.props.scores.forEach((score) => {
      // 14 days
      if (Date.parse(score.date) > Date.now() - 1210000000) {
        count++;
        total += score.score;
      }
    });
    if (total === 0) {
      return 0;
    }
    return total / count;
  }

  best() {
    let max = 0;
    this.props.scores.forEach((score) => {
      if (score.score > max) {
        max = score.score;
      }
    });
    return max;
  }

  todayAverage() {
    let total = 0;
    let count = 0;
    this.props.scores.forEach((score) => {
      if (
        new Date(Date.parse(score.date)).toDateString() ===
        new Date(Date.now()).toDateString()
      ) {
        count++;
        total += score.score;
      }
    });
    if (total === 0) {
      return 0;
    }
    return total / count;
  }

  render() {
    return (
      <div>
        <div id="c1"></div>
        <Divider />
        <Row justify="space-around">
          <Col span={6} offset={1}>
            <Statistic
              title="14 day average"
              value={this.average()}
              precision={0}
            ></Statistic>
          </Col>
          <Col span={6} offset={1}>
            <Statistic
              precision={0}
              title="todays average"
              value={this.todayAverage()}
            ></Statistic>
          </Col>
          <Col span={6} offset={1}>
            <Statistic
              precision={0}
              title="best ever score"
              value={this.best()}
            ></Statistic>
          </Col>
        </Row>
      </div>
    );
  }
}

function check(val) {
  if (val === this.date) {
    return true;
  } else {
    return false;
  }
}

export default AthleteScoreTable;
