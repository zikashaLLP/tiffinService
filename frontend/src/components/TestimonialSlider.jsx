import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import Slider from "react-slick";

const TestimonialSlider = ({ testimonials }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
  };
  // console.log(testimonials);

  const renderStars = (ratingCount) => {
    return Array.from({ length: 5 }, (_, index) => {
      if (index + 1 <= Math.floor(ratingCount)) {
        // Full Star
        return (
          <FaStar
            key={index}
            className="h-4 w-4 md:h-6 md:w-6 text-green-500"
          />
        );
      } else if (index < Math.ceil(ratingCount) && index + 1 > ratingCount) {
        // Half Star
        return (
          <FaStarHalfAlt
            key={index}
            className="h-4 w-4 md:h-6 md:w-6 text-green-500"
          />
        );
      } else {
        // Empty Star
        return (
          <FaRegStar
            key={index}
            className="h-4 w-4 md:h-6 md:w-6 text-gray-400"
          />
        );
      }
    });
  };

  return (
    <div className="container mx-auto px-4">
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index + 1} className="outline-none">
            {/* {console.log('testimonial',index)} */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-16 items-center justify-center p-10 ">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full md:w-64 md:h-64 mb-4"
              />
              <div className="w-full mt-8 md:w-1/2 relative">
                <img src="quote.png" className=" absolute -top-10" alt="" />
                <p className="text-lg italic text-gray-800">
                “{testimonial.quote}”
                </p>
                <div className=" flex flex-col md:flex-row gap-2 md:gap-6 md:items-center">
                  <h5 className="text-xl md:text-3xl font-bold mt-2">
                    {testimonial.name}
                  </h5>
                  <div className=" flex ">{renderStars(+testimonial.rate)}</div>
                </div>
                <p className="text-sm text-gray-600 mt-4">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
