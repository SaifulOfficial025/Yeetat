import React from 'react';
import { Star, ExternalLink, Crown, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MdVerified } from 'react-icons/md';
import { FaArrowAltCircleUp } from 'react-icons/fa';
import { useData } from '../../Context/DataContext';

function FreeAI() {
  const { ais } = useData() || {};
  const [search, setSearch] = React.useState("");
  let freeAIs = [];
  if (Array.isArray(ais)) {
    freeAIs = ais.filter(ai => ai.subscriptionType?.toLowerCase() === 'free');
  }
  // Filter by search (title or category)
  const filteredAIs = freeAIs.filter(ai => {
    if (!search.trim()) return true;
    const titleMatch = ai.title?.toLowerCase().includes(search.toLowerCase());
    let categoryTitle = typeof ai.category === 'object' && ai.category !== null ? ai.category.title : ai.category;
    const categoryMatch = categoryTitle?.toLowerCase().includes(search.toLowerCase());
    return titleMatch || categoryMatch;
  });

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
                Free AI Tools
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

      <div className="mt-10 max-w-7xl mx-auto">
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title or category..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        {!Array.isArray(ais) ? (
          <div className="text-center text-gray-500 py-10">Loading free AI tools...</div>
        ) : filteredAIs.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No free AI tools found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAIs.map(tool => (
        <Card
  key={tool.aiId || tool._id}
  className="relative border hover:shadow-lg transition-shadow duration-200 bg-white border-gray-200 flex flex-col justify-between h-[360px]"
>
  {/* Top Badge */}
  {tool.isTop && (
    <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-2 py-1 text-xs font-bold rounded transform rotate-12 z-10">
      TOP
    </div>
  )}

  <CardHeader className="pb-3">
    <div className="relative flex items-start justify-between mb-2">
      {/* Left: Upvote */}
      <div className="flex items-center gap-2">
        <FaArrowAltCircleUp className="h-4 w-4 text-gray-500" />
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-1 hover:text-blue-600 text-gray-500"
        >
          <span className="text-sm font-medium">
            {tool.upvote ?? tool.votes ?? 0}
          </span>
        </Button>
      </div>

      {/* Center: Featured Badge */}
      {tool.isFeatured && (
        <div className="absolute left-1/2 -translate-x-1/2">
          <Badge
            variant="secondary"
            className="bg-pink-100 text-pink-800 text-xs flex items-center"
          >
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        </div>
      )}

      {/* Right: Verified Icons */}
      {tool.isVerified && (
        <div className="flex gap-1 items-center">
          <Crown className="h-4 w-4 text-yellow-500" />
          <Award className="h-4 w-4 text-blue-500" />
        </div>
      )}
    </div>

    {/* Logo & Title */}
    <div className="flex justify-center">
      <div className="flex items-center gap-3">
        {tool.logo ? (
          <img
            src={tool.logo.startsWith('http') ? tool.logo : `https://ai-capitol-server.onrender.com/${tool.logo}`}
            alt="AI Logo"
            className="w-10 h-10 rounded object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500">
            No Image
          </div>
        )}
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-1">
          {tool.title}
          {tool.isVerified && (
            <MdVerified className="h-4 w-4 text-orange-500 -mt-3 -ml-1" />
          )}
        </CardTitle>
      </div>
    </div>
  </CardHeader>

  <CardContent className="pt-0 flex flex-col flex-1">
    {/* Description */}
    <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-3">
      {tool.description}
    </CardDescription>

    {/* Tags */}
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
        {tool.subscriptionType}
      </span>
      {tool.category && (
        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
          {typeof tool.category === 'object' && tool.category !== null
            ? tool.category.title
            : tool.categoryId}
        </span>
      )}
      {tool.isVerified && (
        <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
          Verified
        </span>
      )}
    </div>

    {/* Visit Button */}
    <div className="mt-auto">
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
        <a
          href={tool.url || tool.link || '#'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          VISIT
        </a>
      </Button>
    </div>
  </CardContent>
</Card>

            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FreeAI
