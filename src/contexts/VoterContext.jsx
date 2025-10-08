import { createContext, useContext, useEffect, useState } from "react";
import {
  registerVoter,
  getChallenge,
  verifyLogin,
  refreshToken,
} from "../services/VoterApi";

const VoterContext = createContext();

export const VoterProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("accessToken") || null
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [token]);

  const handleRegisterVoter = async (cccd, publicKey, election_id) => {
    const res = await registerVoter(cccd, publicKey, election_id);
    return res;
  };

  const handleGetChallenge = async (hashPk, election_id) => {
    const res = await getChallenge(hashPk, election_id);
    return res;
  };

  const handleVerifyLogin = async (pk, hashPk, signature, election_id) => {
    const res = await verifyLogin(pk, hashPk, signature, election_id);

    if (res.EC === 0 && res.result) {
      setToken(res.result.accessToken);
      localStorage.setItem("refreshToken", res.result.refreshToken);
    }
    return res;
  };

  const handleRefreshToken = async () => {
    const res = await refreshToken();
    if (res.EC === 0 && res.result?.accessToken) {
      setToken(res.result.accessToken);
    }
    return res;
  };

  return (
    <VoterContext.Provider
      value={{
        token,
        setToken,
        handleRegisterVoter,
        handleGetChallenge,
        handleVerifyLogin,
        handleRefreshToken,
      }}
    >
      {children}
    </VoterContext.Provider>
  );
};

export const useVoter = () => useContext(VoterContext);
