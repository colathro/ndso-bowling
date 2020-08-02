import React, { Component } from "react";
import DataAccess from "../utils/DataAccess";
import BackBar from "./ui/BackBar";
import List from "./ui/List";

class AdminAthleteApprovals extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, athletes: null };
    this.fields = [
      { id: 0, name: "ID", emoji: "", field: "id" },
      { id: 1, name: "First Name", emoji: "", field: "firstName" },
      { id: 2, name: "Last Name", emoji: "", field: "lastName" },
    ];
  }

  async componentDidMount() {
    this.getAthletes();
  }

  async getAthletes() {
    DataAccess.getData("api/admin/AllUnapprovedAthletes", (body) => {
      this.setState({ athletes: body, loading: false });
    });
  }

  navigateToAthlete(id) {
    this.props.history.push(`/admin/athlete?id=${id}&approve=1`);
  }

  render() {
    return (
      <div>
        <BackBar history={this.props.history}>Athete Approvals</BackBar>
        <div>
          {!this.state.loading && (
            <List
              items={this.state.athletes}
              fields={this.fields}
              onClick={{
                method: this.navigateToAthlete.bind(this),
                field: "id",
              }}
            ></List>
          )}
        </div>
      </div>
    );
  }
}

export default AdminAthleteApprovals;
