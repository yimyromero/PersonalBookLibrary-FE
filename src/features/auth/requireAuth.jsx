import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import { selectCurrentToken } from "./authSlice";

const RequiredAuth = () => {
	const token = useSelector(selectCurrentToken);
	const location = useLocation();

	if (!token) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <Outlet />;
};

export default RequiredAuth;
