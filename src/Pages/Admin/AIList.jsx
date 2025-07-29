import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useData } from "../../Context/DataContext";
import {
  Search,
  Edit,
  Trash2,
  Eye,
  Plus,
  Brain,
  Bot,
  Cpu,
  Zap,
  ChevronLeft,
  ChevronRight,
  Star,
  Shield,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

function AIList() {
  const { ais, fetchAIs, loading } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [viewedAI, setViewedAI] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAIs();
    // eslint-disable-next-line
  }, []);

  // Sort by createdAt descending (most recent first)
  const sortedAIs = [...ais].sort((a, b) => {
    const aDate = new Date(a.createdAt || 0).getTime();
    const bDate = new Date(b.createdAt || 0).getTime();
    return bDate - aDate;
  });

  // Filter AIs based on search term
  const filteredAIs = sortedAIs.filter(
    (ai) =>
      ai.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ai.category.title?.toLowerCase?.() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (ai.subscriptionType?.toLowerCase?.() || "").includes(
        searchTerm.toLowerCase()
      )
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredAIs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAIs = filteredAIs.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when searching
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleEdit = (ai) => {
    navigate(`/admin/edit_ai/${ai.aiId || ai.id || ai._id}`);
  };

  const handleDelete = async (ai) => {
    if (!window.confirm("Are you sure you want to delete this AI?")) return;
    try {
      const res = await fetch(
        `https://ai-capitol-server.onrender.com/ai/delete/${ai.aiId || ai.id || ai._id}`,
        {
          method: "DELETE",
        }
      );
      const result = await res.json();
      if (res.ok) {
        window.toast &&
          window.toast.success(result.message || "AI deleted successfully.");
        fetchAIs(); // Refresh list
      } else {
        window.toast && window.toast.error(result.message || "Failed to delete AI.");
      }
    } catch (err) {
      window.toast && window.toast.error("An unexpected error occurred.");
      console.error("Delete error:", err);
    }
  };

  const handleView = (ai) => {
    setViewedAI(ai);
  };
  const handleCloseModal = () => setViewedAI(null);

  const getSubscriptionColor = (type) => {
    switch (type) {
      case "freemium":
        return "text-purple-400 bg-purple-400/10 border-purple-400/30";
      case "Free AI":
        return "text-cyan-400 bg-cyan-400/10 border-cyan-400/30";
      case "Open Source":
        return "text-green-400 bg-green-400/10 border-green-400/30";
      case "Enterprise":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "Paid":
        return "text-pink-400 bg-pink-400/10 border-pink-400/30";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="text-white text-xl">Loading...</div>
        </div>
      )}

      {/* View Modal */}
      {viewedAI && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseModal}
          ></div>
          <div className="relative z-10 w-full max-w-lg mx-4">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/95 to-gray-900/95 rounded-2xl backdrop-blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-pink-500/10 rounded-2xl"></div>
            <div className="relative p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  AI Details
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200 group"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  {viewedAI.logo ? (
                    <img
                      src={`https://ai-capitol-server.onrender.com/${viewedAI.logo}`}
                      alt="AI Logo"
                      className="w-10 h-10 rounded-xl object-cover border border-cyan-400/30 bg-gray-800"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/80x80?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-800 border border-cyan-400/30 text-gray-500 text-xs">
                      No Image
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {viewedAI.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {viewedAI.isFeatured && (
                        <span className="px-2 py-1 bg-yellow-400/10 text-yellow-400 rounded text-xs border border-yellow-400/30">
                          Featured
                        </span>
                      )}
                      {viewedAI.isTop && (
                        <span className="px-2 py-1 bg-pink-400/10 text-pink-400 rounded text-xs border border-pink-400/30">
                          Top
                        </span>
                      )}
                      {viewedAI.isVerified && (
                        <span className="px-2 py-1 bg-green-400/10 text-green-400 rounded text-xs border border-green-400/30">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">
                    Description:
                  </span>
                  <p className="text-white mt-1">{viewedAI.description}</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div>
                    <span className="text-gray-400 font-medium">Category:</span>
                    <span className="text-purple-300 ml-2">
                      {viewedAI.category.title || viewedAI.categoryId}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium">
                      Subscription:
                    </span>
                    <span
                      className={`ml-2 ${getSubscriptionColor(
                        viewedAI.subscriptionType
                      )}`}
                    >
                      {viewedAI.subscriptionType}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium">Upvotes:</span>
                    <span className="ml-2 text-pink-300">
                      {viewedAI.upvotes ?? viewedAI.upvote}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Link:</span>
                  <a
                    href={viewedAI.url || viewedAI.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-cyan-400 underline break-all"
                  >
                    {viewedAI.url || viewedAI.link}
                  </a>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div>
                    <span className="text-gray-400 font-medium">Created:</span>
                    <span className="ml-2 text-gray-300">
                      {viewedAI.createdAt
                        ? new Date(viewedAI.createdAt).toLocaleString()
                        : "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium">Updated:</span>
                    <span className="ml-2 text-gray-300">
                      {viewedAI.updatedAt
                        ? new Date(viewedAI.updatedAt).toLocaleString()
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="circuit"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="white" />
              <circle cx="18" cy="18" r="1" fill="white" />
              <path
                d="M2,2 L18,2 L18,18"
                stroke="white"
                strokeWidth="0.5"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <Brain className="w-16 h-16 text-cyan-400 mr-4 animate-pulse" />
            <Bot className="w-10 h-10 text-purple-400 animate-bounce" />
            <Cpu className="w-16 h-16 text-pink-400 ml-4 animate-pulse" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            AI: Capitol
          </h1>
          <h2 className="text-2xl text-gray-300 font-light tracking-wide">
            Manage AI Systems
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main Dashboard */}
        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-black/30 rounded-3xl border border-gray-700/50 shadow-2xl">
          <div className="p-8">
            {/* Dashboard Header */}
            <div className="text-center pb-6 border-b border-gray-700/50 mb-8">
              <div className="flex justify-center items-center space-x-2 mb-2">
                <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                <span className="text-xl font-semibold text-white">
                  AI Management Dashboard
                </span>
                <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
              <p className="text-gray-400 text-sm">
                Monitor and manage all AI systems in the network
              </p>
            </div>

            {/* Search and Add Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400/60" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/80 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 hover:bg-gray-800/80"
                  placeholder="Search AI systems..."
                />
              </div>

              {/* Add New AI Button */}
              <Link to="/admin/add_ai">
                <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
                  <Plus className="w-5 h-5 mr-2" />
                  Add New AI
                </button>
              </Link>
            </div>

            {/* Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400 text-sm">
                Showing {currentAIs.length} of {filteredAIs.length} AI systems
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>Total AIs: {ais.length}</span>
              </div>
            </div>

            {/* AI Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-700/50">
              <table className="w-full">
                <thead className="bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-cyan-300 font-medium">
                      AI System
                    </th>
                    <th className="px-6 py-4 text-left text-purple-300 font-medium">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-pink-300 font-medium">
                      Upvotes
                    </th>
                    <th className="px-6 py-4 text-left text-yellow-300 font-medium">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-green-300 font-medium">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-white font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/30">
                  {currentAIs.map((ai, index) => (
                    <tr
                      key={ai.id}
                      className="bg-gray-900/20 hover:bg-gray-800/30 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="">
                          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
                            {ai.logo ? (
                              <img
                                src={
                                  ai.logo.startsWith("http")
                                    ? ai.logo
                                    : `https://ai-capitol-server.onrender.com/${ai.logo}`
                                }
                                alt="AI Logo"
                                className="w-10 h-10 rounded-lg object-cover border border-cyan-400/30 bg-gray-800"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "https://via.placeholder.com/40x40?text=No+Image";
                                }}
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-800 border border-cyan-400/30 text-gray-500 text-xs">
                                No Image
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-white font-medium">
                                {ai.title}
                              </h3>
                              {ai.featured && (
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              )}
                              {ai.verified && (
                                <Shield className="w-4 h-4 text-green-400" />
                              )}
                            </div>
                            <p className="text-gray-400 text-sm">
                              {ai.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-purple-300">
                          {typeof ai.category === "object" &&
                          ai.category !== null
                            ? ai.category.title
                            : ai.category || ai.categoryId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          <span className="text-pink-300 font-medium">
                            {ai.upvote}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getSubscriptionColor(
                            ai.subscriptionType
                          )}`}
                        >
                          {ai.subscriptionType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {ai.isFeatured && (
                            <span className="px-2 py-1 bg-yellow-400/10 text-yellow-400 rounded text-xs border border-yellow-400/30">
                              Featured
                            </span>
                          )}
                          {ai.isVerified && (
                            <span className="px-2 py-1 bg-green-400/10 text-green-400 rounded text-xs border border-green-400/30">
                              Verified
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleView(ai)}
                            className="p-2 bg-cyan-600/20 text-cyan-400 rounded-lg hover:bg-cyan-600/30 transition-colors duration-200"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(ai)}
                            className="p-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-colors duration-200"
                            title="Edit AI"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(ai)}
                            className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors duration-200"
                            title="Delete AI"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-8 px-4">
                <div className="text-gray-400 text-sm">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 bg-gray-900/50 text-gray-400 rounded-lg hover:bg-gray-800/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Page Numbers */}
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            currentPage === pageNum
                              ? "bg-gradient-to-r from-cyan-600 to-purple-600 text-white"
                              : "bg-gray-900/50 text-gray-400 hover:bg-gray-800/50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 bg-gray-900/50 text-gray-400 rounded-lg hover:bg-gray-800/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredAIs.length === 0 && (
              <div className="text-center py-12">
                <Bot className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-gray-400 text-lg font-medium mb-2">
                  No AI systems found
                </h3>
                <p className="text-gray-500 text-sm">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIList;
