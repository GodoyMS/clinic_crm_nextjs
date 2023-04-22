import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'

import { authApi } from '@/service/authService'
import { loginApi } from '@/service/loginService'
const userStore = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,

  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,loginApi.middleware),
    
})

export default userStore