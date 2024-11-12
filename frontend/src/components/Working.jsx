import React from "react";
import SectionHeader2 from "./SectionHeader2";
import { SectionCard } from "./SectionCard";
import SectionHeader3 from "./SectionHeader3";
import TestimonialSlider from "./TestimonialSlider";

export default function Working() {
  const text =
    "The state-of-the art facility has automated machinery, is installed with rust-free pipelines and faucets and uses only RO treated water.";
  const client =
    "In addition to a wide variety of products, customers can utilize a plethora of in-house services.";

    const testimonials = [
        {
            name: "Marguerite Joe",
            role: "Customer",
            image: "testiImg.png",
            quote: "Continually productize compelling quality for packed with all Elated productize compelling quality.",
            rate:4.5
        },
        {
            name: "Hello World",
            role: "Customer",
            image: "testiImg.png",
            quote: "Continually productize compelling quality for packed with all Elated productize compelling quality.",
            rate:2.5
        },
        // More testimonials
    ];
    
  return (
    <>
      <div className=" bg-white">
        <div className="container mx-auto px-4 py-8 mt-16">
          <SectionHeader2 text={text} color={"white"} textColor={"#111111"} />
        </div>
        <div className="flex flex-col px-4 my-8 md:flex-row justify-center gap-8 items-center">
          <SectionCard
            svgPath="SVG1.svg" // Provide the actual path
            title="Choose Option"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse luctus nec elit in vulputate."
          />
          <SectionCard
            svgPath="SVG2.svg" // Provide the actual path
            title="Order In Process"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse luctus nec elit in vulputate."
          />
          <SectionCard
            svgPath="SVG3.svg" // Provide the actual path
            title="Delivery"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse luctus nec elit in vulputate."
          />
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 mt-16">
        <SectionHeader3 text={client} color={"white"} textColor={"#111111"} />

        <TestimonialSlider testimonials={testimonials} />
      </div>
      <div className="px-4 md:px-0"></div>
    </>
  );
}
