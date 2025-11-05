import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectBorrowById } from "./BorrowApiSlice";
import EditBorrowForm from "./EditBorrowForm";

const EditBorrow = () => {
    const { id } = useParams();

    const borrow = useSelector(state => selectBorrowById(state, id));
    
    const content = borrow ? <EditBorrowForm borrow={borrow} /> : <p>Loading...</p>
    return content;
}

export default EditBorrow;