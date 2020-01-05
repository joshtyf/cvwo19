import React from "react";
import PropTypes from "prop-types";
class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var categories = this.props.categories.map(category => {
      return (
        <li className="nav-item" key={category.id}>
          <a
            className="nav-link"
            href="#"
            onClick={this.props.handleGetCategory}
            value={category.id}
          >
            {category.name}
          </a>
        </li>
      );
    });

    return (
      <div className="col-2 sidebar">
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          Categories
        </h6>
        <nav>
          <div className="sidebar-sticky">
            <ul className="nav flex-column">{categories}</ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default SideBar;
