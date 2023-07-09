import { useState, useEffect } from "react";
import Select from "react-select";
import "./selectFavouriteGenre.scss";
import axios from "axios";

export default function SelectFavouriteGenre() {

    const [selectedValue, setSelectedValue] = useState([]);
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        const getGenre = async () => {
            try {
                const res = await axios.get("movie/genre", {
                    headers: {
                        Authorization: JSON.parse(localStorage.getItem("user")).token
                    }
                
                });
                console.log(res.data);
                setGenre(res.data);
            } catch (e) {
                console.log(e);
            }
        }
        getGenre();
    }, []);

    const handleStart = async () => {
        console.log(selectedValue);
        const genres_id = [];

        for (const i of selectedValue) {
            genres_id.push(i.toString());
        }
        

        await axios.post("genre", {
            genres_id
        }, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem("user")).token
            }
        })
    }

    const handleOnChange = (e) => {
        setSelectedValue(Array.isArray(e) ? e.map(x => x.id) : []);
    }


    return (
        <div className="selectFavourite">
            <div className="container">

                    <h1>Choisis tes genres favoris</h1>
                    <h1 className="description">Ajoutez des genres à vos favoris pour ajuster les recommendations.</h1>
                    <div className="input">
                        <Select 
                            options={genre.genres}
                            placeholder="Choisis tes genres préférés"
                            isMulti
                            isClearable
                            getOptionLabel={(option)=>option.name}
                            getOptionValue={(option)=>option.id}
                            onChange={handleOnChange}
                            className="select"
                        />
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
