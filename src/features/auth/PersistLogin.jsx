import { Outlet, Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);

    const [trueSuccess, setTrueSuccess] = useState(false);

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            if (!token && persist) {
                try {
                    await refresh();
                    setTrueSuccess(true);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        verifyRefreshToken();
    }, [token, persist, refresh])

    let content = "";

    if (!persist) {
        console.log("no persist");
        content = <Outlet />;
    } else if (isLoading) {
        console.log("Loading");
        content = <p>Loading...</p>
    } else if (isError) {
        console.log("error");
        content = (
            <p className="text-red-500">
                {error.data?.message};
                <Link to="/login">Please login again</Link>
            </p>
        )
    } else if (isSuccess && trueSuccess) {
        console.log("success");
        content = <Outlet />;
    } else if (token && isUninitialized) {
        console.log("token and uninit");
        console.log(isUninitialized);
        content = <Outlet />
    }

    return content;
};

export default PersistLogin;