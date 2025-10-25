import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, blog_data, blogCategories } from "../assets/assets";
import Navbar from "../components/Navbar";
const Blog = () => {
  const { _id } = useParams(); //get the blog id from the url params
  const [data, setData] = useState(null);
  //return the blog that match with the id
  const fetchBlogData = async () => {
    const data = blog_data.find((item) => item._id === _id);
    setData(data);
  };
  useEffect(() => {
    fetchBlogData();
  }, []);

  const navigate = useNavigate();

  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
      <Navbar />
      <div>{/*add the published date*/}</div>

      <div></div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Blog;
