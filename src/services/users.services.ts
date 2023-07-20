import {
  BaseQueryFn,
  createApi,
  // fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      headers?: AxiosRequestConfig["headers"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await axios({
        url: baseUrl + url,
        method,
        headers: { authorization: "Bearer accessToken" },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        params,
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: ["Users"],
  baseQuery: axiosBaseQuery({
    baseUrl: "",
  }),
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "",
  //   // prepareHeaders(headers) {
  //   //   headers.set("authorization", "Bearer ...");
  //   //   return headers;
  //   // },
  // }),
  endpoints: (build) => ({
    getUsers: build.query<any, void>({
      // query: () => "users",
      query() {
        return { url: "users", method: "GET" };
      },
      providesTags(result) {
        if (result) {
          const final = [
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            ...result.map(({ id }: { id: string }) => ({
              type: "Users" as const,
              id,
            })),
            { type: "Users" as const, id: "LIST" },
          ];
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return final;
        }
        return [{ type: "Users", id: "LIST" }];
      },
    }),
    addUser: build.mutation<any, any>({
      query(body: any) {
        try {
          return {
            url: "users",
            method: "POST",
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            body,
          };
        } catch (error: any) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          throw new Error(error.message);
        }
      },
      invalidatesTags: (result, error, body) =>
        error ? [] : [{ type: "Users", id: "LIST" }],
    }),
    updateUser: build.mutation<any, { id: string; body: any }>({
      query(data) {
        return {
          url: `users/${data.id}`,
          method: "PUT",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          body: data.body,
        };
      },
      invalidatesTags: (result, error, data) =>
        error ? [] : [{ type: "Users", id: data.id }],
    }),
    // eslint-disable-next-line @typescript-eslint/ban-types
    deletePost: build.mutation<{}, string>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Users", id }],
    }),
  }),
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeletePostMutation,
} = usersApi;
