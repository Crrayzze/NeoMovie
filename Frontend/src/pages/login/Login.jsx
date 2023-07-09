import "./login.scss";
import logo from "../../ressources/NeoMovie_red.png";
import { useContext, useState } from "react";
import { login } from "../../context/authContxt/apiCalls";
import { AuthContext } from "../../context/authContxt/authContext";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        login({username, password}, dispatch);
    }

    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <img className="logo" src={logo} alt="" />
                </div>
            </div>
            <div className="container">
                <form action="">
                    <h1>Connexion</h1>
                    <input type="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="loginButton" onClick={handleLogin}>Sign In</button>
                    <span>Nouveau sur NeoMovie ? <b>S'inscrire maintenant.</b> </span>
                </form>
            </div>
        </div>
    )
}
