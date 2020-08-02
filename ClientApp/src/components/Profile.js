import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import DataAccess from "../utils/DataAccess";
import * as QueryString from "query-string";
import BackBar from "./ui/BackBar";
import Input from "./ui/Input";
import SmallButton from "./ui/SmallButton";
import Select from "./ui/Select";

class Profile extends Component {
  constructor(props) {
    super(props);

    var registering = false;
    var loading = true;
    var athlete = null;
    var updating = false;
    var target = null;
    var editable = true;
    var approvalButton = false;
    const params = QueryString.parse(props.location.search);

    // update these if registering new scenario
    if (this.props.new != null && this.props.new) {
      var registering = true;
      var loading = false;
      var athlete = {
        firstName: "",
        middleName: "",
        lastName: "",
        birthday: "",
        phoneNumber: "",
        email: "",
        district: 0,
      };
    }

    if (this.props.update) {
      updating = true;
      target = params.id;
    }

    if (params.approve == 1) {
      editable = false;
      approvalButton = true;
    }

    this.state = {
      loading: loading,
      profile: null,
      athlete: athlete,
      image: null,
      review: null,
      registering: registering,
      target: target,
      updating: updating,
      editable: editable,
      approvalButton: approvalButton,
    };
  }

  async componentDidMount() {
    if (!this.state.registering && !this.state.updating) {
      await this.getMyProfile();
      this.getMyAthlete();
    }

    if (this.state.updating) {
      this.getAthlete(this.state.target);
    }
  }

  async getMyProfile() {
    return DataAccess.getData("api/user/me", (body) => {
      this.setState({ profile: body, loading: false });
    });
  }

  async getMyAthlete() {
    return DataAccess.getData("api/athlete/me", (body) => {
      this.setState({ athlete: body, loading: false });
    });
  }

  async getAthlete(id) {
    return DataAccess.getData(`api/admin/athlete?id=${id}`, (body) => {
      this.setState({ athlete: body, loading: false });
    });
  }

  async updateProfile() {
    this.setState({ loading: true });
    if (this.state.registering) {
      DataAccess.postData(
        "api/admin/registerathlete",
        this.state.athlete,
        () => {
          this.props.history.goBack();
        }
      );
    } else if (this.state.updating) {
      DataAccess.putData("api/admin/athlete", this.state.athlete, () => {
        this.props.history.goBack();
      });
    } else {
      DataAccess.putData("api/athlete/update", this.state.athlete, () => {
        this.props.history.goBack();
      });
    }
  }

  async approve(id) {
    this.setState({ loading: true });
    DataAccess.postData(`api/admin/approveathlete?id=${id}`, null, () => {
      this.props.history.goBack();
    });
  }

  async deny(id) {
    this.setState({ loading: true });
    DataAccess.postData(`api/admin/denyathlete?id=${id}`, null, () => {
      this.props.history.goBack();
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <BackBar history={this.props.history}>
          {this.state.registering ? "Register Athlete" : "Edit Profile"}
        </BackBar>
        <div id="input-fields">
          <form>
            <div className="field">
              <span className="field-title">First Name</span>
              <Input
                emoji="😀"
                disabled={!this.state.editable}
                type="text"
                defaultValue={this.state.athlete?.firstName}
                onChange={(e) => {
                  this.state.athlete.firstName = e.target.value;
                }}
              ></Input>
            </div>
            <div className="field">
              <span className="field-title">Last Name</span>
              <Input
                emoji="😀"
                disabled={!this.state.editable}
                type="text"
                defaultValue={this.state.athlete?.lastName}
                onChange={(e) => {
                  this.state.athlete.lastName = e.target.value;
                }}
              ></Input>
            </div>
            <div className="field">
              <span className="field-title">Birthday</span>
              <Input
                emoji="🎊"
                disabled={!this.state.editable}
                type="date"
                defaultValue={this.state.athlete?.birthday}
                onChange={(e) => {
                  this.state.athlete.birthday = e.target.value;
                }}
              />
            </div>
            <div className="field">
              <span className="field-title">Phone Number</span>
              <Input
                emoji="☎"
                disabled={!this.state.editable}
                type="text"
                defaultValue={this.state.athlete?.phoneNumber}
                onChange={(e) => {
                  this.state.athlete.phoneNumber = e.target.value;
                }}
              ></Input>
            </div>
            <div className="field">
              <span className="field-title">District</span>
              <Select
                emoji="🗺"
                disabled={!this.state.editable}
                onChange={(e) => {
                  this.state.athlete.district = parseInt(e.target.value);
                }}
              >
                <option value={0} selected={this.state.athlete?.district == 0}>
                  None
                </option>
                <option value={1} selected={this.state.athlete?.district == 1}>
                  Williston - 1
                </option>
                <option value={2} selected={this.state.athlete?.district == 2}>
                  Minot - 2
                </option>
                <option value={3} selected={this.state.athlete?.district == 3}>
                  Devils Lake - 3
                </option>
                <option value={5} selected={this.state.athlete?.district == 5}>
                  Grand Forks - 5
                </option>
                <option value={6} selected={this.state.athlete?.district == 6}>
                  Fargo - 6
                </option>
                <option value={7} selected={this.state.athlete?.district == 7}>
                  Wahpteon - 7
                </option>
                <option value={8} selected={this.state.athlete?.district == 8}>
                  Valley City - 8
                </option>
                <option value={9} selected={this.state.athlete?.district == 9}>
                  Jamestown - 9
                </option>
                <option
                  value={10}
                  selected={this.state.athlete?.district == 10}
                >
                  Bismarck - 10
                </option>
                <option
                  value={11}
                  selected={this.state.athlete?.district == 11}
                >
                  Mandan - 11
                </option>
                <option
                  value={12}
                  selected={this.state.athlete?.district == 12}
                >
                  Dickinson - 12
                </option>
              </Select>
            </div>
            <div className="field">
              <span className="field-title">Email</span>
              <Input
                emoji="📧"
                disabled={!this.state.editable}
                type="email"
                defaultValue={this.state.athlete?.email}
                onChange={(e) => {
                  this.state.athlete.email = e.target.value;
                }}
              ></Input>
            </div>
          </form>
          <div className="submit-buttons">
            {this.state.editable && (
              <div style={{ display: "flex" }}>
                <SmallButton
                  emoji="❌"
                  onClick={async () => {
                    this.props.history.goBack();
                  }}
                ></SmallButton>
                <SmallButton
                  emoji="✅"
                  primary={true}
                  onClick={async () => {
                    await this.updateProfile();
                  }}
                ></SmallButton>
              </div>
            )}
            {this.state.approvalButton && (
              <div style={{ display: "flex" }}>
                <SmallButton
                  emoji="❌"
                  onClick={() => {
                    this.deny(this.state.target);
                  }}
                >
                  Deny
                </SmallButton>
                <SmallButton
                  emoji="✅"
                  primary={true}
                  onClick={() => {
                    this.approve(this.state.target);
                  }}
                >
                  Approve
                </SmallButton>
              </div>
            )}
            {this.state.updating && (
              <div style={{ display: "flex" }}>
                <SmallButton
                  onClick={() =>
                    this.props.history.push(
                      `/admin/athletes/scoresbyathlete?id=${this.state.target}`
                    )
                  }
                >
                  View Scores
                </SmallButton>
                <SmallButton
                  onClick={() => {
                    // build out logging a score on behalf of a user
                  }}
                >
                  Log New Score
                </SmallButton>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth0(Profile);
