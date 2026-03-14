import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log(
      `[Axios Req Interceptor] → ${config.method?.toUpperCase() || "?"} ${config.url || "?"} | ` +
      `Is FormData? ${config.data instanceof FormData} | ` +
      `Token exists? ${!!token}`
    );

    // Do NOT attach token for login/register endpoints
    if (token && !config.url.includes("/auth")) {
      config.headers.set("Authorization", `Bearer ${token}`);
      console.log("[Axios Req Interceptor] → Authorization header SET");
    } else {
      console.log("[Axios Req Interceptor] → Skipping Authorization header");
    }

    return config;
  },
  (error) => {
    console.error("[Axios Req Interceptor] Error:", error);
    return Promise.reject(error);
  }
);

export default api;