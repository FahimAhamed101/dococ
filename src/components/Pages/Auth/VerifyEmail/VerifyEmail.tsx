"use client";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";
import nurseImage from "@/assets/hero-section/nurse.png";
import circle from "@/assets/hero-section/circle.png";
import MainContainer from "@/components/Shared/MainContainer/MainContainer";
import CustomLoadingButton from "@/components/UI/CustomLoadingButton";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyEmailMutation } from "@/redux/features/auth/authApi";
import { message } from "antd";

// Define a type for the error response
interface ApiError {
  data?: {
    message?: string;
  };
  status?: number;
}

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState<string>("");
  const router = useRouter();
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const handleOtpChange = (otpValue: string) => {
    setOtp(otpValue);
  };

  const handleVerify = async () => {
    if (!email) {
      message.error("Email is required");
      return;
    }

    if (otp.length !== 6) {
      message.error("Please enter a 6-digit OTP");
      return;
    }

    try {
      const response = await verifyEmail({
        email,
        code: otp,
      }).unwrap();

      if (response.code === 200) {
        message.success(response.message || "Email verified successfully");
        router.push(`/reset-password?email=${email}`);
      }
    } catch (error: unknown) {
      // Use unknown instead of any and narrow down the type
      const apiError = error as ApiError;
      console.error("Verification error:", apiError);
      message.error(apiError.data?.message || "Failed to verify email. Please try again.");
    }
  };

  return (
    <section className="w-full h-full lg:h-screen flex justify-between items-center p-5">
      <MainContainer className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-white">
        {/* Left side: Form */}
        <div>
          <div className="space-y-2">
            <div className="size-[80px] relative mx-auto md:mx-0">
              <Image fill src={logo} alt="logo" />
            </div>
            <h2 className="text-3xl font-semibold">Verify Email!</h2>
            <p className="text-gray-500">Please check your email and enter the code</p>
          </div>

          {/* Full width OTP Input */}
          <div className="flex justify-center mt-5">
            <OTPInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
              containerStyle="otp-container"
              inputStyle={{
                width: "100%",
                maxWidth: "6.5rem",
                height: "3rem",
                margin: "0 0.5rem",
                fontSize: "2rem",
                fontWeight: "bold",
                borderBottom: "1px solid #4E4E4E",
                textAlign: "center",
                outline: "none",
              }}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <CustomLoadingButton onClick={handleVerify} loading={isLoading}>
              Verify
            </CustomLoadingButton>
          </div>

          {/* Resend Section */}
          <div className="mt-5 flex justify-between items-center">
            <span className="text-gray-600">Didn&apos;t receive code?</span>
            <Link href="/" className="underline">
              Resend
            </Link>
          </div>
        </div>

        {/* Right side: Nurse image and circle background */}
        <div className="w-full bg-[#C0E4FF] rounded-xl flex justify-center items-center relative order-first md:order-last">
          <img
            src={circle.src}
            alt=""
            className="w-[400px] sm:w-[450px] md:w-[480px] xl:w-[500px] -mr-14 md:-mr-16 xl:-mr-20 2xl:-mr-28"
          />
          <img
            src={nurseImage.src}
            alt=""
            className="h-[280px] sm:h-[320px] md:h-[310px] xl:h-[380px] 2xl:h-[410px] bottom-0 absolute"
          />
        </div>
      </MainContainer>
    </section>
  );
};

export default VerifyEmail;