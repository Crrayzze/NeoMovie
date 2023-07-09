import { PlayArrow, Favorite, Visibility } from "@material-ui/icons";
import "./listItem.scss";
import { useState } from "react";
import axios from "axios";
import Select from "react-select";

export default function ListItem({index, item, listPlaylist}) {

    const [isHovered, setIsHovered] = useState(false);
    const [currentPlaylist, setCurrentPlaylist] = useState({});
    // Fake video just to test everything
    const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";

    const image = `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`;

    const handleLike = async () => {
        try {
            await axios.post("like", {
                "movieId": item.id
            }, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("user")).token
                    }
            });
        } catch (e) {
            console.log(e);
        }
    }

    const handleWatched = async () => {
        try {
            await axios.post("watched", {
                "movieId": item.id
            }, {
                headers: {
                        Authorization: JSON.parse(localStorage.getItem("user")).token
                    }
            });
        } catch (e) {
            console.log(e);
        }
    }

    const handleAddPlaylist = async (e) => {
        try {
            console.log("playlist:")
            console.log(currentPlaylist)
               await axios.post("playlist/movie", {
                   "playlist_id": currentPlaylist.id,
                   "movie_id": item.id
               }, {
                   headers: {
                           Authorization: JSON.parse(localStorage.getItem("user")).token
                       }
               });     
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div 
            className="listItem"
            style={{left: isHovered && index * 225 + 5 * index - 50}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img className="poster" src={image} alt="" />
            {isHovered && (
                <>
                    <video src={trailer} autoPlay={true} loop />
                    <div className="itemInfo">
                        <div className="icons">
                            <PlayArrow className="icon"/>
                            <Favorite onClick={handleLike} className="icon"/>
                            <Visibility onClick={handleWatched} className="icon" />
                            <Select 
                                options={listPlaylist}
                                placeholder="playlist"
                                getOptionLabel={(option)=>option.title}
                                getOptionValue={(option)=>option.id}
                                onChange={(e) => setCurrentPlaylist({id:e.id, title: e.title})}
                                className="select"
                            />
                            <button 
                                className="confirmButton"
                                onClick={handleAddPlaylist}
                                >
                                ajouter 
                            </button>
                        </div>
                        <h1>{item.title}</h1>
                        <div className="itemInfoTop">
                            <span>1h14</span>
                            <span className="limit">+16</span>
                            <span className="date">{item.release_date}</span>
                        </div>
                        <div className="description">
                            {item.overview}
                        </div>
                        <div className="genre">Action</div>
                    </div>
                </>
            )}
        </div>
    )
}
