import React, { useState } from "react";
import { assets } from "../../../assets/assets";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const BlogTableItem = ({ blog, fetchBlogs, refreshPublicBlogs, index }) => {
  const { title, createdAt } = blog;
  const { axios } = useAppContext();
  const [isPublished, setIsPublished] = useState(blog.isPublished);
  const [isLoading, setIsLoading] = useState(false);
  const BlogDate = new Date(createdAt);

  const handleTogglePublish = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", { id: blog._id });
      if (data.success) {
        setIsPublished(data.isPublished);
        toast.success(data.message);
        // Refresh the admin blog list
        if (fetchBlogs) fetchBlogs();
        // Refresh the public blog list (for frontend display)
        if (refreshPublicBlogs) refreshPublicBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to toggle publish status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${
            isPublished ? "text-green-800" : "text-orange-700"
          } `}
        >
          {isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button 
          onClick={handleTogglePublish}
          disabled={isLoading}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          src={assets.cross_icon}
          alt=""
          className="w-8 hover:scale-110 transition-all cursor-pointer"
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
