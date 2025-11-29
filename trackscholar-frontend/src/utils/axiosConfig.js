import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  
});

const auth = localStorage.getItem("auth");
if (auth) {
  instance.defaults.headers.common["Authorization"] = `Basic ${auth}`;
}

export default instance;