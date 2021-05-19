import axios from "axios";

const URL = "http://localhost:8000";

const createTask = (data) => {
  return axios.post(`${URL}/api/v1/task/`, data);
};

const deleteTask = (id) => {
  return axios.delete(`${URL}/api/v1/task/${id}/`, {});
};

const getAllTask = (query = null) => {
  return axios.get(`${URL}/api/v1/task/${query ? query : ""}`, {});
};

export { createTask, deleteTask, getAllTask };
