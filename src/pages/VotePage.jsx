import { useState } from "react";
import ElectionComponent from "../components/ElectionComponent";

const VotePage = () => {
  const [elections] = useState([
    {
      id: "1",
      name: "Cuộc bầu cử 1",
      description: "Mô tả về cuộc bầu cử 1",
      startDate: "2025-12-01",
      endDate: "2025-12-31",
      deadline: "2025-11-30",
    },
    {
      id: "2",
      name: "Cuộc bầu cử 2",
      description: "Mô tả về cuộc bầu cử 2",
      startDate: "2025-11-01",
      endDate: "2025-11-30",
      deadline: "2025-10-31",
    },
    {
      id: "3",
      name: "Cuộc bầu cử 3",
      description: "Mô tả về cuộc bầu cử 3",
      startDate: "2025-10-01",
      endDate: "2025-10-15",
      deadline: "2025-09-30",
    },
  ]);

  const now = new Date();

  const pastElections = elections.filter((e) => new Date(e.endDate) < now);
  const ongoingElections = elections.filter(
    (e) => new Date(e.startDate) <= now && new Date(e.endDate) >= now
  );
  const upcomingElections = elections.filter(
    (e) => new Date(e.startDate) > now
  );

  return (
    <div className="bg-[#fcfbf6] min-h-screen py-6">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold text-primary mb-8">
          Danh sách các cuộc bầu cử
        </h2>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-green-700 mb-4">
            🟢 Đang diễn ra
          </h3>
          {ongoingElections.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ongoingElections.map((election, index) => (
                <ElectionComponent key={index} election={election} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              Không có cuộc bầu cử nào đang diễn ra.
            </p>
          )}
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">
            🔵 Sắp tới
          </h3>
          {upcomingElections.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingElections.map((election, index) => (
                <ElectionComponent key={index} election={election} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              Không có cuộc bầu cử nào sắp diễn ra.
            </p>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-red-700 mb-4">
            🔴 Đã diễn ra
          </h3>
          {pastElections.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastElections.map((election, index) => (
                <ElectionComponent key={index} election={election} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              Không có cuộc bầu cử nào đã diễn ra.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VotePage;
