import { Star } from "lucide-react";
import { useDarkMode } from "../../contexts/DarkModeContext";


export const Banner = () => {
  const { isDarkMode } = useDarkMode();
  
  return (
    <section className={`relative ${isDarkMode ? 'bg-gray-900' : 'bg-sky-50/50'}`}>
      <div className="absolute inset-0 bg-[url('https://www.azul.com/wp-content/uploads/avd-swoosh-2.svg')] bg-cover bg-center bg-no-repeat opacity-10 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center h-[25vh] px-4">
        <div className="flex items-center gap-3">
          <img
            src="https://i.ibb.co/CcrFMhc/AI-Capitol-mascoot-2032-removebg-preview.png"
            className="w-[60px] md:w-[80px]"
            alt="Mascot"
          />
          <div>
            <h1 className={`text-[26px] md:text-[36px] font-extrabold ${isDarkMode ? 'text-white' : 'text-[#13363f]'}`}>
              AI Tools Directory
            </h1>
            <div className="h-[3px] mt-1 rounded-full bg-[linear-gradient(271deg,_#ffbd75_1%,_#fb81b5_26%,_#947bed_51%,_#a0dbfd_98%)]" />
          </div>
        </div>

        <p className={`mti-3 text-sm md:text-base px-3 py-1 flex items-center ${isDarkMode ? 'text-gray-300' : 'text-[#003344]'}`}>
          <span className="text-[20px]">Access the largest list of top-quality AI tools available on the web</span> <Star size={16} className="ms-2" />
        </p>
      </div>
    </section>
  );
};
