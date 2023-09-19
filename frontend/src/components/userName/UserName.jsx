import React, { useState } from "react";
import "./userName.css";
import { updateUserData } from "../../services/actions";
import { useDispatch } from "react-redux/es/exports";

/**
 * La fonction UserName affiche le nom de l'utilisateur connecté et permet de le modifier en utilisant un formulaire.
 * @param {Object} userData - Les données de l'utilisateur connecté
 * @param {string} userData.data.firstName - Le prénom de l'utilisateur
 * @param {string} userData.data.lastName - Le nom de famille de l'utilisateur
 * @param {string} userData.token - Le jeton d'authentification de l'utilisateur
 * @returns {JSX.Element} Un élément React représentant la bienvenue et le nom de l'utilisateur, avec la possibilité de le modifier.
 */
function UserName({ userData }) {
    const dispatch = useDispatch();

    const [userName, setUsername] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    function showEditProfileForm() {
        setUsername(true);
        setFirstName(userData.data.firstName);
        setLastName(userData.data.lastName);
    }

    function name(e) {
        e.preventDefault();

        const token =
            localStorage.getItem("token") ||
            sessionStorage.getItem("token") ||
            userData.token;

        const edit = dispatch(updateUserData(token, firstName, lastName));

        if (!edit) {
            return;
        }

        setUsername(false);
    }

    return userName ? (
        <div className="header">
            <h1 className="">Welcome back</h1>
            <form className="formChange" onSubmit={(e) => name(e)}>
                <div className="divInputChange">
                    <label htmlFor="firstName"></label>
                    <input
                        className="inputChange"
                        type="text"
                        name="firstName"
                        placeholder=""
                        value={firstName}
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label htmlFor="lastName"></label>
                    <input
                        className="inputChange"
                        type="text"
                        name="lastName"
                        placeholder=""
                        value={lastName}
                        required
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="divButtonChange">
                    <button className="buttonChange" type="submit">
                        Save
                    </button>
                    <button
                        className="buttonChange"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault(e);
                            setUsername(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    ) : (
        <div className="header">
            <h1>
                Welcome back
                <br />
                {userData.data.firstName} {userData.data.lastName}!
            </h1>
            <button className="edit-button" onClick={() => showEditProfileForm()}>
                Edit Name
            </button>
        </div>
    );
}

export default UserName;
