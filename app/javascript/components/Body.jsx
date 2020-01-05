import React from "react";
import PropTypes from "prop-types";
import AllTasks from "./AllTasks";
import NewTask from "./NewTask";
import axios from "axios";
import Search from "./Search";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./SideBar";

const csrfToken = document.querySelector('[name="csrf-token"]').content;
axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTaskDelete = this.handleTaskDelete.bind(this);
    this.handleUpdateTask = this.handleUpdateTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGetCategory = this.handleGetCategory.bind(this);
    this.state = { tasks: [], categories: [] };
  }

  componentDidMount() {
    axios
      .get("/show")
      .then(response => this.setState({ tasks: response.data }));
    axios
      .get("/categories")
      .then(response => this.setState({ categories: response.data }));
  }

  handleFormSubmit(data) {
    axios
      .post("/create", data)
      .then(response => this.setState({ tasks: response.data }));
  }

  handleTaskDelete(id) {
    axios
      .delete(`delete/${id}`)
      .then(response => this.setState({ tasks: response.data }));
  }

  handleUpdateTask(data) {
    axios
      .put(`update/${data.task.id}`, data)
      .then(response => this.setState({ tasks: response.data }));
  }

  handleChange(event) {
    axios
      .post("/search", {
        search: event.target.value
      })
      .then(response => {
        this.setState({
          tasks: response.data
        });
      });
  }

  handleGetCategory(event) {
    event.preventDefault();
    axios
      .post("/filter", {
        cat_id: event.target.getAttribute("value")
      })
      .then(response => {
        this.setState({
          tasks: response.data
        });
      });
  }

  render() {
    return (
      <div className="Container">
        <div className="row">
          <SideBar
            categories={this.state.categories}
            handleGetCategory={this.handleGetCategory}
          />
          <div className="col">
            <h1>Task Manager</h1>
            <div>
              <Search handleChange={this.handleChange} />
            </div>
            <div>
              <NewTask handleFormSubmit={this.handleFormSubmit} />
            </div>
            <div>
              <AllTasks
                tasks={this.state.tasks}
                handleTaskDelete={this.handleTaskDelete}
                handleUpdateTask={this.handleUpdateTask}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
