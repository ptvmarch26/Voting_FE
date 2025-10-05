import { useNavigate } from "react-router-dom";
import { FaFlag } from "react-icons/fa6";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fdfbf1] h-screen flex flex-col justify-center items-center text-center px-6">
      <FaFlag className="w-20 h-20 mx-auto text-[#072d2d]" />

      <h1 className="mt-10 text-3xl md:text-4xl font-bold text-[#072d2d]">
        Error 404 <br /> Trang bạn tìm kiếm không tồn tại.
      </h1>

      <p className="mt-6 mb-10 text-lg text-gray-600 max-w-sm">
        Vui lòng thử làm mới trang hoặc quay lại sau.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="px-6 py-3 rounded-md bg-primary text-sand hover:opacity-90 transition"
      >
        Quay lại trang trước đó
      </button>
    </div>
  );
};

export default NotFoundPage;
