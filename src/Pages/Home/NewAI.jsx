import React, { useState } from 'react';
import { Star } from 'lucide-react';
import Category from './Category';
import { useData } from '../../Context/DataContext';

function NewAI() {
  const { ais } = useData();
  const featuredAIs = (ais || [])
    .filter(ai => ai.isFeatured)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('right');

  // Auto swipe effect
  React.useEffect(() => {
    if (featuredAIs.length > 1) {
      const timer = setInterval(() => {
        setDirection('right');
        setAnimating(true);
        setTimeout(() => {
          setCurrent(prev => (prev + 1) % featuredAIs.length);
          setAnimating(false);
        }, 500); // animation duration
      }, 3500);
      return () => clearInterval(timer);
    }
  }, [featuredAIs.length]);

  // Helper to trim description
  function getTrimmedDescription(desc) {
    if (!desc) return '';
    const words = desc.split(' ');
    if (words.length <= 30) return desc;
    return words.slice(0, 30).join(' ') + '...';
  }

  // Animation classes
  function getSlideClass() {
    if (!animating) return '';
    return direction === 'right'
      ? 'animate-slide-right'
      : 'animate-slide-left';
  }

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

      {/* Featured Tools Carousel */}
      {featuredAIs.length > 0 ? (
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

          {/* Carousel Content */}
          <div className="flex items-center space-x-4 mt-6">
            {/* Logo & Description with Slide Animation */}
            <div className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden ${getSlideClass()}`} style={{ minWidth: '4rem' }}>
              <img
                src={featuredAIs[current].logo ? (featuredAIs[current].logo.startsWith('http') ? featuredAIs[current].logo : `https://ai-capitol-server.onrender.com/${featuredAIs[current].logo}`) : 'https://via.placeholder.com/60x60'}
                alt={featuredAIs[current].title + ' Logo'}
                className="w-16 h-16 object-cover rounded-md"
              />
            </div>
            <div className={`flex-grow transition-all duration-700 ${getSlideClass()}`}>
              <h3 className="text-lg font-semibold text-gray-800">{featuredAIs[current].title}</h3>
              <p className="text-gray-600 mt-1">
                {getTrimmedDescription(featuredAIs[current].description)}
                {featuredAIs[current].description && featuredAIs[current].description.split(' ').length > 30 && (
                  <span className="block text-pink-500 text-xs mt-2">(click on visit to see more)</span>
                )}
              </p>
            </div>
            {/* Upvotes and Visit Button */}
            <div className="flex flex-col items-end space-y-2">
              <a className="flex items-center px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50" href={featuredAIs[current].url || featuredAIs[current].link || '#'} target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                VISIT
              </a>
            </div>
          </div>
          {/* Carousel Controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              className="px-4 py-2 bg-gradient-to-r from-gray-200 to-pink-100 rounded hover:bg-pink-200 font-semibold shadow"
              onClick={() => {
                setDirection('left');
                setAnimating(true);
                setTimeout(() => {
                  setCurrent((current - 1 + featuredAIs.length) % featuredAIs.length);
                  setAnimating(false);
                }, 500);
              }}
              disabled={featuredAIs.length <= 1}
            >
              Prev
            </button>
            <span className="text-sm text-gray-500 font-bold tracking-wide">{current + 1} / {featuredAIs.length}</span>
            <button
              className="px-4 py-2 bg-gradient-to-r from-gray-200 to-purple-100 rounded hover:bg-purple-200 font-semibold shadow"
              onClick={() => {
                setDirection('right');
                setAnimating(true);
                setTimeout(() => {
                  setCurrent((current + 1) % featuredAIs.length);
                  setAnimating(false);
                }, 500);
              }}
              disabled={featuredAIs.length <= 1}
            >
              Next
            </button>

          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto mt-10 mb-10 text-center text-gray-500 bg-white rounded-lg shadow p-6 border-4 border-pink-100">
          <span className="block text-lg font-semibold mb-2">No featured AI tools found.</span>
          <span className="block">Please check your data or mark some AIs as featured.</span>
        </div>
      )}

      <Category className="mt-10" />
    </div>
  )
}

export default NewAI
