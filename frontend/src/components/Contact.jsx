import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactType: "query",
    details: "",
    rating: 0, // New state for storing the rating
  });

  const StarRating = ({ rating, setRating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={
                index <= rating
                  ? "text-yellow-500 text-3xl"
                  : "text-gray-400 text-3xl"
              }
              onClick={() => setRating(index)}
              aria-label={`Rate ${index} stars`}
            >
              <span className="text-lg leading-none">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Construct the subject line with dynamic insertion of contact type and user's full name
    const subject = encodeURIComponent(
      `${
        formData.contactType.charAt(0).toUpperCase() +
        formData.contactType.slice(1)
      } from ${formData.fullName}`
    );

    // Start the body text and conditionally add the rating if the contact type is 'feedback'
    let body = encodeURIComponent(formData.details);
    if (formData.contactType === "feedback") {
      body = `Rated ${formData.rating} out of 5\n\n` + body;
    }

    // Create the mailto link
    const mailtoLink = `mailto:nirmalshah20519@gmail.com?subject=${subject}&body=${body}`;

    // Open the mailto link in the same tab
    window.location.href = mailtoLink;

    // Log to console and alert user (optional, can be removed in production)
    console.log(formData);
    // alert("Opening your email client...");
  };

  const generateMailtoLink = () => {
    const subject = encodeURIComponent(`${formData.contactType.charAt(0).toUpperCase() + formData.contactType.slice(1)} from ${formData.fullName}`);
    let body = encodeURIComponent(formData.details);
    if (formData.contactType === "feedback") {
      body = `Rated ${formData.rating} out of 5\n\n` + body;
    }
    return `mailto:nirmalshah20519@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-xl mx-4 md:mx-auto p-4 bg-white my-16 border shadow-lg rounded-2xl ">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
        Contact Us
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="contactType"
            className="block text-sm font-medium text-gray-700"
          >
            Contact Type
          </label>
          <select
            name="contactType"
            id="contactType"
            value={formData.contactType}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="query">Query</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>
        {formData.contactType === "feedback" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <StarRating
              rating={formData.rating}
              setRating={(rating) => setFormData({ ...formData, rating })}
            />
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="details"
            className="block text-sm font-medium text-gray-700"
          >
            Details
          </label>
          <textarea
            name="details"
            id="details"
            rows="4"
            required
            value={formData.details}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <a
          href={generateMailtoLink()}
          className="w-full block text-center bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </a>
      </form>
    </div>
  );
}
