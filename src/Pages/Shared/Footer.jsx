import { Youtube, Twitter } from "lucide-react"
import { Link } from "react-router-dom"
import { useDarkMode } from "../../contexts/DarkModeContext"

const footerLinks = {
  resources: [
    { title: "Tutorials, tips and blog", href: "#" },
    { title: "AI Conferences Agenda", href: "#" },
    { title: "AI Glossary & Lexicon", href: "#" },
    { title: "Explore AI Jobs", href: "#" },
  ],
  usefulTools: [
    { title: "Best AI Youtube Channels", href: "#" },
    { title: "Top 100 AI", href: "#" },
    { title: "GPTs List", href: "#" },
    { title: "Hubspot AI Tools", href: "#" },
    { title: "Best AI Agents", href: "#" },
  ],
  company: [
    { title: "Submit an AI Tool", href: "#" },
    { title: "Advertise", href: "#" },
    { title: "Update your tool", href: "#" },
    { title: "Feature your tool ★", href: "#" },
    { title: "About Us", href: "#" },
    { title: "Contact Us", href: "#" },
  ],
}

const legalLinks = [
  { title: "Cookie Policy", href: "#" },
  { title: "Conditions of use", href: "#" },
  { title: "Legals informations", href: "#" },
]

export const Footer = () => {
  const { isDarkMode } = useDarkMode();
  
  return (
    <footer className={`text-white ${isDarkMode ? 'bg-gray-950' : 'bg-slate-800'}`}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI-</span>
                Capitol
              </h2>
            </div>
            <p className="text-gray-300 mb-6 text-sm">Artificial Intelligence for everyone</p>
            <div className="flex space-x-3">
              <div className="w-6 h-4 bg-red-500 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">🇺🇸</span>
              </div>
              <div className="w-6 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">🇫🇷</span>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Tools */}
          <div>
            <h3 className="text-white font-semibold mb-4">Useful Tools</h3>
            <ul className="space-y-3">
              {footerLinks.usefulTools.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright and Legal Links */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">© 2025 AI-Capitol. All rights reserved 🚀</p>
              <div className="flex space-x-4">
                {legalLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
