import React from "react";
import PropTypes from "prop-types";
import AllTasks from "./AllTasks";
import NewTask from "./NewTask";
import axios from "axios";
import Search from "./Search";

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
      <div>
        <link
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        ></link>
        <h1>Task Manager</h1>
        <Search handleChange={this.handleChange} />
        <br />
        <NewTask handleFormSubmit={this.handleFormSubmit} />
        <br />
        <AllTasks
          tasks={this.state.tasks}
          handleTaskDelete={this.handleTaskDelete}
          handleUpdateTask={this.handleUpdateTask}
        />
      </div>
    );
  }
}

export default Body;
