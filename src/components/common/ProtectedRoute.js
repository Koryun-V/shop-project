import {useDispatch} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import {setRedirectPath} from "../../store/slices/authRedirect";

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const location = useLocation();

    if (!token) {
        dispatch(setRedirectPath(location.pathname));
        return <Navigate to="/" replace/>;
    }
    return children;
};

export default ProtectedRoute;
