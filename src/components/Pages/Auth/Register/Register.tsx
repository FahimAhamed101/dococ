"use client";
import Image from "next/image";
import { Form, Checkbox, DatePicker, Select, message } from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import logo from "@/assets/logo/logo.png";
import nurseImage from "@/assets/hero-section/nurse.png";
import circle from "@/assets/hero-section/circle.png";
import MainContainer from "@/components/Shared/MainContainer/MainContainer";
import CustomLoadingButton from "@/components/UI/CustomLoadingButton";
import React, { useState } from "react";
import CustomInput from "@/components/UI/CustomInput";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";

const { Option } = Select;

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  dateOfBirth: Dayjs;
  callingCode: string;
  phoneNumber: number;
  address: string;
  email: string;
  password: string;
  terms?: boolean;
}

interface ApiError {
  data?: {
    message?: string;
    errors?: Record<string, string[]>;
  };
  message?: string;
}

interface RegisterResponse {
  message: string;
  // Add other response properties as needed
}

const Register: React.FC = () => {
  const [form] = Form.useForm<RegisterFormValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const [register] = useRegisterMutation();
  const router = useRouter();

  const onFinish = async (values: RegisterFormValues) => {
    try {
      setLoading(true);
      
      const formattedValues = {
        ...values,
        dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
        phoneNumber: Number(values.phoneNumber)
      };

      const response = await register(formattedValues).unwrap() as RegisterResponse;
      
      message.success(response.message || 'Registration successful!');
      router.push('/login');
    } catch (error: unknown) {
      const err = error as ApiError;
      message.error(err.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordRules = [
    { required: true, message: 'Please input your password!' },
    { min: 8, message: 'Password must be at least 8 characters!' },
    { pattern: /[A-Z]/, message: 'Must contain at least one uppercase letter!' },
    { pattern: /[a-z]/, message: 'Must contain at least one lowercase letter!' },
    { pattern: /[0-9]/, message: 'Must contain at least one number!' },
    { pattern: /[^A-Za-z0-9]/, message: 'Must contain at least one special character!' },
  ];

  return (
    <section className="w-full h-full px-5 py-10">
      <MainContainer className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-white">
        <div>
          <div className="space-y-2">
            <div className="size-[80px] relative mx-auto md:mx-0">
              <Image fill src={logo} alt="logo" />
            </div>
            <h2 className="text-3xl font-semibold">Create an Account</h2>
            <p className="text-gray-500">
              Hello there, Let&apos;s start your journey with us.
            </p>
          </div>
          <Form<RegisterFormValues>
            form={form}
            name="register"
            onFinish={onFinish}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mt-5"
            layout="vertical"
            scrollToFirstError
          >
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: "Please input your first name!" }]}
            >
              <CustomInput icon={UserOutlined} placeholder="Enter your first name" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: "Please input your last name!" }]}
            >
              <CustomInput icon={UserOutlined} placeholder="Enter your last name" />
            </Form.Item>

            <Form.Item
              name="dateOfBirth"
              label="Date of Birth"
              rules={[{ required: true, message: "Please select your date of birth!" }]}
            >
              <DatePicker 
                className="w-full"
                placeholder="Select your date of birth"
                disabledDate={(current) => {
                  return current && current > dayjs().endOf('day');
                }}
              />
            </Form.Item>

            <Form.Item
              name="callingCode"
              label="Country Code"
              initialValue="+880"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="+880">+880 (Bangladesh)</Option>
                <Option value="+1">+1 (USA)</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
                { pattern: /^[0-9]+$/, message: "Please enter a valid phone number!" },
              ]}
            >
              <CustomInput
                icon={PhoneOutlined}
                placeholder="Enter your phone number"
                type="number"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
              className="md:col-span-2"
            >
              <CustomInput icon={MailOutlined} placeholder="Enter your Email" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please input your Address!" }]}
              className="md:col-span-2"
            >
              <CustomInput icon={HomeOutlined} placeholder="Enter your Address" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={passwordRules}
              className="md:col-span-2"
            >
              <CustomInput
                icon={LockOutlined}
                isPassword={true}
                placeholder="Enter your Password"
              />
            </Form.Item>

            <Form.Item
             
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('You must accept the terms')),
                },
              ]}
              className="col-span-full"
            >
              <Checkbox>
                I accept the Terms of Service and Privacy Policy
              </Checkbox>
            </Form.Item>

            <Form.Item className="col-span-full">
              <CustomLoadingButton loading={loading}>
                Sign Up
              </CustomLoadingButton>
            </Form.Item>
          </Form>
          <p className="text-gray-500 mt-5 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Login
            </Link>
          </p>
          <div className="w-full flex justify-center items-center gap-2 mt-5">
            <div className="w-full h-[1px] bg-gray-800"></div>
            <div className="w-full">
              <h1 className="text-center">Or login with</h1>
            </div>
            <div className="w-full h-[1px] bg-gray-800"></div>
          </div>
          <div className="mt-5">
            <div className="size-14 mx-auto border border-[#C0E4FF] rounded-full flex justify-center items-center">
              <FcGoogle size={28} />
            </div>
          </div>
        </div>

        <div className="w-full h-[950px] bg-[#C0E4FF] rounded-xl hidden sm:flex justify-center items-center relative order-first md:order-last">
          <img
            src={circle.src}
            alt="Decorative circle background"
            className="w-[400px] sm:w-[450px] md:w-[480px] xl:w-[500px] -mr-14 md:-mr-16 xl:-mr-20 2xl:-mr-28"
          />
          <img
            src={nurseImage.src}
            alt="Nurse illustration"
            className="h-[350px] sm:h-[390px] md:h-[400px] xl:h-[470px] 2xl:h-[500px] bottom-0 absolute"
          />
        </div>
      </MainContainer>
    </section>
  );
};

export default Register;