import CustomButton from "@/components/UI/CustomButton";
import { IoCheckmarkOutline } from "react-icons/io5";

const HomePricing = () => {
  return (
    <section className="w-full bg-[#F4FCF8] px-5 py-20">
      {/* Header Section */}
      <div className="text-center space-y-3 mb-10">
        <h1 className="text-4xl font-semibold text-[#32526B]">Pricing</h1>
        <p className="">
          Problems trying to resolve the conflict between <br />
          the two major realms of Classical physics
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto  grid grid-cols-1 md:grid-cols-3 gap-8 items-center ">
        {/* Free Plan */}
        <div className="bg-[#77C4FE] px-4 rounded-2xl text-white">
          <h2 className="text-5xl font-bold  pt-8 text-center">Consultation</h2>
          <div className="border-b border-white"></div>
          <div className="flex gap-2 pt-3 justify-center items-center ">
            <p className="text-3xl pt-3 md:text-6xl font-bold">5.99</p>
            <div className="text-lg ">
              <span className="">$</span>
              <br />
              <span className="font-bold">Per</span>
            </div>
          </div>
          <div className="px-10 pb-10 flex flex-col items-center">
            <ul className="space-y-6 text-white">
              <li className="flex items-center">
                <span className="size-8 rounded-full flex justify-center items-center bg-white text-primary">
                  <IoCheckmarkOutline size={20} />
                </span>
                <span className="ml-2">Unlimited product updates</span>
              </li>
              <li className="flex items-center">
                <span className="size-8 rounded-full flex justify-center items-center bg-white text-primary">
                  <IoCheckmarkOutline size={20} />
                </span>
                <span className="ml-2">Unlimited product updates</span>
              </li>
              <li className="flex items-center">
                <span className="size-8 rounded-full flex justify-center items-center bg-white text-primary">
                  <IoCheckmarkOutline size={20} />
                </span>
                <span className="ml-2">Unlimited product updates</span>
              </li>
              <li className="flex items-center">
                <span className="size-8 rounded-full flex justify-center items-center bg-[#BDBDBD] text-white">
                  <IoCheckmarkOutline size={20} />
                </span>
                <span className="ml-2">Appointment reminders</span>
              </li>
              <li className="flex items-center">
                <span className="size-8 rounded-full flex justify-center items-center bg-[#BDBDBD] text-white">
                  <IoCheckmarkOutline size={20} />
                </span>
                <span className="ml-2">Email and community support</span>
              </li>
            </ul>
          </div>{" "}
          <button className="mb-8 bg-white py-3 rounded-xl text-primary  w-full">
            Try Free
          </button>
        </div>

        {/* Standard Plan */}
        <div className="bg-[#D5EDFF]  px-4  rounded-2xl text-center text-gray-800">
          <h2 className="text-5xl font-bold  pt-8 text-center">Standard</h2>
          <div className="border-b border-white"></div>
          <div className="flex gap-2 pt-3 justify-center items-center ">
            <p className="text-3xl pt-3 md:text-6xl font-bold">39.99</p>
            <div className="text-lg relative">
              <div className="absolute top-[-1]">$ </div>
              <div className="font-semibold pt-7">Per Month</div>
            </div>
          </div>
          <div className="px-10 pb-10 flex flex-col items-center">
            <ul className="text-left space-y-6">
              <li className="flex  items-center">
                <span className="size-8 rounded-full flex justify-center items-center bg-[#6CB2E7] text-white">
                  <IoCheckmarkOutline size={20} />
                </span>
                <span className="ml-2">Unlimited product updates</span>
              </li>
              <li className="flex  items-center">
                <span className="size-8 rounded-full flex justify-center items-center bg-[#6CB2E7] text-white">
                  <IoCheckmarkOutline size={20} />
                </span>
                <span className="ml-2">Unlimited product updates</span>
              </li>
              <li className="flex  items-center">
                <span className="size-8 rounded-full flex justify-center items-center bg-[#6CB2E7] text-white">
                  <IoCheckmarkOutline size={20} />
                </span>
                <span className="ml-2">Unlimited product updates</span>
              </li>
              <li className="flex  items-center">
                <span className="size-8 rounded-full flex justify-center items-center bg-[#BDBDBD] text-white">
                  <IoCheckmarkOutline size={20} />
                </span>
                <span className="ml-2">Appointment reminders</span>
              </li>
             <li className="flex items-center">
                <span className="size-8 rounded-full flex justify-center items-center bg-[#BDBDBD] text-white">
                  <IoCheckmarkOutline size={20} />
                </span>
                <span className="ml-2">Email and community support</span>
              </li>
            </ul>
           
          </div> <CustomButton className="w-full mb-8 py-3 "> Buy Now</CustomButton>
        </div>

        {/* Premium Plan */}
        <div className="bg-[#D5EDFF]  px-4   rounded-2xl text-gray-800">
          <h2 className="text-5xl font-bold  pt-8 text-center"> Premium</h2>
          <div className="border-b border-white"></div>
          <div className="flex gap-2 pt-3 justify-center items-center ">
            <p className="text-3xl pt-3 md:text-6xl font-bold">199.99</p>
            <div className="text-lg relative">
              <div className="absolute top-[-1]">$ </div>
              <div className="font-semibold pt-7">Per Month</div>
            </div>
          </div>
          <div className="px-10 pb-10 flex flex-col items-center">
            <ul className="text-left space-y-6">
              <li className="flex items-center">
                <span className="size-8 rounded-full flex justify-center items-center bg-[#6CB2E7] text-white">
                  <IoCheckmarkOutline size={20} />
                </span>
                <span className="ml-2">Unlimited product updates</span>
              </li>
              <li className="flex items-center">
                <span className="size-8 rounded-full flex justify-center items-center bg-[#6CB2E7] text-white">
                  <IoCheckmarkOutline size={20} />
                </span>
                <span className="ml-2">Unlimited product updates</span>
              </li>
              <li className="flex items-center">
                <span className="size-8 rounded-full flex justify-center items-center bg-[#6CB2E7] text-white">
                  <IoCheckmarkOutline size={20} />
                </span>
                <span className="ml-2">Unlimited product updates</span>
              </li>
              <li className="flex items-center">
                <span className="size-8 rounded-full flex justify-center items-center bg-[#BDBDBD] text-white">
                  <IoCheckmarkOutline size={20} />
                </span>
                <span className="ml-2">Appointment reminders</span>
              </li>
              <li className="flex items-center">
                <span className="size-8 rounded-full flex justify-center items-center bg-[#BDBDBD] text-white">
                  <IoCheckmarkOutline size={20} />
                </span>
                <span className="ml-2">Email and community support</span>
              </li>
            </ul>
           
          </div> <CustomButton className="w-full py-3 mb-8"> Buy Now</CustomButton>
        </div>
      </div>
    </section>
  );
};

export default HomePricing;
