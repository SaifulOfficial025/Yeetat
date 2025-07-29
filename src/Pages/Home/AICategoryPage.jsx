
import React from 'react';
import { useData } from '../../Context/DataContext';
import { useState } from 'react';
import { Star, Search } from 'lucide-react';

function CategoryCard({ category, ais, searchQuery, filterCategoryOnly }) {
  const aiList = (ais || []).filter(ai => {
    let matchesCategory = false;
    if (typeof ai.category === 'object' && ai.category !== null) {
      matchesCategory = ai.category.title === category.title;
    } else {
      matchesCategory = ai.category === category.title;
    }
    if (!matchesCategory) return false;
    // If filtering by category only, do not filter AIs inside the card
    if (filterCategoryOnly) return true;
    // Otherwise, filter AIs by search query
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        ai.title?.toLowerCase().includes(q) ||
        ai.description?.toLowerCase().includes(q)
      );
    }
    return true;
  });
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col min-h-[180px]">
      <div className="flex-shrink-0 w-full bg-[#142a44] flex items-center justify-center p-6">
        <div className="bg-[#142a44] bg-opacity-50 rounded-md p-6 flex items-center justify-center shadow-3xl">
          <Star className="w-16 h-16 text-white" />
        </div>
      </div>
      <div className="flex-grow p-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">{category.title}</h3>
        <div className="flex justify-between items-center text-sm md:text-base rounded px-2 py-1">
          <span className="font-medium">AIs</span>
          <span className="text-gray-500 text-xs md:text-sm">({aiList.length})</span>
        </div>
        {/* List of AIs for this category */}
        <div className="mt-4 space-y-2">
          {aiList.length === 0 ? (
            <div className="text-gray-400 text-xs">No AIs in this category.</div>
          ) : (
            aiList.map(tool => (
              <div key={tool.aiId || tool._id} className="flex items-center gap-3 p-2 bg-gray-50 rounded hover:bg-gray-100">
                {tool.logo ? (
                  <img src={tool.logo.startsWith('http') ? tool.logo : `http://10.10.13.83:4000/${tool.logo}`} alt="AI Logo" className="w-8 h-8 rounded object-cover" />
                ) : (
                  <span className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500">No Image</span>
                )}
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{tool.title}</div>
                  <div className="text-gray-500 text-xs line-clamp-2">{tool.description}</div>
                  <a href={tool.url || tool.link || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-xs">Visit</a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function AICategoryPage() {
  const { ais, categories } = useData();
  const [searchQuery, setSearchQuery] = useState("");

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

        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
          <div className="max-w-7xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-10 md:mb-12 lg:mb-16 bg-white rounded-full shadow-md flex items-center p-2">
              <input
                type="text"
                placeholder="Search over 5000+ AI..."
                className="flex-grow px-4 py-3 text-lg rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 border-none bg-transparent placeholder-gray-400"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button className="p-3 bg-transparent text-gray-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Search className="w-6 h-6" />
              </button>
            </div>

            {/* Categories Grid: one card per category, filtered by search */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {(categories || [])
                .filter(cat => {
                  if (!searchQuery.trim()) return true;
                  const q = searchQuery.toLowerCase();
                  return cat.title.toLowerCase().includes(q) || false;
                })
                .map((cat) => (
                  <CategoryCard
                    key={cat.categoryId || cat._id}
                    category={cat}
                    ais={ais}
                    searchQuery={searchQuery}
                    filterCategoryOnly={searchQuery.trim() && cat.title.toLowerCase().includes(searchQuery.toLowerCase())}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AICategoryPage
