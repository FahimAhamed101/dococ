import React from "react";
import Image from "next/image";
import Link from "next/link";

interface TeamMember {
  id: number;
  name: string;
  degree: string;
  specialty: string;
  imageUrl: string;
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-[#EEE2EE] shadow-md rounded-xl overflow-hidden w-full max-w-xs mx-auto">
      {/* Profile Image */}
      <div className="relative w-full aspect-[3/4]">
        <Link href={`/team-members/${member.id}`} className="block h-full">
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </Link>
      </div>

      {/* Profile Info */}
      <div className="p-4 text-gray-800 space-y-2">
        <h2 className="text-xl font-semibold line-clamp-1">{member.name}</h2>
        <p className="text-gray-600 line-clamp-1">{member.degree}</p>

        {/* Specialties */}
        <div className="mt-3">
          <p className="text-sm font-medium text-gray-700 mb-1">Specialty</p>
          <div className="relative w-full h-12 rounded overflow-hidden">
            <Image
              src="https://i.ibb.co.com/R64gCDv/Rectangle-18831.png"
              alt="Specialty background"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
            <span className="absolute top-1/2 left-4 -translate-y-1/2 text-white text-sm font-semibold line-clamp-1">
              {member.specialty}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMemberCard;