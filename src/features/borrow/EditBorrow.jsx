import { useParams } from "react-router";
import EditBorrowForm from "./EditBorrowForm";
import { useGetBorrowsQuery } from "./BorrowApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useGetBooksQuery } from "../books/booksApiSlice";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const EditBorrow = () => {
    useTitle("Edit loan");

    const { id } = useParams();

    const { username, isManager, isAdmin } = useAuth();

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

    if (!isManager && !isAdmin) {
        if (borrow?.user.username !== username) {
            return <p>You're not allowed to view this record</p>
        }
    }
    
    const content = borrow ? <EditBorrowForm borrow={borrow} users={users} books={books} /> : <p>Loading...</p>
    return content;
}

export default EditBorrow;