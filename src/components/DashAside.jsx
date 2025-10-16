import { BookOpenIcon, HomeIcon, BookmarkSquareIcon, CalendarDateRangeIcon, UsersIcon } from "@heroicons/react/24/outline";
import { HomeIcon as HomeIconSolid } from "@heroicons/react/24/solid";
import { Link } from "react-router";

const DashAside = () => {
    const content = (
        <aside className="flex flex-col row-span-2 col-span-2 px-4 py-8 border border-r-1 border-gray-200 h-screen bg-white">
            <div className="flex items-center gap-1 mb-8 px-2">
                <HomeIconSolid  className="size-8 text-red-400"/>
                <span className="font-bold text-2xl">Library</span>                
            </div>
            <nav className="flex-1">
                <ul className="flex flex-col gap-2">
                    <li className="hover:font-bold hover:bg-red-100 rounded">
                        <Link to='/dash' className="flex items-center gap-2 p-2">
                            <HomeIcon className="size-5"/>
                            Home
                        </Link>
                        
                    </li>

                    <li className="hover:font-bold hover:bg-red-100 rounded">
                        <Link to='/dash/books' className="flex items-center gap-2 p-2">
                        <BookOpenIcon className="size-5"/>
                        Books
            </Link>
                    </li>
                    <li className="hover:font-bold hover:bg-red-100 rounded">
                        <Link to='/dash/users' className="flex items-center gap-2 p-2">
                        <UsersIcon className="size-5"/>
                        Users
                        </Link>
                    </li>
                    <li className="hover:font-bold hover:bg-red-100 rounded">
                        <Link to='/borrowed' className="flex items-center gap-2 p-2">
                        <BookmarkSquareIcon className="size-5"/>
                        Borrowed
                        </Link>
                    </li>
                    
                    <li className="hover:font-bold hover:bg-red-100 rounded">
                        <Link to='/overdue' className="flex items-center gap-2 p-2">
                        <CalendarDateRangeIcon className="size-5"/>
                        Overdue
                        </Link>
                    </li>
                    
                </ul>
            </nav>
        </aside>
    );
    return content;
}

export default DashAside;