import React from "react";
import PropTypes from "prop-types";

const NewTask = props => {
  let formFields = {};
  return (
    <div>
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
        <div className="form-group">
          <div className="row">
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                ref={input => (formFields.description = input)}
                placeholder="Enter task description"
              />
            </div>
            <div className="col-auto">
              <input
                type="string"
                className="form-control"
                ref={input => (formFields.category = input)}
                placeholder="Enter task category"
              />
            </div>
            <button type="button submit" className="btn btn-primary col-auto">
              Add task
            </button>
          </div>
        </div>
      </form>
    </div>

    // <div>
    //   <label>Add New Task</label>
    //   <br />
    //   <form
    //     onSubmit={event => {
    //       event.preventDefault(); // prevents page refresh
    //       var data = {
    //         task: {
    //           description: formFields.description.value,
    //           category: formFields.category.value
    //         }
    //       };
    //       props.handleFormSubmit(data);
    //       event.target.reset(); // reset form fields
    //     }}
    //   >
    //     <input
    //       ref={input => (formFields.description = input)}
    //       placeholder="Enter task description"
    //     />
    //     <input
    //       ref={input => (formFields.category = input)}
    //       placeholder="Enter task category"
    //     />
    //     <button type="button" classNameName="btn btn-primary">
    //       Submit
    //     </button>
    //   </form>
    // </div>
  );
};

export default NewTask;
