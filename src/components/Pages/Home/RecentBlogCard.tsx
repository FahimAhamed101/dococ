"use client";
import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiFacebook, FiLinkedin, FiTwitter } from "react-icons/fi";
import dayjs from "dayjs";

interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage: string;
  createdAt: string;
  category: string;
  views: number;
  likes: number;
}

interface RecentBlogCardProps {
  blog: Blog;
}

const RecentBlogCard = ({ blog }: RecentBlogCardProps) => {
  // Get the backend URL from environment variables
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://10.0.60.18:6060';
  
  // Construct the full image URL
  const imageUrl = blog.coverImage.startsWith('http') 
    ? blog.coverImage 
    : `${backendUrl}${blog.coverImage}`;

  return (
    <div className="w-full bg-[#F1F9FF] p-5 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Blog Image Container */}
      <div className="w-full h-56 md:h-72 relative rounded-t-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={`Blog post: ${blog.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>

      {/* Rest of the component remains the same */}
      <div className="mt-4 space-y-3">
        {/* Date and Category */}
        <div className="flex justify-between items-center text-gray-500">
          <div className="flex items-center space-x-2">
            <FiCalendar className="flex-shrink-0" />
            <span>{dayjs(blog.createdAt).format("MMM D, YYYY")}</span>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {blog.category}
          </span>
        </div>

        {/* Blog Title */}
        <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">{blog.title}</h3>

        {/* Blog Summary */}
        <p className="text-gray-700 line-clamp-3">{blog.summary}</p>

        {/* Read More and Social Icons */}
        <div className="flex justify-between items-center pt-2">
          <Link
            href={`/blog/${blog.slug}`}
            className="text-secondary font-semibold hover:underline transition-all"
          >
            Read More →
          </Link>
          <div className="flex space-x-3">
            {[FiFacebook, FiLinkedin, FiTwitter].map((Icon, index) => (
              <Link
                key={index}
                href="/"
                className="size-9 border border-secondary text-secondary rounded-full flex justify-center items-center hover:bg-[#6CB2E7] hover:text-white transition-all duration-300 flex-shrink-0"
                aria-label={`Share on ${Icon.name.replace('Fi', '')}`}
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentBlogCard;