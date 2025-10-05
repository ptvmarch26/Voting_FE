import { useState } from "react";
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
import { useCSVReader } from "react-papaparse";
import { useNavigate } from "react-router-dom";

const ElectionsPage = () => {
  const [elections, setElections] = useState([
    {
      id: 1,
      name: "Cuộc bầu cử 1",
      description: "Mô tả mẫu",
      startDate: "2025-12-01",
      endDate: "2025-12-31",
      deadline: "2025-11-30",
      candidates: ["Nguyễn Văn A", "Trần Thị B"],
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [electionName, setElectionName] = useState("");
  const [electionDescription, setElectionDescription] = useState("");
  const [electionStartDate, setElectionStartDate] = useState("");
  const [electionEndDate, setElectionEndDate] = useState("");
  const [electionDeadline, setElectionDeadline] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [selectedElections, setSelectedElections] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [editingElection, setEditingElection] = useState(null);

  const navigate = useNavigate();
  const { CSVReader } = useCSVReader();

  const handleOpenModal = () => {
    setEditingElection(null);
    setElectionName("");
    setElectionDescription("");
    setElectionStartDate("");
    setElectionEndDate("");
    setElectionDeadline("");
    setCandidates([]);
    setMessage("");
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleSaveElection = (e) => {
    e.preventDefault();

    if (
      !electionName ||
      !electionDescription ||
      !electionStartDate ||
      !electionEndDate ||
      !electionDeadline
    ) {
      setMessage("Vui lòng nhập đầy đủ tất cả các trường!");
      return;
    }

    if (editingElection) {
      setElections((prev) =>
        prev.map((el) =>
          el.id === editingElection.id
            ? {
                ...el,
                name: electionName,
                description: electionDescription,
                startDate: electionStartDate,
                endDate: electionEndDate,
                deadline: electionDeadline,
                candidates,
              }
            : el
        )
      );
    } else {
      const newElection = {
        id: elections.length + 1,
        name: electionName,
        description: electionDescription,
        startDate: electionStartDate,
        endDate: electionEndDate,
        deadline: electionDeadline,
        candidates,
      };
      setElections([...elections, newElection]);
    }

    setEditingElection(null);
    handleCloseModal();
  };

  const handleEditElection = (election) => {
    setEditingElection(election);
    setElectionName(election.name);
    setElectionDescription(election.description || "");
    setElectionStartDate(election.startDate);
    setElectionEndDate(election.endDate);
    setElectionDeadline(election.deadline);
    setCandidates(election.candidates || []);
    setOpenModal(true);
  };

  const handleDeleteSelected = () => {
    setElections((prev) =>
      prev.filter((el) => !selectedElections.includes(el.id))
    );
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
      setSelectedElections(elections.map((el) => el.id));
    }
    setSelectAll(!selectAll);
  };

  const handleFileUpload = (results) => {
    const candidatesList = results.data.map((row) => row[0]);
    setCandidates(candidatesList);
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
    { id: "name", label: "Tên cuộc bầu cử", minWidth: 170 },
    { id: "startDate", label: "Ngày bắt đầu", minWidth: 130 },
    { id: "endDate", label: "Ngày kết thúc", minWidth: 130 },
    { id: "deadline", label: "Hạn đăng ký", minWidth: 150 },
    { id: "candidates", label: "Ứng cử viên", minWidth: 200 },
    { id: "actions", label: "Hành động", minWidth: 180 },
  ];

  const rows = elections.map((el) => ({
    id: el.id,
    name: el.name,
    startDate: el.startDate,
    endDate: el.endDate,
    deadline: el.deadline,
    candidates: el.candidates.join(", "),
  }));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.startDate}</TableCell>
                    <TableCell>{row.endDate}</TableCell>
                    <TableCell>{row.deadline}</TableCell>
                    <TableCell>{row.candidates}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        onClick={() =>
                          navigate(`/admin/election-details/${row.id}`)
                        }
                      >
                        Xem
                      </Button>
                      <Button
                        size="small"
                        onClick={() =>
                          handleEditElection(
                            elections.find((el) => el.id === row.id)
                          )
                        }
                      >
                        Sửa
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
          Xóa đã chọn
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
            {editingElection ? "Chỉnh sửa cuộc bầu cử" : "Tạo cuộc bầu cử mới"}
          </Typography>

          {message && (
            <Alert severity="error" className="mt-2">
              {message}
            </Alert>
          )}

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
          />
          <TextField
            label="Ngày kết thúc *"
            type="date"
            fullWidth
            margin="normal"
            value={electionEndDate}
            onChange={(e) => setElectionEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Hạn đăng ký *"
            type="date"
            fullWidth
            margin="normal"
            value={electionDeadline}
            onChange={(e) => setElectionDeadline(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <CSVReader onUploadAccepted={handleFileUpload}>
            {({ getRootProps, acceptedFile, ProgressBar }) => (
              <div {...getRootProps()} className="mt-2">
                <Button variant="outlined" fullWidth component="span">
                  Import Ứng cử viên
                </Button>
                {acceptedFile && <div>{acceptedFile.name}</div>}
                <ProgressBar />
              </div>
            )}
          </CSVReader>

          <Button
            variant="contained"
            fullWidth
            className="!mt-4"
            onClick={handleSaveElection}
          >
            {editingElection ? "Lưu thay đổi" : "Tạo cuộc bầu cử"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ElectionsPage;
