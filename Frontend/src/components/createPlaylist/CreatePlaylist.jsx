import { useRef } from "react";
import "./createPlaylist.scss";
import axios from "axios";

export default function CreatePlaylist() {

    const playlistRef = useRef();

    const handleStart = async () => {

        try {
            await axios.post("playlist", {
                "title": playlistRef.current.value
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
        <div className="createPlaylist">
            <div className="container">

                    <h1>Créer une playlist</h1>
                    <h1 className="description">Ajoutez des titres à vos playlists pour organiser et retrouver vos films préférés.</h1>
                    <div className="input">
                        <input type="text" placeholder="Titre" ref={playlistRef}/>
                        <button 
                            className="confirmButton"
                            onClick={handleStart}>
                                Confirmer
                        </button>
                    </div>
            </div>
        </div>
    )
}
