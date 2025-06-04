"use client"
import MainContainer from "@/components/Shared/MainContainer/MainContainer";
import CustomBreadcrumb from "@/components/UI/CustomBreadcrumb";
import { HomeOutlined } from "@ant-design/icons";
import RecentBlogCard from "../Home/RecentBlogCard";
import { useGetBlogsQuery } from "@/redux/features/blog/blogApi";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/UI/CustomButton";



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
    const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 6; // Number of blogs per page

  const { data, isLoading, isError } = useGetBlogsQuery({ page, limit });

  if (isLoading) return <div className="text-center py-10">Loading blogs...</div>;
  if (isError) return <div className="text-center py-10">Error loading blogs</div>;

  const blogs = data?.data?.attributes?.results || [];
  const totalPages = data?.data?.attributes?.totalPages || 1;
  const currentPage = data?.data?.attributes?.page || 1;
  const totalResults = data?.data?.attributes?.totalResults || 0;

  const handlePrevPage = () => page > 1 && setPage(page - 1);
  const handleNextPage = () => page < totalPages && setPage(page + 1);
  const handleViewAll = () => router.push('/blog?page=1&limit=12'); // Adjust limit as needed

  // Improved pagination range (shows max 5 pages at a time)
  const getPageRange = () => {
    const range = [];
    const maxVisiblePages = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

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

        <div className="w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-10">
          {blogs.map((blog) => (
            <RecentBlogCard key={blog.id} blog={blog} />
          ))}
        </div>


        
        {totalPages > 1 && (
          <div className="flex flex-col items-center mt-8 space-y-4">
            <div className="flex items-center space-x-2">
              <CustomButton
                onClick={handlePrevPage}
                disabled={page === 1}
                className="flex items-center space-x-1 disabled:opacity-50 px-4 py-2"
              >
                <FiChevronLeft />
                <span>Previous</span>
              </CustomButton>

              <div className="flex space-x-1">
                {getPageRange().map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      pageNum === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <CustomButton
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="flex items-center space-x-1 disabled:opacity-50 px-4 py-2"
              >
                <span>Next</span>
                <FiChevronRight />
              </CustomButton>
            </div>

            <p className="text-sm text-gray-500">
              Showing {blogs.length} of {totalResults} articles
            </p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-10 flex justify-center">
          <CustomButton 
            onClick={handleViewAll}
            className="px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            View All Articles
          </CustomButton>
        </div>
      </MainContainer>
    </section>
  );
};

export default Blogs;
