"use client";
import MainContainer from "@/components/Shared/MainContainer/MainContainer";
import CustomBreadcrumb from "@/components/UI/CustomBreadcrumb";
import { HomeOutlined } from "@ant-design/icons";
import {  Pagination, Spin } from "antd";
import React, { useState } from "react";
import { useListAppointmentsQuery } from "@/redux/features/auth/appontmentApi";
import notfound from "@/assets/notfound.svg"
import Link from "next/link";
import Image from "next/image";
const MyAppointment: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  
  const { data, isLoading, isError } = useListAppointmentsQuery({
    page: currentPage,
    limit: pageSize,
  });

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

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  if (isLoading) {
    return (
      <section className="w-full px-5 py-10 bg-[#F1F9FF] min-h-screen flex justify-center items-center">
        <Spin size="large" />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="w-full px-5 py-10 bg-[#F1F9FF] min-h-screen flex justify-center items-center">
        <div className="text-red-500 text-lg">Failed to load appointments</div>
      </section>
    );
  }

  const appointments = data?.data?.attributes?.results || [];
  const pagination = data?.data?.attributes || {
    page: 1,
    limit: 5,
    totalPages: 1,
    totalResults: 0,
  };

  return (
    <section className="w-full px-5 py-10 bg-[#F1F9FF] min-h-screen">
      <MainContainer className="flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <CustomBreadcrumb items={breadcrumbItems} />
          
          <h2 className="text-3xl font-semibold text-gray-800 text-center mt-8 mb-10">
            My Appointment
          </h2>

          <div className="flex justify-center">
            <div className="w-full max-w-6xl space-y-6">
              {appointments.length === 0 ? (
             <section className="w-full min-h-screen px-5 py-10 bg-[#F1F9FF] f">
      <MainContainer className="text-center flex justify-center">
        
        <div>  <h1 className="text-4xl font-semibold mb-6">Sorry,Page not Found!</h1>  
           <Link href="/" className="text-2xl font-semibold mb-6">Go to Homepage</Link>  
        <Image src={notfound} alt="lock icon" width={600} height={16} /> </div>
     

  
      </MainContainer>
    </section>
              ) : (
                appointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="bg-transparent rounded-lg border border-[#77C4FE] p-10 shadow-sm"
                  >
                    <div className="border-b border-[#77C4FE] pb-4 grid grid-cols-4">
                      <span className="font-medium text-gray-700">Appointment ID:</span>
                      <span className="text-gray-900 col-span-3">{appointment.appointmentId}</span>
                    </div>
                    <div className="border-b border-[#77C4FE] py-4 grid grid-cols-4">
                      <span className="font-medium text-gray-700">Name:</span>
                      <span className="text-gray-900">{appointment.patientName}</span>
                    </div>
                    <div className="border-b border-[#77C4FE] py-4 grid grid-cols-4">
                      <span className="font-medium text-gray-700">Email:</span>
                      <span className="text-gray-900">{appointment.patientEmail}</span>
                    </div>
                    <div className="border-b border-[#77C4FE] py-4 grid grid-cols-4">
                      <span className="font-medium text-gray-700">Phone Number:</span>
                      <span className="text-gray-900">{appointment.patientPhone}</span>
                    </div>
                    <div className="border-b border-[#77C4FE] py-4 grid grid-cols-4">
                      <span className="font-medium text-gray-700">Address:</span>
                      <span className="text-gray-900">{appointment.patientAddress}</span>
                    </div>
                    <div className="border-b border-[#77C4FE] py-4 grid grid-cols-4">
                      <span className="font-medium text-gray-700">Reason for Visit:</span>
                      <span className="text-gray-900">{appointment.visitType}</span>
                    </div>
                    <div className="border-b border-[#77C4FE] py-4 grid grid-cols-4">
                      <span className="font-medium text-gray-700">Department:</span>
                      <span className="text-gray-900">{appointment.department}</span>
                    </div>
                    <div className="border-b border-[#77C4FE] py-4 grid grid-cols-4">
                      <span className="font-medium text-gray-700">Preferred Time:</span>
                      <span className="text-gray-900">{appointment.timeSlot}</span>
                    </div>
                    <div className="border-b border-[#77C4FE] py-4 grid grid-cols-4">
                      <span className="font-medium text-gray-700">Preferred Date:</span>
                      <span className="text-gray-900">
                        {new Date(appointment.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="border-b border-[#77C4FE] py-4 grid grid-cols-4">
                      <span className="font-medium text-gray-700">Status:</span>
                      <span className="text-gray-900 capitalize">{appointment.status}</span>
                    </div>
                    {appointment.reason && (
                      <div className="pt-4 grid grid-cols-4">
                        <span className="font-medium text-gray-700">Additional Reason:</span>
                        <span className="text-gray-900 col-span-3">{appointment.reason}</span>
                      </div>
                    )}
                  </div>
                ))
              )}

              {pagination.totalResults > 0 && (
                <div className="flex justify-center mt-6">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={pagination.totalResults}
                    onChange={handlePageChange}
                    showSizeChanger
                    pageSizeOptions={['5', '10', '20', '50']}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
};

export default MyAppointment;