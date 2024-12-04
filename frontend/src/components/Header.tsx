import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="border-b-2 border-b-gray-500 py-6 bg-gradient-to-r from-gray-800 to-gray-600">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="QuickBites Logo" className="h-8 mr-2" />
          <Link to="/" className="text-3xl font-bold tracking-tight text-white hover:text-gray-300">
            quickbites.com
          </Link>
        </div>
        {/* Ascundem elementul pentru ecranele de dimensiune medium+ */}
        <div className="md:hidden">
          <MobileNav />
        </div>
        {/* Hidden pentru elementele de dimensiune micA */}
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
