"use client"; // Add this if using interactivity

import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiFacebook, FiLinkedin, FiTwitter } from "react-icons/fi";

interface RecentBlogCardProps {
  key: number;
  blog: {
    id: number;
    imgSrc: string;
    date: string;
    description: string;
  };
}

const RecentBlogCard = ({ blog }: RecentBlogCardProps) => {
  return (
    <div className="w-full bg-[#F1F9FF] p-5 rounded-xl shadow-lg overflow-hidden">
      {/* Blog Image Container */}
      <div className="w-full h-56 md:h-72 relative rounded-t-xl overflow-hidden">
        <Image
          src={blog.imgSrc}
          alt={`Blog post: ${blog.description.substring(0, 30)}...`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>

      {/* Blog Info */}
      <div className="mt-4 space-y-3">
        {/* Date and Social Icons */}
        <div className="flex justify-between items-center text-gray-500">
          <div className="flex items-center space-x-2">
            <FiCalendar className="flex-shrink-0" />
            <span>{blog.date}</span>
          </div>
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

        {/* Blog Description */}
        <p className="text-gray-700 line-clamp-3">{blog.description}</p>

        {/* Read More Link */}
        <Link 
          href={`/blog/${blog.id}`} 
          className="inline-block mt-2 text-secondary font-semibold hover:underline transition-all"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default RecentBlogCard;