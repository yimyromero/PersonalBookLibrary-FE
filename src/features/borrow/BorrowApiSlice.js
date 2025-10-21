import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const borrowsAdapter = createEntityAdapter({});
const initialState = borrowsAdapter.getInitialState();

export const borrowsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBorrows: builder.query({
            query: () => '/borrow',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedBorrows = responseData.map(borrow => {
                    borrow.id = borrow._id;
                    return borrow;
                });
                return borrowsAdapter.setAll(initialState, loadedBorrows);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Borrow', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Borrow', id }))
                    ]
                } else return [{ type: 'Borrow', id: 'LIST' }]
            }
        })
    })
});

export const {
    useGetBorrowsQuery,
} = borrowsApiSlice;

export const selectBorrowsResult = borrowsApiSlice.endpoints.getBorrows.select();

const selectBorrowsData = createSelector(
    [selectBorrowsResult],
    borrowsResult => borrowsResult.data
);

export const {
    selectAll: selectAllBorrows,
    selectById: selectBorrowById,
    selectIds: selectBorrowIds
} = borrowsAdapter.getSelectors(state => selectBorrowsData(state) ?? initialState);