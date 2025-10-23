import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { selectUserById } from "./usersApiSlice";

const EditUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate()

    const user = useSelector(state => selectUserById(state, userId));
    console.log('yimy', user.username);
    return (
        <div>
            <h1>{`User Name: ${user.username}`}</h1>
            <p>{`Role: ${user.roles}`}</p>
        </div>
    )
}

export default EditUser;