import React from "react";
import "./header.css";
import logo from "../../assets/img/argentBankLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut, fetchUserData } from "../../services/actions";
import { selectUser } from "../../app/selector";

/**
 * Header - Fonction de rendu du header de l'application
 *
 * @returns {JSX.Element} Elément JSX représentant le header
 */
function Header() {
    // Récupération des données de l'utilisateur via hook useSelector
    const userData = useSelector(selectUser);
    // Récupération du token dans le localStorage ou sessionStorage
    const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
    // Récupération de l'état de "se souvenir de moi" dans le localStorage
    const isRemembered = localStorage.getItem("isRemembered");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * clearStorage - Fonction de nettoyage du localStorage et sessionStorage et de la déconnexion de l'utilisateur
     *
     * @returns {void}
     */
    function clearStorage() {
        localStorage.clear();
        sessionStorage.clear();
        return dispatch(signOut());
    }

    /**
     * remember - Fonction de gestion de l'état "se souvenir de moi"
     *
     * @returns {void}
     */
    function remember() {
        if (isRemembered) {
            dispatch(fetchUserData(token));
            navigate("/profile");
        } else {
            navigate("/login");
        }
    }

    // Rendu conditionnel du header en fonction de la présence d'un token et de données de l'utilisateur
    return token && userData.data ? (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Link to="/profile" className="main-nav-item">
                    <i className="fa fa-user-circle"></i>
                    {userData.data.firstName}
                </Link>
                <Link to="/" onClick={clearStorage} className="main-nav-item">
                    <i className="fa fa-sign-out"></i>
                    Sign Out
                </Link>
            </div>
        </nav>
    ) : (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div onClick={remember} className="main-nav-item">
                <i className="fa fa-user-circle"></i>
                Sign In
            </div>
        </nav>
    );
}

export default Header;
