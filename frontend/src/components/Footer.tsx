import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-600 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight hover:text-gray-300">
          quickbite.com
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <span className="hover:text-gray-300">Privacy Policy</span>
          <span className="hover:text-gray-300">Terms of Service</span>
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
