import { useContext, useEffect, useState } from "react";
import "./singlePost.css";
import { useLocation } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";

export default function SinglePost() {
  const [post, setPost] = useState({});
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const PF = "https://tblogapp.onrender.com/images/";
  const { user } = useContext(Context);
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    async function fn() {
      const res = await axios.get(`https://tblogapp.onrender.com/api/post/${path}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    }
    fn();
  }, [path]);

  async function handleUpdate(){
    try{
      await axios.put(`https://tblogapp.onrender.com/api/post/${post._id}`,{
        username: user.username,
        title,
        desc
      })
      setUpdateMode(false);
    }
    catch(err){
      console.log(err);
    }
  }
  async function handelDelete() {
    try {
      console.log(user.username === post.username);
      await axios.delete(`https://tblogapp.onrender.com/api/post/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img src={PF + post.photo} alt="" className="singlePostImg" />
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => {
                    setUpdateMode(!updateMode);
                  }}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handelDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:{" "}
            <Link to={`/?user=${post.username}`}>
              {" "}
              <b>{post.username}</b>{" "}
            </Link>
          </span>

          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        ) : (
          <p className="singlePostDesc">{post.desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
