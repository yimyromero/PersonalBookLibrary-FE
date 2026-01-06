import { BookOpenIcon, HomeIcon, BookmarkSquareIcon, CalendarDateRangeIcon, UsersIcon } from "@heroicons/react/24/outline";
import { HomeIcon as HomeIconSolid, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { useNavigate, NavLink, useResolvedPath, Link } from "react-router";
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
        <aside className="flex flex-col row-span-2 px-2 lg:px-4 py-8 border border-r-1 border-gray-200 h-full bg-white">
                <Link
                    to={{
                        pathname: "/dash"
                    }}
                    className="flex flex-wrap items-center justify-center lg:justify-start gap-1 mb-8"
                >
                     <HomeIconSolid  className="size-8 text-red-400"/>
                <span className="hidden lg:block font-bold text-2xl">Library</span>  
                </Link>
            <nav className="flex-1">
                <ul className="flex flex-col gap-2">
                    <li className="text-gray-700">
                        
                        <NavLink
                            to=""
                            end
                            className={({ isActive }) => 
                                `flex items-center justify-center lg:justify-start gap-2 p-2 rounded transition ease-in-out duration-300
                                ${isActive ? "font-bold bg-red-100" : 
                                             "hover:bg-gray-100"}`
                                }
                        >
                            <HomeIcon className="size-5" title="Home"/>
                            <span className="hidden lg:block">Home</span>
                        </NavLink>
                    </li>

                    <li className="text-gray-700">
                       
            <NavLink
                            to="/dash/books"
                            end
                            className={({ isActive }) => 
                                `flex items-center justify-center lg:justify-start gap-2 p-2 rounded transition ease-in-out duration-300
                                ${isActive ? "font-bold bg-red-100" : 
                                             "hover:bg-gray-100"}`
                                }
                        >
                            <BookOpenIcon title="Books" className="size-5"/>
                            <span className="hidden lg:block">Books</span>
                        </NavLink>
                    </li>
                    { (isAdmin || isManager) && 
                    <li className="text-gray-700">
                        <NavLink
                            to="/dash/users"
                            end
                            className={({ isActive }) => 
                                `flex items-center justify-center lg:justify-start gap-2 p-2 rounded transition ease-in-out duration-300
                                ${isActive ? "font-bold bg-red-100" : 
                                             "hover:bg-gray-100"}`
                                }
                        >
                            <UsersIcon title="Users" className="size-5"/>
                            <span className="hidden lg:block">Users</span>
                        </NavLink>
                    </li>
                    }
                    <li className="text-gray-700">
                        
                         <NavLink
                            to="borrows"
                            end
                            className={({ isActive }) => 
                                `flex items-center justify-center lg:justify-start gap-2 p-2 rounded transition ease-in-out duration-300
                                ${isActive ? "font-bold bg-red-100" : 
                                             "hover:bg-gray-100"}`
                                }
                        >
                             <BookmarkSquareIcon title="Borrowed" className="size-5"/>
                            <span className="hidden lg:block">Borrowed</span>
                        </NavLink>
                    </li>
                    
                </ul>
            </nav>
            <button 
                className="flex items-center justify-center lg:justify-start gap-2 cursor-pointer hover:text-gray-900 text-gray-600" 
                title="Logout"
                onClick={handleLogout} >
            <ArrowRightStartOnRectangleIcon title="Log out" className="size-5"/>
            <span className="hidden lg:block">Log out</span>
        </button>
        </aside>
    );
    return content;
}

export default DashAside;