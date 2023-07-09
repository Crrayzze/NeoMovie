import Navbar from "../../components/navbar/Navbar"
import "./playlist.scss"
import List from "../../components/list/List";
import { Helmet } from "react-helmet";
import CreatePlaylist from "../../components/createPlaylist/CreatePlaylist";
import axios from "axios";
import { useEffect, useState } from "react";


const TITLE = "NeoMovie";

const Playlist = () => {

    const [watched, setWatched] = useState([]);
    const [liked, setLiked] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [playlistList, setPlaylistList] = useState([]);


    useEffect(() => {

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

        const getWatchedMovies = async () => {
            try {
                const res = await axios.get("watched", {
                    headers: {
                        Authorization: JSON.parse(localStorage.getItem("user")).token
                    }
                });
                console.log("watched")
                console.log(res.data);
                setWatched(res.data);
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
        getPlaylistList();
        getWatchedMovies();
        getLikedMovies();
        getPlaylists();
    }, []);


  return (
    <div className='playlist'>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
        <Navbar/>
        <CreatePlaylist/>
        <List list={watched} name="Mes films visionnés" listPlaylist={playlistList}/>
        <List list={liked} name="Mes films likés" listPlaylist={playlistList}/>
        {
          playlists.map((playlist) => (
            <List list={playlist.movie} name={playlist.title} listPlaylist={playlistList}/>
          ))
        }
    </div>
  )
}

export default Playlist