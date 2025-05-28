"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Form, Upload, Button } from "antd";
import { FileTextOutlined, UploadOutlined } from "@ant-design/icons";
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
          <Form layout="vertical">
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
              <Form.Item label="Past Medical History" name="pastMedicalHistory">
                <CustomInput
                  placeholder="Breathing problem and chest pain"
                  readOnly={!isEditing}
                />
              </Form.Item>
              <Form.Item label="Social History" name="socialHistory">
                <CustomInput placeholder="Description" readOnly={!isEditing} />
              </Form.Item>
              <Form.Item label="Allergy History" name="allergyHistory">
                <CustomInput placeholder="Description" readOnly={!isEditing} />
              </Form.Item>
              <Form.Item label="Drug History" name="drugHistory">
                <CustomInput placeholder="Description" readOnly={!isEditing} />
              </Form.Item>
              <Form.Item label="Medical Condition" name="medicalCondition">
                <CustomInput placeholder="Description" readOnly={!isEditing} />
              </Form.Item>
            </div>

            {/* Upload Files Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Form.Item label="Attach Prescription" name="prescription">
                <Upload>
                  <Button icon={<UploadOutlined />}>Upload file</Button>
                </Upload>
              </Form.Item>
              <Form.Item
                label="Attach Medical Documents"
                name="medicalDocuments"
              >
                <Upload>
                  <Button icon={<UploadOutlined />}>Upload file</Button>
                </Upload>
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
          </Form>
        </div>
              <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Other documents section */}
      <div>
        <h2 className="text-lg font-medium mb-4">Other documents</h2>
        <div className="flex gap-4 items-start">
          <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50/50">
            <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-blue-500 font-medium">Upload file</p>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">Document Upload</Button>
        </div>
      </div>

      {/* Appointment details card */}
      <div className="border border-gray-200">
        <div className="p-6">
          {/* Header row with three columns */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Doctor Name</h3>
              <p className="text-gray-600">Mr Evan</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Subject</h3>
              <p className="text-gray-600">Cardiology</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Medical Name</h3>
              <p className="text-gray-600">Ghana Medical College</p>
            </div>
          </div>

          {/* Description section */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros, nisi amet, aliquam in. Ut vulputate et
              aliquam risus. Diam sed integer vulputate turpis in nec imperdiet lorem. Habitant sit lorem quis lorem
              tempor scelerisque. Auctor et aliquam rhoncus id blandit sed in. Amet cursus rutrum adipiscing elit in
              sed. A elit a orci eu urna mauris quis vitae risus. Tristique risus auctor tristique non ipsum
              pellentesque aliquam. Ullamcorper mauris, mauris, mauris, mauris, mauris, mauris, mauris, mauris.
            </p>
          </div>

          {/* Date section */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Date</h3>
            <p className="text-gray-600">10/3/2024 8:30 AM</p>
          </div>

          {/* Documents section */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Documents</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50/50">
             

              <FileTextOutlined className="w-8 h-8 text-blue-500 mx-auto mb-2"/>
              <p className="text-blue-500 font-medium">Download file</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      </MainContainer>
    </section>
  );
};

export default ProfileForm;
