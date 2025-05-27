"use client";
import MainContainer from "@/components/Shared/MainContainer/MainContainer";
import CustomBreadcrumb from "@/components/UI/CustomBreadcrumb";
import CustomInput from "@/components/UI/CustomInput";
import CustomLoadingButton from "@/components/UI/CustomLoadingButton";
import { CloseOutlined, HomeOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Form } from "antd";
import React from "react";
import { } from "@ant-design/icons";
// Define form values interface
interface ChatBotFormValues {
  name: string;
  email: string;
  message: string;
}

const ChatBot: React.FC = () => {
  const breadcrumbItems = [
    {
      href: "/",
      title: (
        <div className="flex gap-2 texl">
          <HomeOutlined />
          <span>Home</span>
        </div>
      ),
    },
    {
      title: "Chat Bot",
    },
  ];

  // Handle form submission
  const handleSubmit = (values: ChatBotFormValues) => {
    console.log(values);
  };

  return (
    <section className="w-full px-5 py-10">
      <MainContainer>
        <CustomBreadcrumb items={breadcrumbItems} />
        <h1 className="text-5xl font-semibold text-[#32526B] text-center my-5">
          Asking Your Question
        </h1>
        <div className="w-full py-8">
          <div className="w-full  max-w-2xl mx-auto relative border px-8 py-14 bg-sky-100 rounded-xl border-sky-300">
        <button className="absolute top-0 right-0 py-4 px-6 bg-rose-600 text-white  rounded-tr-2xl rounded-bl-2xl hover:bg-blue-600 transition-colors shadow-m"><CloseOutlined /></button>
            <Form
              onFinish={handleSubmit}
              layout="vertical"
              className="space-y-3"
            >    
              <Form.Item
                name="name"
                label="Your Name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <CustomInput
                  placeholder="Name"
                  icon={UserOutlined}
                  className="bg-transparent"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Your Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <CustomInput
                  placeholder="Email"
                  icon={MailOutlined}
                  className="bg-transparent"
                />
              </Form.Item>

              <Form.Item
                name="message"
                label="Your Question"
                rules={[
                  { required: true, message: "Please input your question!" },
                ]}
              >
                <CustomInput
                  placeholder="Write Now"
                  isTextArea
                  className="bg-transparent"
                />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item className="">
                <div className="mt-6 ">
                  <CustomLoadingButton className="border-none bg-[#77C4FE] ">Start Chat</CustomLoadingButton>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </MainContainer>
    </section>
  );
};

export default ChatBot;
