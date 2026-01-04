import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseEnvUrl = import.meta.env.VITE_API_BASE_URL;

const baseQuery = fetchBaseQuery({
	baseUrl: baseEnvUrl,
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result.error && result.error.status === 403) {
		const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
		if (refreshResult?.data) {
			api.dispatch(setCredentials(refreshResult.data));
			result = await baseQuery(args, api, extraOptions);
		} else {
			if (refreshResult?.error.status === 403) {
				api.dispatch(logOut());
				queueMicrotask(() => {
					api.dispatch(apiSlice.util.resetApiState());
				});

				if (!refreshResult.error.data) {
					refreshResult.error.data = {};
				}
				refreshResult.error.data.message = "Your login has expired.";
			}
			return refreshResult;
		}
	}
	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Book", "User", "Borrows"],
	endpoints: (builder) => ({}),
});
