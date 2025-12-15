import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const borrowsAdapter = createEntityAdapter({});
const initialState = borrowsAdapter.getInitialState();

export const borrowsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getBorrows: builder.query({
			query: () => ({
				url: "/borrow",
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			transformResponse: (responseData) => {
				const loadedBorrows = responseData.map((borrow) => {
					borrow.id = borrow._id;
					return borrow;
				});
				return borrowsAdapter.setAll(initialState, loadedBorrows);
			},
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [
						{ type: "Borrow", id: "LIST" },
						...result.ids.map((id) => ({ type: "Borrow", id })),
					];
				} else return [{ type: "Borrow", id: "LIST" }];
			},
		}),
		addNewBorrow: builder.mutation({
			query: (initialBorrowData) => ({
				url: "/borrow",
				method: "POST",
				body: {
					...initialBorrowData,
				},
			}),
			invalidatesTags: [{ type: "Borrow", id: "LIST" }],
		}),
		updateBorrow: builder.mutation({
			query: (initialBorrowData) => ({
				url: "/borrow",
				method: "PATCH",
				body: {
					...initialBorrowData,
				},
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Borrow", id: arg.id }],
		}),
		deleteBorrow: builder.mutation({
			query: ({ id }) => ({
				url: "/borrow",
				method: "DELETE",
				body: { id },
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Borrow", id: arg.id }],
		}),
	}),
});

export const {
	useGetBorrowsQuery,
	useAddNewBorrowMutation,
	useUpdateBorrowMutation,
	useDeleteBorrowMutation,
} = borrowsApiSlice;

export const selectBorrowsResult =
	borrowsApiSlice.endpoints.getBorrows.select();

const selectBorrowsData = createSelector(
	[selectBorrowsResult],
	(borrowsResult) => borrowsResult.data
);

export const {
	selectAll: selectAllBorrows,
	selectById: selectBorrowById,
	selectIds: selectBorrowIds,
} = borrowsAdapter.getSelectors(
	(state) => selectBorrowsData(state) ?? initialState
);
