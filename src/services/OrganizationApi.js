import AxiosInstance from "./AxiosInstance";

export const getOrganizations = async () => {
  try {
    const res = await AxiosInstance.get("/organization");
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Lỗi kết nối server" };
  }
};

export const registerTrustee = async (
  username,
  name,
  password,
  walletAddress
) => {
  try {
    const res = await AxiosInstance.post("/organization/register-trustee", {
      username,
      name,
      password,
      walletAddress,
    });
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Lỗi kết nối server" };
  }
};

export const loginOrganization = async (username, password) => {
  try {
    const res = await AxiosInstance.post("/organization/login", {
      username,
      password,
    });
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Lỗi kết nối server" };
  }
};

export const deleteOrganization = async (id) => {
  try {
    const res = await AxiosInstance.delete(`/organization/${id}`);
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Lỗi kết nối server" };
  }
};
