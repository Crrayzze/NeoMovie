import Navbar from "../../components/navbar/Navbar"
import "./home.scss"
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import axios from "axios";

const TITLE = "NeoMovie";

const Home = () => {

    const [trendingWeek, setTrendingWeek] = useState([]);
    const [liked, setLiked] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [playlistList, setPlaylistList] = useState([]);

    useEffect(() => {

        const getTrendingWeek = async () => {
            try {
                const res = await axios.get("movie/trending/week", {
                    headers: {
                        Authorization: JSON.parse(localStorage.getItem("user")).token
                    }
                });
                console.log(res.data);
                setTrendingWeek(res.data);
            } catch (e) {
                console.log(e);
            }
        }

        const getPlaylistList = async () => {
            try {
                const res = await axios.get("playlist/list", {
                    headers: {
                        Authorization: JSON.parse(localStorage.getItem("user")).token
                    }
                
                });
                setPlaylistList(res.data);
            } catch (e) {
                console.log(e);
            }
        }

        const getLikedMovies = async () => {
            try {
                const res = await axios.get("like", {
                    headers: {
                        Authorization: JSON.parse(localStorage.getItem("user")).token
                    }
                });
                console.log(res.data);
                setLiked(res.data);
            } catch (e) {
                console.log(e);
            }
        }

        const getPlaylists = async () => {
            try {
                const res = await axios.get("playlist", {
                    headers: {
                        Authorization: JSON.parse(localStorage.getItem("user")).token
                    }
                
                });
                console.log(res.data);
                setPlaylists(res.data);
            } catch (e) {
                console.log(e);
            }
        }

        // Almost finished
        // const getFavGenreMovies = async () => {
        //     try {
        //         const res = await axios.get("genre", {
        //             headers: {
        //                 Authorization: JSON.parse(localStorage.getItem("user")).token
        //             }
                
        //         });

        //         console.log(res.data);
        //         setPlaylists(res.data);
        //     } catch (e) {
        //         console.log(e);
        //     }
        // }

        getTrendingWeek();
        getLikedMovies();
        getPlaylists();
        getPlaylistList();
    }, []);

  return (
    <div className='home'>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
        <Navbar/>
        <Featured />
        <List list={trendingWeek} name="Populaire cette semaine" listPlaylist={playlistList}/>
        <List list={liked} name="Mes films likés" listPlaylist={playlistList}/>
        {
          playlists.map((playlist) => (
            <List list={playlist.movie} name={playlist.title} listPlaylist={playlistList}/>
          ))
        }
    </div>
  )
}

export default Home