"use client"
import line from "@/assets/faq/line.png";
import MainContainer from "@/components/Shared/MainContainer/MainContainer";
import CustomBreadcrumb from "@/components/UI/CustomBreadcrumb";
import { HomeOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiFacebook, FiLinkedin, FiTwitter, FiEye, FiHeart } from "react-icons/fi";
import { useGetBlogBySlugQuery } from "@/redux/features/blog/blogApi";
import dayjs from "dayjs";


interface BlogDetailsProps {
  params: {
    slug: string;
  };
}

const BlogDetails = ({ params }: BlogDetailsProps) => {
  const { slug } = params;
  const { data, isLoading, isError } = useGetBlogBySlugQuery(slug);

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
      href: "/blog",
      title: "Blogs",
    },
    {
      title: "Blog Details",
    },
  ];

  if (isLoading) return <div className="text-center py-10">Loading blog post...</div>;
  if (isError) return <div className="text-center py-10">Error loading blog post</div>;

  const blog = data?.data?.attributes;
  if (!blog) return <div className="text-center py-10">Blog not found</div>;
 const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://10.0.60.18:6060';
  
  // Construct the full image URL
  const imageUrl = blog.coverImage.startsWith('http') 
    ? blog.coverImage 
    : `${backendUrl}${blog.coverImage}`;

  return (
    <section className="w-full px-5 py-10">
      <MainContainer>
        <CustomBreadcrumb items={breadcrumbItems} />
        <div className="text-center space-y-3 my-5">
          <h1 className="text-4xl font-semibold text-[#32526B]">Blog Details</h1>
          <Image
            width={150}
            height={200}
            src={line}
            alt="line"
            className="mx-auto"
          />
          <p className="text-gray-900">What Are People Saying About Us</p>
        </div>

        <div className="w-full p-5 rounded-xl">
          {/* Blog Image */}
          <div className="relative w-full aspect-[16/9] md:aspect-[3/1] rounded-xl overflow-hidden">
            <Image
              src={imageUrl}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Blog Info */}
          <div className="mt-8 space-y-6">
            {/* Blog Header */}
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-500">
                  <FiCalendar />
                  <span>{dayjs(blog.createdAt).format("MMMM D, YYYY")}</span>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {blog.category}
                </span>
              </div>

              <div className="flex items-center space-x-4 text-gray-500">
                <div className="flex items-center space-x-1">
                  <FiEye />
                  <span>{blog.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FiHeart />
                  <span>{blog.likes}</span>
                </div>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={blog.author.profileImage}
                  alt={blog.author.fullName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{blog.author.fullName}</p>
                <p className="text-sm text-gray-500">{blog.author.email}</p>
              </div>
            </div>

            {/* Blog Content */}
            <div className="prose max-w-none">
          {blog.content}
            </div>

            {/* Tags */}
            {blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Social Sharing */}
            <div className="flex justify-end space-x-3 pt-4">
              <Link
                href="#"
                className="size-9 border border-[#6CB2E7] text-[#6CB2E7] rounded-full flex justify-center items-center hover:bg-[#6CB2E7] hover:text-white transition-all duration-300"
                aria-label="Share on Facebook"
              >
                <FiFacebook size={18} />
              </Link>
              <Link
                href="#"
                className="size-9 border border-[#6CB2E7] text-[#6CB2E7] rounded-full flex justify-center items-center hover:bg-[#6CB2E7] hover:text-white transition-all duration-300"
                aria-label="Share on LinkedIn"
              >
                <FiLinkedin size={18} />
              </Link>
              <Link
                href="#"
                className="size-9 border border-[#6CB2E7] text-[#6CB2E7] rounded-full flex justify-center items-center hover:bg-[#6CB2E7] hover:text-white transition-all duration-300"
                aria-label="Share on Twitter"
              >
                <FiTwitter size={18} />
              </Link>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
};

export default BlogDetails;