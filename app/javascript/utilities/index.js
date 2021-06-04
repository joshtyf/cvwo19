import axios from "axios";

const token = document.querySelector("meta[name=csrf-token]").content;
axios.defaults.headers.common["X-CSRF-Token"] = token;
const apiUrl = "http://localhost:3000/tasks";

export function getTodos() {
  return axios.get(apiUrl).then((res) => res.data);
}

export function createNewTask(title, description) {
  return axios.post(apiUrl, {
    title: title,
    description: description,
    completed: false,
  });
}

export function deleteTask(id) {
  return axios.delete(apiUrl + `/${id}`, {});
}

export function updateTask(id) {
  return axios.put(apiUrl + `/${id}`, {});
}
