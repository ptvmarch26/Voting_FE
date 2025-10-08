import AxiosInstance from "./AxiosInstance";

export const registerVoter = async (cccd, publicKey, election_id) => {
  try {
    const res = await AxiosInstance.post(`/voter/register`, {
      cccd,
      publicKey,
      election_id,
    });
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Lỗi kết nối server" };
  }
};

export const getChallenge = async (hashPk, election_id) => {
  try {
    const res = await AxiosInstance.get("/voter/challenge", {
      params: { hashPk, election_id },
    });
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Lỗi kết nối server" };
  }
};

export const verifyLogin = async (pk, hashPk, signature, election_id) => {
  try {
    const res = await AxiosInstance.post("/voter/verify", {
      pk,
      hashPk,
      signature,
      election_id,
    });
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Lỗi kết nối server" };
  }
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("Không có refresh token, user chưa đăng nhập.");
  }

  try {
    const res = await AxiosInstance.post("/voter/refresh-token", {
      refreshToken,
    });
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};
