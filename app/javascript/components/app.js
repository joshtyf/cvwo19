import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { getTodos } from "../utilities/index";
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

  return (
    <Container>
      <Row>
        <h1 className="text-center">Todo List</h1>
      </Row>
      <Row>
        <TaskForm />
      </Row>
      <Row>
        {Todos.map((todo) => (
          <Item
            key={todo.id}
            title={todo.title}
            description={todo.description}
          />
        ))}
      </Row>
    </Container>
  );
}

export default App;
