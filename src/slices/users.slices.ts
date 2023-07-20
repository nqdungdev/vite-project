import { createSlice } from "@reduxjs/toolkit";

interface UsersState {}

const initialState: UsersState = {};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

const usersReducer = usersSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = usersSlice.actions;
export default usersReducer;
