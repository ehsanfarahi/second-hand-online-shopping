import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
	const get24UserLoginData = localStorage.getItem("24UserLoginData");

	return get24UserLoginData ? <Outlet /> : <Navigate to="/user-signin" />
}

export default PrivateComponent;