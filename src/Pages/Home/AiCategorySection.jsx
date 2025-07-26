import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Sparkles, Zap, Wrench, MessageCircle } from "lucide-react"
import { FaChevronDown } from "react-icons/fa"
import Deepmind from "../../assets/DeepMind.png";
import Google from "../../assets/google.webp";
import Openai from "../../assets/OpenAI.png";
import Meta from "../../assets/Meta-Logo.png";
import Microsoft from "../../assets/Microsoft.png";
import Stability from "../../assets/stability.webp";
import Maruery from "./Maruery";

const logos = [Google, Openai, Meta, Microsoft, Stability, Deepmind];


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
}

export default function AiCategorySection() {
  return (
 <section className="bg-sky-50/50 py-20">
       <div className="w-full max-w-7xl mx-auto p-6 ">
      <div className="text-center flex items-center justify-center mb-20">
        <div className="h-[3px] w-[250px] mx-auto mt-1 rounded-full bg-[linear-gradient(271deg,_#ffbd75_1%,_#fb81b5_26%,_#947bed_51%,_#a0dbfd_98%)]" />
        <h2 className="text-2xl font-bold text-gray-400 tracking-wide">SOME AI CATEGORIES</h2>
        <div className="h-[3px] w-[250px] mx-auto mt-1 rounded-full bg-[linear-gradient(271deg,_#ffbd75_1%,_#fb81b5_26%,_#947bed_51%,_#a0dbfd_98%)]" />
            
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.entries(aiTools).map(([category, data]) => (
          <Card key={category} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="">
              <div className="flex items-center gap-2 mb-4">
                {data.icon}
                <h3 className="font-semibold text-gray-800">{category}</h3>
              </div>

              <div className=" mb-6">
                {data.tools.slice(0, 10).map((tool, index) => (
                  <div
                    key={tool.name}
                    className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-md transition-colors"
                  >
                    <div className="flex items-center gap-3 cursor-pointer">
                      <span className="text-gray-400 text-sm font-medium">{index + 1}.</span>
                      <span className="text-lg">{tool.icon}</span>
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">{tool.name}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full text-sm text-gray-600 hover:text-gray-800 bg-transparent police-light rounded px-4 py-2w-full text-white text-sm px-4 py-2 rounded font-medium bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 hover:opacity-90">
                {category === "AI Chat & Assistant"
                  ? `See All Category (${data.count}) →`
                  : category === "Latest AI"
                    ? `More New AI (${data.count}) →`
                    : `See All Category (${data.count}) →`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>


           <div className="relative w-[400px] mx-auto mt-20 p-[2px] bg-[linear-gradient(271deg,#ffbd75_1%,#fb81b5_26%,#947bed_51%,#a0dbfd_98%)]">
      <button className="relative z-10 w-full flex items-center justify-center gap-2 px-5 py-2 cursor-pointer font-semibold text-black bg-white overflow-hidden group hover:bg-pink-200 transition-colors duration-500 ease-out">
        <span className="relative z-10">SEE THE FULL LIST OF AI</span>
        <FaChevronDown className="relative z-10" />
        <span className="absolute inset-0 bg-blue-200 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
      </button>
    </div>

    </div>
    <Maruery/>
    
 </section>
  )
}
