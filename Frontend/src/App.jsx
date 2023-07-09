import "./app.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Playlist from "./pages/playlist/Playlist";
import Genre from "./pages/genre/Genre";
import { useContext } from "react";
import { AuthContext } from "./context/authContxt/authContext";
import SearchPage from "./pages/searchPage/SearchPage";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {user ? (
          user.firstConnection ? (
            <Route exact path="/" element={<Genre />}></Route>
          ) : (
            <Route exact path="/" element={<Home />}></Route>
          )
        ) : (
          <Route exact path="/" element={<Navigate replace to="/register" />} />
        )}
        {!user ? (
          <Route path="/register" element={<Register />}></Route>
        ) : (
          <Route path="/register" element={<Navigate replace to="/" />} />
        )}
        {!user ? (
          <Route path="/login" element={<Login />}></Route>
        ) : (
          <Route path="/login" element={<Navigate replace to="/" />} />
        )}
        {user && (
          <>
            <Route path="/watch" element={<Watch />}></Route>
            <Route path="/my-lists" element={<Playlist />}></Route>
            <Route path="/genre" element={<Genre />}></Route>
            <Route path="/search" element={<SearchPage />}></Route>
          </>
        )}
      </Routes>
    </Router>
  );
  // return <Login/>
};

export default App;
