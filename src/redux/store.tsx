import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './features/auth/authApi';
import { blogApi } from "./features/blog/blogApi"
import { appointmentApi } from './features/auth/appontmentApi';
import authReducer from "./features/auth/authSlice";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,auth: authReducer,[appointmentApi .reducerPath]: appointmentApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,blogApi.middleware)
    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;