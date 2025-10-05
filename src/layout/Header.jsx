import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <header className="shadow-md bg-sand">
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* <Link to="/" className="text-primary text-2xl font-bold">
          VoteTrust
        </Link> */}
        <Link to={"/"} className="flex justify-center">
          <img
            src={logo}
            alt="Logo"
            className="w-full max-w-[200px] object-cover"
          />
        </Link>

        <nav className="text-primary space-x-6 text-[17px] font-medium">
          <Link
            to="/voting-process"
            className="relative group transition-all duration-300 ease-in-out
    hover:opacity-100 after:content-[''] after:absolute after:left-0 after:right-0 
    after:h-[2px] after:bg-[#072d2d] after:-bottom-[3px]
    after:scale-x-0 hover:after:scale-x-100 
    after:transition-transform after:duration-300"
          >
            Quy trình bầu cử
          </Link>
          <Link
            to="/vote"
            className="relative group transition-all duration-300 ease-in-out
    hover:opacity-100 after:content-[''] after:absolute after:left-0 after:right-0 
    after:h-[2px] after:bg-[#072d2d] after:-bottom-[3px]
    after:scale-x-0 hover:after:scale-x-100 
    after:transition-transform after:duration-300"
          >
            Bầu cử
          </Link>
          <Link
            to="/about-us"
            className="relative group transition-all duration-300 ease-in-out
    hover:opacity-100 after:content-[''] after:absolute after:left-0 after:right-0 
    after:h-[2px] after:bg-[#072d2d] after:-bottom-[3px]
    after:scale-x-0 hover:after:scale-x-100 
    after:transition-transform after:duration-300"
          >
            Về chúng tôi
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
