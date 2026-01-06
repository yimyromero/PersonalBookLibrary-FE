import { PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { useGetBooksQuery } from "./booksApiSlice";
import { memo } from "react";

const Book = ({ bookId }) => {
    const { book } = useGetBooksQuery("bookList", {
        selectFromResult: ({ data }) => ({
            book: data?.entities[bookId]
        })
    })

    const navigate = useNavigate();

    if (book) {
        const handleEdit = () => navigate(`/dash/books/${bookId}`);
        //const bookRolesString = book.roles.toString().replaceAll(',', ', ');
        //const cellStatus = book.active ? '' : 'disabled';

        return (
            <tr>
                {/* <td className="p-4 border-b border-gray-200 bg-white"><img className="h-5 inline pr-3" src="https://covers.openlibrary.org/b/isbn/9788498672220-S.jpg" />
                            {book.title}</td> */}
                <td className="px-4 py-3 border-b border-gray-200 bg-white text-gray-600 text-sm lg:text-base">{book.title}</td>
                <td className="px-4 py-3 border-b border-gray-200 bg-white text-gray-600 text-sm lg:text-base">{book.author}</td>
                <td className="px-4 py-3 border-b border-gray-200 bg-white text-gray-600 text-sm lg:text-base">{book.genre}</td>
                <td className="px-4 py-3 border-b border-gray-200 bg-white text-gray-600 text-sm lg:text-base">{book.publishedYear}</td>
                <td className="px-4 py-3 border-b border-gray-200 bg-white text-gray-600 text-sm lg:text-base">{book.copiesAvailable}</td>
                <td className="px-4 py-3 border-b border-gray-200 bg-white text-gray-600 text-sm lg:text-base">
                    <button onClick={handleEdit}>
                        <PencilIcon className="size-4" />
                    </button>
                </td>
            </tr>
        )
    } else return null;
}

const memoizedBook = memo(Book);

export default memoizedBook;