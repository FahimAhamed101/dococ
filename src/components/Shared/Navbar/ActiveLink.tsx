"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IActiveLink {
  title: string;
  destination: string;
  onClick?: () => void;
}

const ActiveLink = ({ title, destination, onClick }: IActiveLink) => {
  const path = usePathname();
  const active = path === destination;

  return (
    <Link href={destination} onClick={onClick} className="group block">
      <li
        className={`
          font-medium  /* Reduced from semibold for better readability */
          text-sm xs:text-base sm:text-[17px]  /* Better font size progression */
          py-1.5 sm:py-2  /* Reduced padding on mobile */
          text-gray-600  /* Slightly lighter for better contrast */
          border-b-2 
          duration-200  /* Faster transition */
          border-transparent 
          group-hover:border-sky-400  /* More visible hover state */
          group-hover:text-gray-900 
          transition-all  /* Smooth all properties */
          group-hover:translate-y-0  /* Removed vertical movement */
          whitespace-nowrap  /* Prevent text wrapping */
          px-1  /* Small horizontal padding */
          ${active ? "border-sky-400 text-gray-900" : ""}
        `}
      >
        {title}
      </li>
    </Link>
  );
};

export default ActiveLink;