import React, { useState, useEffect } from "react";
import { Container, Row, Navbar } from "react-bootstrap";
import { getTodos, deleteTask, updateTask } from "../utilities/index";
import "bootstrap/dist/css/bootstrap.min.css";
import Item from "./item";
import TaskForm from "./taskform";

function App() {
  const [Todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos()
      .then((res) => setTodos(res))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) =>
    deleteTask(id)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));

  const handleUpdate = (id) =>
    updateTask(id)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));

  return (
    <Container>
      <Navbar>
        <Navbar.Brand className="mx-auto h1">Todo List App</Navbar.Brand>
      </Navbar>
      <Row>
        <TaskForm />
      </Row>
      <Row>
        {Todos.map((todo) => (
          <Item
            key={todo.id}
            item={todo}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ))}
      </Row>
    </Container>
  );
}

export default App;
