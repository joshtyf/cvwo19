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
    this.state = { tasks: [], search_results: [] };
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
    console.log(this.state.search_results);
    axios
      .post("/search", {
        search: event.target.value
      })
      .then(response => {
        this.setState({
          search_results: response.data
        });
        // console.log(response.data);
      });
    console.log(this.state.search_results);
  }

  render() {
    return (
      <div>
        <Search
          handleChange={this.handleChange}
          results={this.state.search_results}
        />
        <NewTask handleFormSubmit={this.handleFormSubmit} />
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
