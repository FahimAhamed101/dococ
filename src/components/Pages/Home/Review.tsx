"use client";
import MainContainer from "@/components/Shared/MainContainer/MainContainer";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Review {
  name: string;
  location: string;
  review: string;
  rating: number;
  image: string;
}

const reviews: Review[] = [
  {
    name: "Elza R",
    location: "New York, USA",
    review:
      "Navigating my husband's chronic illness felt overwhelming until we joined Cliniva. Our MVR has been with us every step of the way, ensuring we make informed decisions.",
    rating: 5,
    image: "https://i.ibb.co.com/YDBLTZF/Street.jpg",
  },
  {
    name: "John D",
    location: "Los Angeles, USA",
    review:
      "The experience has been nothing short of life-changing. With Cliniva, we felt secure.",
    rating: 5,
    image: "https://i.ibb.co.com/YDBLTZF/Street.jpg",
  },
  {
    name: "Jane M",
    location: "Chicago, USA",
    review:
      "We have had such peace of mind thanks to Cliniva. Highly recommended for families!",
    rating: 4,
    image: "https://i.ibb.co.com/YDBLTZF/Street.jpg",
  },
];

interface CustomArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  direction: "prev" | "next";
}

const CustomArrow: React.FC<CustomArrowProps> = ({ onClick, direction }) => (
  <button
    onClick={onClick}
    type="button"
    aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
    className={`
      absolute z-10 
      ${direction === "prev" ? "left-2" : "right-2"}
      top-1/2 -translate-y-1/2
      w-8 h-5 rounded-xl
      bg-[#77C4FE] hover:bg-white/50
      backdrop-blur-sm
      shadow-lg
      flex items-center justify-center
      transition-all 
      hover:scale-110
      focus:outline-none
    `}
  >
    {direction === "prev" ? (
     <svg width="14" className="h-2 w-4" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.78033 1.53033C6.07322 1.23744 6.07322 0.762563 5.78033 0.46967C5.48744 0.176777 5.01256 0.176777 4.71967 0.46967L0.71967 4.46967C0.573223 4.61612 0.5 4.80806 0.5 5C0.5 5.10169 0.520239 5.19866 0.556909 5.28709C0.593509 5.37555 0.647763 5.45842 0.71967 5.53033L4.71967 9.53033C5.01256 9.82322 5.48744 9.82322 5.78033 9.53033C6.07322 9.23744 6.07322 8.76256 5.78033 8.46967L3.06066 5.75H12.75C13.1642 5.75 13.5 5.41421 13.5 5C13.5 4.58579 13.1642 4.25 12.75 4.25H3.06066L5.78033 1.53033Z" fill="#32526B"/>
</svg>

    ) : (
     <svg width="14" className="h-2 w-4" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.21967 8.46967C7.92678 8.76256 7.92678 9.23744 8.21967 9.53033C8.51256 9.82322 8.98744 9.82322 9.28033 9.53033L13.2803 5.53033C13.4268 5.38388 13.5 5.19194 13.5 5C13.5 4.89831 13.4798 4.80134 13.4431 4.71291C13.4065 4.62445 13.3522 4.54158 13.2803 4.46967L9.28033 0.46967C8.98744 0.176776 8.51256 0.176776 8.21967 0.46967C7.92678 0.762563 7.92678 1.23744 8.21967 1.53033L10.9393 4.25L1.25 4.25C0.835786 4.25 0.5 4.58579 0.5 5C0.5 5.41421 0.835786 5.75 1.25 5.75L10.9393 5.75L8.21967 8.46967Z" fill="#32526B"/>
</svg>

    )}
  </button>
);

const Review: React.FC = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="w-full px-5 py-16">
      <MainContainer>
        <div className="text-center space-y-3 mb-10">
          <h1 className="text-4xl font-semibold text-[#32526B]">Some Reviews</h1>
          <p className="text-gray-900">What Are People Saying About Us</p>
        </div>
    <div className="relative"> {/* Wrap Slider and background in a container */}
  {/* Static background (outside Slider) */}
  <div className="hidden absolute md:block w-[13%] z-[-17] h-[520px] bg-[#D3B5D3] rounded-xl left-[78px] top-0"></div>

  {/* Slider (moves independently) */}
  <Slider {...settings} className="w-full">
    {reviews.map((review, index) => (
      <div key={index} className="w-full px-4">
        <div className="w-full flex items-center">
          <div className="w-full md:w-[87%] h-full flex flex-col md:flex-row items-center gap-10 md:z-50 md:ml-[13%]"> {/* Adjust margin to overlap */}
            {/* Image */}
            <div className="w-full h-[300px] md:w-[400px] md:h-[400px] relative">
              <Image
                src={review.image}
                alt={`${review.name}'s review`}
                fill
                className="rounded-xl object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            {/* Review text */}
            <div className="p-4">
              <h4 className="text-3xl font-semibold text-gray-800">
                {review.name}
              </h4>
              <p className="text-gray-500">{review.location}</p>
              <p className="mt-4 text-gray-700">{review.review}</p>
              <div className="mt-4 text-yellow-500 text-2xl">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </Slider>
</div>
      </MainContainer>
    </section>
  );
};

export default Review;