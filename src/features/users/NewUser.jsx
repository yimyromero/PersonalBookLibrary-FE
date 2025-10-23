import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router";
import { ROLES } from "../../config/roles";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";

const NewUser = () => {

    const USER_REG = /^[a-zA-Z]{3,20}$/;
    const PWD_REGEX = /^[a-zA-Z0-9!@#$%]{4,12}$/;

    const [addUser, { 
        isLoading,
        isSuccess,
        isError,
        error 
    }] = useAddNewUserMutation();

     const navigate = useNavigate();

    const [username, setUserName] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [roles, setRoles] = useState(["User"]);

    

    useEffect(() => {
        setValidUsername(USER_REG.test(username));
        
    }, [username]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        if (isSuccess) {
            setUserName('');
            setPassword('');
            setRoles([]);
            navigate('/dash/users');
        }
    }, [isSuccess, navigate]);

    const onUserNameChanged = e => setUserName(e.target.value);
    const onPasswordChanged = e => setPassword(e.target.value);

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values);
    }

    const canSave = [roles.length, validUsername, validPassword].every(value => !!value) && !isLoading;
    console.log(canSave, roles.length);

    const onSaveUserClicked = async (e) => {
        e.preventDefault();

        if (canSave) {
            await addUser({ username, password, roles });
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                className="pb-2"
                key={role}
                value={role}>
                    {role}
            </option>
        )
    })

    console.log(options);

    const content = (
        <>
            <p>{error?.data?.message}</p>
            <form className="flex flex-col p-10 bg-white" onSubmit={onSaveUserClicked}>
                <div className="flex mb-7">
                    <h2 className="text-xl font-bold text-slate-800">New User</h2>
                </div>
                <label className="pb-1 after:content-['*'] after:text-red-500" htmlFor="username">
                    Username: <span>[3-20 letters]</span>
                </label>
                <input 
                    className="rounded border border-gray-300 bg-gray-100 mb-3 px-2 py-1 focus:outline-none"
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={username}
                    required
                    onChange={onUserNameChanged}
                />

                <label className="pb-1 after:content-['*'] after:text-red-500" htmlFor="password">
                    Password: <span>[4-12 chars incl. !@#$%]</span>
                </label>
                <input 
                    className="rounded border border-gray-300 bg-gray-100 mb-3 px-2 py-1 focus:outline-none"
                    type="password"
                    autoComplete="off" 
                    id="password"
                    name="password"
                    value={password}
                    required
                    onChange={onPasswordChanged}
                />

                <label className="pb-1 after:content-['*'] after:text-red-500" htmlFor="roles">
                    Assigned roles:
                </label>
                <select
                    className="border border-gray-300 p-2 rounded bg-gray-100 focus:outline-none"
                    id="roles"
                    name="roles"
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >{options}</select>

                <div className="mt-8"><button className="flex gap-2 items-center text-white py-2 px-4 bg-red-400 hover:bg-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer rounded-full" title="Save" disabled={!canSave}>
                        Save <DocumentPlusIcon className="size-5" /></button>
                    </div>
            </form>
        </>
    )

    return content;
}

export default NewUser;