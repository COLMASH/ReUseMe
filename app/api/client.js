import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://186.154.126.45:9000/api",
});

export default apiClient;
