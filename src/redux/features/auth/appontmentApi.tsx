// src/redux/features/appointment/appointmentApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface BookAppointmentRequest {
  doctor?: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientAge: number;
  patientGender: 'male' | 'female' | 'other';
  patientAddress: string;
  visitType: 'Old Patient Visit' | 'New Patient Visit' | 'Specific Concern' | 'other';
  department: string;
  bodyPart?: string;
  date: string;
  timeSlot: string;
  reason?: string;
}

interface BookAppointmentResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    // other appointment fields
  };
}

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
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
  tagTypes: ['Appointment'],
  endpoints: (builder) => ({
    bookAppointment: builder.mutation<BookAppointmentResponse, BookAppointmentRequest>({
      query: (body) => ({
        url: '/appointment/book',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Appointment'],
    }),
  }),
});

export const { useBookAppointmentMutation } = appointmentApi;