import React from "react";
import PropTypes from "prop-types";
class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editable: false };
    this.handleEdit = this.handleEdit.bind(this);
    this.formatDateTime = this.formatDateTime.bind(this);
    this.state = { formFields: [] };
  }

  handleEdit() {
    if (this.state.editable) {
      let description = this.description.value;
      let category = this.category.value;
      let id = this.props.task.id;
      let cat_id = this.props.task.category_id;
      var data = {
        task: {
          id: id,
          description: description,
          category_attributes: { id: cat_id, name: category }
        }
      };
      this.props.handleUpdateTask(data);
    }
    this.setState({
      editable: !this.state.editable
    });
  }

  formatDateTime(date, time) {
    var dateResult = date.split("/");
    if (dateResult[0] < 10) {
      dateResult[0] = "0" + dateResult[0];
    }
    if (dateResult[1] < 10) {
      dateResult[1] = "0" + dateResult[1];
    }
    if (dateResult[2].length < 3) {
      dateResult[2] = "20" + dateResult[2];
    }
    var dateString = dateResult[2] + "-" + dateResult[1] + "-" + dateResult[0];
    var timeString = time.slice(0, 2) + ":" + time.slice(2, 4);
    return dateString + "T" + timeString;
  }

  render() {
    let description = this.state.editable ? (
      <div className="col-auto input-group-sm">
        <input
          type="text"
          className="form-control"
          ref={input => (this.description = input)}
          defaultValue={this.props.task.description}
          placeholder="Description"
        />
      </div>
    ) : (
      <dt className="col-auto">{this.props.task.description}</dt>
    );
    let category = this.state.editable ? (
      <div className="col-auto input-group-sm">
        <input
          className="form-control"
          type="string"
          ref={input => (this.category = input)}
          defaultValue={this.props.task.category.name}
          placeholder="Category"
        />
      </div>
    ) : (
      <dd className="col-auto text-muted">{this.props.task.category.name}</dd>
    );

    return (
      <dl className="row my-1">
        {description}
        {category}
        <div className="col-auto ml-auto">
          <div className="row">
            <button
              type="button"
              className="btn btn-sm btn-outline-info mr-2"
              onClick={() => this.handleEdit()}
            >
              {this.state.editable ? "Submit" : "Edit"}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger mr-2"
              onClick={() => this.props.handleTaskDelete(this.props.task.id)}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-toggle="modal"
              data-target="#reminderModal"
            >
              Remind me
            </button>
            <form
              onSubmit={event => {
                event.preventDefault();
                var dateString = this.formatDateTime(
                  this.state.formFields.date.value,
                  this.state.formFields.time.value
                );
                var date = new Date(dateString);
                date.setHours(date.getHours() - 8);
                date = date.getTime() / 1000;

                var data = {
                  form_data: {
                    to: this.state.formFields.email.value,
                    subject: "Reminder from task manager",
                    body: this.props.task.description,
                    send_at: date
                  }
                };
                this.props.handleRemind(data);
                event.target.reset();
              }}
            >
              <div
                className="modal fade"
                id="reminderModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="reminderModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="reminderModalLabel">
                        Remind me
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <p>Reminder will be sent to your email!</p>

                      <div className="row form-group">
                        <div className="col">
                          <label htmlFor="Date">Date</label>
                          <input
                            id="Date"
                            type="text"
                            className="form-control"
                            placeholder="dd/mm/yyyy"
                            ref={input => (this.state.formFields.date = input)}
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="Time">Time</label>
                          <input
                            id="Time"
                            type="text"
                            className="form-control"
                            placeholder="24hr time format eg. 1630"
                            ref={input => (this.state.formFields.time = input)}
                          />
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col">
                          <label htmlFor="Email">Email</label>
                          <input
                            id="Email"
                            type="email"
                            className="form-control"
                            ref={input => (this.state.formFields.email = input)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button type="button submit" className="btn btn-primary">
                        Send reminder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </dl>
    );
  }
}

export default Task;
