import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "store";
import type { Event } from "./event";

export interface ResidentRequest {
  data: {
    ResidentId: string;
    RoomNo: string;
  };
}

export interface Resident {
  ResidentId: string;
  RoomNo: string;
  id?: number;
}

export interface ResidentAttributes {
  id: number;
  attributes: {
    ResidentId: string;
    RoomNo: string;
    events?: Event[];
  };
}
export interface ResidentResponse {
  data: ResidentAttributes
}

export interface ResidentResponses {
  data: ResidentAttributes[];
}

export const residentApi = createApi({
  reducerPath: "residentApi",
  baseQuery: fetchBaseQuery({
    baseUrl:  process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as RootState).auth.token || localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Resident"],
  endpoints: (build) => ({
    createResident: build.mutation<ResidentResponse, Partial<ResidentRequest>>({
      query: (body) => ({
        url: "/api/residents",
        method: "POST",
        body,
        responseHandler: (response) => response.json(),
      }),
    }),
    getResident: build.query<ResidentResponse, number>({
      query: (id) => ({
        url: `/api/residents/${id}`,
        method: "GET",

        responseHandler: (response) => response.json(),
      }),
    }),

    getResidents: build.query<ResidentResponses, void>({
      query: () => ({
        url: "/api/residents",
        method: "GET",

        responseHandler: (response) => response.json(),
      }),
    }),

    updateResident: build.mutation<ResidentResponse, number>({
      query: (id) => ({
        url: `/api/residents/${id}`,
        method: "DELETE",

        responseHandler: (response) => response.json(),
      }),
    }),

    deleteResident: build.mutation<ResidentResponse, number>({
      query: (id) => ({
        url: `/api/residents/${id}`,
        method: "DELETE",

        responseHandler: (response) => response.json(),
      }),
    }),
  }),
});

export const {
  useCreateResidentMutation,
  useDeleteResidentMutation,
  useGetResidentQuery,
  useGetResidentsQuery,
  useUpdateResidentMutation,
} = residentApi;
