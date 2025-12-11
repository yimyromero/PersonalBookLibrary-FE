import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import { selectCurrentToken } from "./authSlice";
import useAuth from "../../hooks/useAuth";

const RequiredAuth = ({ allowedRoles }) => {
	//const token = useSelector(selectCurrentToken);
	const location = useLocation();
	const { roles } = useAuth();

	const content = (
		roles.some(role => allowedRoles.includes(role))
			? <Outlet />
			: <Navigate to="/login" state={{ from: location }} replace />
	)

	return content;
};

export default RequiredAuth;
