import React from "react";
import "./post.css";
import { Link } from "react-router-dom";
export default function Posts({post}) {
  const PF = "https://tblogapp.onrender.com/images/";
  return (
    <div className="post">
      <img
        src={PF+post?.photo}
        alt=""
        className="postImg"
      />
      <div className="postInfo">
        <div className="postCats">
          {
            post.categories.map((p)=>{
              return (
              <Link className="link" to={`/?cat=${p}`}>
              <span className="postCat">{p}</span>
              </Link>
              );
            })
          }
        </div>
        <span className="postTitle">
          <Link className="link" to={`/post/${post._id}`}>
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  );
}
