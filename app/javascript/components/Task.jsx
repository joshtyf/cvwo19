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
      <input
        type="text"
        ref={input => (this.description = input)}
        defaultValue={this.props.task.description}
      />
    ) : (
      <h3>{this.props.task.description}</h3>
    );
    let category = this.state.editable ? (
      <input
        type="string"
        ref={input => (this.category = input)}
        defaultValue={this.props.task.category.name}
      />
    ) : (
      <p>{this.props.task.category.name}</p>
    );

    return (
      <div>
        <div>{description}</div>
        <div>{category}</div>
        <button onClick={() => this.handleEdit()}>
          {this.state.editable ? "Submit" : "Edit"}
        </button>
        <button onClick={() => this.props.handleTaskDelete(this.props.task.id)}>
          Delete
        </button>
      </div>
    );
  }
}

export default Task;
