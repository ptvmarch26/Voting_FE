import axios from "axios";
import qs from "qs";
import { refreshToken as refreshVoterToken } from "./VoterApi";

const API_URL = import.meta.env.VITE_API_URL;

const AxiosInstance = axios.create({
  baseURL: API_URL,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const orgToken = localStorage.getItem("OrgAccessToken");
    const voterToken = localStorage.getItem("accessToken");

    const token = orgToken || voterToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Token hết hạn, thử refresh lại...");

      const orgRefresh = localStorage.getItem("OrgRefreshToken");
      const voterRefresh = localStorage.getItem("refreshToken");

      try {
        if (orgRefresh) {
          const res = await axios.post(
            `${API_URL}/organization/refresh-token`,
            {
              refreshToken: orgRefresh,
            }
          );
          if (res.data.EC === 0) {
            localStorage.setItem("OrgAccessToken", res.data.result.accessToken);
            localStorage.setItem(
              "OrgRefreshToken",
              res.data.result.refreshToken
            );
            error.config.headers[
              "Authorization"
            ] = `Bearer ${res.data.result.accessToken}`;
            return AxiosInstance(error.config);
          }
        }

        if (voterRefresh) {
          const res = await refreshVoterToken();
          if (res.EC === 0) {
            localStorage.setItem("accessToken", res.result.accessToken);
            localStorage.setItem("refreshToken", res.result.refreshToken);
            error.config.headers[
              "Authorization"
            ] = `Bearer ${res.result.accessToken}`;
            return AxiosInstance(error.config);
          }
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
