import { CircleUserRound } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";

const UsernameMenu = () => {
    const storedEmail = localStorage.getItem('userEmail');
    const userType = localStorage.getItem('type');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('type');
        window.location.reload();
    };

    const handleAdminClick = () => {
        navigate('/admin');
    };

    if (storedEmail) {
        return (
            <div className="flex items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-gray-500 gap-2">
                        <CircleUserRound className="text-cyan-700" />
                        {storedEmail}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Link to="/manage-restaurant" className="font-bold hover:text-gray-500">
                                Manage Restaurant
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to="/user-profile" className="font-bold hover:text-gray-500">
                                User Profile
                            </Link>
                        </DropdownMenuItem>
                        <Separator />
                        <DropdownMenuItem>
                            <Button onClick={handleLogout} className="flex flex-1 font-bold bg-gray-500">
                                Log out
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {userType === "Admin" && (
                    <Button
                        onClick={handleAdminClick}
                        className="ml-4 font-bold text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg"
                    >
                        Admin Page
                    </Button>
                )}
            </div>
        );
    }

    return null;
};

export default UsernameMenu;
