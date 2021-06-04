import axios from "axios";

const token = document.querySelector("meta[name=csrf-token]").content;

export function getTodos() {
  return axios.get("http://localhost:3000/tasks").then((res) => res.data);
}

export function createNewTask(title, description) {
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

export function deleteTask(id) {
  return axios.delete(`http://localhost:3000/tasks/${id}`, {
    headers: { "X-CSRF-Token": token },
  });
}

export function updateTask(id) {
  return axios.put(
    `http://localhost:3000/tasks/${id}`,
    {},
    { headers: { "X-CSRF-Token": token } }
  );
}
