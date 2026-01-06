import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import useTitle from "../../hooks/useTitle";

const UsersList = () => {
    useTitle("Users List")

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery("userList", {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
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
            <>
            <div className="flex justify-end mb-3">
                <Link className="flex gap-2 items-center text-white py-2 px-4 bg-rose-400 hover:bg-rose-500 rounded-full" to="/dash/users/new">Add User<PlusIcon className="size-5 font-bold"/></Link>
            </div>
            <table className="border-collapse table-auto w-full bg-white">
                <thead>
                    <tr className="bg-slate-100">
                        <th className="text-sm font-semibold text-left text-neutral-600 p-4 border-b border-gray-200">Name</th>
                        <th className="text-sm font-semibold text-left text-neutral-800 p-4 border-b border-gray-200">Roles</th>
                        <th className="text-sm font-semibold text-left text-neutral-800 p-4 border-b border-gray-200">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
            </>
        );
    }

    return content;
}

export default UsersList;