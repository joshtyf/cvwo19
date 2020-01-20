import React from "react";
import PropTypes, { array } from "prop-types";
import AllTasks from "./AllTasks";
import NewTask from "./NewTask";
import axios from "axios";
import Search from "./Search";
import SideBar from "./SideBar";
import $ from "jquery";
import Popper from "popper.js";
import SendGrid from "@sendgrid/mail";

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
    this.handleRemind = this.handleRemind.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.state = { tasks: [], categories: [], alert: false, alertMessages: "" };
  }

  componentDidMount() {
    axios
      .get("/show")
      .then(response => this.setState({ tasks: response.data }));
    axios.get("/categories").then(response => {
      this.setState({ categories: response.data });
    });
  }

  handleFormSubmit(data) {
    axios.post("/create", data).then(response => {
      console.log(response);
      if (Array.isArray(response.data)) {
        axios // update state with categories
          .get("/categories")
          .then(response => this.setState({ categories: response.data }));
        this.setState({ tasks: response.data }); // update state with tasks
      } else {
        if (Object.keys(response.data)[0] == "name") {
          this.setState({
            alertMessages:
              "category " + response.data[Object.keys(response.data)[0]][0],
            alert: true
          });
        } else {
          this.setState({
            alertMessages:
              "task description " +
              response.data[Object.keys(response.data)[0]][0],
            alert: true
          });
        }
      }
    });
  }

  handleTaskDelete(id) {
    axios.delete(`delete/${id}`).then(response => {
      axios // update state with categories
        .get("/categories")
        .then(response => this.setState({ categories: response.data }));
      this.setState({ tasks: response.data });
    });
  }

  handleUpdateTask(data) {
    axios.put(`update/${data.task.id}`, data).then(response => {
      axios // update state with categories
        .get("/categories")
        .then(response => this.setState({ categories: response.data }));
      this.setState({ tasks: response.data });
    });
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

  handleRemind(data) {
    axios.post("/remind", data).then(response => {
      console.log(response.data);
    });
  }

  closeAlert() {
    this.setState({ alert: false, alertMessages: "" });
  }

  render() {
    let alert = this.state.alert ? (
      <div className="row">
        <div className="col">
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {this.state.alertMessages}
            <button
              type="button"
              className="close"
              onClick={() => this.closeAlert()}
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div></div>
    );

    return (
      <div className="Container">
        {alert}
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
                handleRemind={this.handleRemind}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
