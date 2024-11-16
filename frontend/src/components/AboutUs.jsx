import React from "react";

export default function AboutUs() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-8 md:px-16 py-16">
      <div className="flex-1 text-center items-center">
        <img
          src="about_us.png"
          alt="Special Tiffin"
          className="inline-block md:h-96 md:w-96 w-full"
        />
      </div>
      <div className="flex-1 relative">
        <h1 className=" text-3xl md:text-4xl text-gray-800 mb-4  md:w-2/3">
          About
          <span className="special-font ms-3 text-primary">us</span>
          <img
            className="absolute top-4 left-36 w-20 h-3"
            alt="Line decoration"
            src={"/Line1Gr.svg"}
          />
          {/* us */}
        </h1>
        <p className=" text-sm md:text-md text-gray-600 mb-6">
        24Seven is the one-stop-shop for all customer needs, whatever the time of day or night. Customers can find the best global brands on the shelves to meet their daily needs like groceries, snacks, a wide variety of beverages, personal care products, and even Colorbar - our own brand of premium cosmetics. The ready-to-eat food counters feature the best quality of local & international cuisines, made within our very own state-of-the-art central kitchen. our own brand of premium cosmetics.
        <br /><br />
        Our dedication to providing comprehensive solutions ensures that customers not only find a diverse selection of products but also have access to a suite of services that cater to their varied needs. From essential tasks to indulgent extras, we pride ourselves on being more than just a shopping destination - we are a hub of convenience and innovation. 
        </p>
        <div className="flex gap-4 mb-6">
          <button className="btn-order">Get Started</button>
        </div>
      </div>
    </div>
  );
}
