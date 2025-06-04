// src/app/team-members/TeamMemberCard.tsx
import React from "react";
import Image from "next/image";
import { FacebookOutlined, InstagramOutlined, LinkedinOutlined, TwitterOutlined } from "@ant-design/icons";
import Link from "next/link";

interface TeamMember {
  id: string;
  name: string;
  degree: string;
  specialty: string;
  imageUrl: string;
  about?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    X?: string;
  };
}

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {

  // Get the backend URL from environment variables
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://10.0.60.18:6060';
  
  // Construct the full image URL
  const imageUrl = member.imageUrl.startsWith('http') 
    ? member.imageUrl
    : `${backendUrl}${member.imageUrl}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-64 w-full">
        <Image
          src={imageUrl}
          alt={member.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
       <Link
            href={`/team-members/${member.id}`}
            className="text-secondary font-semibold hover:underline transition-all"
          >
           <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
          </Link>
        <p className="text-sm text-blue-600">{member.degree}</p>
        <p className="text-sm text-gray-600 mt-1">{member.specialty}</p>
        {member.about && (
          <p className="text-xs text-gray-500 mt-2 line-clamp-3">{member.about}</p>
        )}
        {member.socialMedia && (
          <div className="flex gap-2 mt-3">
            {member.socialMedia.facebook && (
              <a href={member.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                <FacebookOutlined className="text-blue-600" />
              </a>
            )}
            {member.socialMedia.instagram && (
              <a href={member.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                <InstagramOutlined className="text-pink-600" />
              </a>
            )}
            {member.socialMedia.linkedin && (
              <a href={member.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinOutlined className="text-blue-700" />
              </a>
            )}
            {member.socialMedia.X && (
              <a href={member.socialMedia.X} target="_blank" rel="noopener noreferrer">
                <TwitterOutlined className="text-black" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMemberCard;