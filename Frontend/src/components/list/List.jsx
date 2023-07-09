import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@material-ui/icons";
import { useRef, useState } from "react";
import ListItem from "../listItem/ListItem";
import "./list.scss";

export default function List({list, name, listPlaylist}) {
    
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);

    const listRef = useRef();

    const handleClick = (direction) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${(230) + distance}px)`
        }
        if (direction === "right") {
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-230 + distance}px)`
        }
    }

    return (
        <div className="list">
            <span className="listTitle">{name}</span>
            <div className="wrapper">
                <ArrowBackIosOutlined className="sliderArrow left" onClick={ () => handleClick("left") }
                style ={{display: !isMoved && "none"}}/>
                <div className="container" ref={listRef}>
                    {list.map((item, i) => (
                        <ListItem index={i} item={item} listPlaylist={listPlaylist} />
                    ))}
                </div>
                <ArrowForwardIosOutlined className="sliderArrow right" onClick={ () => handleClick("right") }/>
            </div>
        </div>
    )
}
