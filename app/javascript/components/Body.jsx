import React from "react";
import PropTypes from "prop-types";
import AllTasks from "./AllTasks";
import NewTask from "./NewTask";
import axios from "axios";
import Search from "./Search";
import "bootstrap/dist/css/bootstrap.min.css";

const csrfToken = document.querySelector('[name="csrf-token"]').content;
axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTaskDelete = this.handleTaskDelete.bind(this);
    this.handleUpdateTask = this.handleUpdateTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { tasks: [] };
  }

  componentDidMount() {
    axios
      .get("/show")
      .then(response => this.setState({ tasks: response.data }));
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

  render() {
    return (
      <div className="Container">
        <div className="row justify-content-center">
          <div className="col-auto">
            <h1>Task Manager</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <Search handleChange={this.handleChange} />
        </div>
        <div className="row justify-content-center">
          <NewTask handleFormSubmit={this.handleFormSubmit} />
        </div>
        <div className="row justify-content-center">
          <AllTasks
            tasks={this.state.tasks}
            handleTaskDelete={this.handleTaskDelete}
            handleUpdateTask={this.handleUpdateTask}
          />
        </div>
      </div>
    );
  }
}

export default Body;
