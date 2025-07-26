import React, { useState } from 'react';
import { Plus, X, Save, Tag } from 'lucide-react';

function AddCategoryModal() {
  const [isModalOpen, setIsModalOpen] = useState(true); // Set to true to show modal by default
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!categoryName.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Saving category:', categoryName);
      setIsLoading(false);
      setCategoryName('');
      setIsModalOpen(false);
      // Here you would typically make an API call to save the category
    }, 1000);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setCategoryName('');
  };

  return (
    <>
      {/* Trigger Button */}
      <span 
        onClick={() => setIsModalOpen(true)}
        className="ml-5 text-orange-500 cursor-pointer hover:text-orange-400 transition-colors duration-200 hover:underline"
      >
        (Add Category?)
      </span>

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
                      onKeyPress={(e) => e.key === 'Enter' && handleSave()}
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
                    onClick={handleSave}
                    disabled={!categoryName.trim() || isLoading}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:from-orange-400 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-8 h-5 mr-2" />
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
    </>
  );
}

export default AddCategoryModal;