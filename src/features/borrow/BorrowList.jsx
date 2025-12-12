import { useGetBorrowsQuery } from "./BorrowApiSlice";
import Borrow from "./Borrow";
import { Link } from "react-router";
import { PlusIcon } from "@heroicons/react/24/solid";
import useAuth from "../../hooks/useAuth";

const BorrowsList = () => {

    const { username, isAdmin, isManager } = useAuth();

    const {
        data: borrows,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBorrowsQuery("borrowList", {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
    console.log("borrows", borrows);

    let content;

    if (isLoading) content = <p>Loading...</p>

    // optional chaining
    if (isError) {
        content = <p className="text-red">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = borrows;
        console.log("ids", ids, entities);

        let filteredByUsername = ids.filter(borrowId => entities[borrowId].user.username === username);

        if (isAdmin || isManager) {
            filteredByUsername = [...ids]; 
        }

        console.log("filter", filteredByUsername);

        const tableContent = ids?.length && filteredByUsername.map(borrowId => <Borrow key={borrowId} borrowId={borrowId} />)

        content = (
            <>
                <div className="flex justify-end mb-3">
                                    <Link className="flex gap-2 items-center text-white py-2 px-4 bg-rose-400 hover:bg-rose-500 rounded-full" to="/dash/borrows/new">New Loan<PlusIcon className="size-5 font-bold"/></Link>
                                </div>
                <table className="border-collapse table-auto w-full">
                    <thead>
                        <tr className="bg-slate-100">
                            <th className="text-sm font-semibold text-left text-neutral-600 p-4 border-b border-gray-200">Title</th>
                            <th className="text-sm font-semibold text-left text-neutral-800 p-4 border-b border-gray-200">Borrowed date</th>
                            <th className="text-sm font-semibold text-left text-neutral-800 p-4 border-b border-gray-200">Borrower</th>
                            <th className="text-sm font-semibold text-left text-neutral-800 p-4 border-b border-gray-200">Due date</th>
                            <th className="text-sm font-semibold text-left text-neutral-800 p-4 border-b border-gray-200">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </>
        );
    }

    return content;
}

export default BorrowsList;