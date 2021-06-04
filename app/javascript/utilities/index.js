import axios from "axios";

export function getTodos() {
  return axios.get("http://localhost:3000/tasks").then((res) => res.data);
}

export function createNewTask(title, description) {
  const token = document.querySelector("meta[name=csrf-token]").content;
  return axios.post(
    "http://localhost:3000/tasks",
    {
      title: title,
      description: description,
      completed: false,
    },
    { headers: { "X-CSRF-Token": token } }
  );
}
