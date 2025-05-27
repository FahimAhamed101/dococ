"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IActiveLink {
  title: string;
  destination: string;
  onClick?: () => void; // Optional onClick prop
}

const ActiveLink = ({ title, destination, onClick }: IActiveLink) => {
  const path = usePathname();
  const active = path === destination;

  return (
    <Link href={destination} onClick={onClick} className="group">
      <li
        className={`font-semibold text-gray-500 border-b-2 duration-300 border-transparent group-hover:border-sky-300 group-hover:text-gray-800 text-[20px] group-hover:-translate-y-[2px] ${
          active && "border-sky-300"
        }`}
      >
        {title}
      </li>
    </Link>
  );
};

export default ActiveLink;
