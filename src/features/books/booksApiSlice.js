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
        }),
        addNewBook: builder.mutation({
            query: initialBookData => ({
                url: '/books',
                method: 'POST',
                body: {
                    ...initialBookData
                }
            }),
            invalidatesTags: [{ type: 'Book', id: 'LIST'}]
        }),
        updateBook: builder.mutation({
            query: initialBookData => ({
                url: '/books',
                method: 'PATCH',
                body: {
                    ...initialBookData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Book', id: arg.id }
            ]
        }),
        deleteBook: builder.mutation({
            query: ({ id }) => ({
                url: '/books',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Book', id: arg.id }
            ]
        })
    })
});

export const {
    useGetBooksQuery,
    useAddNewBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation
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