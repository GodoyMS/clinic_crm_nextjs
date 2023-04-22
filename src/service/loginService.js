import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.backendURL, credentials: 'include',

    // baseUrl: 'http://127.0.0.1:5000/',
    prepareHeaders: (headers, { getState }) => {

      headers.set('Content-Type', 'application/json');    
      return headers
    },
  }),
  endpoints: (builder) => ({
 
    login: builder.query({
        query: (credentials) => ({
          url: '/api/v1/clinic/signin',
          method: 'POST',
          body: credentials,
      }),
    }),
  }),
})

// export react hook
export const { useLoginQuery  } = loginApi
