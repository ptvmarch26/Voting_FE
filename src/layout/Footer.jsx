import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { MdPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import logo2 from "../assets/images/logo2.png";

const Footer = () => {
  return (
    <div>
      <div className="bg-primary w-full pt-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-2 space-y-10 lg:space-y-0">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to={"/"} className="flex justify-center">
              <img
                src={logo2}
                alt="Logo"
                className="w-full max-w-[200px] object-cover"
              />
            </Link>
          </div>

          <div className="flex justify-between gap-5 flex-wrap md:grid grid-cols-1 md:grid-cols-3 col-span-3">
            <div>
              <h3 className="text-sm text-sand-64 font-semibold mb-3 uppercase">
                Về VoteTrust
              </h3>
              <nav className="space-y-2">
                <Link
                  to={"/about-us"}
                  className="block text-primary-inverse text-sm opacity-80 hover:opacity-100 hover:font-medium transition"
                >
                  Về chúng tôi
                </Link>
                <Link
                  to={"/term-of-use"}
                  className="block text-primary-inverse text-sm opacity-80 hover:opacity-100 hover:font-medium transition"
                >
                  Điều khoản chung
                </Link>
                <Link
                  to={"/private-policy"}
                  className="block text-primary-inverse text-sm opacity-80 hover:opacity-100 hover:font-medium transition"
                >
                  Chính sách bảo mật
                </Link>
              </nav>
            </div>

            {/* Hỗ trợ */}
            <div>
              <h3 className="text-sm text-sand-64 font-semibold mb-3 uppercase">
                Hỗ trợ
              </h3>
              <nav className="space-y-2">
                <Link
                  to={"/"}
                  className="block text-primary-inverse text-sm opacity-80 hover:opacity-100 hover:font-medium transition"
                >
                  Cách hoạt động
                </Link>
                <Link
                  to={"/"}
                  className="block text-primary-inverse text-sm opacity-80 hover:opacity-100 hover:font-medium transition"
                >
                  Quy trình bầu cử
                </Link>
              </nav>
            </div>

            {/* Liên hệ */}
            <div>
              <nav className="space-y-2">
                <h3 className="text-sm text-sand-64 font-semibold mb-3 uppercase">
                  Liên hệ
                </h3>
                <Link
                  to={"/"}
                  className="block text-primary-inverse text-sm opacity-80 hover:opacity-100 hover:font-medium transition"
                >
                  Facebook
                </Link>
                <Link
                  to={"/"}
                  className="block text-primary-inverse text-sm opacity-80 hover:opacity-100 hover:font-medium transition"
                >
                  Instagram
                </Link>
                <Link
                  to={"/"}
                  className="block text-primary-inverse text-sm opacity-80 hover:opacity-100 hover:font-medium transition"
                >
                  Tiktok
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="text-center text-sm py-2">
          <span className="font-medium text-primary-inverse text-sm block pb-3">
            © 2025 VoteTrust. Bản quyền thuộc về chúng tôi.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
