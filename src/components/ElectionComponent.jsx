import { useState } from "react";
import { generateKeys } from "../utils/crypto";
import { encryptKey, decryptKey } from "../utils/aes";
import { QRCodeCanvas } from "qrcode.react";
import { saveAs } from "file-saver";
import { IoQrCodeOutline } from "react-icons/io5";
import { BrowserQRCodeReader } from "@zxing/library";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

const ElectionComponent = ({ election }) => {
  const { id, name, description, startDate, endDate, deadline } = election;
  const [cccd, setCccd] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ type: "", text: "" });
  const [qrValue, setQrValue] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [qrFile, setQrFile] = useState(null);
  const [needsPassword, setNeedsPassword] = useState(false);
  const [tempData, setTempData] = useState(null);

  const handleRegister = () => {
    if (!cccd.trim() || !password.trim()) {
      setAlert({
        type: "error",
        text: "Vui lòng nhập đầy đủ CCCD và mật khẩu.",
      });
      return;
    }

    const sk = localStorage.getItem("sk");
    const pk = localStorage.getItem("pk");

    if (sk && pk) {
      setAlert({
        type: "error",
        text: "Vui lòng đăng xuất để tiếp tục đăng ký.",
      });
      return;
    }

    const { skHex, pkHex } = generateKeys();
    const encryptedSk = encryptKey(skHex, password);

    const rawData = JSON.stringify({ sk: encryptedSk, pk: pkHex, cccd });
    const qrData = btoa(rawData);
    console.log("qr", qrData);
    setQrValue(qrData);

    setAlert({
      type: "success",
      text: `Đăng ký thành công cho cuộc bầu cử: ID_${id}.`,
    });
    setIsRegistered(true);
    setPassword("");
  };

  const handleDownloadQR = () => {
    const canvas = document
      .getElementById(`qrcode_${id}`)
      .toDataURL("image/png");
    saveAs(canvas, `election_${id}.png`);
    setAlert({ type: "success", text: "Đã tải mã QR xuống máy thành công." });
  };

  const handleQRFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setQrFile(file);
      decodeQRCodeFromFile(file);
    } else {
      setAlert({
        type: "error",
        text: "Vui lòng chọn tệp hình ảnh chứa mã QR hợp lệ.",
      });
    }
  };

  const decodeQRCodeFromFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const codeReader = new BrowserQRCodeReader();
        codeReader
          .decodeFromImage(img)
          .then((result) => {
            try {
              const decoded = atob(result.getText());
              const parsedData = JSON.parse(decoded);

              if (parsedData.sk && parsedData.pk && parsedData.cccd) {
                setTempData(parsedData);
                setNeedsPassword(true);
                setPassword("");
                setAlert({
                  type: "info",
                  text: "Vui lòng nhập mật khẩu để giải mã khóa riêng.",
                });
              } else {
                setAlert({ type: "error", text: "Mã QR không hợp lệ." });
              }
            } catch (err) {
              console.error("QR decode error:", err);
              setAlert({
                type: "error",
                text: "Không thể giải mã hoặc parse dữ liệu từ mã QR.",
              });
            }
          })
          .catch(() => {
            setAlert({
              type: "error",
              text: "Không thể đọc được mã QR. Hãy thử lại với hình rõ hơn.",
            });
          });
      };
    };
    reader.readAsDataURL(file);
  };

  const handleDecryptAndLogin = () => {
    if (!password.trim()) {
      setAlert({
        type: "error",
        text: "Vui lòng nhập mật khẩu để giải mã.",
      });
      return;
    }

    const decryptedSk = decryptKey(tempData.sk, password);
    if (!decryptedSk) {
      setAlert({ type: "error", text: "Mật khẩu không đúng." });
      return;
    }

    localStorage.setItem("sk", decryptedSk);
    localStorage.setItem("pk", tempData.pk);
    setNeedsPassword(false);
    setPassword("");
    setAlert({ type: "success", text: "Đăng nhập thành công." });
  };

  return (
    <div className="mt-4 bg-[#e9ebe3] shadow-md rounded-xl p-6 relative font-pp">
      <div className="absolute top-2 left-2 bg-[#81f18e] text-primary text-xs px-2 py-1 rounded">
        ID: {id}
      </div>

      <h2 className="text-lg font-bold text-primary mt-2 mb-1">{name}</h2>
      <p className="text-gray-700 mb-4 text-sm">{description}</p>

      <div className="grid grid-cols-2 gap-2 text-sm text-primary mb-4">
        <p>
          <strong>Ngày bắt đầu:</strong> {startDate}
        </p>
        <p>
          <strong>Ngày kết thúc:</strong> {endDate}
        </p>
        <p className="col-span-2">
          <strong>Hạn chót đăng ký:</strong> {deadline}
        </p>
      </div>

      {alert.text && (
        <div className="mb-4">
          <Alert severity={alert.type}>{alert.text}</Alert>
        </div>
      )}

      {!isRegistered && !needsPassword && (
        <div className="!space-y-3">
          <TextField
            label="CCCD *"
            variant="outlined"
            value={cccd}
            onChange={(e) => setCccd(e.target.value)}
            fullWidth
            size="small"
            sx={{
              "& label.Mui-focused": { color: "var(--primary)" },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "var(--primary)" },
              },
            }}
          />
          <TextField
            label="Mật khẩu *"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            size="small"
            sx={{
              "& label.Mui-focused": { color: "var(--primary)" },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "var(--primary)" },
              },
            }}
          />
          <button
            onClick={handleRegister}
            className="w-full bg-primary hover:opacity-90 text-sand py-2 rounded-md transition"
          >
            Đăng ký
          </button>
        </div>
      )}

      {needsPassword && (
        <div>
          <TextField
            label="Nhập mật khẩu để giải mã *"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            size="small"
          />
          <button
            onClick={handleDecryptAndLogin}
            className="my-3 w-full bg-primary hover:opacity-90 text-sand py-2 rounded-md transition"
          >
            Giải mã & Đăng nhập
          </button>
        </div>
      )}

      {isRegistered && (
        <div className="flex flex-col items-center">
          <QRCodeCanvas
            id={`qrcode_${id}`}
            value={qrValue}
            size={200}
            className="mb-4"
          />
          <button
            onClick={handleDownloadQR}
            className="w-full bg-primary hover:opacity-90 text-sand py-2 rounded-md transition"
          >
            Tải mã QR
          </button>
        </div>
      )}

      <div className="mt-4 text-center">
        <label
          className={`w-full flex items-center justify-center rounded-md px-4 py-2 transition border border-primary text-primary hover:bg-sand ${
            new Date() < new Date(startDate)
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <IoQrCodeOutline className="mr-2" />
          <span>Đăng nhập bằng mã QR</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleQRFileChange}
            hidden
            disabled={new Date() < new Date(startDate)}
          />
        </label>
      </div>
    </div>
  );
};

export default ElectionComponent;
