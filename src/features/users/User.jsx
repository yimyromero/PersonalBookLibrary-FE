import { PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { useGetUsersQuery } from "./usersApiSlice";
import { memo } from "react";

const User = ({ userId }) => {
    const { user } = useGetUsersQuery("userList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        })
    })

    const navigate = useNavigate();

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`);
        const userRolesString = user.roles.toString().replaceAll(',', ', ');
        const cellStatus = user.active ? '' : 'disabled';

        return (
            <tr>
                <td className="px-4 py-3 border-b border-gray-200 bg-white text-gray-600 text-sm lg:text-base">{user.username}</td>
                <td className="px-4 py-3 border-b border-gray-200 bg-white text-gray-600 text-sm lg:text-base">{userRolesString}</td>
                <td className="px-4 py-3 border-b border-gray-200 bg-white text-gray-600 text-sm lg:text-base">
                    <button onClick={handleEdit}>
                        <PencilIcon className="size-4" />
                    </button>
                </td>
            </tr>
        )
    } else return null;
}

const memoizedUser = memo(User);

export default memoizedUser;