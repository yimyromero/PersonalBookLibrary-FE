import { useParams } from "react-router";
import EditBorrowForm from "./EditBorrowForm";
import { useGetBorrowsQuery } from "./BorrowApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useGetBooksQuery } from "../books/booksApiSlice";

const EditBorrow = () => {
    const { id } = useParams();

    const { borrow } = useGetBorrowsQuery("borrowList", {
        selectFromResult: ({ data }) => ({
            borrow: data?.entities[id]
        })
    })

    const { users } = useGetUsersQuery("userList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
    })

    const { books } = useGetBooksQuery("bookList", {
        selectFromResult: ({ data }) => ({
            books: data?.ids.map(id => data?.entities[id])
        })
    })
    
    const content = borrow ? <EditBorrowForm borrow={borrow} users={users} books={books} /> : <p>Loading...</p>
    return content;
}

export default EditBorrow;