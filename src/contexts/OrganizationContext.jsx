import { createContext, useContext, useEffect, useState } from "react";
import {
  getOrganizations,
  registerTrustee,
  loginOrganization,
  deleteOrganization,
} from "../services/OrganizationApi";

const OrganizationContext = createContext();

export const OrganizationProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("OrgAccessToken") || null
  );
  const [role, setRole] = useState(localStorage.getItem("orgRole") || null);
  const [orgName, setOrgName] = useState(
    localStorage.getItem("orgName") || null
  );
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("OrgAccessToken", token);
    } else {
      localStorage.removeItem("OrgAccessToken");
    }
  }, [token]);

  useEffect(() => {
    if (role) localStorage.setItem("orgRole", role);
    else localStorage.removeItem("orgRole");

    if (orgName) localStorage.setItem("orgName", orgName);
    else localStorage.removeItem("orgName");
  }, [role, orgName]);

  const handleGetOrganizations = async () => {
    const res = await getOrganizations();
    if (res?.EC === 0 && Array.isArray(res.result)) {
      setOrganizations(res.result);
    }
    return res;
  };
  const handleRegisterTrustee = async (
    username,
    name,
    password,
    walletAddress
  ) => {
    const res = await registerTrustee(username, name, password, walletAddress);
    if (res?.EC === 0 && res.result) {
      setOrganizations((prev) => [
        ...prev,
        {
          _id: res.result.id,
          username: res.result.username,
          name: res.result.name,
          walletAddress: res.result.walletAddress,
          role: "TRUSTEE",
        },
      ]);
    }
    return res;
  };

  const handleLoginOrganization = async (username, password) => {
    const res = await loginOrganization(username, password);
    if (res.EC === 0 && res.result) {
      setToken(res.result.accessToken);
      localStorage.setItem("OrgRefreshToken", res.result.refreshToken);
      setRole(res.result.role);
      setOrgName(res.result.name);
    }
    return res;
  };

  const handleLogout = () => {
    setToken(null);
    setRole(null);
    setOrgName(null);
    setOrganizations([]);
    localStorage.removeItem("OrgAccessToken");
    localStorage.removeItem("OrgRefreshToken");
    localStorage.removeItem("orgRole");
    localStorage.removeItem("orgName");
  };

  const handleDeleteOrganization = async (id) => {
    const res = await deleteOrganization(id);
    if (res?.EC === 0) {
      setOrganizations((prev) => prev.filter((org) => org._id !== id));
    }
    return res;
  };

  return (
    <OrganizationContext.Provider
      value={{
        token,
        setToken,
        role,
        orgName,
        organizations,
        handleGetOrganizations,
        handleRegisterTrustee,
        handleLoginOrganization,
        handleLogout,
        handleDeleteOrganization
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => useContext(OrganizationContext);
