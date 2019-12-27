import React from "react";
import PropTypes from "prop-types";
import Body from "./Body";
class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>Tasks are great!</h1>
        <Body />
      </div>
    );
  }
}

export default Main;
