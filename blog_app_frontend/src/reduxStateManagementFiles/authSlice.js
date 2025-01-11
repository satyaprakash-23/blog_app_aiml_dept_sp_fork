import  {createSlice} from "@reduxjs/toolkit";

/*
avatarUrl: null,
createdAt: null,
email: null,
enrollment: null,
isAdmin: null,
name: null,
updatedAt: null,
__v: null,
_id: null,
*/

const initialState = {
    isLoggedIn: false,
    userData: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload; 
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;