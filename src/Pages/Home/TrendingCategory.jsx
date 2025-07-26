import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { AiOutlineUnorderedList } from "react-icons/ai"

const exploreItems = [
  {
    icon: <AiOutlineUnorderedList  className="w-8 h-8 text-green-600" />,
    title: "Video Generators",
  },
  {
    icon: <AiOutlineUnorderedList  className="w-8 h-8 text-green-600" />,
    title: "AI Logo Generator",
  },
  {
    icon: <AiOutlineUnorderedList  className="w-8 h-8 text-green-600" />,
    title: "AI Marketing",
  },
  {
    icon: <AiOutlineUnorderedList  className="w-8 h-8 text-green-600" />,
    title: "AI Automation",
  },
  {
    icon: <AiOutlineUnorderedList className="w-8 h-8 text-green-600" />,
    title: "Image Generators",
  },
  {
    icon: <AiOutlineUnorderedList className="w-8 h-8 text-green-600" />,
    title: "AI Face Swap",
  },
  {
    icon: <AiOutlineUnorderedList className="w-8 h-8 text-green-600" />,
    title: "AI Characters",
  },
  {
    icon: <AiOutlineUnorderedList className="w-8 h-8 text-green-600" />,
    title: "AI Girlfriend",
  },
]

export const TrendingCategory = () => {
  return (
    <section className="bg-sky-50/50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
           <div className="text-center flex items-center justify-center mb-20">
        <div className="h-[3px] w-[250px] mx-auto mt-1 rounded-full bg-[linear-gradient(271deg,_#ffbd75_1%,_#fb81b5_26%,_#947bed_51%,_#a0dbfd_98%)]" /><h2 className="text-2xl font-bold text-gray-400 tracking-wide uppercase">Trending Category</h2><div className="h-[3px] w-[250px] mx-auto mt-1 rounded-full bg-[linear-gradient(271deg,_#ffbd75_1%,_#fb81b5_26%,_#947bed_51%,_#a0dbfd_98%)]" />
            
      </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {exploreItems.map((item, index) => (
            <Card
              key={`${item.title}-${index}`}
              className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <CardHeader className="flex flex-col items-center text-center p-8">
                <div className="mb-4">{item.icon}</div>
                <CardTitle className="text-base font-medium text-gray-700">{item.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
