import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const NewBorrow = () => {

    const currentDate = new Date();
    const due = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

    const [dueDate, setDueDate] = useState(due.toISOString().split('T')[0]);

    const onDueDateChanged = (e) => setDueDate(e.target.value);

    const content = (
        <form className="flex flex-col p-10 bg-white" onSubmit={() => f}>
                <div className="flex mb-7">
                    <h2 className="text-xl font-bold text-slate-800">New Loan</h2>
                </div>
                <div className="mb-3"><span className="text-gray-600 text-sm font-bold">Date: </span><span>{new Date().toLocaleDateString()}</span></div>
                <label className="font-bold text-sm pb-1 after:content-['*'] after:text-red-500 text-gray-600" htmlFor="title">
                    Book Title:
                </label>
                <input 
                    className="rounded border border-gray-300 bg-gray-100 mb-4 px-2 py-1 focus:outline-none"
                    type="text"
                    id="title"
                    autoComplete="off"
                    value={'placeholder'}
                    required
                    onChange
                />
                 <label className="text-gray-600 text-sm font-bold pb-1 after:content-['*'] after:text-red-500" htmlFor="author">
                    Loan to user:
                </label>
                <input 
                    className="rounded border border-gray-300 bg-gray-100 mb-3 px-2 py-1 focus:outline-none"
                    type="text"
                    id="author"
                    autoComplete="off"
                    value={'placeholder'}
                    required
                    onChange
                />
                
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
                <div className="mt-8"><button className="flex gap-2 items-center text-white py-2 px-4 bg-red-400 hover:bg-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer rounded-full" title="Save" disabled={false}>
                        Save <DocumentPlusIcon className="size-5" /></button>
                    </div>
            </form>
    );

    return content;
}

export default NewBorrow;