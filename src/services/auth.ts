import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { RootState } from "store";
export interface LoginRequest {
    identifier: string;
    password: string;
}

export interface User {
    email: string;
    username: string
}

export interface UserResponse  {
  user: User,
  jwt: string
}


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders:(headers, { getState}) => {
        const token =
            (getState() as RootState).auth.token || localStorage.getItem("token");
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
    
          headers.set("Content-Type", "application/json");
    
          return headers;
        },

    }),
    tagTypes: ["LoginRequest", "User", "UserResponse"],
    endpoints: build => ({
       login: build.mutation<UserResponse, Partial<LoginRequest>>({
        query: body => ({
            url: "/api/auth/local",
            method: "POST",
            body,
            responseHandler: response => response.json()
        })
       }),
       getCurrentUser: build.query<User, void>({
        query: () => ({
          url: "/api/users/me",
          method: "GET",
  
          responseHandler: (response) => response.json(),
        }),
      }),
    })
});

export const { getCurrentUser} = authApi.endpoints;

export const {
  useLoginMutation,
  useGetCurrentUserQuery
} = authApi