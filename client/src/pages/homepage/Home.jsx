import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Posts from "../../components/posts/Posts";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {
  const [posts,setPosts] = useState([]);
  const {search} = useLocation();
  useEffect(()=>{
    const fn = async ()=>{
      const response = await axios.get('https://tblogapp.onrender.com/api/post'+search);
      setPosts(response.data);
    }
    fn();
  },[search])
  return (
    <div>
      <Header />
      <div className="home">
        <Posts posts={posts}/>
        <Sidebar />
      </div>
    </div>
  );
}
