import axios from "axios";

const instance = axios.create({
  baseURL: "https://658efbfd2871a9866e7a1bb4.mockapi.io",
  timeout: 10000,
});

export { instance };
