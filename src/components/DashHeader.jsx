import { useEffect } from "react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { useNavigate, Link, useLocation } from "react-router";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";

const DASH_REGEX = /^\/dash(\/)?/;
const NOTES_REGEX = /^\/dash\/books(\/)?/;
const USERS_REGEX = /^\/dash\/users(\/)?/

const DashHeader = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
             await sendLogout().unwrap();
        navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    if (isLoading) return <p>Logging Out...</p>
    if(isError) return <p>Error: {error.data?.message}</p>

    const logoutButton = (
        <button title="Logout" onClick={handleLogout}>
            <ArrowRightStartOnRectangleIcon className="size-5 cursor-pointer"/>
        </button>
    )

    const content = (
        <header className="h-16 col-span-10 col-start-3 row-start-1 flex justify-end shadow-lg pr-4 bg-white">
            <div className="flex items-center gap-2 p-3">
                <span className="inline-block size-10 rounded-full bg-gray-300"></span>
                <span>John</span>
            </div>
            {logoutButton}
        </header>
    );
    return content; 
}

export default DashHeader;