import React from "react";
import PropTypes from "prop-types";
class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var results = this.props.results.map(result => (
      <li key={result.id}>{result.description}</li>
    ));

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
        <div>{results}</div>
      </div>
    );
  }
}

export default Search;
