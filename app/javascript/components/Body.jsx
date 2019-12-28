import React from "react";
import PropTypes from "prop-types";
import AllTasks from "./AllTasks";
import NewTask from "./NewTask";
class Body extends React.Component {
  constructor() {
    super();
    this.state = { tasks: [] };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.handleTaskDelete = this.handleTaskDelete.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleUpdateTask = this.handleUpdateTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  handleFormSubmit(description, category) {
    let body = JSON.stringify({
      task: { description: description, category: category }
    });
    console.log(body);
    fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    })
      .then(response => {
        return response.json();
      })
      .then(task => {
        this.addNewTask(task);
      });
  }

  addNewTask(task) {
    this.setState({
      tasks: this.state.tasks.concat(task)
    });
  }

  handleTaskDelete(id) {
    fetch(`/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      this.deleteTask(id);
    });
  }

  deleteTask(id) {
    var newTasks = this.state.tasks.filter(task => task.id !== id);
    this.setState({
      tasks: newTasks
    });
  }

  handleUpdateTask(task) {
    fetch(`tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify({ task: task }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      this.updateTask(task);
    });
  }

  updateTask(task) {
    let newTasks = this.state.tasks.filter(task => task.id !== task.id);
    newTasks.push(task);
    this.setState({
      tasks: newTasks
    });
  }

  componentDidMount() {
    fetch("/tasks")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ tasks: data });
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
