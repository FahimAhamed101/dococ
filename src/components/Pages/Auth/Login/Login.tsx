"use client";
import Image from "next/image";
import { Form, Checkbox } from "antd";
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

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: LoginFormValues) => {
    setLoading(true);
    setTimeout(() => {
      console.log("Received values from form: ", values);
      setLoading(false);
    }, 2000);
  };

  return (
    <section className="w-full min-h-screen bg-white">
      <MainContainer className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* Left side: Form - Full height */}
        <div className="flex flex-col justify-center p-8 lg:p-12 xl:p-16">
          <div className="space-y-4 max-w-md w-full mx-auto">
            <div className="size-[80px] relative mx-auto md:mx-0">
              <Image fill src={logo} alt="logo" priority />
            </div>
            <h2 className="text-3xl font-semibold">Welcome back!</h2>
            <p className="text-gray-500">Please enter your details</p>

            <Form<LoginFormValues>
              name="login"
              onFinish={onFinish}
              className="space-y-4 mt-6"
              layout="vertical"
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <CustomInput
                  icon={MailOutlined}
                  placeholder="Enter your Email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <CustomInput
                  icon={LockOutlined}
                  isPassword={true}
                  placeholder="Enter your Password"
                />
              </Form.Item>

              <div className="flex justify-between items-center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Link href="/forgot-password">
                  <h1 className="underline">Forgot Password</h1>
                </Link>
              </div>

              <Form.Item>
                <CustomLoadingButton loading={loading} className="w-full">
                  Login
                </CustomLoadingButton>
              </Form.Item>
            </Form>

            <p className="text-gray-500 mt-4 text-center">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-500">
                Sign up
              </Link>
            </p>

            <div className="w-full flex justify-center items-center gap-2 mt-6">
              <div className="w-full h-[1px] bg-gray-300"></div>
              <span className="text-gray-500 text-sm whitespace-nowrap px-2">Or login with</span>
              <div className="w-full h-[1px] bg-gray-300"></div>
            </div>

            <div className="mt-6 flex justify-center">
              <button className="size-14 border border-gray-300 rounded-full flex justify-center items-center hover:bg-gray-50 transition-colors">
                <FcGoogle size={28} />
              </button>
            </div>
          </div>
        </div>

        {/* Right side: Image - Full height */}
        <div className="hidden lg:flex bg-[#C0E4FF] relative h-full w-full">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <Image
              src={circle}
              alt="Background circle"
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