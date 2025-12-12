import { PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectBookById } from "./booksApiSlice";

const Book = ({ bookId }) => {
    const book = useSelector(state => selectBookById(state, bookId));

    const navigate = useNavigate();

    if (book) {
        const handleEdit = () => navigate(`/dash/books/${bookId}`);
        //const bookRolesString = book.roles.toString().replaceAll(',', ', ');
        //const cellStatus = book.active ? '' : 'disabled';

        return (
            <tr>
                {/* <td className="p-4 border-b border-gray-200 bg-white"><img className="h-5 inline pr-3" src="https://covers.openlibrary.org/b/isbn/9788498672220-S.jpg" />
                            {book.title}</td> */}
                <td className="p-4 border-b border-gray-200 bg-white text-gray-800">{book.title}</td>
                <td className="p-4 border-b border-gray-200 bg-white text-gray-800">{book.author}</td>
                <td className="p-4 border-b border-gray-200 bg-white text-gray-800">{book.genre}</td>
                <td className="p-4 border-b border-gray-200 bg-white text-gray-800">{book.publishedYear}</td>
                <td className="p-4 border-b border-gray-200 bg-white text-gray-800">{book.copiesAvailable}</td>
                <td className="p-4 border-b border-gray-200 bg-white text-gray-800">
                    <button onClick={handleEdit}>
                        <PencilIcon className="size-4" />
                    </button>
                </td>
            </tr>
        )
    } else return null;
}

export default Book;