import Marquee from "react-fast-marquee";

export default function Maruery() {
  const logos = [
    {
      name: "OpenAI",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/2560px-OpenAI_Logo.svg.png",
    },
    {
      name: "Meta",
      src: "https://i.insider.com/617aee4989b91c00185acc6a?width=1200",
    },
    {
      name: "Microsoft",
      src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg?width=1200",
    },
    {
      name: "Google",
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "DeepMind",
      src: "https://venturebeat.com/wp-content/uploads/2020/04/DeepMind-logo.png",
    },
  ];

  return (
<section className="bg-sky-50/50">
        <div className="py-6 h-[20vh] flex items-center px-6 gap-8 w-full max-w-7xl mx-auto ">
      {/* Title Section */}
      <div className="w-[30%]">
      <h1
        className="text-2xl font-bold text-gray-600 tracking-wide uppercase border-r-4"
        style={{
            borderImageSlice: 1,
            borderImageSource:
            "linear-gradient(to bottom, #ffbd75, #fb81b5, #947bed, #a0dbfd)",
            borderRightWidth: "4px",
        }}
        >
        Popular Platforms
        </h1>

      </div>

      {/* Marquee Section */}
      <div className="w-[70%]">
        <Marquee gradient={false} speed={40} pauseOnHover={true}>
          {logos.map((logo, index) => (
            <div key={index} className="mx-16 flex items-center">
              <img
                src={logo.src}
                alt={logo.name}
                className="h-12 object-contain"
                title={logo.name}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
</section>
  );
}
