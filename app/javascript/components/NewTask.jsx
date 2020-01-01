import React from "react";
import PropTypes from "prop-types";

const NewTask = props => {
  let formFields = {};
  return (
    <div>
      <label>Add New Task</label>
      <br />
      <form
        onSubmit={event => {
          event.preventDefault(); // prevents page refresh
          var data = {
            task: {
              description: formFields.description.value,
              category: formFields.category.value
            }
          };
          props.handleFormSubmit(data);
          event.target.reset(); // reset form fields
        }}
      >
        <input
          ref={input => (formFields.description = input)}
          placeholder="Enter task description"
        />
        <input
          ref={input => (formFields.category = input)}
          placeholder="Enter task category"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default NewTask;
