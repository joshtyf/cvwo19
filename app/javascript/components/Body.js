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
    // console.log(data);
    // data = JSON.parse(data);
    // SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

    // const msg = {
    //   to: "e0406483@u.nus.edu",
    //   from: "test@example.com",
    //   subject: "Sending with SendGrid is Fun",
    //   text: "and easy to do anywhere, even with Node.js",
    //   html: "<strong>and easy to do anywhere, even with Node.js</strong>"
    // };
    // var response = SendGrid.send(msg);
    // console.log(response);
    var helper = require("@sendgrid").mail;
    var from_email = new helper.Email("test@example.com");
    var to_email = new helper.Email("e0406483@u.nus.edu");
    var subject = "Hello World from the SendGrid Node.js Library!";
    var content = new helper.Content("text/plain", "Hello, Email!");
    var mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = require("@sendgrid")(process.env.REACT_APP_SENDGRID_API_KEY);
    var request = sg.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: mail.toJSON()
    });

    sg.API(request, function(error, response) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
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
