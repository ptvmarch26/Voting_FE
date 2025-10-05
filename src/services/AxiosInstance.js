// import axios from "axios";
// import qs from "qs";
// import { refreshToken } from "./VoterApi";

// const API_URL = import.meta.env.VITE_API_URL;

// const AxiosInstance = axios.create({
//   baseURL: API_URL,
//   paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
// });

// AxiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// AxiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       try {
//         const res = await refreshToken();
//         if (res.accessToken) {
//           localStorage.setItem("accessToken", res.accessToken);
//           error.config.headers["Authorization"] = `Bearer ${res.accessToken}`;
//           console.log("🔄 Token mới:", res.accessToken);
//           return AxiosInstance(error.config);
//         }
//       } catch {
//         console.error("⚠️ Refresh token thất bại");
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default AxiosInstance;
