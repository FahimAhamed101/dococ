"use client";
import logo from "@/assets/logo/logo.png";
import CustomButton from "@/components/UI/CustomButton";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MainContainer from "../MainContainer/MainContainer";
import ActiveLink from "./ActiveLink";
import mail from "@/assets/mail.svg";
import profile from "@/assets/profile.png";
import DropdownModal from "./DropdownModal";
import LogoutModal from "./LogoutModal"; // Added import for LogoutModal
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


const navLinks = [
  { label: "Home", href: "/" },
  { label: "Chat Bot", href: "/chat-bot" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About Me", href: "/about-me" },
  { label: "Team Members", href: "/team-members" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  // const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLogoutOpen, setIsLogoutModalOpen] = useState(false);
  const isPricing = pathname === "/pricing";
  const isFaq = pathname === "/faq";
  const isContact = pathname === "/contact";
  const isPrivacyPolicy = pathname === "/privacy-policy";
  const isTermCondition = pathname === "/terms-conditions";
  const isChangePassword = pathname === "/change-password";
  const isNotFound = pathname === "/notfound";
  const isMessage = pathname === "/message";
   const isReview = pathname === "/review";
  return (
    <nav
      className={
        isHomePage
          ? "bg-sky-50 pt-5"
          : isPricing
          ? "bg-[#F4FCF8]"
          : isFaq
          ? "bg-sky-50 pt-5"
          : isContact
        
          ? "bg-sky-50 pt-5" 
          : isReview 
          ? "bg-sky-50 pt-5"
          : isNotFound
          ? "bg-[#F1F9FF] pt-5"
          : isTermCondition
          ? "bg-sky-50 pt-5"
          : isPrivacyPolicy
          ? "bg-sky-50 pt-5"
          : isChangePassword
          ? "bg-[#F1F9FF] pt-5"
            : isMessage
          ? "bg-[#F1F9FF] pt-5"
          : "w-full py-2 sm:py-3 md:py-4 lg:py-5"
      }
    >
      <MainContainer className="p-2 sm:p-3 md:p-4 bg-sky-100 flex justify-between items-center rounded-lg">
        {/* Logo - responsive sizing */}
        <div className="flex items-center">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 relative rounded-full shadow-md shadow-sky-100"
            style={{ boxShadow: "0 0 15px rgb(119,196,254)" }}
          >
            <Image
              fill
              src={logo}
              alt="logo"
              className="object-contain p-1"
              sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
            />
          </div>
        </div>

        {/* Desktop Navigation - hidden on mobile */}
        <ul className="hidden lg:flex justify-center items-center gap-4 xl:gap-6 2xl:gap-8">
          {navLinks.map(({ label, href }) => (
            <ActiveLink key={label} title={label} destination={href} />
          ))}
        </ul>

        {/* Tablet Navigation - hidden on mobile and desktop */}
        <ul className="hidden md:flex lg:hidden justify-center items-center gap-3">
          {navLinks.slice(0, 4).map(({ label, href }) => (
            <ActiveLink key={label} title={label} destination={href} />
          ))}
        </ul>

        {/* Right side buttons */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
          {/* Book Now button - hidden on mobile, different sizes */}

 {isAuthenticated ? (
<>
          {/* Mail button - responsive sizing */}
          <button
            className="bg-sky-200 text-sky-700 flex flex-col justify-center items-center p-1 xs:p-1.5 sm:p-1.5 md:p-2 rounded-full hover:bg-sky-300 transition-colors"
            onClick={() => console.log("Mail clicked")}
            aria-label="Contact us"
          >
            <Image
              src={mail}
              alt="Mail"
              width={16}
              height={16}
              className="w-6 h-6 xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-6 md:h-6"
            />
          </button>

          {/* Profile button - responsive sizing */}
          <button
            className="rounded-full overflow-hidden border-2 border-transparent hover:border-sky-300 transition-all"
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src={profile}
              alt="Profile"
              width={28}
              height={28}
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9"
            />
          </button>

          {/* Mobile menu button - visible on mobile and tablet */}
          <Button
            className="md:hidden ml-1 sm:ml-2"
            type="text"
            icon={<MenuOutlined className="text-base sm:text-lg" />}
            onClick={showDrawer}
          />
          </>

        
  ) : (  <div className="hidden sm:block">
            <Link href={"/login"}>
              <CustomButton className="bg-sky-300 text-xs sm:text-sm md:text-base lg:text-lg">
                Book Now
              </CustomButton>
            </Link>
          </div>
          )}
        </div>
 
        <DropdownModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          setIsLogoutModalOpen={setIsLogoutModalOpen}
        />
        <LogoutModal
          isOpen={isModalLogoutOpen}
          onClose={() => setIsLogoutModalOpen(false)}
        />

        {/* Mobile Drawer */}
        <Drawer
          title={
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 relative">
                <Image src={logo} alt="Logo" fill className="object-contain" />
              </div>
              <span className="text-lg font-medium">Menu</span>
            </div>
          }
          placement="right"
          onClose={closeDrawer}
          open={drawerVisible}
          width="85%"
          className="[&_.ant-drawer-body]:pt-3"
        >
          <ul className="flex flex-col gap-3 sm:gap-4">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <ActiveLink
                  title={label}
                  destination={href}
                  onClick={closeDrawer}
                />
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <CustomButton className="w-full text-sm sm:text-base">
              Book Now
            </CustomButton>
          </div>
        </Drawer>
      </MainContainer>
    </nav>
  );
};

export default Navbar;