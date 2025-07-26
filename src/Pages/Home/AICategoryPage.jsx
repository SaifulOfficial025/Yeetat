import React from 'react'
import Category from './Category'
import { Star } from 'lucide-react';
import { Search, CheckCircle, Speaker, PlayCircle, Type } from 'lucide-react';

const CategoryCard = ({ title, icon: IconComponent, items, iconBgColor = 'bg-[#142a44]' }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row min-h-[280px]">
      {/* Left Section - Icon */}
      {/* Increased padding on smaller screens for the icon background to match the image more closely */}
      <div className={`flex-shrink-0 w-full md:w-1/3 ${iconBgColor} flex items-center justify-center p-6 md:p-0`}>
        {/* Adjusted padding for the inner circle to match the image */}
        <div className="bg-[#142a44] bg-opacity-50 rounded-md p-6 sm:p-8 md:p-8 lg:p-10 flex items-center justify-center  shadow-3xl">
          {/* Adjusted icon size to match the image more closely */}
          {IconComponent && <IconComponent className="w-16 h-16 sm:w-20 sm:h-20 text-white" />}
        </div>
      </div>

      {/* Right Section - Content */}
      <div className="flex-grow p-6 md:p-8 lg:p-10">
        {/* Adjusted font sizes and margins to match the image */}
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-5">
          {title}
        </h3>
        <ul className="space-y-2 text-gray-700">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between items-center text-sm md:text-base">
              {/* Note: The image implies tiny icons next to sub-item names.
                  You'd need to provide image paths for 'item.icon' if you have them.
                  For now, it's just a placeholder img tag. */}
              <span className="flex items-center">
                {item.icon && <img src={item.icon} alt={item.name} className="w-4 h-4 mr-2" />}
                {item.name}
              </span>
              <span className="text-gray-500 text-xs md:text-sm">({item.count})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


const categories = [
    {
      title: "AI Productivity Tools",
      icon: CheckCircle,
      items: [
        { name: "E-mail", count: 55 },
        { name: "Education / Studies", count: 231 },
        { name: "Extensions ChatGPT", count: 99 },
        { name: "Files & Spreadsheets", count: 75 },
        { name: "Memory", count: 22 },
        { name: "Search engine", count: 55 },
        { name: "Presentation", count: 30 },
        { name: "Productivity", count: 256 },
        { name: "Translation", count: 45 },
      ],
    },
    {
      title: "AI Assistants",
      icon: Speaker, // Using Speaker icon as a proxy for the microphone/person icon
      items: [
        { name: "Legal Assistants", count: 23 },
        { name: "Life Assistants", count: 212 },
        { name: "AI Chat & Assistant", count: 40 },
        { name: "ChatBots", count: 110 },
      ],
    },
    {
      title: "AI Video Tools",
      icon: PlayCircle,
      items: [
        { name: "Video Edition", count: 137 },
        { name: "Video Generators", count: 173 },
        { name: "Text-to-video", count: 48 },
      ],
    },
    {
      title: "AI Text Generators",
      icon: Type,
      items: [
        { name: "Storytelling Generator", count: 42 },
        { name: "Text Generators", count: 56 },
        { name: "Prompts & Aids", count: 60 },
        { name: "Writing & Web SEO", count: 199 },
        { name: "Summarizer", count: 71 },
      ],
    },
  ];


function AICategoryPage() {
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
                AI Categories
              </h1>
              <div className="h-[3px] mt-1 rounded-full bg-[linear-gradient(271deg,_#ffbd75_1%,_#fb81b5_26%,_#947bed_51%,_#a0dbfd_98%)]" />
            </div>
          </div>

          <p className="mti-3 text-sm md:text-base px-3 py-1 text-[#003344] flex items-center">
            <span className="text-[20px] text-center">Global view of all available AI categories</span>{" "}
            <Star size={16} className="ms-2" />
          </p>

        </div>

        <Category />
      </section>



         <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="relative mb-10 md:mb-12 lg:mb-16 bg-white rounded-full shadow-md flex items-center p-2">
          <input
            type="text"
            placeholder="Search over 5000+ AI..."
            className="flex-grow px-4 py-3 text-lg rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 border-none bg-transparent placeholder-gray-400"
          />
          <button className="p-3 bg-transparent text-gray-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Search className="w-6 h-6" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              icon={category.icon}
              items={category.items}
            />
          ))}
        </div>
      </div>
    </div>
      
    </div>
  )
}

export default AICategoryPage
