import { useGetBooksQuery } from "./booksApiSlice";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router";
import Book from "./Book";

const BooksList = () => {

    const {
        data: books,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBooksQuery(
        "bookList", {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    console.log("books", books);

    let content;

    if (isLoading) content = <p>Loading...</p>

    // optional chaining
    if (isError) {
        content = <p className="text-red">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = books;
        console.log("ids", ids);

        const tableContent = ids?.length
            ? ids.map(bookId => <Book key={bookId} bookId={bookId} />)
            : null;

        content = (
            <>
                <div className="flex justify-end mb-3">
                    <Link className="flex gap-2 items-center text-white py-2 px-4 bg-rose-400 hover:bg-rose-500 rounded-full" to="/dash/books/new">Add Book<PlusIcon className="size-5 font-bold"/></Link>
                </div>
                <table className="border-collapse table-auto w-full">
                    <thead>
                        <tr className="bg-slate-100">
                            <th className="text-sm font-semibold text-left text-neutral-600 p-4 border-b border-gray-200">Title</th>
                            <th className="text-sm font-semibold text-left text-neutral-800 p-4 border-b border-gray-200">Author</th>
                            <th className="text-sm font-semibold text-left text-neutral-800 p-4 border-b border-gray-200">Genre</th>
                            <th className="text-sm font-semibold text-left text-neutral-800 p-4 border-b border-gray-200">Year</th>
                            <th className="text-sm font-semibold text-left text-neutral-800 p-4 border-b border-gray-200">Copies</th>
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

export default BooksList;