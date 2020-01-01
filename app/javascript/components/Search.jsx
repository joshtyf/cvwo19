import React from "react";
import PropTypes from "prop-types";
class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form>
          <div>
            <label>Search for task</label>
            <br />
            <input
              onChange={this.props.handleChange}
              autoComplete="off"
              type="text"
              name="description"
              placeholder="type task description"
              value={this.props.name}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
