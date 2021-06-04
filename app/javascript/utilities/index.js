import axios from "axios";

export function getTodos() {
  return axios.get("http://localhost:3000/tasks").then((res) => res.data);
}
