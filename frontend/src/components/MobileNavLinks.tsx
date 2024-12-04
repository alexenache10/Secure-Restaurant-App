import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const MobileNavLinks = () => {

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('type');
    };

    const type = localStorage.getItem('type');

    return (
        <>
            {type === 'Admin' && (
                <Link to="/admin" className="flex bg-white items-center font-bold hover:text-cyan-800">
                    Admin Panel
                </Link>
            )}
            <Link to="/user-profile" className="flex bg-white items-center font-bold hover:text-cyan-800">
                User Profile
            </Link>
            <Link to="/manage-restaurant" className="flex bg-white items-center font-bold hover:text-cyan-800">
                My Restaurant
            </Link>
            <Button onClick={() => handleLogout()} className="flex items-center px-3 font-bold hover:bg-gray-500">
                Log Out
            </Button>
        </>
    );
};

export default MobileNavLinks;