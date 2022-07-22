import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "store";
import type { MediaResponses, Media } from "./media";

export interface EventAttributes {
  id: number;
  attributes: {
    Title: string;
    Description: string;
    resident: number;
    Photos?: MediaResponses
    Songs?: MediaResponses
  };
}

export interface EventResponse {
  data: EventAttributes;
}

export interface EventResponses {
    data: EventAttributes[];
  }

export interface EventRequest {
  data: {
    Title: string;
    Description?: string;
    resident: number;
    
  };
}

export interface Event {
  Title: string;
  resident: number;
  Description: string;
  id?: number
  Photos?: Media[]
  Songs?: Media[]
}

export const eventApi = createApi({
  reducerPath: "eventApi",
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
  tagTypes: ["Event"],
  endpoints: (build) => ({
    createEvent: build.mutation<EventResponse, Partial<EventRequest>>({
      query: (body) => ({
        url: "/api/events",
        method: "POST",
        body,
        responseHandler: (response) => response.json(),
      }),
    }),
    getEvent: build.query<EventResponse, number>({
      query: (id) => ({
        url: `/api/events/${id}`,
        method: "GET",

        responseHandler: (response) => response.json(),
      }),
    }),

    getEvents: build.query<EventResponses, void>({
      query: () => ({
        url: "/api/events?populate=*",
        method: "GET",

        responseHandler: (response) => response.json(),
      }),
    }),

    updateEvent: build.mutation<EventResponse, number>({
      query: (id) => ({
        url: `/api/events/${id}`,
        method: "PUT",

        responseHandler: (response) => response.json(),
      }),
    }),

    deleteEvent: build.mutation<EventResponse, number>({
      query: (id) => ({
        url: `/api/events/${id}`,
        method: "DELETE",

        responseHandler: (response) => response.json(),
      }),
    }),
  }),
});

export const {
  useCreateEventMutation,
  useDeleteEventMutation,
  useGetEventQuery,
  useGetEventsQuery,
  useUpdateEventMutation,
} = eventApi;
