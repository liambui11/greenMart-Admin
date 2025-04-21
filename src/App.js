import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllRoute from './components/AllRoute';
import { checkAuthStaff } from "./actions/authStaff";

const App = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.staffAuth.accessToken);

    useEffect(() => {
        if (!accessToken) {
            dispatch(checkAuthStaff());
        }
    }, [accessToken, dispatch]);

    return (
        <>
            <AllRoute/>
        </>
    );
};

export default App;
