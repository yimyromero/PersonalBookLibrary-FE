import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useGetBooksQuery } from "../books/booksApiSlice";
import { useAddNewBorrowMutation } from "./BorrowApiSlice";
import useTitle from "../../hooks/useTitle";

const NewBorrow = () => {
    useTitle("New book loan");
    
    const [addNewBorrow, { 
            isLoading: isAddLoading,
            isSuccess: isAddSuccess,
            isError: isAddError,
            error: addError 
        }] = useAddNewBorrowMutation();

    const navigate = useNavigate();

    const {
            data: books,
            isLoading,
            isSuccess,
            isError,
            error
        } = useGetBooksQuery(
            null, {
            pollingInterval: 60000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        });

    const {
            data: users,
            isLoading: isLoadingUsers,
            isSuccess: isSuccessUsers,
            isError: isErrorUsers,
            error: errorUsers
        } = useGetUsersQuery(
            null, {
            pollingInterval: 60000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        });

    const currentDate = new Date();
    const due = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedBookId, setSelectedBookId] = useState('');
    const [dueDate, setDueDate] = useState(due.toISOString().split('T')[0]);

    const onUserSelected = (e) => setSelectedUserId(e.target.value);
    const onBookSelected = (e) => setSelectedBookId(e.target.value);
    const onDueDateChanged = (e) => setDueDate(e.target.value);

    useEffect(() => {
            if (isAddSuccess) {
                setSelectedBookId('');
                setSelectedUserId('');
                navigate('/dash/borrows');
            }
        }, [isAddSuccess, navigate]);

    const {usersList } = useGetUsersQuery("userList", {
        selectFromResult: ({ data }) => ({
            usersList: data?.ids.map(id => data?.entities[id])
        })
    })

    let userListOptions = null

    if (isSuccessUsers) {
        userListOptions = usersList.map(user => {
            return (
                <option 
                    key={user.id}
                    value={user.id}>{user.username}</option>
            )
        })
    }

    const { booksList } = useGetBooksQuery("bookList", {
        selectFromResult: ({ data }) => ({
            booksList: data?.ids.map(id => data?.entities[id])
        })
    })
    let bookListOptions = null;

    // Create options for the book select element
    if (isSuccess) {
        bookListOptions = booksList.map(book => {
            return (
                <option
                    key={book.id}
                    value={book.id}>{book.title}</option>
            )
        })
    }
    
    const borrowedDate = new Date().toLocaleDateString();
    const canSave = [selectedUserId, selectedBookId, dueDate, ].every(value => !!value) && !isAddLoading;

     const onSaveBorrowClicked = async (e) => {
        e.preventDefault();

        if (canSave) {
            await addNewBorrow({ user:selectedUserId, book:selectedBookId, dueDate });
        }
    }

    const content = (
        <>
        <p>{addError?.data?.message}</p>
            <form className="flex flex-col p-10 bg-white" onSubmit={onSaveBorrowClicked}>
                    <div className="flex mb-7">
                        <h2 className="text-xl font-bold text-slate-800">New Loan</h2>
                    </div>
                    <div className="mb-3"><span className="text-gray-600 text-sm font-bold">Date: </span><span>{new Date().toLocaleDateString()}</span></div>
                    <label className="font-bold text-sm pb-1 after:content-['*'] after:text-red-500 text-gray-600" htmlFor="book-title">
                        Book Title:
                    </label>
                    <select className="rounded border border-gray-300 bg-gray-100 mb-3 px-2 py-1 focus:outline-none"
                        id="book-title"
                        name="book-title"
                        value={selectedBookId}
                        onChange={onBookSelected}
                        required
                    >
                        <option value="">
                            Select book
                        </option>
                        {bookListOptions}
                    </select>
                    <label className="text-gray-600 text-sm font-bold pb-1 after:content-['*'] after:text-red-500" htmlFor="user">
                        Loan to user:
                    </label>
                    <select className="rounded border border-gray-300 bg-gray-100 mb-3 px-2 py-1 focus:outline-none"
                        id="user"
                        name="author"
                        value={selectedUserId}
                        onChange={onUserSelected}
                        required
                    >
                        <option value="">
                            Select user
                        </option>
                        {userListOptions}
                    </select>
                    <label className="text-gray-600 text-sm font-bold pb-1 after:content-['*'] after:text-red-500" htmlFor="due-date">
                        Due date: <span className="font-normal text-gray-500 text-xs">(After two weeks by default)</span>
                    </label>
                    <div>
                    <input 
                        className="rounded border border-gray-300 bg-gray-100 mb-3 px-2 py-1 focus:outline-none"
                        type="date"
                        id="due-date"
                        autoComplete="off"
                        value={dueDate}
                        required
                        onChange={onDueDateChanged}
                    />
                    </div>
                    <div className="mt-8"><button className="flex gap-2 items-center text-white py-2 px-4 bg-red-400 hover:bg-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer rounded-full" title="Save" disabled={!canSave}>
                            Save <DocumentPlusIcon className="size-5" /></button>
                        </div>
                </form>
            </>
    );

    return content;
}

export default NewBorrow;