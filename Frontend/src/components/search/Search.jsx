import { useState, useRef, useEffect } from "react";
import "./search.scss";
import axios from "axios";
import List from "../list/List";

export default function Search() {

    const [suggestion, setSuggestion] = useState([]);
    const [playlistList, setPlaylistList] = useState([]);


    const nameRef = useRef();

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

        getPlaylistList();
    }, [])

    const handleOnChange = async () => {

        try {
            const res = await axios.get(`movie/name?name=${nameRef.current.value}`,{
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("user")).token
                }
            
            });
            console.log(res.data);
            setSuggestion(res.data);
        } catch (e) {
            console.log(e);
        }

    }


    return (
        <div className="wrap">
            <div className="search">
                <div className="container">

                        <h1>Recherche</h1>
                            <input
                                type="text"
                                placeholder="Titre"
                                ref={nameRef}
                                onChange={handleOnChange} />
                </div>
            </div>
            <List list={suggestion} name={"Résultats"} listPlaylist={playlistList}/>
            <div className="fillScreen"/>
        </div>
    )
}
