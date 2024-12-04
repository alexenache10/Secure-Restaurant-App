import { useState } from "react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleClassicLogin = () => {
    window.location.href = "/login"; 
    setShowLoginForm(false);
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
  };

  const isUserLoggedIn =  localStorage.getItem('userEmail');

  return (
    <span className="flex space-x-2 items-center relative">
      {isUserLoggedIn && <UsernameMenu />}
      {!isUserLoggedIn && (
        <>
          <Button
            variant="ghost"
            className="font-bold hover:text-gray-500 hover:bg-white"
            onClick={handleClassicLogin}>
            Log in
          </Button>
          <Link to="/register"> 
            <Button
              variant="outline"
              className="font-bold hover:text-gray-500 hover:bg-white">
              Sign up
            </Button>
          </Link>
        </>
      )}
      {showLoginForm && (
        <div className="absolute top-14 right-0 w-48 bg-white rounded shadow-lg p-4 transition-all duration-300">
          <button
            className="absolute top-0 right-0 m-2 text-gray-400 hover:text-gray-500"
            onClick={handleCloseLoginForm}>
            X
          </button>
          <h3 className="text-lg font-bold mb-2">Login</h3>
          <Button variant="ghost" onClick={handleClassicLogin}>
            QuickBite account
          </Button>
        </div>
      )}
    </span>
  );
};

export default MainNav;
