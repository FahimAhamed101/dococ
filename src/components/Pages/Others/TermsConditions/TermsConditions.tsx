"use client";
import MainContainer from "@/components/Shared/MainContainer/MainContainer";
import CustomBreadcrumb from "@/components/UI/CustomBreadcrumb";
import { HomeOutlined } from "@ant-design/icons";
import { Spin, Alert } from "antd";
import { useGetTermsConditionsQuery } from "@/redux/features/info/infoApi";

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
    title: "Terms & Conditions",
  },
];

const TermsConditions = () => {
  const { data, isLoading, isError } = useGetTermsConditionsQuery();

  if (isLoading) {
    return (
      <section className="w-full px-5 bg-[#F1F9FF] py-10 min-h-screen flex justify-center items-center">
        <Spin size="large" />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="w-full px-5 bg-[#F1F9FF] py-10 min-h-screen flex justify-center items-center">
        <Alert
          message="Error"
          description="Failed to load terms & conditions"
          type="error"
          showIcon
        />
      </section>
    );
  }

  // Get the first item from the attributes array
  const termsData = data?.data?.attributes?.[0];
  const termsContent = termsData?.content || `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
    felis ac justo consectetur commodo. Sed consectetur ipsum non
    dolor vulputate, at vulputate velit fermentum. Donec auctor, arcu
    sit amet pulvinar tincidunt, nisi nisi tincidunt nunc, vel
    tristique lectus ex vel diam. Vestibulum ante ipsum primis in
    faucibus orci luctus et ultrices posuere cubilia Curae; Donec
    sodales ipsum sed turpis finibus, et efficitur ipsum rutrum. Donec
    vel ex at nunc semper facilisis.

    Nulla facilisi. Duis eget velit eu arcu placerat condimentum vel
    ac tellus. Donec non neque vel ipsum pharetra fermentum. Nulla
    facilisi. Donec vel ex at nunc semper facilisis.

    Sed vel felis ac justo consectetur commodo Sed consectetur ipsum
    non dolor vulputate, at vulputate velit fermentum. Donec auctor,
    arcu sit amet pulvinar tincidunt, nisi nisi tincidunt nunc, vel
    tristique lectus ex vel diam. Vestibulum ante ipsum primis in
    faucibus orci luctus et ultrices posuere cubilia Curae; Donec
    sodales ipsum sed turpis finibus, et efficitur ipsum rutrum. Donec
    vel ex at nunc semper facilisis.
  `;

  const lastUpdated = termsData?.updatedAt 
    ? new Date(termsData.updatedAt).toLocaleDateString() 
    : null;

  return (
    <section className="w-full px-5 bg-[#F1F9FF] py-10 min-h-screen">
      <MainContainer>
        <CustomBreadcrumb items={breadcrumbItems} />
        <div>
          <h1 className="text-3xl font-semibold my-5">Terms & Conditions</h1>
          {lastUpdated && (
            <p className="text-gray-500 mb-5">
              Last updated: {lastUpdated}
            </p>
          )}
          <div className="space-y-5">
            {termsContent.split('\n\n').map((paragraph, index) => (
              <p 
                key={index} 
                className={`${index === 0 ? 'text-xl' : 'text-lg'}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </MainContainer>
    </section>
  );
};

export default TermsConditions;