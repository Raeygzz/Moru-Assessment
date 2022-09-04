import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../services/axios/Api";

// usersListApi GET
export const usersListApi = createAsyncThunk(
  "users/usersListApi",
  async (obj, { dispatch, getState, rejectWithValue }) => {
    try {
      const { data, status } = await api.usersList();

      if (status === 200) {
        data.filter((obj, index) => {
          obj.img = require(`../../assets/images/${index + 1}.png`);
          obj.favorite = false;
        });

        return data;
      }
      //
    } catch (error) {
      console.log(`error.response: ==> `, error.response);

      return rejectWithValue();
    }
  }
);

// initial state
const initialState = {
  usersList: [],
};

// usersListSlice
const usersListSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // setUserList action
    setUserList: (state, { payload }) => {
      state.usersList = payload;
    },

    // resetStore action
    resetStore: (state, { payload }) => {
      state.usersList = [];
    },
  },
  extraReducers: {
    // usersListApi
    [usersListApi.pending]: (state, { payload }) => {
      // console.log("pending");
    },
    [usersListApi.fulfilled]: (state, { payload }) => {
      // console.log("fulfilled");
      state.usersList = payload;
    },
    [usersListApi.rejected]: (state, { payload }) => {
      // console.log("rejected");
    },
  },
});

export const { setUserList, resetStore } = usersListSlice.actions;

export default usersListSlice.reducer;
