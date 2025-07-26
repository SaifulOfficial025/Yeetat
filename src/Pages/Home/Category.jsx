"use client";

import { useState } from "react";
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

const aiTools = [
  {
    id: 1,
    name: "Mixus",
    votes: 81,
    featured: true,
    isTop: true,
    verified: true,
    description:
      "Deploy trusted AI agents with built-in human verification to avoid costly errors. Create, supervise and chain your agents across teams, keeping...",
    logo: "https://iaperfecta.com/wp-content/uploads/2025/07/mixus-logo-primary-horizontal-black_enhanced-scaled.png",
    category: "automation",
  },
  {
    id: 2,
    name: "Tripo Studio",
    votes: 74,
    featured: true,
    verified: true,
    description:
      "Create high-quality 3D models from text or images in seconds with a professional studio. Ability to generate AI textures, animations,...",
    logo: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/tripo-color.png",
    category: "3d-modeling",
  },
  {
    id: 3,
    name: "ClickUp",
    votes: 132,
    featured: true,
    verified: true,
    description:
      "A powerful all-in-one AI platform that brings teams, tasks and tools together in one place. Benefit from an AI assistant that automates...",
    logo: "https://framerusercontent.com/images/LCqFQs37KHybRvrKuIIw4K4HL1o.png",
    category: "productivity",
  },
  {
    id: 4,
    name: "Workleap",
    votes: 51,
    featured: true,
    verified: true,
    description:
      "A complete HR platform that makes your employees' day-to-day work easier. Manage the performance, engagement and...",
    logo: "https://media-s3-us-east-1.ceros.com/key-media/images/2024/04/10/f420da7f4e7b757745e8cca403fb7db4/workleap-logo-1080x1080.png",
    category: "hr",
  },
  {
    id: 5,
    name: "AI SuitUp Team",
    votes: 71,
    featured: true,
    verified: true,
    description:
      "Quickly create professional, consistent headshots for your entire team. Each member uploads 16 selfies and receives over 100 AI-...",
    logo: "👔",
    category: "image-generation",
    isTop: true,
  },
  {
    id: 6,
    name: "Photoshop AI",
    votes: 265,
    featured: true,
    verified: true,
    description:
      "Edit and transform your images like a pro with a set of AI tools: generative fill, generative expand, image creation from text and more.",
    logo: "🎭",
    category: "image-editing",
  },
  {
    id: 7,
    name: "Kling 2.1",
    votes: 95,
    featured: true,
    verified: true,
    description:
      "Generate 2-minute HD videos from text with its high-definition video generator: realistic movements, natural rendering, overflowing...",
    logo: "🎬",
    category: "video-generation",
  },
  {
    id: 8,
    name: "HubSpot CRM",
    votes: 325,
    featured: true,
    verified: true,
    description:
      "Optimize your sales and marketing with a particularly intuitive, AI-driven professional CRM. Track your performance in real time and...",
    logo: "🚀",
    category: "crm",
  },
];

export default function Category() {
  const { isDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

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
              {["𝕏", "f", "in", "✈", "✉"].map((icon, idx) => (
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
                  <SelectItem value="automation">Automation</SelectItem>
                  <SelectItem value="3d-modeling">3D Modeling</SelectItem>
                  <SelectItem value="productivity">Productivity</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="image-generation">
                    Image Generation
                  </SelectItem>
                  <SelectItem value="image-editing">Image Editing</SelectItem>
                  <SelectItem value="video-generation">
                    Video Generation
                  </SelectItem>
                  <SelectItem value="crm">CRM</SelectItem>
                </SelectContent>
              </Select>

              <Button className="flex items-center cursor-pointer border border-gray-300 hover:bg-gray-100 space-x-2 shadow-sm">
                <RiVerifiedBadgeFill className="text-yellow-500 w-5 h-5" />
                Verified
              </Button>
            </div>

            {/* Filter Tags */}
            <div className="flex items-center space-x-3">
              <Button className="border border-gray-300 drop-shadow-xs px-5 drop-shadow-green-500 bg-white rounded-[8px] text-[rgb(51,133,57)] cursor-pointer transition duration-300 hover:bg-[rgb(239,250,243)]">
                Free AI
              </Button>
              <Button className="border border-gray-300 drop-shadow-xs px-5 drop-shadow-yellow-500 bg-white rounded-[8px] text-[#ad6301] cursor-pointer transition duration-300 hover:bg-[#fff8e7]">
                Premium
              </Button>
              <Button className="border border-gray-300 drop-shadow-xs px-5 drop-shadow-red-300 bg-white rounded-[8px] text-[#c12020] cursor-pointer transition duration-300 hover:bg-[#fdeaea]">
                Paid
              </Button>
              <Button className="border border-gray-300 drop-shadow-xs px-5 drop-shadow-purple-500 bg-white rounded-[8px] text-[#8f01ad] cursor-pointer transition duration-300 hover:bg-[#f6edff]">
                Free Trial
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {aiTools.map((tool) => (
            <Card
              key={tool.id}
              className={`relative border hover:shadow-lg transition-shadow duration-200 ${
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
                      <span className="text-sm font-medium">{tool.votes}</span>
                    </Button>
                  </div>

                  {/* Center: Featured Badge */}
                  {tool.featured && (
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
                  {tool.verified && (
                    <div className="flex gap-1 items-center">
                      <Crown className="h-4 w-4 text-yellow-500" />
                      <Award className="h-4 w-4 text-blue-500" />
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
  <div className="flex items-center gap-3">
    <img src={tool.logo} alt="" className="w-[25px]" />
    <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-1">
      {tool.name}
      {tool.verified && (
        <MdVerified  className="h-4 w-4 text-orange-500 -mt-3 -ml-1" />
      )}
    </CardTitle>
  </div>
</div>

              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {tool.description}
                </CardDescription>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  VISIT
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
