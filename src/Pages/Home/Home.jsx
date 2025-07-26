import AiCategorySection from "./AiCategorySection"
import { Banner } from "./Banner"
import BestAI from "./BestAI"
import Category from "./Category"
import Maruery from "./Maruery"
import MoreAICategory from "./MoreAICategory"
import { TrendingCategory } from "./TrendingCategory"
import { useDarkMode } from "../../contexts/DarkModeContext"

export const Home = () => {
  const { isDarkMode } = useDarkMode();
  
  return (
    <div className={isDarkMode ? 'bg-gray-900 min-h-screen' : 'bg-white'}>
        <Banner/>
        <Category/>
        <AiCategorySection/>
        <MoreAICategory/>
        
        <TrendingCategory/>
        <BestAI/>
    </div>
  )
}
