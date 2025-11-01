import { useState, useEffect } from "react";
import { useAddNewBookMutation } from "./booksApiSlice";
import { useNavigate } from "react-router";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";

const NewBook = () => {

     const [addBook, { 
            isLoading,
            isSuccess,
            isError,
            error 
        }] = useAddNewBookMutation();

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setISBN] = useState('');
    const [genre, setGenre] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [copiesAvailable, setCopies] = useState(0);

    // Input handlers
    const onTitleChanged = (e) => setTitle(e.target.value);
    const onAuthorChanged = (e) => setAuthor(e.target.value);
    const onISBNChanged = (e) => setISBN(e.target.value);
    const onGenreChanged = (e) => setGenre(e.target.value);
    const onPublishedYearChanged = (e) => setPublishedYear(e.target.value);
    const onCopiesChanged = (e) => setCopies(e.target.value);

    useEffect(() => {
        if (isSuccess) {
            setTitle('');
            setAuthor('');
            setISBN('');
            setGenre('');
            setPublishedYear('');
            setCopies('');
            navigate('/dash/books')
        }
    }, [isSuccess, navigate]);

    const canSave = [title, author, isbn, publishedYear, copiesAvailable].every(value =>  !!value) && !isLoading;
    
    const onSaveBookClicked = async (e) => {
        e.preventDefault();

        if (canSave) {
            await addBook({ title, author, isbn, genre, publishedYear, copiesAvailable });
        }
    }


    const content = (
        <>
            <p>{error?.data?.message}</p>
            <form className="flex flex-col p-10 bg-white" onSubmit={onSaveBookClicked}>
                <div className="flex mb-7">
                    <h2 className="text-xl font-bold text-slate-800">New Book</h2>
                </div>
                <label className="text-gray-600 text-sm font-bold pb-1 after:content-['*'] after:text-red-500" htmlFor="title">
                    Title:
                </label>
                <input 
                    className="rounded border border-gray-300 bg-gray-100 mb-4 px-2 py-1 focus:outline-none"
                    type="text"
                    id="title"
                    autoComplete="off"
                    value={title}
                    required
                    onChange={onTitleChanged}
                />
                 <label className="text-gray-600 text-sm font-bold pb-1 after:content-['*'] after:text-red-500" htmlFor="author">
                    Author:
                </label>
                <input 
                    className="rounded border border-gray-300 bg-gray-100 mb-4 px-2 py-1 focus:outline-none"
                    type="text"
                    id="author"
                    autoComplete="off"
                    value={author}
                    required
                    onChange={onAuthorChanged}
                />
                 <label className="text-gray-600 text-sm font-bold pb-1 after:content-['*'] after:text-red-500" htmlFor="isbn">
                    ISBN:
                </label>
                <input 
                    className="rounded border border-gray-300 bg-gray-100 mb-4 px-2 py-1 focus:outline-none"
                    type="text"
                    id="isbn"
                    autoComplete="off"
                    value={isbn}
                    onChange={onISBNChanged}
                />
                 <label className="text-gray-600 text-sm font-bold pb-1" htmlFor="genre">
                    Genre:
                </label>
                <input 
                    className="rounded border border-gray-300 bg-gray-100 mb-4 px-2 py-1 focus:outline-none"
                    type="text"
                    id="genre"
                    autoComplete="off"
                    value={genre}
                    onChange={onGenreChanged}
                />
                 <label className="text-gray-600 text-sm font-bold pb-1 after:content-['*'] after:text-red-500" htmlFor="pub-year">
                    Year:
                </label>
                <input 
                    className="rounded border border-gray-300 bg-gray-100 mb-4 px-2 py-1 focus:outline-none"
                    type="text"
                    id="pub-year"
                    autoComplete="off"
                    value={publishedYear}
                    required
                    onChange={onPublishedYearChanged}
                />
                 <label className="text-gray-600 text-sm font-bold pb-1 after:content-['*'] after:text-red-500" htmlFor="copies-available">
                    Copies:
                </label>
                <input 
                    className="rounded border border-gray-300 bg-gray-100 mb-4 px-2 py-1 focus:outline-none appearance-none appearance-text"
                    type="number"
                    id="copies-available"
                    autoComplete="off"
                    value={copiesAvailable}
                    required
                    min="0"
                    onChange={onCopiesChanged}
                />

                <div className="mt-8"><button className="flex gap-2 items-center text-white py-2 px-4 bg-red-400 hover:bg-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer rounded-full" title="Save" disabled={!canSave}>
                        Save <DocumentPlusIcon className="size-5" /></button>
                    </div>
            </form>
        </>
    );

    return content;
}

export default NewBook;