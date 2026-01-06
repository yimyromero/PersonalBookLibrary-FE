import { PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { formatShortDate } from "../../utils/dateUtils";
import { useGetBorrowsQuery } from "./BorrowApiSlice";
import { memo } from "react";

const Borrow = ({ borrowId }) => {
   
    const { borrow } = useGetBorrowsQuery("borrowList", {
        selectFromResult: ({ data }) => ({
            borrow: data?.entities[borrowId]
        }),
    })

    const navigate = useNavigate();

    if (borrow) {
        const handleEdit = () => navigate(`/dash/borrows/${borrowId}`);

        return (
            <tr>
                <td className="px-4 py-3 border-b border-gray-200 bg-white text-gray-600 text-sm lg:text-base">{borrow.book.title}</td>
                <td className="px-4 py-3 border-b border-gray-200 bg-white text-gray-600 text-sm lg:text-base">{formatShortDate(borrow.borrowDate)}</td>
                <td className="px-4 py-3 border-b border-gray-200 bg-white text-gray-600 text-sm lg:text-base">{borrow.user.username}</td>
                <td className="px-4 py-3 border-b border-gray-200 bg-white text-gray-600 text-sm lg:text-base">{formatShortDate(borrow.dueDate)}</td>
                <td className="px-4 py-3 border-b border-gray-200 bg-white text-gray-600 text-sm lg:text-base">
                    <button onClick={handleEdit}>
                        <PencilIcon className="size-4" />
                    </button>
                </td>
            </tr>
        )
    } else return null;
}
const memoizedBorrow = memo(Borrow);

export default memoizedBorrow;