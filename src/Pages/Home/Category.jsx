"use client";

import { useState } from "react";
import { useEffect } from "react";
import { MdVerified } from "react-icons/md";
import {
  Search,
  ExternalLink,
  Star,
  Crown,
  Award,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useData } from "../../Context/DataContext";



export default function Category() {
  const { isDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' or 'desc'
  const { ais, categories, fetchAIs, fetchCategories, loading } = useData();

  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  useEffect(() => {
    fetchAIs();
    fetchCategories();
    // eslint-disable-next-line
  }, []);
  // --- Filtering Logic ---
  // Filter buttons
  const filterOptions = [
    { label: "Verified", value: "verified" },
    { label: "Free AI", value: "Free AI" },
    { label: "Freemium", value: "Freemium" },
    { label: "Paid", value: "Paid" },
  ];

  // Handle filter button click
  const handleFilterClick = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  // Filtered and sorted AIs
  const filteredAIs = ((ais || [])
    .filter((tool) => {
      // Search
      if (searchQuery && !tool.title.toLowerCase().includes(searchQuery.toLowerCase()) && !tool.description?.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Category
      if (selectedCategory) {
        let catId = selectedCategory;
        let match = false;
        if (typeof tool.category === "object" && tool.category !== null) {
          match = tool.category.categoryId === catId || tool.category._id === catId;
        } else {
          match = tool.categoryId === catId || tool.category === catId;
        }
        if (!match) return false;
      }
      // Filters
      for (let filter of activeFilters) {
        if (filter === "verified" && !tool.isVerified) return false;
        if (filter === "Free AI" && tool.subscriptionType?.toLowerCase() !== "free") return false;
        if (filter === "Freemium" && tool.subscriptionType?.toLowerCase() !== "freemium") return false;
        if (filter === "Paid" && tool.subscriptionType?.toLowerCase() !== "paid") return false;
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt || 0);
      const dateB = new Date(b.updatedAt || b.createdAt || 0);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    })
  );

  return (
    <div className={`p-4 md:p-6 lg:p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-sky-50/50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <Input
                type="text"
                placeholder="Search over 5000+ AI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200'}`}
              />
            </div>

            <div className="flex gap-2">
              {['𝕏', 'f', 'in', '✈', '✉'].map((icon, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <span className="text-lg">{icon}</span>
                </Button>
              ))}
            </div>
          </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center ">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-[200px] bg-gray-50 border-gray-300 hover:bg-gray-100 focus:bg-gray-200 shadow-sm">
                <SelectValue placeholder="-- Select a category --" />
              </SelectTrigger>
              <SelectContent className="bg-gray-100">
                {(categories || []).map(cat => (
                  <SelectItem key={cat.categoryId || cat._id} value={cat.categoryId || cat._id}>{cat.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              className={`flex items-center cursor-pointer border border-gray-300 hover:bg-gray-100 space-x-2 shadow-sm ${activeFilters.includes('verified') ? 'bg-yellow-100' : ''}`}
              onClick={() => handleFilterClick('verified')}
            >
              <RiVerifiedBadgeFill className="text-yellow-500 w-5 h-5" />
              Verified
            </Button>
          </div>

          {/* Filter Tags */}
          <div className="flex items-center space-x-3">
            {filterOptions.slice(1).map(opt => (
              <Button
                key={opt.value}
                className={`border border-gray-300 drop-shadow-xs px-5 rounded-[8px] cursor-pointer transition duration-300 ${
                  opt.value === 'Free AI' ? 'drop-shadow-green-500 bg-white text-[rgb(51,133,57)] hover:bg-[rgb(239,250,243)]' :
                  opt.value === 'Freemium' ? 'drop-shadow-yellow-500 bg-white text-[#ad6301] hover:bg-[#fff8e7]' :
                  opt.value === 'Paid' ? 'drop-shadow-red-300 bg-white text-[#c12020] hover:bg-[#fdeaea]' : ''
                } ${activeFilters.includes(opt.value) ? 'bg-blue-100' : ''}`}
                onClick={() => handleFilterClick(opt.value)}
              >
                {opt.label}
              </Button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center ml-2">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[160px] bg-gray-50 border-gray-300 hover:bg-gray-100 focus:bg-gray-200 shadow-sm">
                <SelectValue placeholder="Sort by date" />
              </SelectTrigger>
              <SelectContent className="bg-gray-100">
                <SelectItem value="desc">Newest First</SelectItem>
                <SelectItem value="asc">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAIs.map((tool) => (
            <Card
              key={tool.aiId || tool._id}
              className={`relative border hover:shadow-lg transition-shadow duration-200 flex flex-col h-full ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 hover:shadow-gray-700' 
                  : 'bg-white border-gray-200'
              }`}
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
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-auto p-1 hover:text-blue-600 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      <FaArrowAltCircleUp className={`h-4 w-4 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                      <span className="text-sm font-medium">{tool.upvote ?? tool.votes ?? 0}</span>
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

                <div className="flex justify-center">
                  <div className="flex items-center gap-3">
                    {tool.logo ? (
                      <img src={tool.logo.startsWith('http') ? tool.logo : `https://ai-capitol-server.onrender.com/${tool.logo}`} alt="AI Logo" className="w-10 h-10 rounded object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500">No Image</div>
                    )}
                    <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-1">
                      {tool.title}
                      {tool.isVerified && (
                        <MdVerified  className="h-4 w-4 text-orange-500 -mt-3 -ml-1" />
                      )}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0 flex flex-col flex-1">
                <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {tool.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">{tool.subscriptionType}</span>
                  {tool.category && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                      {typeof tool.category === 'object' && tool.category !== null ? tool.category.title : tool.categoryId}
                    </span>
                  )}
                  {tool.isVerified && (
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">Verified</span>
                    )}
                </div>
                <div className="flex-1" />
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-auto" asChild>
                  <a href={tool.url || tool.link || '#'} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    VISIT
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
