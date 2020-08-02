import { showError } from "../components/ui/Modal";

class DataAccessClient {
  constructor() {
    this.Auth = null;
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
          showError();
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
          showError();
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
          showError();
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
}

var DataAccess = new DataAccessClient();

export default DataAccess;
