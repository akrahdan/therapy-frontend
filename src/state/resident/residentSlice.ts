import { createSlice } from "@reduxjs/toolkit";

import { Resident, residentApi } from "services/resident";
import { RootState } from "store";

type ResidentState = {
  resident: Resident | null;
  residents: Resident[];
};

const initialState = { resident: null, residents: [] };

const residentSlice = createSlice({
  name: "resident",
  initialState: initialState as ResidentState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        residentApi.endpoints.createResident.matchFulfilled,
        (state, { payload }) => {
          state.resident = payload.data.attributes;
          state.resident.id = payload.data.id;
          state.residents = [...state.residents, state.resident];
        }
      )
      .addMatcher(
        residentApi.endpoints.updateResident.matchFulfilled,
        (state, { payload }) => {
          state.resident = payload.data.attributes;
          state.resident.id = payload.data.id;
        }
      )
      .addMatcher(
        residentApi.endpoints.getResident.matchFulfilled,
        (state, { payload }) => {
          state.resident = payload.data.attributes;
          state.resident.id = payload.data.id;
        }
      )
      .addMatcher(
        residentApi.endpoints.deleteResident.matchFulfilled,
        (state, { payload }) => {
          state.residents = state.residents.filter(
            (resident) => resident.id != payload.data.id
          );
          state.resident = payload.data.attributes;
          state.resident.id = payload.data.id;
        }
      )
      .addMatcher(
        residentApi.endpoints.getResidents.matchFulfilled,
        (state, { payload }) => {
          const residents = payload.data.map((res) => {
            return {
              id: res.id,
              ResidentId: res.attributes.ResidentId,
              RoomNo: res.attributes.RoomNo,
            };
          });
          state.residents = residents;
        }
      );
  },
});

export default residentSlice.reducer;

export const selectResident = (state: RootState) => state.resident.resident;
export const selectResidents = (state: RootState) => state.resident.residents;
