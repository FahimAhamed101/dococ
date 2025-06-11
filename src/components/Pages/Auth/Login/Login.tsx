"use client";
import Image from "next/image";
import { Form, Checkbox, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import logo from "@/assets/logo/logo.png";
import nurseImage from "@/assets/hero-section/nurse.png";
import circle from "@/assets/hero-section/circle.png";
import MainContainer from "@/components/Shared/MainContainer/MainContainer";
import CustomLoadingButton from "@/components/UI/CustomLoadingButton";
import React, { useState } from "react";
import CustomInput from "@/components/UI/CustomInput";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import type { FieldData } from 'rc-field-form/lib/interface';

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

interface ApiError {
  data?: {
    message?: string;
    errors?: Record<string, string[]>;
  };
  message?: string;
}






const Login: React.FC = () => {
  const [form] = Form.useForm<LoginFormValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const onFinish = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      
      const response = await login({
        email: values.email,
        password: values.password
      }).unwrap();

      if (response.code === 200) {
        message.success(response.message);
        
        dispatch(setCredentials({
          user: response.data.attributes.user,
          tokens: response.data.attributes.tokens,
          isAuthenticated: true
        }));

        if (values.remember) {
          localStorage.setItem('accessToken', response.data.attributes.tokens.access.token);
          localStorage.setItem('refreshToken', response.data.attributes.tokens.refresh.token);
        } else {
          sessionStorage.setItem('accessToken', response.data.attributes.tokens.access.token);
          sessionStorage.setItem('refreshToken', response.data.attributes.tokens.refresh.token);
        }

        router.push('/');
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      
      if (err.data?.errors) {
        const fieldErrors = err.data.errors;
        const formattedErrors: FieldData[] = Object.keys(fieldErrors)
          .filter((field): field is keyof LoginFormValues => 
            ['email', 'password', 'remember'].includes(field)
          )
          .map(field => ({
            name: field,
            errors: fieldErrors[field],
          }));
        
        form.setFields(formattedErrors);
        
        if (fieldErrors.password) {
          message.error(fieldErrors.password[0] || 'Invalid password');
        } else if (fieldErrors.email) {
          message.error(fieldErrors.email[0] || 'Invalid email');
        } else {
          message.error('Validation failed. Please check your inputs.');
        }
      } else {
        const errorMessage = err.data?.message || 
                            err.message || 
                            'Login failed. Please try again.';
        message.error(errorMessage);
      }
      
      form.setFieldsValue({ password: '' });
    } finally {
      setLoading(false);
    }
  };

  const passwordRules = [
    { required: true, message: 'Please input your password!' },
  
   // { pattern: /[A-Z]/, message: 'Must contain at least one uppercase letter!' },
   // { pattern: /[a-z]/, message: 'Must contain at least one lowercase letter!' },
   // { pattern: /[0-9]/, message: 'Must contain at least one number!' },
   // { pattern: /[^A-Za-z0-9]/, message: 'Must contain at least one special character!' },
  ];

  return (
    <section className="w-full min-h-screen bg-white">
      <MainContainer className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <div className="flex flex-col justify-center p-8 lg:p-12 xl:p-16">
          <div className="space-y-4 max-w-md w-full mx-auto">
            <div className="size-[80px] relative mx-auto md:mx-0">
              <Image 
                src={logo} 
                alt="logo" 
                fill
                priority
                className="object-contain"
              />
            </div>
            <h2 className="text-3xl font-semibold">Welcome back!</h2>
            <p className="text-gray-500">Please enter your details</p>

            <Form<LoginFormValues>
              form={form}
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              className="space-y-4 mt-6"
              layout="vertical"
              autoComplete="off"
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { 
                    required: true, 
                    message: "Please input your email address!" 
                  },
                  { 
                    type: "email", 
                    message: "Please enter a valid email address!" 
                  },
                  {
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address!"
                  }
                ]}
                validateTrigger="onBlur"
              >
                <CustomInput
                  icon={MailOutlined}
                  placeholder="Enter your email"
                  type="email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={passwordRules}
                validateTrigger="onBlur"
              >
                <CustomInput
                  icon={LockOutlined}
                  isPassword={true}
                  placeholder="Enter your password"
                />
              </Form.Item>

              <div className="flex justify-between items-center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Link 
                  href="/forgot-password" 
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <Form.Item>
                <CustomLoadingButton 
                  loading={loading} 
                  className="w-full"
                >
                  Login
                </CustomLoadingButton>
              </Form.Item>
            </Form>

            <p className="text-gray-500 mt-4 text-center">
              Don&apos;t have an account?{" "}
              <Link 
                href="/register" 
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                Sign up
              </Link>
            </p>

            <div className="w-full flex justify-center items-center gap-2 mt-6">
              <div className="w-full h-[1px] bg-gray-300"></div>
              <span className="text-gray-500 text-sm whitespace-nowrap px-2">
                Or login with
              </span>
              <div className="w-full h-[1px] bg-gray-300"></div>
            </div>

            <div className="mt-6 flex justify-center">
              <button 
                type="button"
                className="size-14 border border-gray-300 rounded-full flex justify-center items-center hover:bg-gray-50 transition-colors"
                onClick={() => {
                  message.info("Google login coming soon!");
                }}
                aria-label="Login with Google"
              >
                <FcGoogle size={28} />
              </button>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex bg-[#C0E4FF] relative h-full w-full">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <Image
              src={circle}
              alt="Decorative background circle"
              className="object-contain w-full h-full"
              fill
              priority
            />
            <Image
              src={nurseImage}
              alt="Nurse illustration"
              className="object-contain absolute bottom-0 h-[70%]"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </MainContainer>
    </section>
  );
};

export default Login;