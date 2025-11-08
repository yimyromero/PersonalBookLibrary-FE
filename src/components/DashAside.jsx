import { BookOpenIcon, HomeIcon, BookmarkSquareIcon, CalendarDateRangeIcon, UsersIcon } from "@heroicons/react/24/outline";
import { HomeIcon as HomeIconSolid } from "@heroicons/react/24/solid";
import { Link, NavLink, useResolvedPath } from "react-router";

const DashAside = () => {
    const base = useResolvedPath("").pathname;
    const content = (
        <aside className="flex flex-col row-span-2 col-span-2 px-4 py-8 border border-r-1 border-gray-200 h-full bg-white">
            <div className="flex flex-wrap items-center gap-1 mb-8 px-2">
                <HomeIconSolid  className="size-8 text-red-400"/>
                <span className="font-bold text-2xl">Library</span>                
            </div>
            <nav className="flex-1">
                <ul className="flex flex-col gap-2">
                    <li className="rounded">
                        
                        <NavLink
                            to=""
                            end
                            className={({ isActive }) => 
                                `flex items-center gap-2 p-2 
                                ${isActive ? "font-bold bg-red-100 rounded" : 
                                             "hover:font-bold hover:bg-red-100"}`
                                }
                        >
                            <HomeIcon className="size-5"/>
                            Home
                        </NavLink>
                    </li>

                    <li className="hover:font-bold hover:bg-red-100 rounded">
                       
            <NavLink
                            to="/dash/books"
                            end
                            className={({ isActive }) => 
                                `flex items-center gap-2 p-2 
                                ${isActive ? "font-bold bg-red-100 rounded" : 
                                             "hover:font-bold hover:bg-red-100"}`
                                }
                        >
                            <BookOpenIcon className="size-5"/>
                            Books
                        </NavLink>
                    </li>
                    
                    <li className="hover:font-bold hover:bg-red-100 rounded">
                        <NavLink
                            to="/dash/users"
                            end
                            className={({ isActive }) => 
                                `flex items-center gap-2 p-2 
                                ${isActive ? "font-bold bg-red-100 rounded" : 
                                             "hover:font-bold hover:bg-red-100"}`
                                }
                        >
                            <UsersIcon className="size-5"/>
                            Users
                        </NavLink>
                    </li>
                    <li className="hover:font-bold hover:bg-red-100 rounded">
                        
                         <NavLink
                            to="borrows"
                            end
                            className={({ isActive }) => 
                                `flex items-center gap-2 p-2 
                                ${isActive ? "font-bold bg-red-100 rounded" : 
                                             "hover:font-bold hover:bg-red-100"}`
                                }
                        >
                             <BookmarkSquareIcon className="size-5"/>
                            Borrowed
                        </NavLink>
                    </li>
                    
                </ul>
            </nav>
        </aside>
    );
    return content;
}

export default DashAside;