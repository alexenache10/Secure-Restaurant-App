import { Link } from "react-router-dom";
import broken from "../assets/broken.png";

const NotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${broken})` }}
    >
      <div className="bg-white bg-opacity-30 p-8 rounded-md shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Oops!</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">404 - Page Not Found</h2>
        <p className="text-lg mb-8 text-gray-800">The page you are looking for does not exist.</p>
        <Link to="/" className="text-blue-500 hover:underline">Go back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
