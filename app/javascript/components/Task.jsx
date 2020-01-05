import React from "react";
import PropTypes from "prop-types";
class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editable: false };
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    if (this.state.editable) {
      let description = this.description.value;
      let category = this.category.value;
      let id = this.props.task.id;
      let cat_id = this.props.task.category.id;
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
      // <dl className="row align-items-center">
      //   <dt className="col-auto">{description}</dt>
      //   <dd className="col-auto">{category}</dd>
      //   <button onClick={() => this.handleEdit()}>
      //     {this.state.editable ? "Submit" : "Edit"}
      //   </button>
      //   <button onClick={() => this.props.handleTaskDelete(this.props.task.id)}>
      //     Delete
      //   </button>
      // </dl>
      <dl className="row my-1">
        {description}
        {category}
        <div className="col-auto ml-auto">
          <button
            type="button"
            className="btn btn-sm btn-outline-info mr-2"
            onClick={() => this.handleEdit()}
          >
            {this.state.editable ? "Submit" : "Edit"}
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => this.props.handleTaskDelete(this.props.task.id)}
          >
            Delete
          </button>
        </div>
      </dl>
    );
  }
}

export default Task;
