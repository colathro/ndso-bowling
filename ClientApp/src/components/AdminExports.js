import { withAuth0 } from "@auth0/auth0-react";
import React, { Component } from "react";
import BackBar from "./ui/BackBar";
import Button from "./ui/Button";

class AdminExports extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
            <BackBar history={this.props.history}>Export Data as CSV</BackBar>
            <div id="menu">
                <Button emoji="💯" onClick={async () => fetch("api/admin/GetScoreReport", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${await this.props.auth0.getAccessTokenSilently({
                            audience: window.location.origin,
                            })}`,
                        },
                    }).then(response => {
                    response.blob().then(blob => {
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement('a');
                        a.href = url;
                        a.download = 'scores.csv';
                        a.click();
                    })})
                    }>
                    All Scores
                </Button>
                <Button emoji="👟" onClick={async () => fetch("api/admin/GetAthleteReport", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${await this.props.auth0.getAccessTokenSilently({
                            audience: window.location.origin,
                            })}`,
                        },
                    }).then(response => {
                    response.blob().then(blob => {
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement('a');
                        a.href = url;
                        a.download = 'athletes.csv';
                        a.click();
                    })})
                    }>
                    All Athletes
                </Button>
            </div>
            </div>
        )
    }
};

export default withAuth0(AdminExports);
