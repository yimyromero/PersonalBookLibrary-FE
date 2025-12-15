import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUpdateBorrowMutation, useDeleteBorrowMutation } from "./BorrowApiSlice";
import { normalizeDateOnly, formatForInput, formatShortDate } from "../../utils/dateUtils";
import { LOAN_STATUSES } from "../../config/loanStatuses";

const EditBorrowForm = ({ borrow, users, books }) => {
    const [updateBorrow, {
            isLoading,
            isSuccess,
            isError,
            error
        }] = useUpdateBorrowMutation();

    const [deleteBorrow, {
            isSuccess: isDelSuccess,
            isError: isDelError,
            error: delError 
        }] = useDeleteBorrowMutation();

    const navigate = useNavigate();

    const due = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    
    const [selectedUserId, setSelectedUserId] = useState(borrow.user._id);
    const [selectedBookId, setSelectedBookId] = useState(borrow.book._id);
    const [dueDate, setDueDate] = useState(borrow.dueDate);
    const [status, setStatus] = useState(borrow.status);

    const onUserSelected = (e) => setSelectedUserId(e.target.value);
    const onBookSelected = (e) => setSelectedBookId(e.target.value);
    const onDueDateChanged = (e) => {
        const datePicked = new Date(e.target.value);
        setDueDate(normalizeDateOnly(datePicked));
    } 
    const onStatusSelected = (e) => setStatus(e.target.value);

    useEffect(() => {
            if (isSuccess) {
                setSelectedBookId('');
                setSelectedUserId('');
                navigate('/dash/borrows');
            }
        }, [isSuccess, navigate]);

    let userListOptions = null

    // Create options for the user select element
    userListOptions = users.map(user => {
            return (
                <option 
                    key={user.id}
                    seletected={user.id === borrow.user._id ? "true" : "false"}
                    value={user.id}>{user.username}</option>
            )
        })

    let bookListOptions = null;

    // Create options for the book select element
    bookListOptions = books.map(book => {
        return (
            <option
                key={book.id}
                seletected={book.id === borrow.book._id ? "true" : "false"}
                value={book.id}>{book.title}</option>
        )
    })

    // Create options for the status select element
    const statusListOptions = Object.entries(LOAN_STATUSES).map(([label, value]) => {
        return (<option key={value} value={value}>
            {label}
        </option>)
    })
    
    const borrowedDate = new Date().toLocaleDateString();
    const canSave = [selectedUserId, selectedBookId, dueDate, status ].every(Boolean) && !isLoading;
    
     const onSaveBorrowClicked = async (e) => {
        e.preventDefault();

        if (canSave) {
            await updateBorrow({ id:borrow.id, user:selectedUserId, book:selectedBookId, dueDate, status  });
        }
    }

    const content = (
        <>
        <div className="absolute bg-yellow-100"><p className="text-red-500 ">{error?.data?.message}</p></div>
            <form className="flex flex-col p-10 bg-white" onSubmit={onSaveBorrowClicked}>
                    <div className="flex mb-7">
                        <h2 className="text-xl font-bold text-slate-800">Edit or Return Loan</h2>
                    </div>
                    <div className="mb-3"><span className="text-gray-600 text-sm font-bold">Borrowed on: </span><span className="text-gray-600 text-sm">{formatShortDate(borrow.borrowDate)}</span></div>
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
                        value={formatForInput(dueDate)}
                        required
                        onChange={onDueDateChanged}
                    />
                    </div>
                    
                    <label className="text-gray-600 text-sm font-bold pb-1 after:content-['*'] after:text-red-500" htmlFor="status">
                        Status:
                    </label>
                    <div>
                    <select className="rounded border border-gray-300 bg-gray-100 mb-3 px-2 py-1 focus:outline-none"
                        id="status"
                        name="status"
                        value={status}
                        onChange={onStatusSelected}
                        required
                    >
                        {statusListOptions}
                    </select>
                    </div>
                    <div className="mt-8"><button className="flex gap-2 items-center text-white py-2 px-4 bg-red-400 hover:bg-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer rounded-full" title="Save" disabled={!canSave}>
                            Save <DocumentPlusIcon className="size-5" /></button>
                        </div>
                </form>
            </>
    );

    return content;
}

export default EditBorrowForm;