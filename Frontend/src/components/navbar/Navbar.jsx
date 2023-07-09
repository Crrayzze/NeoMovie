import "./navbar.scss"
import logo from "../../ressources/NeoMovie_red.png"
import profilePicture from "../../ressources/default-user-image.png";
import { ArrowDropDown } from "@material-ui/icons"
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContxt/authContext"
import { logout } from "../../context/authContxt/AuthActions";

const Navbar = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    const { dispatch } = useContext(AuthContext);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset ===  0 ? false : true)
        return () => window.onscroll = null;
    }

    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <img src={logo} alt="NeoMovie logo" />
                    <Link to="/" className="link">
                        <span className="navbarmainLinks">Homepage</span>
                    </Link>
                    <Link to="/my-lists" className="link">
                        <span className="navbarmainLinks">My lists</span>
                    </Link>
                    <Link to="/genre" className="link">
                        <span className="navbarmainLinks">Genre</span>
                    </Link>
                </div>
                <div className="right">
                    <Link to="/search" className="link">
                        <span className="navbarmainLinks">Search</span>
                    </Link>

                    <img src={profilePicture} alt="Profile" />
                    <div className="profile">
                        <ArrowDropDown className="icon"/>
                        <div className="options">
                            <span onClick={() => dispatch(logout())}>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar