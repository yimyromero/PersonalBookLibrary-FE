import { PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectBorrowById } from "./BorrowApiSlice";
import { formatShortDate } from "../../utils/dateUtils";

const Borrow = ({ borrowId }) => {
    const borrow = useSelector(state => selectBorrowById(state, borrowId));
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

export default Borrow;