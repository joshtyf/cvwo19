import React from "react";
import PropTypes from "prop-types";
import fileUriToPath from "file-uri-to-path";
import Task from "./Task";

const AllTasks = props => {
  var tasks = props.tasks.map(task => {
    return (
      <div key={task.id}>
        <Task
          task={task}
          handleTaskDelete={props.handleTaskDelete}
          handleUpdateTask={props.handleUpdateTask}
        />
      </div>
    );
  });
  return <div>{tasks}</div>;
};

export default AllTasks;
