import React, { Component } from "react";
import DataAccess from "../utils/DataAccess";
import List from "./ui/List";
import BackBar from "./ui/BackBar";
import Input from "./ui/Input";
import SmallButton from "./ui/SmallButton";

class AdminAllAthletes extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, athletes: null, search: "" };
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
    this.setState({ loading: true });
    DataAccess.getData(
      `api/admin/allathletes?lastname=${this.state.search}`,
      (body) => {
        this.setState({ athletes: body, loading: false });
      }
    );
  }

  navigateToAthlete(id) {
    this.props.history.push(`/admin/athlete?id=${id}`);
  }

  render() {
    return (
      <div>
        <BackBar history={this.props.history}>Athletes</BackBar>
        Lastname Search:
        <Input
          emoji="😀"
          type="text"
          defaultValue={this.state.search}
          onChange={(e) => {
            this.state.search = e.target.value;
          }}
          ariaLabel="last name field"
        ></Input>
        <SmallButton
          onClick={() => {
            this.getAthletes();
          }}
        >
          Search
        </SmallButton>
        <div>
          {!this.state.loading && (
            <List
              fields={this.fields}
              items={this.state.athletes}
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

export default AdminAllAthletes;
