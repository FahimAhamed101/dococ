import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface RegisterResponse {
  message: string;
  // Add other response fields as needed
}

interface RegisterRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  callingCode: string;
  phoneNumber: number;
  address: string;
  email: string;
  password: string;
}

interface LoginResponse {
  code: number;
  message: string;
  data: {
    attributes: {
      user: {
        // User data fields
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        // Add other user fields as needed
      };
      tokens: {
        access: {
          token: string;
          expires: string;
        };
        refresh: {
          token: string;
          expires: string;
        };
      };
    };
  };
}
interface UserProfileResponse {
  code: number;
  message: string;
  data: {
    attributes: {
      user: {
        id: string;
        firstName: string;
        lastName: string;
        fullName: string;
        email: string;
        dateOfBirth: string;
        profileImage: string;
        height: { value: number | null; unit: string };
        weight: { value: number | null; unit: string };
        gender?: string;
      };
    };
  };
}

interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  height?: number;
  weight?: number;
  gender?: string;
}


interface LoginRequest {
  email: string;
  password: string;
}
interface LogoutResponse {
  code: number;
  message: string;
}
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    getProfile: builder.query<UserProfileResponse, void>({
      query: () => '/users/self/in',
    }),
    updateProfile: builder.mutation<UserProfileResponse, UpdateProfileRequest>({
      query: (body) => ({
        url: '/users/self/update',
        method: 'PUT',
        body,
      }),
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  
    // Add other endpoints as needed here
  }),
});

// Export all hooks at once
export const { 
  useLoginMutation, 
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,useLogoutMutation
} = authApi;