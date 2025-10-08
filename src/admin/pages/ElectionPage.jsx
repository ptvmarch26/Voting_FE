import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useElection } from "../../contexts/ElectionContext";
import { usePopup } from "../../contexts/PopupContext";
import { useLoading } from "../../contexts/LoadingContext";

const ElectionPage = () => {
  const {
    elections,
    handleGetElections,
    handleDeleteElection,
    handleCreateElection,
    handlePublishElectionInfo,
    handleFinalizeAndPublishMerkle,
  } = useElection();
  const { showPopup } = usePopup();
  const { setLoading } = useLoading();
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [electionId, setElectionId] = useState("");
  const [electionName, setElectionName] = useState("");
  const [electionDescription, setElectionDescription] = useState("");
  const [electionStartDate, setElectionStartDate] = useState("");
  const [electionEndDate, setElectionEndDate] = useState("");
  const [electionDeadline, setElectionDeadline] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [selectedElections, setSelectedElections] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetElections();
  }, []);

  const handleOpenModal = () => {
    setElectionId("");
    setElectionName("");
    setElectionDescription("");
    setElectionStartDate("");
    setElectionEndDate("");
    setElectionDeadline("");
    setCsvFile(null);
    setMessage("");
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleCreate = async () => {
    if (
      !electionId ||
      !electionName ||
      !electionDescription ||
      !electionStartDate ||
      !electionEndDate ||
      !electionDeadline
    ) {
      setMessage("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (!csvFile) {
      setMessage("Vui lòng chọn file CSV cử tri!");
      return;
    }

    const formData = new FormData();
    formData.append("election_id", electionId);
    formData.append("name", electionName);
    formData.append("description", electionDescription);
    formData.append("start_date", electionStartDate);
    formData.append("end_date", electionEndDate);
    formData.append("deadline_register", electionDeadline);
    formData.append("file", csvFile);

    setLoading(true, "Đang tạo cuộc bầu cử");
    const res = await handleCreateElection(formData);

    if (res.EC === 0) {
      setLoading(true, "Đang publish thông tin bầu cử lên blockchain");
      const publishRes = await handlePublishElectionInfo(
        res.result.election_id
      );
      setOpenModal(false);
      setLoading(false);
      if (publishRes?.EC === 0) {
        showPopup(`Tạo và publish cuộc bầu cử lên blockchain thành công`);
      } else {
        showPopup(publishRes?.EM || "Publish thông tin thất bại", false);
      }
    } else {
      showPopup(res.EM || "Tạo cuộc bầu cử thất bại", false);
    }
  };

  const handleCreateMerkleRoot = async (election_id) => {
    setLoading(true, "Đang tạo và publish Merkle root");
    const res = await handleFinalizeAndPublishMerkle(election_id);
    console.log("res", res);
    setLoading(false);

    if (res?.EC === 0) {
      showPopup("Tạo và publish Merkle root thành công!", true);
    } else {
      showPopup(res?.EM || "Tạo Merkle root thất bại", false);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedElections.length === 0) return;
    const confirm = window.confirm(
      "Bạn có chắc muốn xoá các cuộc bầu cử đã chọn"
    );
    if (!confirm) return;

    let successCount = 0;
    for (const id of selectedElections) {
      const res = await handleDeleteElection(id);
      if (res?.EC === 0) successCount++;
    }

    if (successCount > 0) showPopup(`Đã xoá cuộc bầu cử thành công`, true);
    else showPopup("Không thể xoá các cuộc bầu cử đã chọn", false);

    setSelectedElections([]);
    setSelectAll(false);
  };

  const handleSelectElection = (id) => {
    setSelectedElections((prev) =>
      prev.includes(id) ? prev.filter((elId) => elId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedElections([]);
    } else {
      setSelectedElections(elections.map((el) => el.election_id));
    }
    setSelectAll(!selectAll);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    {
      id: "select",
      label: (
        <Checkbox
          checked={selectAll}
          onChange={handleSelectAll}
          disabled={elections.length === 0}
        />
      ),
      minWidth: 50,
    },
    { id: "election_id", label: "Mã cuộc bầu cử", minWidth: 150 },
    { id: "name", label: "Tên cuộc bầu cử", minWidth: 170 },
    { id: "start_date", label: "Ngày bắt đầu", minWidth: 130 },
    { id: "end_date", label: "Ngày kết thúc", minWidth: 130 },
    { id: "deadline_register", label: "Hạn đăng ký", minWidth: 150 },
    { id: "status", label: "Trạng thái", minWidth: 130 },
    { id: "merkle_root", label: "Merkle root", minWidth: 130 },
    { id: "actions", label: "Hành động", minWidth: 180 },
  ];

  const rows = elections.map((el) => ({
    id: el.election_id,
    election_id: el.election_id,
    name: el.name,
    start_date: el.start_date?.slice(0, 10),
    end_date: el.end_date?.slice(0, 10),
    deadline_register: el.deadline_register?.slice(0, 10),
    status: el.status,
    merkle_root: el.merkle_root || "Chưa có merkle root",
  }));
  console.log("el", elections);
  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.id} style={{ minWidth: col.minWidth }}>
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover key={row.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedElections.includes(row.id)}
                        onChange={() => handleSelectElection(row.id)}
                      />
                    </TableCell>
                    <TableCell>{row.election_id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.start_date}</TableCell>
                    <TableCell>{row.end_date}</TableCell>
                    <TableCell>{row.deadline_register}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.merkle_root}</TableCell>
                    <TableCell className="!flex flex-col gap-2">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() =>
                          navigate(`/admin/election-details/${row.id}`)
                        }
                      >
                        Xem
                      </Button>

                      <Button
                        size="small"
                        color="success"
                        variant="contained"
                        className=""
                        onClick={() => handleCreateMerkleRoot(row.id)}
                        disabled={
                          !!row.merkle_root &&
                          row.merkle_root !== "Chưa có merkle root"
                        }
                      >
                        Tạo Root
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <div className="flex gap-4 mt-4">
        <Button variant="contained" onClick={handleOpenModal}>
          Tạo cuộc bầu cử mới
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeleteSelected}
          disabled={selectedElections.length === 0}
        >
          Xóa cuộc bầu cử
        </Button>
      </div>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Tạo cuộc bầu cử mới
          </Typography>

          {message && (
            <Alert severity="error" className="mt-2">
              {message}
            </Alert>
          )}

          <TextField
            label="Mã cuộc bầu cử *"
            fullWidth
            margin="normal"
            value={electionId}
            onChange={(e) => setElectionId(e.target.value)}
          />
          <TextField
            label="Tên cuộc bầu cử *"
            fullWidth
            margin="normal"
            value={electionName}
            onChange={(e) => setElectionName(e.target.value)}
          />
          <TextField
            label="Mô tả *"
            fullWidth
            margin="normal"
            value={electionDescription}
            onChange={(e) => setElectionDescription(e.target.value)}
            multiline
            rows={3}
          />
          <TextField
            label="Ngày bắt đầu *"
            type="date"
            fullWidth
            margin="normal"
            value={electionStartDate}
            onChange={(e) => setElectionStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: electionDeadline || undefined,
              max: electionEndDate || undefined,
            }}
          />
          <TextField
            label="Ngày kết thúc *"
            type="date"
            fullWidth
            margin="normal"
            value={electionEndDate}
            onChange={(e) => setElectionEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: electionStartDate || undefined,
            }}
          />
          <TextField
            label="Hạn đăng ký *"
            type="date"
            fullWidth
            margin="normal"
            value={electionDeadline}
            onChange={(e) => setElectionDeadline(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              max: electionStartDate || undefined,
            }}
          />

          <div className="mt-3">
            <Typography variant="body2">
              Tải lên danh sách cử tri (CSV):
            </Typography>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setCsvFile(e.target.files[0])}
            />
          </div>

          <Button
            variant="contained"
            fullWidth
            className="!mt-4"
            onClick={handleCreate}
          >
            Tạo cuộc bầu cử
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ElectionPage;
