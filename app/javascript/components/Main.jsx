import React from "react";
import PropTypes from "prop-types";
import Body from "./Body";
class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Tasks are great!</h1>
        <Body tasks={this.props.tasks} />
      </div>
    );
  }
}

export default Main;
