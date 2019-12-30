import React from "react";
import PropTypes from "prop-types";
import AllTasks from "./AllTasks";
import NewTask from "./NewTask";
class Body extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.handleTaskDelete = this.handleTaskDelete.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleUpdateTask = this.handleUpdateTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.state = { tasks: this.props.tasks };
  }

  handleFormSubmit(description, category) {
    let body = JSON.stringify({
      task: { description: description, category: category }
    });
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
    console.log(newTasks);
    this.setState({
      tasks: newTasks
    });
  }

  handleUpdateTask(task) {
    console.log(task);
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
    console.log(task);
    const filter_id = task.id;
    let newTasks = this.state.tasks.filter(task => task.id !== filter_id);
    newTasks.push(task);
    this.setState({
      tasks: newTasks
    });
  }

  // // Need to figure out component lifecylce
  // componentDidMount() {
  //   this.state.tasks = this.props.tasks;
  // }

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
