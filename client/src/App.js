import Topbar from "./components/topbar/Topbar";
import Home from "./pages/homepage/Home";
import Login from "./pages/login/Login";
import Settings from "./pages/setting/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./Context/Context";
import About from "./pages/about/About";

function App() {
  const {user} = useContext(Context);
  return (
    <div className="App">
      <Router>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/write" element={user ? <Write /> : <Login />} />
          <Route path="/settings" element={user ? <Settings /> : <Login />} />
          <Route path="/post/:postId" element={user? <Single />: <Login/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
