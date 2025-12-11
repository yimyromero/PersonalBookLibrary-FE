import { BookOpenIcon, HomeIcon, BookmarkSquareIcon, CalendarDateRangeIcon, UsersIcon } from "@heroicons/react/24/outline";
import { HomeIcon as HomeIconSolid, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { useNavigate, NavLink, useResolvedPath } from "react-router";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";

const DashAside = () => {
    const {username, isManager, isAdmin } = useAuth();
    
    const navigate = useNavigate();
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

    const content = (
        <aside className="flex flex-col row-span-2 col-span-2 px-4 py-8 border border-r-1 border-gray-200 h-full bg-white">
            <div className="flex flex-wrap items-center gap-1 mb-8 px-2">
                <HomeIconSolid  className="size-8 text-red-400"/>
                <span className="font-bold text-2xl">Library</span>                
            </div>
            <nav className="flex-1">
                <ul className="flex flex-col gap-2">
                    <li className="text-gray-700">
                        
                        <NavLink
                            to=""
                            end
                            className={({ isActive }) => 
                                `flex items-center gap-2 p-2 rounded transition ease-in-out duration-300
                                ${isActive ? "font-bold bg-red-100" : 
                                             "hover:bg-gray-100"}`
                                }
                        >
                            <HomeIcon className="size-5"/>
                            Home
                        </NavLink>
                    </li>

                    <li className="text-gray-700">
                       
            <NavLink
                            to="/dash/books"
                            end
                            className={({ isActive }) => 
                                `flex items-center gap-2 p-2 rounded transition ease-in-out duration-300
                                ${isActive ? "font-bold bg-red-100" : 
                                             "hover:bg-gray-100"}`
                                }
                        >
                            <BookOpenIcon className="size-5"/>
                            Books
                        </NavLink>
                    </li>
                    { (isAdmin || isManager) && 
                    <li className="text-gray-700">
                        <NavLink
                            to="/dash/users"
                            end
                            className={({ isActive }) => 
                                `flex items-center gap-2 p-2 rounded transition ease-in-out duration-300
                                ${isActive ? "font-bold bg-red-100" : 
                                             "hover:bg-gray-100"}`
                                }
                        >
                            <UsersIcon className="size-5"/>
                            Users
                        </NavLink>
                    </li>
                    }
                    <li className="text-gray-700">
                        
                         <NavLink
                            to="borrows"
                            end
                            className={({ isActive }) => 
                                `flex items-center gap-2 p-2 rounded transition ease-in-out duration-300
                                ${isActive ? "font-bold bg-red-100" : 
                                             "hover:bg-gray-100"}`
                                }
                        >
                             <BookmarkSquareIcon className="size-5"/>
                            Borrowed
                        </NavLink>
                    </li>
                    
                </ul>
            </nav>
            <button 
                className="flex items-center gap-2 cursor-pointer hover:text-gray-900 text-gray-600" 
                title="Logout"
                onClick={handleLogout} >
            <ArrowRightStartOnRectangleIcon className="size-5 cursor-pointer"/>
            Log Out
        </button>
        </aside>
    );
    return content;
}

export default DashAside;