import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { MdVerified } from 'react-icons/md';
import { FaArrowAltCircleUp } from 'react-icons/fa';
import { ExternalLink, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Category from '../Home/Category';  // Corrected the import path
import MoreAICategory from './AiCategorySection';
import Brain from '../../assets/brain.webp'; // Ensure this path is correct
import Tree from '../../assets/tree.webp';
import Plane from '../../assets/plane.webp';
import Trophy from '../../assets/trophy.webp';
import Ranking from '../../assets/ranking.webp';

import StarImg from '../../assets/star.webp';
import { useData } from '../../Context/DataContext';
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";



import { Sparkles, Zap, Wrench, MessageCircle } from 'lucide-react'; // Make sure these are imported

const aiTools = {
  "Latest AI": {
    icon: <Sparkles className="w-5 h-5" />,
    tools: [
      { name: "Mixus", icon: "🌟" },
      { name: "Kiro AI", icon: "⭕" },
      { name: "Reachy Mini", icon: "🤖" },
      { name: "Short AI", icon: "🔥" },
      { name: "Video Face Swap AI", icon: "🌸" },
      { name: "PERSO.ai", icon: "⭕" },
      { name: "Kuse", icon: "⚫" },
      { name: "VoiSpark", icon: "💡" },
      { name: "Tattoo Generator IQ", icon: "🎨" },
      { name: "Bioemu Microsoft", icon: "🧬" },
    ],
    count: 2362,
  },
  "AI-Capitol Selection": {
    icon: <Zap className="w-5 h-5" />,
    tools: [
      { name: "Short AI", icon: "🔥" },
      { name: "Video Face Swap AI", icon: "🌸" },
      { name: "PERSO.ai", icon: "⭕" },
      { name: "Kuse", icon: "⚫" },
      { name: "VoiSpark", icon: "💡" },
      { name: "Tattoo Generator IQ", icon: "🎨" },
      { name: "Tidio Copilot", icon: "🎯" },
      { name: "X-doc AI", icon: "❌" },
      { name: "AI PDF Reader", icon: "📄" },
      { name: "AI Text Summarizer", icon: "📝" },
    ],
    count: 166,
  },
  SuperTools: {
    icon: <Wrench className="w-5 h-5" />,
    tools: [
      { name: "Krea.ai", icon: "🎨" },
      { name: "Viggle 2.0", icon: "⚫" },
      { name: "Tome AI", icon: "⚫" },
      { name: "PimEyes", icon: "👁️" },
      { name: "Udio", icon: "🎵" },
      { name: "Hugging Face", icon: "🤗" },
      { name: "GPTGO", icon: "🔍" },
      { name: "Interior AI", icon: "⚫" },
      { name: "AIVA", icon: "🎵" },
      { name: "VLOGGER by Google", icon: "🔍" },
    ],
    count: 58,
  },
  "AI Chat & Assistant": {
    icon: <MessageCircle className="w-5 h-5" />,
    tools: [
      { name: "ChatGPT", icon: "💬" },
      { name: "Claude 4", icon: "🤖" },
      { name: "Gemini AI", icon: "💎" },
      { name: "Qwen2.5-Max", icon: "🔷" },
      { name: "DeepSeek-R1", icon: "🔍" },
      { name: "Microsoft Copilot", icon: "🔄" },
      { name: "Meta AI", icon: "⭕" },
      { name: "Le Chat by Mistral AI", icon: "🦊" },
      { name: "Kimi.ai", icon: "⚫" },
      { name: "Grok-3", icon: "⚫" },
    ],
    count: 40,
  },
};

function FullAI() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { ais, categories } = useData();
    const [modalCategory, setModalCategory] = useState(null);
  
    // Helper: get AIs for a category by strict title match
    const getAIsForCategory = (cat) => {
      if (!ais) return [];
      return ais.filter(ai => {
        if (typeof ai.category === 'object' && ai.category !== null) {
          return ai.category.title === cat.title;
        }
        // fallback for legacy data
        return ai.category === cat.title || ai.categoryId === cat.categoryId || ai.categoryId === cat._id;
      });
    };

  return (
    <div className="bg-sky-50/50 p-4 md:p-6 lg:p-8">
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
                Full AI List
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

      <div className="max-w-7xl mx-auto">
        {/* Search Bar and Category Filter */}
        <Category />

        {/* AI Tools Cards */}
       <section className="bg-sky-50/50 py-20">
      <div className="w-full max-w-7xl mx-auto p-6 ">
        <div className="text-center flex items-center justify-center mb-20">
          <div className="h-[3px] w-[250px] mx-auto mt-1 rounded-full bg-[linear-gradient(271deg,_#ffbd75_1%,_#fb81b5_26%,_#947bed_51%,_#a0dbfd_98%)]" />
          <h2 className="text-2xl font-bold text-gray-400 tracking-wide">SOME AI CATEGORIES</h2>
          <div className="h-[3px] w-[250px] mx-auto mt-1 rounded-full bg-[linear-gradient(271deg,_#ffbd75_1%,_#fb81b5_26%,_#947bed_51%,_#a0dbfd_98%)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {(categories || []).map((cat) => {
            const catAIs = getAIsForCategory(cat);
            return (
              <Card
  key={cat.categoryId || cat._id}
  className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-[360px]"
>
  <CardContent className="flex flex-col flex-1">
    <div className="flex items-center gap-2 mb-4">
      <span className="font-semibold text-gray-800">{cat.title}</span>
    </div>

    {/* AI tool list, flexible height */}
    <div className="flex-1 overflow-hidden mb-4">
      {catAIs.slice(0, 10).map((tool, index) => (
        <div
          key={tool.aiId || tool._id}
          className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-md transition-colors"
        >
          <div className="flex items-center gap-3 cursor-pointer">
            <span className="text-gray-400 text-sm font-medium">{index + 1}.</span>
            {tool.logo ? (
              <img
                src={
                  tool.logo.startsWith("http")
                    ? tool.logo
                    : `http://10.10.13.83:4000/${tool.logo}`
                }
                alt="AI Logo"
                className="w-6 h-6 rounded object-cover"
              />
            ) : (
              <span className="w-6 h-6 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                No Image
              </span>
            )}
            <span className="text-sm text-gray-700 group-hover:text-gray-900">{tool.title}</span>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ))}
    </div>

    {/* See All Button fixed at the bottom */}
    <div className="mt-auto">
      <Button
        variant="outline"
        className="w-full text-sm text-gray-600 hover:text-gray-800 bg-transparent police-light rounded px-4 py-2 font-medium bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 hover:opacity-90"
        onClick={() => setModalCategory(cat)}
      >
        {`See All (${catAIs.length}) →`}
      </Button>
    </div>
  </CardContent>
</Card>

            );
          })}
        </div>

        {/* Modal for all AIs in a category */}
        {modalCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalCategory(null)}></div>
            <div className="relative z-10 w-full max-w-2xl mx-4">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/95 to-gray-900/95 rounded-2xl backdrop-blur-xl"></div>
              <div className="relative p-8 rounded-2xl border border-gray-700/50 shadow-2xl bg-white">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">{modalCategory.title} - All AIs</h2>
                  <button onClick={() => setModalCategory(null)} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200 group">✕</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
                  {getAIsForCategory(modalCategory).map((tool, index) => (
                    <Card key={tool.aiId || tool._id} className="border border-gray-200 shadow-sm">
                      <CardContent className="flex items-center gap-3 p-4">
                        {tool.logo ? (
                          <img src={tool.logo.startsWith('http') ? tool.logo : `http://10.10.13.83:4000/${tool.logo}`} alt="AI Logo" className="w-10 h-10 rounded object-cover" />
                        ) : (
                          <span className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500">No Image</span>
                        )}
                        <div>
                          <div className="font-semibold text-gray-800">{tool.title}</div>
                          <div className="text-gray-500 text-xs line-clamp-2">{tool.description}</div>
                          <a href={tool.url || tool.link || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-xs">Visit</a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}


      </div>
   
    </section>
      </div>






      <div className="max-w-7xl mx-auto mt-50">

       <section class="relative bg-pink-100 rounded-lg shadow-lg p-8 md:p-10 lg:p-12 mb-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
                <div class="flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 flex items-center justify-center">
                    <img src={Brain} alt="AI Headset Icon" class="max-w-full max-h-full object-contain" />
                </div>
                <div class="flex-1 min-w-0">
                    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
                        Lists and rankings of the best AI Tools
                    </h2>
                    <p class="text-base sm:text-lg text-gray-700 mb-4">
                        If you're interested in AI, you probably know how difficult it can be to find the best AIs in each category. That's why we've put together this comprehensive list of the **best AI sites**, categorized, with the option of voting for your favorite AI.
                    </p>
                    <p class="text-base sm:text-lg text-gray-700">
                        With patience and rigor, we have listed the best AI sites in around 50 different categories. The number of categories is growing steadily, as new areas of artificial intelligence emerge every day!
                    </p>
                </div>
            </section>

            <section class="relative bg-orange-100 rounded-lg shadow-lg p-8 md:p-10 lg:p-12 mb-10 flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 lg:gap-16">
                <div class="flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 flex items-center justify-center">
                    <img src={Tree} alt="AI Tree Icon" class="max-w-full max-h-full object-contain" />
                </div>
                <div class="flex-1 min-w-0">
                    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
                        Ergonomic design
                    </h2>
                    <p class="text-base sm:text-lg text-gray-700 mb-4">
                        With the Kanban style adopted, you can easily see which AIs are currently trending in each category. Each AI is accompanied by a brief description (mouse-over) and a link to its website.
                    </p>
                    <p class="text-base sm:text-lg text-gray-700">
                        You can also easily identify their pricing: free, freemium or paid. What's more, a keyword search function is available for quick navigation to the AIs of your choice.
                    </p>
                </div>
            </section>

          <section class="relative bg-blue-100 rounded-lg shadow-lg p-8 md:p-10 lg:p-12 mb-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
                <div class="flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 flex items-center justify-center">
                    <img src={Plane} alt="AI Headset Icon" class="max-w-full max-h-full object-contain" />
                </div>
                <div class="flex-1 min-w-0">
                    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
                        AI tools list accessible everywhere
                    </h2>
                    <p class="text-base sm:text-lg text-gray-700 mb-4">
                       Aixploria, entirely free of charge, lists over 4,000 AIs, offering a wealth of business opportunities for professionals and an invaluable source of learning for AI enthusiasts.
                    </p>
                    <p class="text-base sm:text-lg text-gray-700">
                        This ranking of the best AIs adapts to all screen sizes: smartphone, tablet, computer, smart TV or projection screen.
                    </p>
                </div>
            </section>

            <section class="relative bg-red-100 rounded-lg shadow-lg p-8 md:p-10 lg:p-12 mb-10 flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 lg:gap-16">
                <div class="flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 flex items-center justify-center">
                    <img src={Trophy} alt="AI Tree Icon" class="max-w-full max-h-full object-contain" />
                </div>
                <div class="flex-1 min-w-0">
                    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
                        Best AI & Top 10
                    </h2>
                    <p class="text-base sm:text-lg text-gray-700 mb-4">
                        Each tools list displays a top 10 list of the AIs most appreciated by the community. This Top 10 is evolving and can change very quickly. So don’t be surprised if, within a few days, a new AI tools appears in the top positions. In the fascinating world of artificial intelligence, everything moves extremely fast!
                    </p>
                    <p class="text-base sm:text-lg text-gray-700">
                        Sometimes, all it takes is a little buzz to propel a site to the top of the AI rankings. A recent example is the video platform HeyGen AI, which in just 24 hours made it into the top 10 in the video publishing category!
                    </p>
                </div>
            </section>

            <section class="relative bg-purple-100 rounded-lg shadow-lg p-8 md:p-10 lg:p-12 mb-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
                <div class="flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 flex items-center justify-center">
                    <img src={Ranking} alt="AI Headset Icon" class="max-w-full max-h-full object-contain" />
                </div>
                <div class="flex-1 min-w-0">
                    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
                        Ranking of AI sites
                    </h2>
                    <p class="text-base sm:text-lg text-gray-700 mb-4">
                       On this page, called “The Ultimate AI List”, you can also see how each AI ranks and evolves in relation to the others in its respective category..
                    </p>
                    <p class="text-base sm:text-lg text-gray-700">
                        To achieve this, we used a ranking system based mainly on user votes and the number of views, enriched by other relevant criteria.
                    </p>
                </div>
            </section>

            <section class="relative bg-green-100 rounded-lg shadow-lg p-8 md:p-10 lg:p-12 mb-10 flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 lg:gap-16">
                <div class="flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 flex items-center justify-center">
                    <img src={StarImg} alt="AI Tree Icon" class="max-w-full max-h-full object-contain" />
                </div>
                <div class="flex-1 min-w-0">
                    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
                        AI aggregator & voting
                    </h2>
                    <p class="text-base sm:text-lg text-gray-700 mb-4">
                        As we have seen, the lists offer easy exploration of the leading AI sites in each field. This is made possible by the many votes cast on our AI aggregator.
                    </p>
                    <p class="text-base sm:text-lg text-gray-700">
                        On this subject, we’d like to invite you not to hesitate to give your opinion. Your opinion is precious, and this top 10 reflects the best AIs thanks to the evaluations of those who have gone before you. So your vote counts too!
                    </p>
                </div>
            </section>


            <section class="relative bg-white rounded-lg shadow-lg p-6 md:p-10 lg:p-12 mb-10 flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 lg:gap-16 mt-10">
                
                    <p class="text-base sm:text-lg text-gray-700">
                        We hope you find this list of AI tools useful. Please feel free to share this valuable list with your friends and colleagues.
                    </p>
        
            </section>
       

      </div>

    </div>
  );
}

export default FullAI;