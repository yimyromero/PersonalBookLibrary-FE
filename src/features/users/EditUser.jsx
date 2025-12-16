import { useNavigate, useParams } from "react-router";
import EditUserForm from "./EditUserForm";
import { useGetUsersQuery } from "./usersApiSlice";
import useTitle from "../../hooks/useTitle";

const EditUser = () => {
    useTitle("Edit User");
    const { id } = useParams();

    const { user } = useGetUsersQuery("userList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        })
    })
    
    const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>
    return content;
}

export default EditUser;