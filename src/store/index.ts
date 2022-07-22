import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import { authApi } from "services/auth";
import { mediApi } from "services/media";
import { residentApi } from "services/resident";
import { eventApi } from "services/event";
import eventReducer from "state/event/eventSlice";
import residentReducer from "state/resident/residentSlice";

import authReducer from 'state/auth/authSlice';
export const store = configureStore({
    reducer: {
      auth: authReducer,
      event: eventReducer,
      resident: residentReducer,
      [eventApi.reducerPath]: eventApi.reducer,
      [residentApi.reducerPath]: residentApi.reducer,
      [mediApi.reducerPath]: mediApi.reducer,
      [authApi.reducerPath]: authApi.reducer
    },
    middleware: getDefaultMiddleware => 
     getDefaultMiddleware().concat(authApi.middleware)
});

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//  ReturnType, 
//  RootState,
//  unknown,
//  Action<string>
//  >;