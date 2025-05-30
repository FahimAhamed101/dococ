"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Form, } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { HiOutlineHome } from "react-icons/hi";
import { IoCameraOutline } from "react-icons/io5";
import CustomBreadcrumb from "@/components/UI/CustomBreadcrumb";
import CustomInput from "@/components/UI/CustomInput";
import MainContainer from "@/components/Shared/MainContainer/MainContainer";
import CustomButton from "@/components/UI/CustomButton";
import CustomSelect from "@/components/UI/CustomSelect";
import CustomDatePicker from "@/components/UI/CustomDatePicker";

const breadcrumbItems = [
  {
    href: "/",
    title: (
      <div className="flex gap-2 items-center">
        <HiOutlineHome size={18} />
        <span>Home</span>
      </div>
    ),
  },
  {
    title: "My Profile",
  },
];

const ProfileForm: React.FC = () => {
  const [isEditing, setIsEditing] = useState(true);
  const [previewImage, setPreviewImage] = useState<string>(
    "/path/to/default/profile-pic.jpg"
  );

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const showImage = URL.createObjectURL(file);
      setPreviewImage(showImage);
    }
  };

  return (
    <section className="min-h-screen px-10 py-10">
      <MainContainer>
        <CustomBreadcrumb items={breadcrumbItems} />
        <div className="max-w-6xl mx-auto mt-8">
          <h1 className="text-2xl font-semibold mb-6">Add Profile Picture</h1>
          {/* Profile Picture Section */}
          <div className="flex items-center gap-8 mb-8">
            <div className="size-[120px] relative">
              <Image
                width={120}
                height={120}
                src={previewImage}
                alt="userImage"
                className="rounded-full"
              />
              <label
                htmlFor="image"
                className="absolute size-[120px] bg-gray-800 top-0 left-0 right-0 bottom-0 rounded-full border opacity-45 hover:opacity-70 duration-300 transition-all flex justify-center items-center text-white cursor-pointer"
              >
                <IoCameraOutline size={30} />
              </label>
              <input
                onChange={handleImage}
                id="image"
                type="file"
                style={{ display: "none" }}
              />
            </div>
            <div className="space-y-3">
              <CustomButton>Change Profile</CustomButton>
              <div className="text-sm text-gray-500">
                <p>Maximum size: 5MB</p>
                <p>Formats: jpg, jpeg, png</p>
              </div>
            </div>
          </div>
          {/* Form Section */}
          <Form layout="vertical"   className="[&_.ant-form-item]:mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <Form.Item label="Full Name" name="fullName">
                <CustomInput placeholder="Smith" readOnly={!isEditing} />
              </Form.Item>
              <Form.Item label="Last Name" name="lastName">
                <CustomInput placeholder="Anthony" readOnly={!isEditing} />
              </Form.Item>
<Form.Item label="Gender" name="gender">
  <CustomSelect
    placeholder="Select Gender"
    options={[
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ]}
    disabled={!isEditing}
  />
</Form.Item>

             
              <Form.Item label="Date of Birth" name="dateOfBirth">
                <CustomDatePicker disabled={!isEditing} />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <CustomInput
                  placeholder="james@gmail.com"
                  readOnly={!isEditing}
                />
              </Form.Item>
              <Form.Item label="Height" name="height">
                <CustomInput placeholder="168 cm" readOnly={!isEditing} />
              </Form.Item>
              <Form.Item label="Weight" name="weight">
                <CustomInput placeholder="72 kg" readOnly={!isEditing} />
              </Form.Item>
        
            </div>

          

            {/* Buttons */}
            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={toggleEdit}
                className="px-8 py-2 border border-gray-400 rounded-xl"
              >
                Cancel
              </button>
              <CustomButton>Save Changes</CustomButton>
            </div>
             <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Other documents</h2>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-8 text-blue-400">
                  <UploadOutlined className="w-full h-full" />
                </div>
                <span className="text-blue-500 text-sm font-medium">Upload file</span>
              </div>
            </div>
          </div>

       
        </div>
       
           <div className=" flex justify-end"><span className="ml-6 mb-5 bg-cyan-400 hover:bg-cyan-500 text-white">Document History</span></div>
    
   {/* Document History Button */}
         
        {/* Main Content Card */}
        <div className="border border-blue-200">
          <div className="p-6">
            {/* Doctor Info Grid */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Doctor Name</label>
                <p className="text-sm text-gray-600">Dr. Evan</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Subject</label>
                <p className="text-sm text-gray-600">Cardiology</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Medical Name</label>
                <p className="text-sm text-gray-600">Dhaka Medical College</p>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
              <p className="text-sm text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel mauris ullamcorper sit dignissim
                nulla. Diam sed rhoncus vulputate cursus tristique imperdiet felis ut. Facilibus vel sollicitudin lorem
                lorem vel massa. Auctor et dignissim ipsum ut blandit velit. In. Amet blandit velit adipiscing elit ut
                sed. A id a neque eu urna auctor quis mollis nulla. Tristique neque auctor interdum sem magna
                pellentesque dignissim. Ullamcorper magna sit, non consectetur. Venenatis, venenatis vulputate bibendum
                adipiscing.
              </p>
            </div>

            {/* Date Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-1">Date</label>
              <p className="text-sm text-gray-600">12/12/2025 8:30 AM</p>
            </div>

            {/* Documents Section */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Documents</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-6 h-6 text-blue-400">
                    <UploadOutlined className="w-full h-full" />
                  </div>
                  <span className="text-blue-500 text-sm">Document file</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
          </Form>
        </div>
      </MainContainer>
    </section>
  );
};

export default ProfileForm;
