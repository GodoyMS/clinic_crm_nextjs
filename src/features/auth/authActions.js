/**
 

import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = process.env.backendURL
// const backendURL = 'http://127.0.0.1:5000'

export const userLogin = createAsyncThunk(
  'v1/signin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',       },
      }

      const { data } = await axios.post(
              `${backendURL}/api/v1/clinic/signin`,  { email, password },{withCredentials: 'include'})
              console.log(data)
      

      // store user's token in local storage
      return data;

    } catch (error) { 
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const registerUser = createAsyncThunk(
  'v1/signup',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept':'application/json',
          'withCredentials':'true'
        },
      }

      await axios.post( `${backendURL}/api/v1/clinic/signup`,   { username, email, password },{withCredentials: true})
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const userLogout = createAsyncThunk(
  'v1/signout',
  async () => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept':'application/json',
          'withCredentials':'true'
        },
      }

      const { data } = await axios.get(`${backendURL}/api/v1/clinic/signout`,{withCredentials:'include'})

      // store user's token in local storage

      return data
    } catch (error) {
      console.log(error)
      
    }
  }
)

export const  fetchUserData = createAsyncThunk(
  'v1/clinic/currentUser',
  async ( { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept':'application/json',
          'withCredentials':'true'
        },
      }
      const response = await axios.get(`${backendURL}/api/v1/clinic/currentUser`,{withCredentials: true});
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data);
    }
  }
);
 */