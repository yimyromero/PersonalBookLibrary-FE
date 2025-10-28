import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { selectUserById } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate()

    const user = useSelector(state => selectUserById(state, id));
    
    const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>
    return content;
}

export default EditUser;