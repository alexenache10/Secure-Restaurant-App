import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

    return ( localStorage.getItem('userEmail')) ? (<Outlet/>) : (<Navigate to="/" replace/>)
};

export default ProtectedRoute;