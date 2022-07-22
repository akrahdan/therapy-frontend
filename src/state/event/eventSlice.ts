import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { eventApi } from "services/event";
import type { Event } from "services/event";
import { RootState } from "store";

type EventState = {
  event: Event | null;
  events: Event[];
};

const convertResponseToMedia = (att) => {
  return {
    id: att.id,
    name: att.attributes?.name,
    width: att.attributes?.width,
    height: att.attributes?.height,
    mime: att.attributes?.mime,
    url: att.attributes?.url,
    thumbnail: att.attributes.formats?.thumbnail,
  };
};
const initialState = { event: null, events: [] };

const eventSlice = createSlice({
  name: "event",
  initialState: initialState as EventState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        eventApi.endpoints.createEvent.matchFulfilled,
        (state, { payload }) => {
          const event = {
            Title: payload.data.attributes.Title,
            resident: payload.data.attributes.resident,
            Description: payload.data.attributes.Description,
            id: payload.data.id,
            Photos: payload.data.attributes.Photos?.data.map((att) =>
              convertResponseToMedia(att)
            ),
            Songs: payload.data.attributes.Songs?.data.map((att) =>
              convertResponseToMedia(att)
            ),
          };
          state.event = event;
          state.events = [...state.events, state.event];
        }
      )
      .addMatcher(
        eventApi.endpoints.updateEvent.matchFulfilled,
        (state, { payload }) => {
          const event = {
            Title: payload.data.attributes.Title,
            resident: payload.data.attributes.resident,
            Description: payload.data.attributes.Description,
            id: payload.data.id,
            Photos: payload.data.attributes.Photos?.data.map(att => convertResponseToMedia(att)),
            Songs: payload.data.attributes.Songs?.data.map((att) =>
            convertResponseToMedia(att))
          
          }
          state.event = event;
        }
      )
      .addMatcher(
        eventApi.endpoints.getEvent.matchFulfilled,
        (state, { payload }) => {
          const event = {
            Title: payload.data.attributes.Title,
            resident: payload.data.attributes.resident,
            Description: payload.data.attributes.Description,
            id: payload.data.id,
            Photos: payload.data.attributes.Photos?.data.map(att => convertResponseToMedia(att)),
            Songs: payload.data.attributes.Songs?.data.map((att) =>
            convertResponseToMedia(att))
          
          }
          state.event = event
        }
      )
      .addMatcher(
        eventApi.endpoints.deleteEvent.matchFulfilled,
        (state, { payload }) => {
          state.events = state.events?.filter(
            (event) => event.id != payload.data.id
          );
        }
      )
      .addMatcher(
        eventApi.endpoints.getEvents.matchFulfilled,
        (state, { payload }) => {
          const events = payload.data.map((res) => {
            return {
              id: res.id,
              Title: res.attributes.Title,
              Description: res.attributes.Description,
              Photos: res.attributes.Photos?.data.map(att => convertResponseToMedia(att)),
              Songs: res.attributes.Songs?.data.map((att) =>
              convertResponseToMedia(att)),
              resident: res.attributes.resident,
            };
          });
          state.events = events;
        }
      );
  },
});

export default eventSlice.reducer;

export const selectEvent = (state: RootState) => state.event.event;
export const selectEvents = (state: RootState) => state.event.events;
