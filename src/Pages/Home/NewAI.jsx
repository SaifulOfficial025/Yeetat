import React from 'react'
import { Star } from 'lucide-react';
import Category from './Category';

function NewAI() {
  return (
    <div>
        <section className="relative bg-sky-50/50">
        <div className="absolute inset-0 bg-[url('https://www.azul.com/wp-content/uploads/avd-swoosh-2.svg')] bg-cover bg-center bg-no-repeat opacity-10 pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center h-[25vh] px-4">
          <div className="flex items-center gap-3">
            <img
              src="https://i.ibb.co/CcrFMhc/AI-Capitol-mascoot-2032-removebg-preview.png"
              className="w-[60px] md:w-[80px]"
              alt="Mascot"
            />
            <div>
              <h1 className="text-[26px] md:text-[36px] font-extrabold text-[#13363f]">
                New AI Tools
              </h1>
              <div className="h-[3px] mt-1 rounded-full bg-[linear-gradient(271deg,_#ffbd75_1%,_#fb81b5_26%,_#947bed_51%,_#a0dbfd_98%)]" />
            </div>
          </div>

          <p className="mti-3 text-sm md:text-base px-3 py-1 text-[#003344] flex items-center">
            <span className="text-[20px] text-center">There is always an AI that can help you</span>{" "}
            <Star size={16} className="ms-2" />
          </p>
        </div>
      </section>



<div className="relative p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-10 border-4 border-pink-200 transform transition-all duration-300 hover:scale-105 mb-10">
      {/* Featured Tool Badge */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-400 to-pink-500 text-white text-sm px-4 py-1 rounded-full flex items-center space-x-1">
        <span className="text-xs">⭐</span>
        <span className="text-xs">⭐</span>
        <span className="text-xs">⭐</span>
        <span>Featured Tool</span>
        <span className="text-xs">⭐</span>
        <span className="text-xs">⭐</span>
        <span className="text-xs">⭐</span>
      </div>


      <div className="flex items-center space-x-4 mt-6">
        {/* SellerPic Logo */}
        <div className="flex-shrink-0">
          <img
            src="https://via.placeholder.com/60x60" // Replace with actual SellerPic logo URL
            alt="SellerPic Logo"
            className="w-16 h-16 rounded-md"
          />
        </div>

        {/* Description */}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-800">SellerPic</h3>
          <p className="text-gray-600 mt-1">
            Turn a simple product photo into a complete marketing campaign, with professional
            images, infographics, scenarios and dynamic videos. Boost your online sales without photo
            shoots or technical skills.
          </p>
        </div>

        {/* Upvotes and Visit Button */}
        <div className="flex flex-col items-end space-y-2">
          
          <button className="flex items-center px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
            VISIT
          </button>
        </div>
      </div>
    </div>



    <Category className="mt-10" />

    </div>
  )
}

export default NewAI
