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
                <td className="p-4 border-b border-gray-200 bg-white text-gray-800">{borrow.book.title}</td>
                <td className="p-4 border-b border-gray-200 bg-white text-gray-800">{formatShortDate(borrow.borrowDate)}</td>
                <td className="p-4 border-b border-gray-200 bg-white text-gray-800">{borrow.user.username}</td>
                <td className="p-4 border-b border-gray-200 bg-white text-gray-800">{formatShortDate(borrow.dueDate)}</td>
                <td className="p-4 border-b border-gray-200 bg-white text-gray-800">
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