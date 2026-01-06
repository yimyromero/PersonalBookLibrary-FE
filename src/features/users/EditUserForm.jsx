import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router";
import { ROLES } from "../../config/roles";
import { DocumentPlusIcon, DocumentMinusIcon } from "@heroicons/react/24/solid";
import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";

const USER_REG = /^[a-zA-Z]{3,20}$/;
const PWD_REGEX = /^[a-zA-Z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError, 
        error 
    }] = useUpdateUserMutation();

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delError
    }] = useDeleteUserMutation();

    const navigate = useNavigate();
    
    const [username, setUserName] = useState(user.username);
    const [validUsername, setValidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [roles, setRoles] = useState(user.roles);
    const [active, setActive] = useState(user.active);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        setValidUsername(USER_REG.test(username));
        
    }, [username]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setUserName('');
            setPassword('');
            setRoles([]),
            navigate('/dash/users');
        }
    }, [isSuccess, isDelSuccess, navigate]);

    const onUserNameChanged = e => setUserName(e.target.value);
    const onPasswordChanged = e => setPassword(e.target.value);

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

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values);
    }

    const onActiveChanged = () => setActive(prev => !prev);

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password, roles, active });
        } else {
            await updateUser({ id: user.id, username, roles, active });
        }
    }

    const onDeleteUserClicked = async () => {
        try {
            await deleteUser({ id: user.id });
            setOpen(false);
        } catch (err) {
            console.error("Couldn't delete user", err);
        }
    }
    let canSave = false;
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(value => !!value) && !isLoading;
    } else {
        canSave = [roles.length, validUsername].every(value => !!value) && !isLoading;
    }
    
    const errContent = (error?.data?.message || error?.data?.message) ?? '';
    
    const content = (
        <>
            <p>{errContent}</p>
            <form className="flex flex-col p-10 bg-white" onSubmit={e => e.preventDefault()}>
                <div className="flex mb-7">
                    <h2 className="text-xl font-bold text-slate-800">{username}</h2>
                </div>
                <label className="text-gray-600 text-sm font-bold pb-1 after:content-['*'] after:text-rose-500" htmlFor="username">
                    Username: <span className="font-normal text-xs text-gray-500">(3-20 letters)</span>
                </label>
                <input 
                    className="rounded border border-gray-300 bg-gray-100 mb-4 px-2 py-1 focus:outline-none"
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={username}
                    onChange={onUserNameChanged}
                />

                <label className="text-gray-600 text-sm font-bold pb-1 after:content-['*'] after:text-rose-500" htmlFor="password">
                    Password: <span className="font-normal text-xs text-gray-500">(4-12 chars incl. !@#$%)</span>
                </label>
                <input 
                    className="rounded border border-gray-300 bg-gray-100 mb-4 px-2 py-1 focus:outline-none"
                    type="password"
                    autoComplete="off" 
                    id="password"
                    name="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label className="text-gray-600 text-sm font-bold pb-1 after:content-['*'] after:text-rose-500" htmlFor="roles">
                    Assigned roles:
                </label>
                <div className="w-40">
                <select
                    className="border border-gray-300 p-2 mb-4 rounded bg-gray-100 focus:outline-none w-full"
                    id="roles"
                    name="roles"
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >{options}</select>
                </div>
                <label  className="text-gray-600 text-sm font-bold flex items-center gap-2"  htmlFor="user-active">
                    Active
                    <input 
                        id="user-active" 
                        name="user-active" 
                        type="checkbox" 
                        checked={active}
                        onChange={onActiveChanged}
                        />
                </label>
                

                <div className="flex gap-4 mt-8">
                    <button 
                        className="flex gap-2 items-center text-white py-2 px-4 bg-rose-400 hover:bg-rose-500 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer rounded-full" 
                        title="Save" 
                        disabled={!canSave}
                        onClick={onSaveUserClicked}
                        >
                        Save <DocumentPlusIcon className="size-5" />
                    </button>
                    <button 
                        className="flex gap-2 items-center text-rose-700 py-2 px-4 bg-rose-100 hover:bg-rose-200 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer rounded-full" 
                        title="Delete" 
                        disabled={!canSave}
                        onClick={() => setOpen(true)}
                        >
                        Delete <DocumentMinusIcon className="size-5" />
                    </button>
                    <ConfirmDeleteModal 
                        title={"Delete User?"} 
                        message={"Are you sure? This can't be undone."}
                        isOpen={isOpen}
                        onConfirm={onDeleteUserClicked}
                        onCancel={() => setOpen(false)}
                        loading={isLoading}
                    />
                    </div>
            </form>
        </>

    );

    return content;
}

export default EditUserForm;