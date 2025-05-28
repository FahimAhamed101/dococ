import { IoMailUnread } from "react-icons/io5";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import MainContainer from "../MainContainer/MainContainer";

const SubNavbar = () => {
  return (
    <section className="w-full bg-[#77C4FE] px-2 py-2 sm:py-3 text-black text-sm sm:text-base">
      <MainContainer className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-6 md:gap-8">
        <div className="flex items-center gap-2 font-medium">
          <IoMailUnread className="text-lg sm:text-xl" />
          <span className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] xs:max-w-[220px] sm:max-w-none">
            rakib2020.tkg@gmail.com
          </span>
        </div>
        <div className="flex items-center gap-2 font-medium">
          <TfiHeadphoneAlt className="text-lg sm:text-xl" />
          <span>+8801319101179</span>
        </div>
      </MainContainer>
    </section>
  );
};

export default SubNavbar;