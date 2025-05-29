"use client";
import MainContainer from "@/components/Shared/MainContainer/MainContainer";
import CustomBreadcrumb from "@/components/UI/CustomBreadcrumb";
import { HomeOutlined } from "@ant-design/icons";
import React from "react";

const MyAppointment: React.FC = () => {
  const breadcrumbItems = [
    {
      href: "/",
      title: (
        <div className="flex gap-2 items-center">
          <HomeOutlined />
          <span>Home</span>
        </div>
      ),
    },
    {
      href: "/my-appointment",
      title: "My Appointment",
    },
    {
      title: "Complete Appointment",
    },
    {
      title: "Prescription document",
    },
  ];

  return (
    <section className="w-full px-5 py-10 bg-[#F1F9FF] min-h-screen">
      <MainContainer className="flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <CustomBreadcrumb items={breadcrumbItems}  />
          
          <h2 className="text-3xl font-semibold text-gray-800 text-center mt-8 mb-10">
            My Appointment
          </h2>

          <div className="flex justify-center">
            <div className="w-full max-w-6xl">
              <div className="bg-transparent rounded-lg border border-[#77C4FE] p-10 mb-8 shadow-sm">
                <div className="border-b border-[#77C4FE] pb-4 grid grid-cols-4 ">
                  <span className="font-medium text-gray-700">Doctor Name:</span>
                  <span className="text-gray-900">Bashar Islam</span>
                </div>
                <div className="border-b border-[#77C4FE] py-4 grid grid-cols-4 ">
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="text-gray-900">David John</span>
                </div>
                <div className="border-b border-[#77C4FE] py-4 grid grid-cols-4 ">
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="text-gray-900">DavidJohn@gmail.com</span>
                </div>
                   <div className="border-b border-[#77C4FE] py-4 grid grid-cols-4 ">
                  <span className="font-medium text-gray-700">Phone Number:</span>
                  <span className="text-gray-900">313613131</span>
                </div>
                   <div className="border-b border-[#77C4FE] py-4 grid grid-cols-4 ">
                  <span className="font-medium text-gray-700">Address:</span>
                  <span className="text-gray-900">Dhaka Bangladesh</span>
                </div>
                     <div className="border-b border-[#77C4FE] py-4 grid grid-cols-4 ">
                  <span className="font-medium text-gray-700">Reason for Visit:</span>
                  <span className="text-gray-900">New Patient </span>
                </div>
                     <div className="border-b border-[#77C4FE] py-4 grid grid-cols-4 ">
                  <span className="font-medium text-gray-700">Department:</span>
                  <span className="text-gray-900">Neurology </span>
                </div>
                 <div className="border-b border-[#77C4FE] py-4 grid grid-cols-4 ">
                  <span className="font-medium text-gray-700">Preferred Time:</span>
                  <span className="text-gray-900">08.00 AM</span>
                </div>
                 <div className="border-b border-[#77C4FE] py-4 grid grid-cols-4 ">
                  <span className="font-medium text-gray-700">Preferred Date:</span>
                  <span className="text-gray-900">12/12/2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
};

export default MyAppointment;