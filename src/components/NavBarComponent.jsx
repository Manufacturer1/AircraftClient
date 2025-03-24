import logo from "../images/logo.svg";
import globIcon from "../images/globe.png";
import bell from "../images/bell.svg";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between ">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Logo" />
        <Link
          to="/"
          className="font-sarabun text-[20px] font-normal text-[#6C6CFFFF]"
        >
          E-flight
        </Link>
      </div>
      <div className="flex items-center gap-8">
        <a href="#" className="text-[15px] font-bold text-neutral-900">
          USD
        </a>
        <a href="#">
          <img className="block w-5" src={globIcon} />
        </a>
        <a href="#">
          <img className="block w-5" src={bell} />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
