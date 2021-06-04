import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { createNewTask } from "../utilities/index";

function TaskForm() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    createNewTask(title, description)
      .then(() => window.location.reload())
      .catch((err) => console.log("error" + err));
  };

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  return (
    <Form className="my-2" onSubmit={handleSubmit}>
      <Form.Group className="my-2">
        <Form.Label>Title</Form.Label>
        <Form.Control
          onChange={handleTitleChange}
          placeholder="Enter task title"
        ></Form.Control>
      </Form.Group>
      <Form.Group className="my-2">
        <Form.Label>Description</Form.Label>
        <Form.Control
          onChange={handleDescriptionChange}
          placeholder="Enter task description"
        ></Form.Control>
      </Form.Group>
      <Button className="my-2" variant="primary" type="Submit">
        Create new task
      </Button>
    </Form>
  );
}

export default TaskForm;
