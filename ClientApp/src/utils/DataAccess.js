class DataAccessClient {
  constructor() {
    this.Auth = null;
    this.RefetchScores = null;
    this.RefetchPlayer = null;
    this.RefetchCoaches = null;
  }

  async postData(uri, data, callback) {
    fetch(uri, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await this.Auth.getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.status != 200) {
        }
      })
      .then(() => {
        callback();
      });
  }

  async putData(uri, data, callback) {
    fetch(uri, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${await this.Auth.getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.status != 200) {
        }
      })
      .then(() => {
        callback();
      });
  }

  async getData(uri, callback) {
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await this.Auth.getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
      },
    })
      .then(async (response) => {
        if (response.status != 200) {
        }
        var object = response.json();
        return object;
      })
      .then((object) => {
        callback(object);
      });
  }

  async getNoData(uri, callback) {
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await this.Auth.getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
      },
    }).then((response) => {
      if (response.status == 200) {
        callback();
      }
    });
  }

  async downloadAthletes() {
    fetch("api/admin/GetAthleteReport", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await this.Auth.getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
      },
    }).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "athletes.csv";
        a.click();
      });
    });
  }

  async downloadScores() {
    fetch("api/admin/GetScoreReport", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await this.Auth.getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
      },
    }).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "scores.csv";
        a.click();
      });
    });
  }

  async deleteData(uri, data, callback) {
    fetch(uri, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${await this.Auth.getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.status != 200) {
        }
      })
      .then(() => {
        callback();
      });
  }
}

var DataAccess = new DataAccessClient();

export default DataAccess;
