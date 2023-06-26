/*
import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  userLogin,
  fetchUserData,
  userLogout,
} from "./authActions";

const auth =
  typeof window !== "undefined" && localStorage.getItem("auth")
    ? typeof window !== "undefined" && localStorage.getItem("auth")
    : false;

const patientsInitialState =
typeof window !== "undefined" && localStorage.getItem("patients")
? typeof window !== "undefined" &&  JSON.parse(localStorage.getItem("patients"))
: []


const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  authorization: auth,
  patients: patientsInitialState,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.error = null;
      typeof window !== "undefined" && localStorage.removeItem("auth"); // delete token from storage
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
    updateCredentials: (state, { payload }) => {
      state.userInfo.user = payload;
    },
    setPatient:(state,action)=>{
      typeof window !== "undefined" && localStorage.setItem("patients",JSON.stringify([...state.patients,action.payload]));
      state.patients.push(action.payload)
    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.authorization = true;
        typeof window !== "undefined" && localStorage.setItem("auth", true);
      })
      .addCase(userLogin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; //
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(fetchUserData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
      })
      .addCase(fetchUserData.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.authorization = false; //As  pollingInterval: 900000,each 15 min it's getting a fetchUserData get request. Thus, if cookie is expired,user session will end
        typeof window !== "undefined" && localStorage.removeItem("auth"); // delete auth
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = null;
        state.authorization = false;
        typeof window !== "undefined" && localStorage.removeItem("auth"); // delete auth
      })
      .addCase(userLogout.rejected, (state, { payload }) => {
        //
      });
  },
});

export const { logout, setCredentials, updateCredentials,setPatient } = authSlice.actions;

export default authSlice.reducer;

*/