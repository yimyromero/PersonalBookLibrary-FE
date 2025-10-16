import { useGetBooksQuery } from "./booksApiSlice";
import Book from "./Book";

const BooksList = () => {

    const {
        data: books,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBooksQuery();
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
            <table className="border-collapse table-auto w-full">
                <thead>
                    <tr className="bg-slate-100">
                        <th className="text-xs text-left text-neutral-600 p-4 border-b border-gray-200 font-normal">TITLE</th>
                        <th className="text-xs text-left text-neutral-800 p-4 border-b border-gray-200 font-normal">AUTHOR</th>
                        <th className="text-xs text-left text-neutral-800 p-4 border-b border-gray-200 font-normal">GENRE</th>
                        <th className="text-xs text-left text-neutral-800 p-4 border-b border-gray-200 font-normal">YEAR</th>
                        <th className="text-xs text-left text-neutral-800 p-4 border-b border-gray-200 font-normal">COPIES</th>
                        <th className="text-xs text-left text-neutral-800 p-4 border-b border-gray-200 font-normal">EDIT</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        );
    }

    return content;
}

export default BooksList;