import React from "react";
import PropTypes from "prop-types";
class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="w-25">
        <form>
          <div className="form-group">
            <input
              type="text"
              autoComplete="off"
              onChange={this.props.handleChange}
              className="form-control "
              name="description"
              placeholder="Search for a task"
              value={this.props.name}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
