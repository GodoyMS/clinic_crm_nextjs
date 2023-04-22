import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.backendURL, credentials: 'include',
    
    // baseUrl: 'http://127.0.0.1:5000/',
    prepareHeaders: (headers, { getState }) => {
      
      const { auth } = getState();
      if (auth.token) {
        headers.set('Authorization', `Bearer ${auth.token}`);
      }
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      headers.set('withCredentials', 'true');
      
      
      return headers

    },
  }),
  endpoints: (build) => ({
    getUserInfo: build.query({
      query: () => ({
        url: '/api/v1/clinic/currentUser',
        method: 'GET',
      }),
    }),
  }),
})

// export react hook
export const { useGetUserInfoQuery } = authApi
