import React, { Component } from "react";
import { Input } from "antd";

const { Search } = Input;

class AdminAthletesFilter extends Component {
  constructor(props) {
    super(props);
    this.state = { filter: "" };
  }

  render() {
    return (
      <div>
        <Search
          placeholder="Last Name"
          onSearch={(value) => {
            this.props.setFilter(value);
            this.props.callback(value);
          }}
        />
      </div>
    );
  }
}
export default AdminAthletesFilter;
