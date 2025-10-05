// import AxiosInstance from "./AxiosInstance";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const registerVoter = async (cccd, publicKey, election_id) => {
  try {
    const res = await axios.post(`${API_URL}/voter/register`, {
      cccd,
      publicKey,
      election_id,
    });
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Lỗi kết nối server" };
  }
};
