import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery();
    console.log("users", users);

    let content;

    if (isLoading) content = <p>Loading...</p>

    // optional chaining
    if (isError) {
        content = <p className="text-red">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = users;
        console.log("ids", ids);

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null;

        content = (
            <table className="border-collapse table-auto w-full">
                <thead>
                    <tr className="bg-slate-100">
                        <th className="text-xs text-left text-neutral-600 p-4 border-b border-gray-200 font-normal">USERNAME</th>
                        <th className="text-xs text-left text-neutral-800 p-4 border-b border-gray-200 font-normal">ROLES</th>
                        <th className="text-xs text-left text-neutral-800 p-4 border-b border-gray-200 font-normal">EDIT</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        );
    }

    return content;
}

export default UsersList;