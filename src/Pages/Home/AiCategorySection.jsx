
import { useData } from "../../Context/DataContext";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa";

import { ExternalLink } from "lucide-react";
import Maruery from "./Maruery";
import { Link } from "react-router-dom";



export default function AiCategorySection() {
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
  className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-[350px]"
>
  <CardContent className="flex flex-col flex-1">
    <div className="flex items-center gap-2 mb-4">
      <span className="font-semibold text-gray-800">{cat.title}</span>
    </div>

    <div className="mb-4 flex-1 overflow-hidden">
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
            <span className="text-sm text-gray-700 group-hover:text-gray-900">
              {tool.title}
            </span>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ))}
    </div>

    <div className="mt-auto pt-2">
      <Button
        variant="outline"
        className="w-full text-sm text-gray-600 hover:text-gray-800 bg-transparent rounded px-4 py-2 font-medium bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 hover:opacity-90"
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

        <div className="relative w-[400px] mx-auto mt-20 p-[2px] bg-[linear-gradient(271deg,#ffbd75_1%,#fb81b5_26%,#947bed_51%,#a0dbfd_98%)]">
          <Link to="/full_list" className="relative z-10">
          <button className="relative z-10 w-full flex items-center justify-center gap-2 px-5 py-2 cursor-pointer font-semibold text-black bg-white overflow-hidden group hover:bg-pink-200 transition-colors duration-500 ease-out">
            <span className="relative z-10">SEE THE FULL LIST OF AI</span>
            <FaChevronDown className="relative z-10" />
            <span className="absolute inset-0 bg-blue-200 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
          </button>
          </Link>
        </div>

      </div>
      <Maruery/>
    </section>
  );
}
