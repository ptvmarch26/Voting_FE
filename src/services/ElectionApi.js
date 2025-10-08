import AxiosInstance from "./AxiosInstance";

export const getElections = async () => {
  try {
    const res = await AxiosInstance.get("/ca");
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Lỗi kết nối server" };
  }
};

export const createElection = async (formData) => {
  try {
    const res = await AxiosInstance.post("/ca/create-election", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Lỗi kết nối server" };
  }
};

export const deleteElection = async (election_id) => {
  try {
    const res = await AxiosInstance.delete(`/ca/${election_id}`);
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Lỗi kết nối server" };
  }
};

export const finalizeAndPublishMerkle = async (election_id) => {
  try {
    const res = await AxiosInstance.post(`/ca/finalize-publish/${election_id}`);
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Lỗi kết nối server" };
  }
};

export const publishElectionInfo = async (election_id) => {
  try {
    const res = await AxiosInstance.post(`/ca/publish-election/${election_id}`);
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Lỗi kết nối server" };
  }
};

export const publishCandidates = async (election_id) => {
  try {
    const res = await AxiosInstance.post(
      `/ca/publish-candidates/${election_id}`
    );
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Lỗi kết nối server" };
  }
};

// export const publishMerkleRoot = async (election_id) => {
//   try {
//     const res = await AxiosInstance.post(`/ca/publish-merkle/${election_id}`);
//     return res.data;
//   } catch (error) {
//     return error.response?.data || { message: "Lỗi kết nối server" };
//   }
// };
