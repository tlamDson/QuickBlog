import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
//instead of having the navigate hook, we can create it here
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  //store the token for authentication
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      console.log("API Response:", data); // Debug log
      if (data.success) {
        console.log("Blogs received:", data.blogs); // Debug log
        setBlogs(data.blogs || []);
      } else {
        toast.error(data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error); // Debug log
      toast.error(error.response?.data?.message || error.message || "Failed to fetch blogs");
    }
  };
  useEffect(() => {
    fetchBlogs();
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      //this token will be added in every api call when admin is loged in
      axios.defaults.headers.common["Authorization"] = `${token}`;
    } else {
      //check if the token is not exist
      setToken(null);
      localStorage.removeItem("token");
    }
  }, []);
  //we can access this data in another component
  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    fetchBlogs,
  };
  return (
    //wrong in wrapping value inside another object s owhen call the naviagate is undefined
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};
//whenever we want to use the data from the context we will use this hook
export const useAppContext = () => {
  return useContext(AppContext);
};

//we will create some data that will be share in the components
