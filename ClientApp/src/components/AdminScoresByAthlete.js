import * as React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import * as QueryString from "query-string";

class AdminScoresByAthlete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loading: true, scores: null};

        const params = QueryString.parse(props.location.search);

    }

    async componentDidMount() {
        this.getScoresByAthlete();
    }

    async getScoresByAthlete() {
        fetch(`api/admin/GameFromAthlete?id=${params.id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${await this.props.auth0.getAccessTokenSilently({
                  audience: window.location.origin,
                })}`,
            },
        }).then(async (response) => {
            var body = response.json();
            return body;
        }).then((body) => {
            this.setState({scores: body, loading: false});
        });
    }

    render() {
        return (
          <div>
            Get Scores For Athlete
            <div>
                <ul>
                  {!this.state.loading &&
                    this.state.scores.map((v, i) => {
                        return (
                            <li>
                                <span>{v.score}</span>|<span>{v.athlete.firstName}</span>|
                            <span>{v.date}</span>|<span>{v.location}</span>|<span>{v.review}</span>
                            </li>
                            );
                    })}
                </ul>
              </div>
          </div>
        );
    }
}

export default withAuth0(AdminUnreviewedScores);
