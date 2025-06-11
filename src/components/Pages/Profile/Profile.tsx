"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { Form, message, Input, Modal, Skeleton } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { HiOutlineHome } from "react-icons/hi";
import { IoCameraOutline } from "react-icons/io5";
import CustomBreadcrumb from "@/components/UI/CustomBreadcrumb";
import CustomInput from "@/components/UI/CustomInput";
import MainContainer from "@/components/Shared/MainContainer/MainContainer";
import CustomButton from "@/components/UI/CustomButton";
import CustomSelect from "@/components/UI/CustomSelect";
import CustomDatePicker from "@/components/UI/CustomDatePicker";
import { useGetProfileQuery, useUpdateProfileMutation, useUploadDocumentMutation } from "@/redux/features/auth/authApi";
import dayjs, { Dayjs } from "dayjs";

interface BreadcrumbItem {
  href?: string;
  title: React.ReactNode;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: Dayjs | null;
  gender?: string;
  callingCode?: string;
  phoneNumber?: string;
  address?: string;
  height?: string;
  weight?: string;
  medicalCondition?: string[];
  profileImage?: File | null;
}

interface DocumentFormValues {
  title: string;
  type: string;
  description: string;
}

interface ApiError {
  data?: {
    message?: string;
  };
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

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const documentOptions = [
  { value: "prescription", label: "Prescription" },
  { value: "medical certificate", label: "Medical Certificate" },
  { value: "discharge summary", label: "Discharge Summary" },
  { value: "medical history record", label: "Medical History Record" },
  { value: "lab reports", label: "Lab Reports" },
  { value: "referral letter", label: "Referral Letter" },
  { value: "operative report", label: "Operative Report" },
  { value: "immunization record", label: "Immunization Record" },
  { value: "radiology reports", label: "Radiology Reports" },
  { value: "progress notes", label: "Progress Notes" },
  { value: "consent forms", label: "Consent Forms" },
  { value: "insurance", label: "Insurance" },
  { value: "other", label: "Other" },
];

const medicalConditionOptions = [
  { value: "Allergies", label: "Allergies" },
  { value: "Anxiety", label: "Anxiety" },
  { value: "Diabetes", label: "Diabetes" },
  { value: "Hypertension", label: "Hypertension" },
  { value: "Heart Disease", label: "Heart Disease" },
  { value: "Asthma", label: "Asthma" },
  { value: "Depression", label: "Depression" },
  { value: "Arthritis", label: "Arthritis" },
  { value: "Cancer", label: "Cancer" },
  { value: "Other", label: "Other" },
];

const ProfileForm: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const [documentForm] = Form.useForm<DocumentFormValues>();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("/default-profile.png");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { data: profile, isLoading, isError, refetch } = useGetProfileQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [uploadDocument, { isLoading: isDocumentSubmitting }] = useUploadDocumentMutation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (profile?.data?.attributes) {
      const { user } = profile.data.attributes;
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
        gender: user.gender || undefined,
        callingCode: user.callingCode || undefined,
        phoneNumber: user.phoneNumber || undefined,
        address: user.address || undefined,
        height: user.height?.value || undefined,
        weight: user.weight?.value || undefined,
        medicalCondition: user.medicalCondition?.length ? user.medicalCondition : undefined,
      });
      setPreviewImage(user.profileImage || "/default-profile.png");
    }
  }, [profile, form]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing && profile?.data?.attributes) {
      const { user } = profile.data.attributes;
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
        gender: user.gender || undefined,
        callingCode: user.callingCode || undefined,
        phoneNumber: user.phoneNumber || undefined,
        address: user.address || undefined,
        height: user.height?.value || undefined,
        weight: user.weight?.value || undefined,
        medicalCondition: user.medicalCondition?.length ? user.medicalCondition : undefined,
      });
      setPreviewImage(user.profileImage || "/default-profile.png");
      setImageFile(null);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const onFinish = async (values: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      if (values.dateOfBirth) {
        formData.append("dateOfBirth", values.dateOfBirth.format("YYYY-MM-DD"));
      }
      if (values.gender) {
        formData.append("gender", values.gender);
      }
      if (values.callingCode) {
        formData.append("callingCode", values.callingCode);
      }
      if (values.phoneNumber) {
        formData.append("phoneNumber", values.phoneNumber);
      }
      if (values.address) {
        formData.append("address", values.address);
      }
      if (values.height) {
        formData.append("height[value]", values.height);
        formData.append("height[unit]", "cm");
      }
      if (values.weight) {
        formData.append("weight[value]", values.weight);
        formData.append("weight[unit]", "kg");
      }
      if (values.medicalCondition?.length) {
        values.medicalCondition.forEach((condition) => {
          formData.append("medicalCondition[]", condition);
        });
      }
      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      await updateProfile(formData).unwrap();
      message.success("Profile updated successfully");
      setIsEditing(false);
      setImageFile(null);
      refetch();
    } catch (err: unknown) {
      const error = err as ApiError;
      console.error("Profile update error:", error);
      message.error(error.data?.message || "Failed to update profile");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (newFiles.reduce((total, file) => total + file.size, 0) > 10 * 1024 * 1024) {
        message.error("Total file size should be less than 10MB");
        return;
      }
      setFiles(newFiles);
    }
  };

  const handleDocumentSubmit = async (values: DocumentFormValues) => {
    try {
      if (files.length === 0) {
        message.warning("Please upload at least one file");
        return;
      }

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("type", values.type);
      formData.append("description", values.description);
      files.forEach((file) => formData.append("files", file));

      await uploadDocument(formData).unwrap();
      message.success("Document uploaded successfully");
      setOpen(false);
      setFiles([]);
      documentForm.resetFields();
      refetch();
    } catch (err: unknown) {
      const error = err as ApiError;
      console.error("Document upload error:", error);
      message.error(error.data?.message || "Failed to upload document");
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen px-4 sm:px-6 lg:px-10 py-10">
        <MainContainer>
          <Skeleton active paragraph={{ rows: 10 }} />
        </MainContainer>
      </div>
    );
  }

  if (isLoading) return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-10 py-10">
      <MainContainer>
        <Skeleton active paragraph={{ rows: 10 }} />
      </MainContainer>
    </div>
  );

  if (isError) return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-10 py-10">
      <MainContainer>
        <div className="text-center py-10">Error loading profile</div>
      </MainContainer>
    </div>
  );

  const profileData = profile?.data?.attributes;
  const documents = profileData?.documents || [];
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://10.0.60.18:6060';
  const imageUrl = profileData?.user?.profileImage?.startsWith('http') 
    ? previewImage
    : `${backendUrl}/${profileData?.user?.profileImage}`;

  return (
    <section className="min-h-screen px-4 sm:px-6 lg:px-10 py-10">
      <MainContainer>
        <CustomBreadcrumb items={breadcrumbItems} />
        <div className="max-w-6xl mx-auto mt-8">
          <h1 className="text-2xl font-semibold mb-6">Profile Information</h1>

          {/* Profile Picture Section */}
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
            <div className="w-[120px] h-[120px] relative">
              <Image
                width={120}
                height={120}
                src={imageUrl}
                alt="Profile picture"
                className="rounded-full object-cover w-full h-full"
                priority
              />
              {isEditing && (
                <>
                  <label
                    htmlFor="image"
                    className="absolute inset-0 w-full h-full bg-gray-800 rounded-full border opacity-45 hover:opacity-70 duration-300 transition-all flex justify-center items-center text-white cursor-pointer"
                    aria-label="Change profile picture"
                  >
                    <IoCameraOutline size={30} />
                  </label>
                  <input
                    onChange={handleImageChange}
                    id="image"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    className="hidden"
                  />
                </>
              )}
            </div>
            {isEditing && (
              <div className="space-y-3 w-full sm:w-auto">
                <CustomButton onClick={() => document.getElementById("image")?.click()}>
                  Change Profile
                </CustomButton>
                <div className="text-sm text-gray-500">
                  <p>Maximum size: 5MB</p>
                  <p>Formats: jpg, jpeg, png</p>
                </div>
              </div>
            )}
          </div>

          {/* Form Section */}
          <Form form={form} layout="vertical" onFinish={onFinish} className="[&_.ant-form-item]:mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Please enter first name" }]}
              >
                <CustomInput placeholder="First name" readOnly={!isEditing} />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please enter last name" }]}
              >
                <CustomInput placeholder="Last name" readOnly={!isEditing} />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ type: "email", message: "Please enter a valid email" }]}
              >
                <CustomInput placeholder="email@example.com" type="email" readOnly />
              </Form.Item>

              <Form.Item label="Date of Birth" name="dateOfBirth">
                <CustomDatePicker disabled={!isEditing} />
              </Form.Item>

              <Form.Item label="Gender" name="gender">
                <CustomSelect disabled={!isEditing} options={genderOptions} placeholder="Select gender" />
              </Form.Item>

              <Form.Item label="Calling Code" name="callingCode">
                <CustomInput placeholder="+880" readOnly={!isEditing} />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ pattern: /^\d+$/, message: "Please enter numbers only" }]}
              >
                <CustomInput placeholder="1234567890" readOnly={!isEditing} />
              </Form.Item>

              <Form.Item label="Address" name="address">
                <CustomInput placeholder="Address" readOnly={!isEditing} />
              </Form.Item>

              <Form.Item
                label="Height (cm)"
                name="height"
                rules={[{ pattern: /^\d+$/, message: "Please enter numbers only" }]}
              >
                <CustomInput placeholder="160" readOnly={!isEditing} />
              </Form.Item>

              <Form.Item
                label="Weight (kg)"
                name="weight"
                rules={[{ pattern: /^\d+$/, message: "Please enter numbers only" }]}
              >
                <CustomInput placeholder="65" readOnly={!isEditing} />
              </Form.Item>
            </div>

            <div className="mt-4">
              <Form.Item label="Medical Conditions" name="medicalCondition">
                <CustomSelect
                  mode="multiple"
                  disabled={!isEditing}
                  options={medicalConditionOptions}
                  placeholder="Select medical conditions"
                  allowClear
                />
              </Form.Item>
            </div>

            <div className="flex justify-end mt-6 gap-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={toggleEdit}
                    className="px-8 py-2 border border-gray-400 rounded-xl hover:bg-gray-50"
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-lg font-medium text-gray-900">Documents</h2>
              <CustomButton onClick={() => setOpen(true)}>Add New Document</CustomButton>
            </div>

            <Modal
              title="Add Document"
              open={open}
              onCancel={() => setOpen(false)}
              footer={null}
              width={700}
              destroyOnClose
            >
              <Form
                form={documentForm}
                layout="vertical"
                onFinish={handleDocumentSubmit}
                className="space-y-4 mt-4 p-4"
              >
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[{ required: true, message: "Please enter document title" }]}
                >
                  <CustomInput placeholder="Document title" />
                </Form.Item>

                <Form.Item
                  label="Type"
                  name="type"
                  rules={[{ required: true, message: "Please select document type" }]}
                >
                  <CustomSelect
                    options={documentOptions}
                    placeholder="Select document type"
                  />
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ required: true, message: "Please enter description" }]}
                >
                  <Input.TextArea
                    placeholder="Write here"
                    className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 resize-none min-h-[120px]"
                  />
                </Form.Item>

                <Form.Item label="Upload files" required>
                  <div className="border-2 border-dashed border-gray-200 rounded-md p-6 flex flex-col items-center justify-center bg-white">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
                      aria-label="Upload files"
                    >
                      <UploadOutlined className="w-6 h-6 text-cyan-500 mb-2" />
                      <span className="text-sm text-cyan-500">Click to upload files</span>
                    </label>
                    {files.length > 0 && (
                      <div className="mt-4 text-sm text-gray-600 w-full">
                        <p className="font-medium mb-1">Selected files:</p>
                        <div className="space-y-1 max-h-40 overflow-y-auto">
                          {files.map((file, index) => (
                            <p key={index} className="truncate">{file.name}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {files.length === 0 && (
                    <p className="text-red-500 text-xs mt-1">Please upload at least one file</p>
                  )}
                </Form.Item>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setFiles([]);
                      documentForm.resetFields();
                    }}
                    className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <CustomButton
                    htmlType="submit"
                    loading={isDocumentSubmitting}
                    disabled={files.length === 0}
                  >
                    Save
                  </CustomButton>
                </div>
              </Form>
            </Modal>

            {/* Display Documents */}
            {documents.length > 0 ? (
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg">
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-1">Title</label>
                          <p className="text-sm text-gray-600">{doc.title}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-1">Type</label>
                          <p className="text-sm text-gray-600">
                            {documentOptions.find((opt) => opt.value === doc.type)?.label || doc.type}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-1">
                            Created At
                          </label>
                          <p className="text-sm text-gray-600">
                            {dayjs(doc.createdAt).format("MM/DD/YYYY h:mm A")}
                          </p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Description
                        </label>
                        <p className="text-sm text-gray-600 leading-relaxed">{doc.description}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Files</label>
                        <div className="space-y-2">
                          {doc.files.map((file, index) => (
                            <div
                              key={index}
                              className="border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50 flex items-center"
                            >
                              <div className="flex-1 truncate mr-2">
                                {file ? file.split("/").pop() : "Unknown file"}
                              </div>
                              {file && (
                                <a
                                  href={file}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-cyan-500 text-sm hover:underline whitespace-nowrap"
                                >
                                  View File
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg p-8 text-center bg-gray-50">
                <p className="text-gray-600">No documents uploaded yet</p>
              </div>
            )}
          </div>
        </div>
      </MainContainer>
    </section>
  );
};

export default ProfileForm;