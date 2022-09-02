import { configureStore, combineReducers } from "@reduxjs/toolkit";
import Logger from "redux-logger";

import UsersReducer from "./features/UsersSlice";

//combine reducer
const combinedReducer = combineReducers({
  users: UsersReducer,
});

// root reducer
const rootReducer = (state, action) => {
  // store reset
  if (action.type === "users/resetStore") {
    state = undefined;
  }

  return combinedReducer(state, action);
};

//store configure
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(Logger),
});

export default store;
