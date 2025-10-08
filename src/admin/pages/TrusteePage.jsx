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
import { useOrganization } from "../../contexts/OrganizationContext";
import { usePopup } from "../../contexts/PopupContext";

const TrusteePage = () => {
  const {
    organizations,
    handleRegisterTrustee,
    handleGetOrganizations,
    handleDeleteOrganization,
    role,
  } = useOrganization();
  const { showPopup } = usePopup();

  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    username: "",
    name: "",
    password: "",
    walletAddress: "",
  });
  const [message, setMessage] = useState("");

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      const res = await handleGetOrganizations();
      if (res?.EC !== 0)
        showPopup(res.EM || "Không thể tải danh sách tổ chức", false);
    };
    if (role === "CA") fetchData();
  }, [role]);

  const trustees = organizations?.filter((o) => o.role === "TRUSTEE") || [];

  const handleOpenModal = () => {
    setForm({ username: "", name: "", password: "", walletAddress: "" });
    setMessage("");
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (!form.username || !form.name || !form.password || !form.walletAddress) {
      setMessage("Vui lòng nhập đầy đủ thông tin!");
      return false;
    }
    return true;
  };

  const handleSaveTrustee = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const res = await handleRegisterTrustee(
      form.username,
      form.name,
      form.password,
      form.walletAddress
    );

    if (res.EC === 0) {
      showPopup("Tạo Trustee thành công!", true);
      setOpenModal(false);
    } else {
      setMessage(res.EM || "Tạo Trustee thất bại!");
    }
  };

  const handleDeleteSelected = async () => {
    if (selected.length === 0) return;

    let successCount = 0;
    for (const id of selected) {
      const res = await handleDeleteOrganization(id);
      if (res?.EC === 0) successCount++;
    }

    if (successCount > 0) {
      showPopup(`Đã xoá trustee thành công`);
    } else {
      showPopup("Không thể xoá trustee được chọn", false);
    }

    setSelected([]);
    setSelectAll(false);
  };

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) setSelected([]);
    else setSelected(trustees.map((t) => t._id));
    setSelectAll(!selectAll);
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const columns = [
    {
      id: "select",
      label: (
        <Checkbox
          checked={selectAll}
          onChange={handleSelectAll}
          disabled={trustees.length === 0}
        />
      ),
      minWidth: 50,
    },
    { id: "username", label: "Tài khoản", minWidth: 120 },
    { id: "name", label: "Tên tổ chức", minWidth: 150 },
    { id: "walletAddress", label: "Wallet Address", minWidth: 200 },
    { id: "role", label: "Role", minWidth: 120 },
  ];

  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
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
              {trustees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover key={row._id}>
                    <TableCell>
                      <Checkbox
                        checked={selected.includes(row._id)}
                        onChange={() => handleSelect(row._id)}
                      />
                    </TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.walletAddress}</TableCell>
                    <TableCell>{row.role}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={trustees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {role === "CA" && (
        <div className="flex gap-4 mt-4">
          <Button variant="contained" onClick={handleOpenModal}>
            Thêm Trustee mới
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteSelected}
            disabled={selected.length === 0}
          >
            Xóa Trustee
          </Button>
        </div>
      )}

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
            Tạo Trustee mới
          </Typography>

          {message && (
            <Alert severity="error" className="mt-2">
              {message}
            </Alert>
          )}

          <TextField
            label="Tài khoản *"
            fullWidth
            margin="normal"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          <TextField
            label="Tên tổ chức *"
            fullWidth
            margin="normal"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            label="Mật khẩu *"
            type="password"
            fullWidth
            margin="normal"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <TextField
            label="Wallet Address *"
            fullWidth
            margin="normal"
            name="walletAddress"
            value={form.walletAddress}
            onChange={handleChange}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSaveTrustee}
          >
            Tạo Trustee
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default TrusteePage;
