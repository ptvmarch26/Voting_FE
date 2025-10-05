import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../../contexts/PopupContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState({ username: "", password: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { showPopup } = usePopup();

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmitLogin = async () => {
    let newError = {};
    setError({});

    if (!username) {
      newError.username = "Tài khoản không được để trống";
    }

    if (!password) {
      newError.password = "Mật khẩu không được để trống";
    }

    setError(newError);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#f2f4f7] py-12 px-6 lg:px-8">
      <div className="mt-10 w-full sm:mx-auto sm:w-full md:max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl text-center mb-4 font-bold uppercase text-black">
          Đăng nhập
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitLogin();
          }}
        >
          <div className="space-y-6">
            {/* Input Username */}
            <div className="animate__animated animate__fadeIn animate__delay-1s">
              <label className="block text-sm font-medium text-gray-900">
                Tài khoản
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="block w-full rounded-lg bg-white px-4 py-2 text-base text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent sm:text-base transition duration-300 transform"
                />
              </div>
              {error.username && (
                <div className="text-red-600 text-sm mt-2">
                  {error.username}
                </div>
              )}
            </div>

            {/* Input Password */}
            <div className="animate__animated animate__fadeIn animate__delay-1s">
              <label className="block text-sm font-medium text-gray-900">
                Mật khẩu
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={passwordShown ? "text" : "password"}
                  autoComplete="current-password"
                  className="block w-full rounded-lg bg-white px-4 py-2 text-base text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent sm:text-base transition duration-300 transform"
                />
                <span
                  onClick={togglePasswordVisiblity}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer transition duration-300 hover:scale-110"
                >
                  {passwordShown ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
              </div>
              {error.password && (
                <div className="text-red-600 text-sm mt-2">
                  {error.password}
                </div>
              )}
            </div>

            {/* Button Login */}
            <div className="animate__animated animate__fadeIn animate__delay-1s">
              <Button
                type="submit"
                variant="contained"
                className="w-full !py-3"
              >
                Đăng nhập
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
