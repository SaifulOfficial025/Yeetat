import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [ais, setAIs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  // Fetch stats
  const fetchStats = async () => {
    try {
      const res = await fetch("https://ai-capitol-server.onrender.com/ai/stats");
      const data = await res.json();
      if (data.status === 200 && data.data && data.data.stats) {
        setStats(data.data.stats);
      } else {
        toast.error(data.message || "Failed to fetch stats");
      }
    } catch (err) {
      toast.error("Server error fetching stats");
    }
  };
  // Fetch all categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://ai-capitol-server.onrender.com/category");
      const data = await res.json();
      if (data.status === 200) {
        setCategories(data.data.categories);
        // toast.success(data.message);
        console.log(data);
      } else {
        toast.error(data.message || "Failed to fetch categories");
      }
    } catch (err) {
      toast.error("Server error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  // Create category
  const createCategory = async (title) => {
    setLoading(true);
    try {
      const res = await fetch("https://ai-capitol-server.onrender.com/category/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      if (data.status === 201) {
        toast.success(data.message);
        fetchCategories();
      } else {
        toast.error(data.message || "Failed to create category");
      }
      console.log(data);
      return data;
    } catch (err) {
      toast.error("Server error creating category");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all AIs
  const fetchAIs = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://ai-capitol-server.onrender.com/ai");
      const data = await res.json();
      if (data.status === 200) {
        setAIs(data.data.ais);
        toast.success(data.message);
        console.log(data);
      } else {
        toast.error(data.message || "Failed to fetch AIs");
      }
    } catch (err) {
      toast.error("Server error fetching AIs");
    } finally {
      setLoading(false);
    }
  };

  // Upload image to Cloudinary (S3 compatible)
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Change to your Cloudinary preset
    // Use your Cloudinary cloud name
    const url = `https://api.cloudinary.com/v1_1/<your-cloud-name>/image/upload`;
    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        return data.secure_url;
      } else {
        toast.error("Image upload failed");
        return null;
      }
    } catch (err) {
      toast.error("Image upload error");
      return null;
    }
  };

  // Create AI
  const createAI = async (aiData) => {
    setLoading(true);
    try {
      let logoUrl = aiData.logo;
      // Only upload if logo is a File
      if (aiData.logo && typeof aiData.logo !== 'string') {
        logoUrl = await uploadImage(aiData.logo);
        if (!logoUrl) {
          toast.error("Image upload failed. Please try again.");
          setLoading(false);
          return;
        }
      }
      const payload = {
        title: aiData.title,
        description: aiData.description,
        url: aiData.link,
        logo: logoUrl || '',
        upvote: Number(aiData.upvote) || 0,
        isFeatured: !!aiData.featured,
        isTop: !!aiData.top,
        isVerified: !!aiData.verified,
        subscriptionType: aiData.subscriptionType,
        categoryId: Number(aiData.category) || 1,
      };
      const res = await fetch("https://ai-capitol-server.onrender.com/ai/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.status === 201) {
        toast.success(data.message);
        fetchAIs();
      } else {
        toast.error(data.message || "Failed to create AI");
      }
      console.log(data);
      return data;
    } catch (err) {
      toast.error("Server error creating AI");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return React.createElement(
    DataContext.Provider,
    { value: { ais, loading, fetchAIs, createAI, categories, fetchCategories, createCategory, stats, fetchStats } },
    children
  );
};

export const useData = () => useContext(DataContext);
