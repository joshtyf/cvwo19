import React from "react";
import PropTypes from "prop-types";
import Task from "./Task";

const AllTasks = props => {
  var tasks = props.tasks.map(task => {
    return (
      <li className="list-group-item" key={task.id}>
        <Task
          task={task}
          handleTaskDelete={props.handleTaskDelete}
          handleUpdateTask={props.handleUpdateTask}
          handleRemind={props.handleRemind}
        />
      </li>
    );
  });
  return <ul className="list-group w-75">{tasks}</ul>;
};

export default AllTasks;
