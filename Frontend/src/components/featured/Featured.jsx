import "./featured.scss";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Featured() {

    const [image, setImage] = useState("");
    const [discover, setDiscover] = useState([]);

    useEffect(() => {

        const getDiscover = async () => {
            try {
                const res = await axios.get("movie/discover", {
                    headers: {
                        Authorization: JSON.parse(localStorage.getItem("user")).token
                    }
                
                });
                console.log("discover");
                console.log(res.data);

                const selectedValue = res.data[Math.floor(Math.random() * res.data.length)];
                setDiscover(selectedValue);

                setImage(`https://image.tmdb.org/t/p/original${selectedValue.backdrop_path}`)
                console.log("discover");
                console.log(discover);

            } catch (e) {
                console.log(e);
            }
        }
        
        getDiscover();
    }, []);


    return (
        <div className="featured">
            <img src={image} alt="" />
            <div className="info">
                <h1 className="title">{discover.title}</h1>
                <h1 className="description">{discover.overview}</h1>
            </div>
        </div>
    )
}
