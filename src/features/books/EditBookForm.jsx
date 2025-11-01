import { useState, useEffect } from "react";
import { useUpdateBookMutation, useDeleteBookMutation } from "./booksApiSlice";
import { useNavigate } from "react-router";
import { DocumentPlusIcon, DocumentMinusIcon } from "@heroicons/react/24/solid";
import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";

const EditBookForm = ({ book }) => {

    const [updateBook, {
        isLoading,
        isSuccess,
        isError, 
        error 
    }] = useUpdateBookMutation();

    const [deleteBook, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delError
    }] = useDeleteBookMutation();

    const navigate = useNavigate();
    
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [isbn, setISBN] = useState(book.isbn);
    const [genre, setGenre] = useState(book.genre);
    const [publishedYear, setPublishedYear] = useState(book.publishedYear);
    const [copiesAvailable, setCopies] = useState(book.copiesAvailable);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setTitle('');
            setAuthor('');
            setISBN('');
            setGenre('');
            setPublishedYear('');
            setCopies('');
            navigate('/dash/books');
        }
    }, [isSuccess, isDelSuccess, navigate]);

    // Input handlers
    const onTitleChanged = (e) => setTitle(e.target.value);
    const onAuthorChanged = (e) => setAuthor(e.target.value);
    const onISBNChanged = (e) => setISBN(e.target.value);
    const onGenreChanged = (e) => setGenre(e.target.value);
    const onPublishedYearChanged = (e) => setPublishedYear(e.target.value);
    const onCopiesChanged = (e) => setCopies(e.target.value);
    
    const onSaveBookClicked = async (e) => {
       await updateBook({id: book.id, title, author, isbn, genre, publishedYear, copiesAvailable});
    }

    const onDeleteBookClicked = async () => {
        try {
            await deleteBook({ id: book.id });
            setOpen(false);
        } catch (err) {
            console.error("Couldn't delete book", err);
        }
    }
    const canSave = [title, author, isbn, publishedYear, copiesAvailable].every(value =>  !!value) && !isLoading;
    
    const errContent = (error?.data?.message || delError?.data?.message) ?? '';
    
    const content = (
        <>
            <div className="absolute bg-yellow-100"><p class="text-red-500 ">{errContent}</p></div>
            <form className="flex flex-col p-10 bg-white" onSubmit={e => e.preventDefault()}>
                <div className="flex mb-7">
                    <h2 className="text-xl font-bold text-slate-800">{book.title}</h2>
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
                

                <div className="flex gap-4 mt-8">
                    <button 
                        className="flex gap-2 items-center text-white py-2 px-4 bg-rose-400 hover:bg-rose-500 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer rounded-full" 
                        title="Save" 
                        disabled={!canSave}
                        onClick={onSaveBookClicked}
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
                        title={"Delete Book?"} 
                        message={"Are you sure? This can be undone."}
                        isOpen={isOpen}
                        onConfirm={onDeleteBookClicked}
                        onCancel={() => setOpen(false)}
                        loading={isLoading}
                    />
                    </div>
            </form>
        </>

    );

    return content;
}

export default EditBookForm;