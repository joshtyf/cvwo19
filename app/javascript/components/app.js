import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { getTodos } from "../utilities/index";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [Todos, setTodos] = React.useState("");
  React.useEffect(() => {
    getTodos()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center">Todo List</h1>
      </div>
    </div>
  );
}

export default App;
