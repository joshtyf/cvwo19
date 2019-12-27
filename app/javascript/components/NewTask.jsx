import React from "react";
import PropTypes from "prop-types";

const NewTask = props => {
  let formFields = {};
  return (
    <form
      onSubmit={event => {
        props.handleFormSubmit(
          formFields.description.value,
          formFields.category.value
        );
        event.target.reset();
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
  );
};

export default NewTask;
