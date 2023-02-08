import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const boardApi = createApi({
  reducerPath: "boardApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/board" }),
  tagTypes: ["board"],
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => "/",
      providesTags: ["board"],
    }),
    getBoard: builder.query({
      query: (id) => `/${id}`,
      providesTags: (_res, _err, args) => [{ type: "board", id: args }],
    }),
    createBoard: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: (res) => res && ["board"],
    }),
    updateBoard: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (res) => res && ["board", { type: "board", id: res }],
    }),
    deleteBoard: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (res) => res && ["board"],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useGetBoardQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardApi;
