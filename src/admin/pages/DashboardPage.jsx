import { Button } from "@mui/material";
import { useElection } from "../../contexts/ElectionContext";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
const DashboardPage = () => {
  const { elections, handlePublishMerkleRoot } = useElection();
const [loading, setLoading] = useState(false);
  const handlePublish = async (id) => {
    const res = await handlePublishMerkleRoot(id);
    console.log("res", res);
    // alert(res.EM);
  };

  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen">
        <CircularProgress />;
    </div>
  );
};

export default DashboardPage;
