"use client";
import MainContainer from "@/components/Shared/MainContainer/MainContainer";
import CustomBreadcrumb from "@/components/UI/CustomBreadcrumb";
import { HomeOutlined } from "@ant-design/icons";
import React from "react";

const MyAppointmentCompleted: React.FC = () => {
 

  const breadcrumbItems = [
    {
      href: "/",
      title: (
        <div className="flex gap-2">
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
    <section className="w-full px-5 py-10 bg-[#F1F9FF]">
      <MainContainer>
        <CustomBreadcrumb items={breadcrumbItems} />
        <h2 className="text-3xl font-semibold text-gray-800 text-center mt-8 mb-5">
   Complete Appointment
        </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 ">
            {[1, 2, 3, 4].map((appointment) => (
              <div
                key={appointment}
                className="bg-transparent rounded-lg border border-[#77C4FE] p-4"
              >
                <div className="border-b border-[#77C4FE] grid grid-cols-2 gap-8">
                  <span className="font-medium text-gray-700 ">Doctor Name: </span>
                   <span className="">    Bashar Islam</span>
              
                </div>
                <p className="border-b border-[#77C4FE] grid grid-cols-2 gap-8 py-2">
                  <span className="font-medium text-gray-700">Name: </span>
                  David John
                </p>
                <p className="border-b border-[#77C4FE] py-2 grid grid-cols-2 gap-8">
                  <span className="font-medium text-gray-700">Email: </span>
                  DavidJohn@gmail.com
                </p>
                <div className="text-right mt-4">
                  <a href="#" className="text-[#77C4FE] hover:underline">See all</a>
                </div>
              </div>
            ))}
          </div>
      
      </MainContainer>
    </section>
  );
};

export default MyAppointmentCompleted;
