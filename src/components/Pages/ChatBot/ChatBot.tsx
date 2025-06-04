"use client";
import MainContainer from "@/components/Shared/MainContainer/MainContainer";
import CustomBreadcrumb from "@/components/UI/CustomBreadcrumb";
import CustomInput from "@/components/UI/CustomInput";
import CustomLoadingButton from "@/components/UI/CustomLoadingButton";
import { CloseOutlined, HomeOutlined, MailOutlined, UserOutlined, MessageOutlined } from "@ant-design/icons";
import { Form } from "antd";
import React from "react";
import { useChatWithBotMutation } from "@/redux/features/auth/authApi"; // Update the import path

// Define form values interface
interface ChatBotFormValues {
  name: string;
  email: string;
  message: string;
}

const ChatBot: React.FC = () => {
  const [form] = Form.useForm();
  const [chatWithBot, { isLoading, isError, data }] = useChatWithBotMutation();
  
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
      title: "Chat Bot",
    },
  ];

  // Handle form submission
  const handleSubmit = async (values: ChatBotFormValues) => {
    try {
      const response = await chatWithBot({
        model: "gemini-1.5-flash",
        prompt: values.message,
      }).unwrap();
      
      console.log("AI Response:", response);
      // You can display the response to the user here
      // For example, you might want to show it in a chat UI
      
    } catch (err) {
      console.error("Failed to get response from AI:", err);
      // Handle error (show toast, etc.)
    }
  };

  return (
    <section className="w-full px-5 py-10 bg-gradient-to-b from-blue-50 to-white">
      <MainContainer>
        <CustomBreadcrumb items={breadcrumbItems} />
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
            Ask Your Question
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Our AI assistant is ready to help you 24/7. Fill out the form below to start chatting.
          </p>
        </div>
        
        <div className="w-full py-8 flex justify-center">
          <div className="w-full max-w-2xl relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-6 flex items-center">
              <div className="bg-white p-2 rounded-full mr-4">
                <MessageOutlined className="text-blue-500 text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">AI Chat Assistant</h2>
                <p className="text-blue-100 text-sm">Online now</p>
              </div>
              <button className="ml-auto bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-full">
                <CloseOutlined className="text-white" />
              </button>
            </div>

            {/* Chat form */}
            <div className="p-6 md:p-8">
              <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
                className="space-y-4"
              >    
                <Form.Item
                  name="name"
                  label={<span className="font-medium text-gray-700">Your Name</span>}
                  rules={[{ required: true, message: "Please input your name!" }]}
                >
                  <CustomInput
                    placeholder="Enter your name"
                    icon={UserOutlined}
                    className="border-gray-300 hover:border-blue-400 focus:border-blue-500"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label={<span className="font-medium text-gray-700">Your Email</span>}
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <CustomInput
                    placeholder="Enter your email"
                    icon={MailOutlined}
                    className="border-gray-300 hover:border-blue-400 focus:border-blue-500"
                  />
                </Form.Item>

                <Form.Item
                  name="message"
                  label={<span className="font-medium text-gray-700">Your Question</span>}
                  rules={[
                    { required: true, message: "Please input your question!" },
                  ]}
                >
                  <CustomInput
                    placeholder="Type your question here..."
                    isTextArea
                    className="border-gray-300 hover:border-blue-400 focus:border-blue-500 min-h-[120px]"
                  />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                  <div className="mt-6">
                    <CustomLoadingButton 
                      loading={isLoading}
                      className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold rounded-lg shadow-md transition-all transform hover:scale-[1.02]"
                    >
                      {isLoading ? "Processing..." : "Start Chat Now"}
                    </CustomLoadingButton>
                  </div>
                </Form.Item>
              </Form>

              {/* Display the response if available */}
              {data && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">AI Response:</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {data.data.attributes.candidates[0].content.parts[0].text}
                  </p>
                </div>
              )}

              {/* Display error if any */}
              {isError && (
                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                  <p className="text-red-600">
                    Error: Failed to get response from AI. Please try again.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
};

export default ChatBot;