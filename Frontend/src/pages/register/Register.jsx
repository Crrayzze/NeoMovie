import "./register.scss";
import logo from "../../ressources/NeoMovie_red.png";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleFinish = async (e) => {
        e.preventDefault();
        setUsername(usernameRef.current.value);
        setPassword(passwordRef.current.value);
        try {
            await axios.post("authentication/register", {"username": usernameRef.current.value, "password": passwordRef.current.value});
            navigate("/login");

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img className="logo" src={logo} alt="" />
                    <Link to="/login" className="link">
                        <button className="loginButton">Connexion</button>
                    </Link>
                </div>
            </div>
            <div className="container">
                <h1>La nouvelle façon de chercher, ranger et traquer vos films préférés.</h1>
                <h2>Créez vos playlists. Commencez maintenant, gratuitement.</h2>
                <p>
                    Entrez votre pseudo et mot de passe pour créer votre compte
                </p>
                <div className="containerRegister">
                    <form action="">
                        <input 
                            type="username"
                            placeholder="username"
                            ref={usernameRef} />
                        <input
                            type="password"
                            placeholder="password"
                            ref={passwordRef} />
                        <button 
                            onClick={handleFinish}>
                                Créer mon compte
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
