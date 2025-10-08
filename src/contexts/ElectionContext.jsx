import { createContext, useContext, useState } from "react";
import {
  getElections,
  createElection,
  deleteElection,
  finalizeAndPublishMerkle,
  publishElectionInfo,
  publishCandidates,
} from "../services/ElectionApi";

const ElectionContext = createContext();

export const ElectionProvider = ({ children }) => {
  const [elections, setElections] = useState([]);

  const handleGetElections = async () => {
    const res = await getElections();
    if (res?.EC === 0 && Array.isArray(res.result)) {
      setElections(res.result);
    }
    return res;
  };

  const handleCreateElection = async (formData) => {
    const res = await createElection(formData);
    if (res?.EC === 0 && res.result) {
      setElections((prev) => [res.result, ...prev]);
    }
    return res;
  };

  const handleDeleteElection = async (election_id) => {
    const res = await deleteElection(election_id);
    if (res?.EC === 0) {
      setElections((prev) =>
        prev.filter((el) => el.election_id !== election_id)
      );
    }
    return res;
  };

  // const handleFinalizeElection = async (election_id) => {
  //   const res = await finalizeElection(election_id);
  //   if (res?.EC === 0) {
  //     setElections((prev) =>
  //       prev.map((el) =>
  //         el.election_id === election_id
  //           ? { ...el, status: "ended", merkle_root: res.result.merkle_root }
  //           : el
  //       )
  //     );
  //   }
  //   return res;
  // };

  const handleFinalizeAndPublishMerkle = async (election_id) => {
    const res = await finalizeAndPublishMerkle(election_id);
    if (res?.EC === 0) {
      setElections((prev) =>
        prev.map((el) =>
          el.election_id === election_id
            ? {
                ...el,
                merkle_root: res.result.merkle_root,
              }
            : el
        )
      );
    }
    return res;
  };

  const handlePublishElectionInfo = async (election_id) => {
    const res = await publishElectionInfo(election_id);
    return res;
  };

  const handlePublishCandidates = async (election_id) => {
    const res = await publishCandidates(election_id);
    if (res?.EC === 0) {
      setElections((prev) =>
        prev.map((el) =>
          el.election_id === election_id
            ? {
                ...el,
                candidate_published: true,
                candidate_count: res.result.count,
              }
            : el
        )
      );
      console.log(`✅ Publish ${res.result.count} ứng viên cho ${election_id}`);
    }
    return res;
  };

  // const handlePublishMerkleRoot = async (election_id) => {
  //   const res = await publishMerkleRoot(election_id);
  //   if (res?.EC === 0) {
  //     setElections((prev) =>
  //       prev.map((el) =>
  //         el.election_id === election_id
  //           ? {
  //               ...el,
  //               merkle_root: res.result.root,
  //               merkle_txHash: res.result.txHash,
  //               status: "ended",
  //             }
  //           : el
  //       )
  //     );
  //     console.log(`✅ Merkle root published: ${res.result.root}`);
  //   }
  //   return res;
  // };

  return (
    <ElectionContext.Provider
      value={{
        elections,
        handleGetElections,
        handleCreateElection,
        handleDeleteElection,
        handleFinalizeAndPublishMerkle,
        handlePublishElectionInfo,
        handlePublishCandidates,
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
};

export const useElection = () => useContext(ElectionContext);
