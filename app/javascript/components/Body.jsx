import React from "react";
import PropTypes from "prop-types";
import AllTasks from "./AllTasks";
import NewTask from "./NewTask";
import axios from "axios";

const csrfToken = document.querySelector('[name="csrf-token"]').content;
axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTaskDelete = this.handleTaskDelete.bind(this);
    this.handleUpdateTask = this.handleUpdateTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
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
    // fetch(`tasks/${task.id}`, {
    //   method: "PUT",
    //   body: JSON.stringify({ task: task }),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // }).then(response => {
    //   this.updateTask(task);
    // });
    axios
      .put(`update/${data.task.id}`, data)
      .then(response => this.setState({ tasks: response.data }));
  }

  updateTask(task) {
    const filter_id = task.id;
    let newTasks = this.state.tasks.filter(task => task.id !== filter_id);
    newTasks.push(task);
    this.setState({
      tasks: newTasks
    });
  }

  render() {
    return (
      <div>
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
