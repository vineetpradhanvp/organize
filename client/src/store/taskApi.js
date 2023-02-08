import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/task" }),
  tagTypes: ["task"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (boardId) => `/tasks/${boardId || null}`,
      providesTags: ["task"],
    }),
    getTask: builder.query({
      query: (taskId) => `/${taskId || null}`,
      providesTags: (_res, _err, args) => [{ type: "task", id: args }],
    }),
    createTask: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: (res) => res && ["task"],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (res) => res && ["task", { type: "task", id: res }],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (res) => res && ["task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
