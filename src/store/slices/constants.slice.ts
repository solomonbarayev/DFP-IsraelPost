import { createSlice } from "@reduxjs/toolkit";

const initialState = { USER_ROLES: { ADMIN: "ADMIN", USER: "USER", FORM_USER: "FORM_USER" }, EXTENSION_MINUTES: 30 };
const constants = createSlice({
  name: "constants",
  initialState,
  reducers: {
    setConstants: (state, action) => {
      state.USER_ROLES = action.payload?.USER_ROLES;
      state.EXTENSION_MINUTES = action.payload?.EXTENSION_MINUTES;
    },
  },
});

export const { setConstants } = constants.actions;
export default constants.reducer;
