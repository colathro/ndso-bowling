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
        city: "",
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

  async makeCoach(id) {
    this.setState({ loading: true });
    DataAccess.postData(`api/admin/makecoach`, this.state.target, () => {
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
        <div id="input-fields" role="main">
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
                ariaLabel="first name field"
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
                ariaLabel="last name field"
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
                ariaLabel="brithday field"
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
                ariaLabel="phone number field"
              ></Input>
            </div>
            <div className="field">
              <span className="field-title">City</span>
              <Input
                emoji="🏙️"
                disabled={!this.state.editable}
                type="email"
                defaultValue={this.state.athlete?.city}
                onChange={(e) => {
                  this.state.athlete.city = e.target.value;
                }}
                ariaLabel="email field"
              ></Input>
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
                ariaLabel="email field"
              ></Input>
            </div>
          </form>
          <div className="submit-buttons">
            {this.state.editable && (
              <div style={{ display: "flex" }}>
                <SmallButton
                  onClick={async () => {
                    this.props.history.goBack();
                  }}
                  ariaLabel="cancel and go back"
                >
                  Cancel
                </SmallButton>
                <SmallButton
                  primary={true}
                  onClick={async () => {
                    await this.updateProfile();
                  }}
                  ariaLabel="submit your profile"
                >
                  Save
                </SmallButton>
              </div>
            )}
            {this.state.updating && (
              <div>
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
                <div style={{ display: "flex" }}>
                  <SmallButton
                    onClick={() => {
                      this.makeCoach();
                    }}
                  >
                    Make Coach
                  </SmallButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth0(Profile);
