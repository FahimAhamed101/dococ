"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Form, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { HiOutlineHome } from "react-icons/hi";
import { IoCameraOutline } from "react-icons/io5";
import CustomBreadcrumb from "@/components/UI/CustomBreadcrumb";
import CustomInput from "@/components/UI/CustomInput";
import MainContainer from "@/components/Shared/MainContainer/MainContainer";
import CustomButton from "@/components/UI/CustomButton";
import CustomSelect from "@/components/UI/CustomSelect";
import CustomDatePicker from "@/components/UI/CustomDatePicker";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/redux/features/auth/authApi";
import dayjs, { Dayjs } from "dayjs";

interface BreadcrumbItem {
  href?: string;
  title: React.ReactNode;
}

interface HeightWeight {
  value: number | null;
  unit: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  dateOfBirth: string | null;
  height: HeightWeight;
  weight: HeightWeight;
  gender?: string;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  gender?: string;
  dateOfBirth?: Dayjs | null;
  height?: number | null;
  weight?: number | null;
}

interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  height?: number;
  weight?: number;
  gender?: string;
}

const breadcrumbItems: BreadcrumbItem[] = [
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
  const [form] = Form.useForm<FormValues>();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("/default-profile.png");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: profile, isLoading, isError } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  useEffect(() => {
    if (profile?.data?.attributes?.user) {
      const user = profile.data.attributes.user as User;
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
        height: user.height?.value || null,
        weight: user.weight?.value || null,
      });
      setPreviewImage(user.profileImage || "/default-profile.png");
    }
  }, [profile, form]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      form.resetFields();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      message.error("File size should be less than 5MB");
      return;
    }

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      message.error("Only JPG, JPEG, and PNG files are allowed");
      return;
    }

    setPreviewImage(URL.createObjectURL(file));
    setImageFile(file);
  };

  const handleUploadImage = async () => {
    if (!imageFile) {
      message.warning("Please select an image first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("profileImage", imageFile);
      // TODO: Implement actual upload API call
      message.success("Profile image updated successfully");
    } catch (err) {
      console.error("Image upload error:", err);
      message.error("Failed to upload profile image");
    }
  };

  const onFinish = async (values: FormValues) => {
    try {
      const payload: UpdateProfileRequest = {
        firstName: values.firstName,
        lastName: values.lastName,
        ...(values.dateOfBirth && { dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD") }),
        ...(values.height !== null && values.height !== undefined && { height: values.height }),
        ...(values.weight !== null && values.weight !== undefined && { weight: values.weight }),
        ...(values.gender && { gender: values.gender }),
      };

      await updateProfile(payload).unwrap();
      message.success("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update error:", err);
      message.error("Failed to update profile");
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading profile...</div>;
  if (isError) return <div className="text-center py-10">Error loading profile</div>;

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
                alt="Profile picture"
                className="rounded-full"
              />
              {isEditing && (
                <>
                  <label
                    htmlFor="image"
                    className="absolute size-[120px] bg-gray-800 top-0 left-0 right-0 bottom-0 rounded-full border opacity-45 hover:opacity-70 duration-300 transition-all flex justify-center items-center text-white cursor-pointer"
                  >
                    <IoCameraOutline size={30} />
                  </label>
                  <input
                    onChange={handleImageChange}
                    id="image"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    style={{ display: "none" }}
                  />
                </>
              )}
            </div>
            {isEditing && (
              <div className="space-y-3">
                <CustomButton onClick={handleUploadImage}>Change Profile</CustomButton>
                <div className="text-sm text-gray-500">
                  <p>Maximum size: 5MB</p>
                  <p>Formats: jpg, jpeg, png</p>
                </div>
              </div>
            )}
          </div>

          {/* Form Section */}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="[&_.ant-form-item]:mb-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "Please enter first name" }]}>
                <CustomInput placeholder="John" readOnly={!isEditing} />
              </Form.Item>
              <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Please enter last name" }]}>
                <CustomInput placeholder="Doe" readOnly={!isEditing} />
              </Form.Item>
              <Form.Item label="Gender" name="gender">
                <CustomSelect
                  placeholder="Select Gender"
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                  ]}
                  disabled={!isEditing}
                />
              </Form.Item>
              <Form.Item label="Date of Birth" name="dateOfBirth">
                <CustomDatePicker disabled={!isEditing} />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <CustomInput placeholder="email@example.com" readOnly />
              </Form.Item>
              <Form.Item label="Height (cm)" name="height">
                <CustomInput placeholder="170" readOnly={!isEditing} type="number" />
              </Form.Item>
              <Form.Item label="Weight (kg)" name="weight">
                <CustomInput placeholder="70" readOnly={!isEditing} type="number" />
              </Form.Item>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6 gap-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={toggleEdit}
                    className="px-8 py-2 border border-gray-400 rounded-xl"
                  >
                    Cancel
                  </button>
                  <CustomButton htmlType="submit" loading={isUpdating}>
                    Save Changes
                  </CustomButton>
                </>
              ) : (
                <CustomButton onClick={toggleEdit}>Edit Profile</CustomButton>
              )}
            </div>
          </Form>

          {/* Documents Section */}
          <div className="max-w-6xl mx-auto space-y-6 mt-12">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Other documents</h2>
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

            <div className="flex justify-end">
              <span className="ml-6 mb-5 bg-cyan-400 hover:bg-cyan-500 text-white px-4 py-2 rounded cursor-pointer">
                Document History
              </span>
            </div>

            <div className="border border-blue-200">
              <div className="p-6">
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

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-1">Date</label>
                  <p className="text-sm text-gray-600">12/12/2025 8:30 AM</p>
                </div>

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
        </div>
      </MainContainer>
    </section>
  );
};

export default ProfileForm;