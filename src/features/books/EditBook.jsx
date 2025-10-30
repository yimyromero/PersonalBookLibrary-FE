import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectBookById } from "./booksApiSlice";
import EditBookForm from "./EditBookForm";

const EditBook = () => {
    const { id } = useParams();

    const book = useSelector(state => selectBookById(state, id));
    
    const content = book ? <EditBookForm book={book} /> : <p>Loading...</p>
    return content;
}

export default EditBook;