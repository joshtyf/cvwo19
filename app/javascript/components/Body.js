import React from "react";
import PropTypes from "prop-types";
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
    this.state = { tasks: [], categories: [] };
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
      axios // update state with categories
        .get("/categories")
        .then(response => this.setState({ categories: response.data }));
      this.setState({ tasks: response.data }); // update state with tasks
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
    console.log(data);
    // data = JSON.parse(data);
    const sg = require("@sendgrid/mail");
    sg.setApiKey(process.env.SENDGRID_API_KEY);
    var response = sg.send(data);
    console.log(response);
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
