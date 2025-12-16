
import { useParams } from "react-router";
import EditBookForm from "./EditBookForm";
import { useGetBooksQuery } from "./booksApiSlice";
import useTitle from "../../hooks/useTitle";

const EditBook = () => {
    useTitle("Edit Book");
    
    const { id } = useParams();

    const { book } = useGetBooksQuery("bookList", {
        selectFromResult: ({ data }) => ({
            book: data?.entities[id]
        })
    })
    
    const content = book ? <EditBookForm book={book} /> : <p>Loading...</p>
    return content;
}

export default EditBook;