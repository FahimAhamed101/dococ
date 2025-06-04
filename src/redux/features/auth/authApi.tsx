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
interface TeamMemberDetailsResponse {
  code: number;
  message: string;
  data: {
    attributes: {
      team: TeamMember;
      scheduleList: Array<{
        dayOfWeek: string;
        startTime: string;
        endTime: string;
        timezone: string;
      }>;
    };
  };
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
interface ForgotPasswordResponse {
  code: number;
  message: string;
  data: {
    attributes: {
      oneTimeCode: number;
    };
  };
}

interface LoginRequest {
  email: string;
  password: string;
}
interface LogoutResponse {
  code: number;
  message: string;
}
interface ForgotPasswordRequest {
  email: string;
}
interface VerifyEmailRequest {
  email: string;
  code: string;
}

interface VerifyEmailResponse {
  code: number;
  message: string;
  // Add other response fields as needed
}
interface ResetPasswordRequest {
  email: string;
  password: string;
}

interface ResetPasswordResponse {
  code: number;
  message: string;
}
// Update your TeamMember interface to be more specific
interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  designation: string;
  specialties: string;
  about: string;
  callingCode: string;
  phoneNumber: number;
  email: string;
  profileImage: string;
  media: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    X?: string;
  };
  degrees: Array<{
    school: string;
    degree: string;
    subject: string;
    grade?: string;
    startDate?: string;
    endDate?: string;
    skills?: string[];
    status?: string;
    _id?: string;
  }>;
  experience: Array<{
    title: string;
    employmentType: string;
    company: string;
    location: string;
    startDate?: string;
    endDate?: string;
    description: string | null;
    profileHeadline: string | null;
    skills?: string[];
    status?: string;
    _id?: string;
  }>;
  achievements: Array<{
    title: string;
    description: string;
    date?: string;
    status?: string;
    _id?: string;
  }>;
  createdAt?: string;
  createdBy?: {
    fullName: string;
    email: string;
    profileImage: string;
    id: string;
  };
}

interface ContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  message: string;
}

interface ContactResponse {
  code: number;
  message: string;
}

interface TeamMembersResponse {
  code: number;
  message: string;
  data: {
    attributes: {
      results: TeamMember[];
      page: number;
      limit: number;
      totalPages: number;
      totalResults: number;
    };
  };
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  createdAt?: string;
}

interface FaqResponse {
  code: number;
  message: string;
  data: {
    attributes: {
      results: FaqItem[];
      page: number;
      limit: number;
      totalPages: number;
      totalResults: number;
    };
  };
}

interface ChatBotRequest {
  model: string;
  prompt: string;
}

interface ChatBotResponse {
  code: number;
  message: string;
  data: {
    attributes: {
      candidates: Array<{
        content: {
          parts: Array<{
            text: string;
          }>;
          role: string;
        };
        finishReason: string;
        citationMetadata?: {
          citationSources: Array<{
            startIndex: number;
            endIndex: number;
            uri: string;
          }>;
        };
        avgLogprobs?: number;
      }>;
      usageMetadata: {
        promptTokenCount: number;
        candidatesTokenCount: number;
        totalTokenCount: number;
        promptTokensDetails: Array<{
          modality: string;
          tokenCount: number;
        }>;
        candidatesTokensDetails: Array<{
          modality: string;
          tokenCount: number;
        }>;
      };
      modelVersion: string;
      responseId: string;
    };
  };
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
  forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (email) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: email ,headers: {
      'Content-Type': 'application/json',
    },
      }),
    }),
verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
  query: (credentials) => ({
    url: '/auth/verify-email',
    method: 'POST',
    body: credentials,headers: {
      'Content-Type': 'application/json',
    },
  }),
}),
resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
  query: (credentials) => ({
    url: '/auth/reset-password',
    method: 'POST',
    body: credentials,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
}),


    getTeamMembers: builder.query<TeamMembersResponse, { page?: number; limit?: number; email?: string }>({
      query: ({ page = 1, limit = 10, email = '' }) => ({
        url: '/team/member/all',
        params: {
          sortBy: 'createdAt:desc',
          email,
          page,
          limit,
        },
      }),
    }), 
    getTeamMemberDetails: builder.query<TeamMemberDetailsResponse, string>({
  query: (memberId) => `/team/member/${memberId}`,
}),

contactUs: builder.mutation<ContactResponse, ContactRequest>({
  query: (contactData) => ({
    url: '/contact',
    method: 'POST',
    body: contactData,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
}),
getFaqs: builder.query<FaqResponse, { page?: number; limit?: number }>({
  query: ({ page = 1, limit = 10 } = {}) => ({
    url: '/faq',
    params: {
      page,
      limit,
    },
  }),
}),
chatWithBot: builder.mutation<ChatBotResponse, ChatBotRequest>({
      query: (body) => ({
        url: '/gemini/conversation',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
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
  useUpdateProfileMutation,useChatWithBotMutation,useGetFaqsQuery,useLogoutMutation,useContactUsMutation,useForgotPasswordMutation,useVerifyEmailMutation,useResetPasswordMutation,useGetTeamMembersQuery,useGetTeamMemberDetailsQuery
} = authApi;