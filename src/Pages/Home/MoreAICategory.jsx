import { Card, CardContent } from "@/components/ui/card"
import {
  Layers,
  FileText,
  Plus,
  Play,
  Star,
  Grid3X3,
  BookOpen,
  Smartphone,
  Search,
  MessageSquare,
  Briefcase,
  Calendar,
} from "lucide-react"

const exploreItems = [
  {
    icon: <Layers className="w-12 h-12 text-sky-700" />,
    title: "HubSpot AI Tools",
    description: "Discover top-quality and secure tools for business and enterprise.",
  },
  {
    icon: <FileText className="w-12 h-12 text-sky-700" />,
    title: "AI News",
    description: "AI news in real time, at a glance.",
  },
  {
    icon: <Plus className="w-12 h-12 text-sky-700" />,
    title: "GPTs List",
    description: "A list of the best Custom GPTs.",
  },
  {
    icon: <Play className="w-12 h-12 text-sky-700" />,
    title: "YouTube AI",
    description: "Access the best YouTube channels talking about AI.",
  },
  {
    icon: <Star className="w-12 h-12 text-sky-700" />,
    title: "Top 100 AI (beta)",
    description: "Top 100 most popular and trending AIs on AI-Capitol.",
  },
  {
    icon: <Grid3X3 className="w-12 h-12 text-sky-700" />,
    title: "AI Video Tutorials",
    description: "Learn how to master the best AI tools on video.",
  },
  {
    icon: <BookOpen className="w-12 h-12 text-sky-700" />,
    title: "Blog & Tips",
    description: "All the tips, tutorials, and AI trends at the moment.",
  },
  {
    icon: <Smartphone className="w-12 h-12 text-sky-700" />,
    title: "Mini Free Apps",
    description: "Explore free and helpful AI mini-apps for quick results.",
  },
  {
    icon: <Search className="w-12 h-12 text-sky-700" />,
    title: "Hugging Face Explorer",
    description: 'Search for the best free "Spaces" available on Hugging Face',
  },
  {
    icon: <MessageSquare className="w-12 h-12 text-sky-700" />,
    title: "Top 200 AI Discord",
    description: "Check out the list of the best AI Discord communities.",
  },
  {
    icon: <Briefcase className="w-12 h-12 text-sky-700" />,
    title: "AI Job Offers",
    description: "Search thousands of AI jobs in the United States and worldwide.",
  },
  {
    icon: <Calendar className="w-12 h-12 text-sky-700" />,
    title: "AI Conferences Agenda",
    description: "Check out the agenda for all the AI conferences around the world.",
  },
]

export default function MoreAICategory() {
  return (
    <section className="bg-sky-50/50">
<div className="w-full max-w-7xl mx-auto p-6">
      <div className="text-center flex items-center justify-center mb-20">
        <div className="h-[3px] w-[250px] mx-auto mt-1 rounded-full bg-[linear-gradient(271deg,_#ffbd75_1%,_#fb81b5_26%,_#947bed_51%,_#a0dbfd_98%)]" /><h2 className="text-2xl font-bold text-gray-400 tracking-wide uppercase">Explore more potential with ai</h2><div className="h-[3px] w-[250px] mx-auto mt-1 rounded-full bg-[linear-gradient(271deg,_#ffbd75_1%,_#fb81b5_26%,_#947bed_51%,_#a0dbfd_98%)]" />
            
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {exploreItems.map((item, index) => (
          <Card
            key={index}
            className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer group"
          >
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              <h3 className="font-semibold text-gray-800 mb-3 text-lg group-hover:text-sky-700 transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </section>
  )
}

