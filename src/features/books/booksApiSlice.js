import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const booksAdapter = createEntityAdapter({});
const initialState = booksAdapter.getInitialState();

export const booksApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBooks: builder.query({
            query: () => '/books',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedBooks = responseData.map(book => {
                    book.id = book._id;
                    return book;
                });
                return booksAdapter.setAll(initialState, loadedBooks);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Book', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Book', id }))
                    ]
                } else return [{ type: 'Book', id: 'LIST' }]
            }
        })
    })
});

export const {
    useGetBooksQuery,
} = booksApiSlice;

export const selectBooksResult = booksApiSlice.endpoints.getBooks.select();

const selectBooksData = createSelector(
    [selectBooksResult],
    booksResult => booksResult.data
);

export const {
    selectAll: selectAllBooks,
    selectById: selectBookById,
    selectIds: selectBookIds
} = booksAdapter.getSelectors(state => selectBooksData(state) ?? initialState);