"use client";
import MainContainer from "@/components/Shared/MainContainer/MainContainer";
import Image from "next/image";
import { useState } from "react";
import line from "@/assets/faq/line.png";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useGetFaqsQuery } from "@/redux/features/auth/authApi";
import { Skeleton } from "antd";

const Faq = () => {
  // State to manage which FAQ is open
  const [openIndex, setOpenIndex] = useState<number | null>(0); // By default, the first FAQ is open
  const { data, isLoading, isError } = useGetFaqsQuery({});

  // Toggle function to open/close FAQs
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (isLoading) {
    return (
      <section className="w-full px-5 py-16 bg-[#F1F9FF]">
        <MainContainer>
          <div className="text-center space-y-3">
            <Skeleton.Input active size="large" className="w-1/2 mx-auto" />
            <Skeleton.Image active className="mx-auto" />
            <Skeleton paragraph={{ rows: 2 }} active />
          </div>
          <div className="mt-12 space-y-4">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} active paragraph={{ rows: 2 }} />
            ))}
          </div>
        </MainContainer>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="w-full px-5 py-16 bg-[#F1F9FF]">
        <MainContainer>
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-[#32526B]">
              Frequently Asked Questions
            </h1>
            <p className="text-red-500 mt-4">Failed to load FAQs. Please try again later.</p>
          </div>
        </MainContainer>
      </section>
    );
  }

  const faqs = data?.data?.attributes?.results || [];

  return (
    <section className="w-full px-5 py-16 bg-[#F1F9FF]">
      <MainContainer>
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-semibold text-[#32526B]">
            Frequently Asked Questions
          </h1>
          <Image
            width={400}
            height={200}
            src={line}
            alt="line"
            className="mx-auto"
          />
          <p className="text-gray-900">
            We use only the best quality materials on the market in order to{" "}
            <br />
            provide the best products to our patients.
          </p>
        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              onClick={() => toggleFaq(index)}
              className={`w-full p-5 cursor-pointer transition-all duration-500 ease-in-out rounded-xl ${
                openIndex === index
                  ? "bg-[#6CB2E7]"
                  : "border-b border-gray-900"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="w-full space-y-3">
                  <h3
                    className={`text-xl font-semibold ${
                      openIndex === index ? "text-white" : "text-[#32526B]"
                    }`}
                  >
                    {faq.question}
                  </h3>
                  {openIndex === index && <hr />}
                </div>
                <span className="text-xl">
                  {openIndex === index ? (
                    <span className="size-5 flex justify-center items-center border rounded-full p-0.5">
                      <FiMinus size={17} className="text-white" />
                    </span>
                  ) : (
                    <span className="size-5 flex justify-center items-center border rounded-full bg-gray-950 p-0.5">
                      <FiPlus size={17} className="text-white" />
                    </span>
                  )}
                </span>
              </div>

              {/* Conditionally render the answer with animation */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-[400px]" : "max-h-0"
                }`}
              >
                <p
                  className={`mt-3 ${
                    openIndex === index ? "opacity-100 text-white" : "opacity-0"
                  }`}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </MainContainer>
    </section>
  );
};

export default Faq; 