import { PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId));

    const navigate = useNavigate();

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`);
        const userRolesString = user.roles.toString().replaceAll(',', ', ');
        const cellStatus = user.active ? '' : 'disabled';

        return (
            <tr>
                <td className="p-4 border-b border-gray-200 bg-white text-gray-800">{user.username}</td>
                <td className="p-4 border-b border-gray-200 bg-white text-gray-800">{userRolesString}</td>
                <td className="p-4 border-b border-gray-200 bg-white text-gray-800">
                    <button onClick={handleEdit}>
                        <PencilIcon className="size-4" />
                    </button>
                </td>
            </tr>
        )
    } else return null;
}

export default User;