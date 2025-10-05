import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Divider,
} from "@mui/material";

// Giả sử bạn truyền dữ liệu elections từ App hoặc fetch từ API
const dummyElections = [
  {
    id: 1,
    name: "Cuộc bầu cử 1",
    description: "Mô tả cuộc bầu cử 1",
    startDate: "2025-12-01",
    endDate: "2025-12-31",
    deadline: "2025-11-30",
    candidates: ["Nguyễn Văn A", "Trần Thị B"],
  },
  {
    id: 2,
    name: "Cuộc bầu cử 2",
    description: "Mô tả cuộc bầu cử 2",
    startDate: "2025-11-01",
    endDate: "2025-11-30",
    deadline: "2025-10-31",
    candidates: ["Lê Thị C", "Phan Văn D"],
  },
];

const ElectionDetails = () => {
  const { id } = useParams(); // lấy id từ route
  const navigate = useNavigate();
  const [election, setElection] = useState(null);

  useEffect(() => {
    const selectedElection = dummyElections.find((e) => e.id === parseInt(id));
    setElection(selectedElection);
  }, [id]);

  if (!election) {
    return (
      <Typography variant="h6" sx={{ mt: 4 }}>
        Không tìm thấy cuộc bầu cử
      </Typography>
    );
  }

  const getStatus = () => {
    const now = new Date();
    const start = new Date(election.startDate);
    const end = new Date(election.endDate);

    if (now < start) return "Sắp tới";
    if (now > end) return "Đã kết thúc";
    return "Đang diễn ra";
  };

  return (
    <Box className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen">
      <Button variant="outlined" onClick={() => navigate(-1)}>
        Quay về danh sách
      </Button>

      <Paper sx={{ mt: 2, p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {election.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Trạng thái: {getStatus()}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {election.description}
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2">Ngày bắt đầu:</Typography>
        <Typography variant="body2">{election.startDate}</Typography>

        <Typography variant="subtitle2">Ngày kết thúc:</Typography>
        <Typography variant="body2">{election.endDate}</Typography>

        <Typography variant="subtitle2">Ngày hết hạn đăng ký:</Typography>
        <Typography variant="body2">{election.deadline}</Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1">Danh sách ứng cử viên:</Typography>
        <List>
          {election.candidates.map((c, i) => (
            <ListItem key={i}>
              <ListItemText primary={c} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ElectionDetails;
