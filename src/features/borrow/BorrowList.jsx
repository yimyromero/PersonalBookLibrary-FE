import { useGetBorrowsQuery } from "./BorrowApiSlice";
import Borrow from "./Borrow";
import { Link } from "react-router";
import { PlusIcon } from "@heroicons/react/24/solid";

const BorrowsList = () => {

    const {
        data: borrows,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBorrowsQuery();
    console.log("borrows", borrows);

    let content;

    if (isLoading) content = <p>Loading...</p>

    // optional chaining
    if (isError) {
        content = <p className="text-red">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = borrows;
        console.log("ids", ids);

        const tableContent = ids?.length
            ? ids.map(borrowId => <Borrow key={borrowId} borrowId={borrowId} />)
            : null;

        content = (
            <>
                <div className="flex justify-end mb-3">
                                    <Link className="flex gap-2 items-center text-white py-2 px-4 bg-rose-400 hover:bg-rose-500 rounded-full" to="/dash/borrows/new">New Loan<PlusIcon className="size-5 font-bold"/></Link>
                                </div>
                <table className="border-collapse table-auto w-full">
                    <thead>
                        <tr className="bg-slate-100">
                            <th className="text-xs text-left text-neutral-600 p-4 border-b border-gray-200 font-normal">TITLE</th>
                            <th className="text-xs text-left text-neutral-800 p-4 border-b border-gray-200 font-normal">BORROWED DATE</th>
                            <th className="text-xs text-left text-neutral-800 p-4 border-b border-gray-200 font-normal">BORROWER</th>
                            <th className="text-xs text-left text-neutral-800 p-4 border-b border-gray-200 font-normal">DUE DATE</th>
                            <th className="text-xs text-left text-neutral-800 p-4 border-b border-gray-200 font-normal">EDIT</th>
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