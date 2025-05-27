"use client";
import logo from "@/assets/logo/logo.png";
import CustomButton from "@/components/UI/CustomButton";
import { MenuOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import MainContainer from "../MainContainer/MainContainer";
import ActiveLink from "./ActiveLink";
import mail from "@/assets/mail.svg";
import profile from "@/assets/profile.png";
import DropdownModal from "./DropdownModal";
import { usePathname } from 'next/navigation'; // Changed from useRouter

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
  const [drawerVisible, setDrawerVisible] = useState(false);
  const pathname = usePathname(); // Using usePathname instead of useRouter
  const isHomePage = pathname === '/';
  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <nav className={isHomePage ? 'bg-sky-50' : 'w-full py-5'}>
      <MainContainer className="p-3 bg-sky-100 flex justify-between items-center rounded-lg">
        <div>
          <div className="size-[80px] relative mx-auto md:mx-0 rounded-full shadow-md shadow-sky-100" style={{ boxShadow: "0 0 15px rgb(119,196,254)" }}>
            <Image fill src={logo} alt="logo" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex justify-center text-white items-center gap-10">
          {navLinks.map(({ label, href }) => (
            <ActiveLink key={label} title={label} destination={href} />
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden md:block ">
            <Link href={"/login"}>
              <CustomButton className="bg-sky-300 text-lg">Book Now</CustomButton>
            </Link>
          </div>
          <button
            className=" bg-sky-200  text-sky-700 flex items-center p-3 rounded-full hover:bg-sky-300 transition-colors
  "
            onClick={() => console.log("Mail clicked")}
          >
      <Image
              src={mail}
              alt="Profile"
              width={24}
              height={24}
              className="rounded-full object-cover"
            />

          </button>

          <button
            className="rounded-full overflow-hidden border-2 border-transparent hover:border-sky-300 transition-all"
             onClick={() => setIsModalOpen(true)}
          >
            <Image
              src={profile}
              alt="Profile"
              width={44}
              height={44}
              className="rounded-full object-cover"
            />
          </button>
        </div>
        {/* Mobile Drawer Button */}
        <Button
          className="md:hidden"
          icon={<MenuOutlined />}
          onClick={showDrawer}
        />
      <DropdownModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        {/* Drawer for Mobile Navigation */}
        <Drawer
          title="E Clinic"
          placement="right"
          onClose={closeDrawer}
          open={drawerVisible}
        >
          <ul className="flex flex-col items-start gap-4">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <ActiveLink
                  title={label}
                  destination={href}
                  onClick={closeDrawer} // Close drawer when link is clicked
                />
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <CustomButton>Book Now</CustomButton>
          </div>
        </Drawer>
      </MainContainer>
    </nav>
  );
};

export default Navbar;
