import { Outlet, Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation();

    const [refreshFinished, setRefreshFinished] = useState(false);

    useEffect(() => {
        const verifyRefreshToken = async () => {
            if (!token && persist) {
                try {
                    await refresh();
                } catch (err) {
                    console.error("Refresh failed");
                }
            }
            setRefreshFinished(true);
        };

        verifyRefreshToken();
    }, [token, persist, refresh]);

    if (!persist) return <Outlet />;

    if (!refreshFinished || isLoading) return <p>Loading...</p>;

    return <Outlet />;
};

export default PersistLogin;