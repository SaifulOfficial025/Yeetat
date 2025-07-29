import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useData } from "../../Context/DataContext";
import { Save, Upload, Target, CheckCircle, Zap, Brain, Cpu, Bot, Tag, X } from "lucide-react";

function EditAI() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, fetchCategories, createCategory } = useData();
  const [formData, setFormData] = useState({
    upvote: "",
    featured: false,
    top: false,
    logo: null,
    title: "",
    verified: false,
    description: "",
    category: "",
    link: "",
    subscriptionType: "",
  });
  const [currentLogo, setCurrentLogo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [isSavingCategory, setIsSavingCategory] = useState(false);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(`http://10.10.13.83:4000/ai`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.status === 200) {
          const ai = data.data.ais.find((item) => String(item.aiId) === String(id));
          if (ai) {
            setFormData({
              upvote: ai.upvote || "",
              featured: ai.isFeatured || false,
              top: ai.isTop || false,
              logo: null,
              title: ai.title || "",
              verified: ai.isVerified || false,
              description: ai.description || "",
              category: ai.categoryId || (ai.category && ai.category.categoryId) || "",
              link: ai.url || "",
              subscriptionType: ai.subscriptionType || "",
            });
            setCurrentLogo(ai.logo || null);
          } else {
            toast.error("AI not found.");
            navigate("/admin/ai_list");
          }
        } else {
          toast.error(data.message || "Failed to fetch AI data.");
        }
        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        toast.error("Error fetching AI data.");
        setLoading(false);
      });
    return () => { isMounted = false; };
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      logo: e.target.files[0],
    }));
  };

  const handleCategorySave = async () => {
    if (!categoryName.trim()) return;
    setIsSavingCategory(true);
    const res = await createCategory(categoryName);
    setIsSavingCategory(false);
    setCategoryName('');
    setIsModalOpen(false);
    if (res && res.message) toast.info(res.message);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setCategoryName('');
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.link || !formData.subscriptionType || !formData.category) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Prepare FormData for file upload
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("upvote", formData.upvote || "0");
    data.append("isFeatured", formData.featured ? "true" : "false");
    data.append("isTop", formData.top ? "true" : "false");
    data.append("isVerified", formData.verified ? "true" : "false");
    data.append("subscriptionType", formData.subscriptionType);
    data.append("categoryId", formData.category);
    data.append("url", formData.link);
    if (formData.logo) {
      data.append("logo", formData.logo);
    }

    try {
      const res = await fetch(`http://10.10.13.83:4000/ai/update/${id}`, {
        method: "PUT",
        body: data,
      });
      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "AI updated successfully.");
        navigate("/admin/ai_list");
      } else {
        toast.error(result.message || "Failed to update AI. Please try again.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  if (loading) return <div className="text-center p-10 text-white">Loading...</div>;
  if (!formData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white"/>
              <circle cx="18" cy="18" r="1" fill="white"/>
              <path d="M2,2 L18,2 L18,18" stroke="white" strokeWidth="0.5" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>

      <div className="relative z-10 p-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <Brain className="w-16 h-16 text-cyan-400 mr-4 animate-pulse" />
            <Bot className="w-20 h-20 text-purple-400 animate-bounce" />
            <Cpu className="w-16 h-16 text-pink-400 ml-4 animate-pulse" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Edit AI: Capitol
          </h1>
          <h2 className="text-2xl text-gray-300 font-light tracking-wide">
            Update Your AI • Amplify the Future
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto backdrop-blur-xl bg-black/30 rounded-3xl border border-gray-700/50 shadow-2xl">
          <div className="p-8">
            <div className="space-y-8">
              {/* Neural Network Header */}
              <div className="text-center pb-6 border-b border-gray-700/50">
                <div className="flex justify-center items-center space-x-2 mb-2">
                  <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                  <span className="text-xl font-semibold text-white">AI Edit Panel</span>
                  <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                </div>
                <p className="text-gray-400 text-sm">Update your AI tool parameters</p>
              </div>

              {/* Intelligence Metrics */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-cyan-300 font-medium mb-2">
                    <Target className="w-5 h-5 mr-2" />
                    Upvotes Score
                  </label>
                  <input
                    type="number"
                    name="upvote"
                    value={formData.upvote}
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-900/80 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 hover:bg-gray-800/80"
                    placeholder="0"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-purple-500/30">
                    <span className="text-purple-300 font-medium">Featured Status</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={!!formData.featured}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all duration-300 peer-checked:bg-purple-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-pink-500/30">
                    <span className="text-pink-300 font-medium">Top Status</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="top"
                        checked={!!formData.top}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all duration-300 peer-checked:bg-pink-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* AI Identity */}
              <div className=" gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-purple-300 font-medium mb-2">
                    <Bot className="w-5 h-5 mr-2" />
                    AI Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-900/80 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 hover:bg-gray-800/80"
                    placeholder="Enter AI tool name..."
                    required
                  />
                </div>

                <div className="mt-5 flex items-center justify-between px-4 py-4 bg-gray-900/50 rounded-xl border border-green-500/30">
                  <span className="text-green-300 font-medium flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Verified Status
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="verified"
                      checked={!!formData.verified}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all duration-300 peer-checked:bg-green-500"></div>
                  </label>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="flex items-center text-pink-300 font-medium mb-2">
                  <Brain className="w-5 h-5 mr-2" />
                  AI Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-4 bg-gray-900/80 border border-pink-500/30 rounded-xl text-white placeholder-gray-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 hover:bg-gray-800/80 resize-none"
                  placeholder="Describe your AI's capabilities, training, and unique features..."
                  required
                />
              </div>

              {/* Category and Subscription */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-cyan-300 font-medium mb-2">
                    <Cpu className="w-5 h-5 mr-2" />
                    AI Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-900/80 border border-cyan-500/30 rounded-xl text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 hover:bg-gray-800/80"
                    required
                  >
                    <option value="">Select AI Domain</option>
                    {categories && categories.map(cat => (
                      <option key={cat.categoryId || cat._id} value={cat.categoryId || cat._id}>{cat.title}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="mt-2 w-full p-2 bg-cyan-600/20 border border-cyan-500/50 rounded-lg text-cyan-300 hover:bg-cyan-600/30 transition-all duration-300 text-sm flex items-center justify-center space-x-2"
                  >
                    <Tag className="w-4 h-4" />
                    <span>Add New Category</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-yellow-300 font-medium mb-2">
                    <Zap className="w-5 h-5 mr-2" />
                    Subscription Type
                  </label>
                  <select
                    name="subscriptionType"
                    value={formData.subscriptionType}
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-900/80 border border-yellow-500/30 rounded-xl text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 hover:bg-gray-800/80"
                    required
                  >
                    <option value="">Select Access Level</option>
                   
                    <option value="freemium">Freemium</option>
     
            
                    <option value="paid">Paid</option>
                    <option value="free">Free</option>
                  </select>
                </div>
              </div>

              {/* Link */}
              <div className="space-y-2">
                <label className="flex items-center text-green-300 font-medium mb-2">
                  <Target className="w-5 h-5 mr-2" />
                  AI Link
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-900/80 border border-green-500/30 rounded-xl text-white placeholder-gray-500 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 hover:bg-gray-800/80"
                  placeholder="https://your-ai-tool.com"
                  required
                />
              </div>

              {/* Logo Upload Section */}
              <div className="space-y-4">
               
                
                {/* Current Logo Display */}
                {currentLogo && (
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">Current Logo:</p>
                    <div className="relative inline-block">
                      <img 
                        src={currentLogo && currentLogo.startsWith('http') ? currentLogo : `http://10.10.13.83:4000/${currentLogo}`}
                        alt="Current AI Logo" 
                        className="w-20 h-20 object-cover rounded-xl border-2 border-indigo-500/30"
                      />
                    </div>
                  </div>
                )}
                
                {/* Photo Preview */}
                {formData.logo && (
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">New Logo Preview:</p>
                    <div className="relative inline-block">
                      <img 
                        src={URL.createObjectURL(formData.logo)} 
                        alt="Logo Preview" 
                        className="w-20 h-20 object-cover rounded-xl border-2 border-green-500/50"
                      />
                    </div>
                  </div>
                )}
                
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full p-4 bg-gray-900/80 border border-indigo-500/30 rounded-xl text-white hover:bg-gray-800/80 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center justify-center space-x-3">
                      <Upload className="w-5 h-5 text-indigo-400" />
                      <span className="text-gray-300">
                        {formData.logo ? 'Change Logo' : 'Upload New Logo'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 text-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="group relative inline-flex items-center px-12 py-4 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <Save className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10">{loading ? 'Updating...' : 'Update AI'}</span>
                  <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor'}}></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          ></div>

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-md mx-4">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/95 to-gray-900/95 rounded-2xl backdrop-blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-purple-500/5 to-cyan-500/10 rounded-2xl"></div>
            
            {/* Modal Content */}
            <div className="relative p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Tag className="w-8 h-8 text-orange-500" />
                    <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-lg"></div>
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                    Add New Category
                  </h2>
                </div>
                
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200 group"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Category Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      placeholder="Enter category name..."
                      className="w-full px-4 py-3 bg-gray-900/80 border border-orange-500/30 rounded-xl text-white placeholder-gray-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 outline-none"
                      onKeyPress={(e) => e.key === 'Enter' && handleCategorySave()}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleClose}
                    className="flex-1 px-6 py-3 bg-gray-800/80 text-gray-300 rounded-xl font-medium hover:bg-gray-700/80 hover:text-white transition-all duration-200 border border-gray-700/50"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={handleCategorySave}
                    disabled={!categoryName.trim() || isSavingCategory}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:from-orange-400 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 disabled:hover:scale-100"
                  >
                    {isSavingCategory ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Save Category
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-500/20 rounded-full blur-sm"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-500/20 rounded-full blur-sm"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditAI;