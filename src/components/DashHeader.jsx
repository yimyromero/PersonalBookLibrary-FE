import { useEffect } from "react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { useNavigate, Link, useLocation } from "react-router";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?/;
const NOTES_REGEX = /^\/dash\/books(\/)?/;
const USERS_REGEX = /^\/dash\/users(\/)?/

const DashHeader = () => {

    const {username, status } = useAuth();

    const content = (
        <header className="h-16 flex justify-end shadow-lg pr-4 bg-white">
            <div className="flex items-center gap-2 p-3">
                <span className="inline-block size-10 rounded-full bg-gray-300"></span>
                <div className="flex flex-col">
                    <span>{username}</span>
                    <span className="text-xs text-gray-500">{status}</span>
                </div>
            </div>
        </header>
    );
    return content; 
}

export default DashHeader;