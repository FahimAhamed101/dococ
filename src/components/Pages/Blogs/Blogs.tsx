import MainContainer from "@/components/Shared/MainContainer/MainContainer";
import CustomBreadcrumb from "@/components/UI/CustomBreadcrumb";
import { HomeOutlined } from "@ant-design/icons";
import RecentBlogCard from "../Home/RecentBlogCard";
const Blogs = () => {
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
      title: "Blogs",
    },
  ];
  const blogs = [
    {
      id: 1,
      imgSrc: "https://i.ibb.co.com/pPLwnRq/blog3.png",
      date: "June 23, 2024",
      description:
        "Lorem ipsum dolor sit amet consectetur. Convallis cras placerat dignissim aliquam massa.",
    },
    {
      id: 2,
      imgSrc: "https://i.ibb.co.com/pPLwnRq/blog3.png",
      date: "June 23, 2024",
      description:
        "Lorem ipsum dolor sit amet consectetur. Convallis cras placerat dignissim aliquam massa.",
    },
    {
      id: 3,
      imgSrc: "https://i.ibb.co.com/pPLwnRq/blog3.png",
      date: "June 23, 2024",
      description:
        "Lorem ipsum dolor sit amet consectetur. Convallis cras placerat dignissim aliquam massa.",
    },
    {
      id: 4,
      imgSrc: "https://i.ibb.co.com/pPLwnRq/blog3.png",
      date: "June 23, 2024",
      description:
        "Lorem ipsum dolor sit amet consectetur. Convallis cras placerat dignissim aliquam massa.",
    },
    {
      id: 5,
      imgSrc: "https://i.ibb.co.com/pPLwnRq/blog3.png",
      date: "June 23, 2024",
      description:
        "Lorem ipsum dolor sit amet consectetur. Convallis cras placerat dignissim aliquam massa.",
    },
    {
      id: 6,
      imgSrc: "https://i.ibb.co.com/pPLwnRq/blog3.png",
      date: "June 23, 2024",
      description:
        "Lorem ipsum dolor sit amet consectetur. Convallis cras placerat dignissim aliquam massa.",
    },
    {
      id: 7,
      imgSrc: "https://i.ibb.co.com/pPLwnRq/blog3.png",
      date: "June 23, 2024",
      description:
        "Lorem ipsum dolor sit amet consectetur. Convallis cras placerat dignissim aliquam massa.",
    },
    {
      id: 8,
      imgSrc: "https://i.ibb.co.com/pPLwnRq/blog3.png",
      date: "June 23, 2024",
      description:
        "Lorem ipsum dolor sit amet consectetur. Convallis cras placerat dignissim aliquam massa.",
    },
  ];
  return (
    <section className="w-full px-5 py-10 ">
      <MainContainer>
        <CustomBreadcrumb items={breadcrumbItems} />
    

  <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block mb-4">
         <h1 className="text-4xl font-semibold text-[#32526B] pb-4">Blogs</h1>
          <div className="w-20 h-0.5 bg-[#77C4FE]"></div>
        </div>
      <h2 className="mt-4 text-xl text-gray-600">What Are People Saying About Us</h2>
      </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-10">
          {blogs.map((blog) => (
            <RecentBlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </MainContainer>
    </section>
  );
};

export default Blogs;
