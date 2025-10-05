import { createContext, useContext, useState } from "react";
import { registerVoter } from "../services/VoterApi";

const VoterContext = createContext();

export const VoterProvider = ({ children }) => {
  // const [voter, setVoter] = useState(null);

  const handleRegisterVoter = async (cccd, publicKey, election_id) => {
    const res = await registerVoter(cccd, publicKey, election_id);
    return res;
  };

  return (
    <VoterContext.Provider value={{ handleRegisterVoter }}>
      {children}
    </VoterContext.Provider>
  );
};

export const useVoter = () => useContext(VoterContext);
