import { useState } from "react";
import { useVoter } from "../contexts/VoterContext";

const RegisterPage = ({ electionId = "ELC2025" }) => {
  const { handleRegisterVoter } = useVoter();
  const [cccd, setCccd] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleRegisterVoter(cccd, publicKey, electionId);
    console.log("res", res)
    setMessage(res.EM);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-3">Đăng ký cử tri</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nhập CCCD"
          value={cccd}
          onChange={(e) => setCccd(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Nhập Public Key"
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          ddang ky
        </button>
      </form>
      {message && <p className="mt-3 text-gray-700">{message}</p>}
    </div>
  );
};

export default RegisterPage;
