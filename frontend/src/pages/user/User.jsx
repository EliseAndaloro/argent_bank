import React, { useEffect } from "react";
import UserName from "../../components/userName/UserName";
import "./user.css";
import { selectUser } from "../../app/selector";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { signOut, fetchUserData } from "../../services/actions";
import { useNavigate } from "react-router-dom";
import AccountItem from "../../components/accountItem/AccountItem";

/**
 * @function User
 * @description Affiche les informations d'un utilisateur.
 * Vérifie si l'utilisateur est connecté ou non, et navigue vers la page de profil ou de connexion en conséquence.
 * Utilise les données de l'utilisateur depuis le state de l'application avec la fonction useSelector et dispatch une action avec useDispatch. Utilise également la fonction useNavigate pour naviguer entre les pages.
 * @returns {JSX.Element} Le composant React affichant les informations de l'utilisateur.
 */
function User() {
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    if (!userData.data) {
      if (token) {
        /**
         * @function fetchUserData
         * @description Dispatch une action pour récupérer les données de l'utilisateur à partir d'un token.
         * @param {string} token - Le token d'authentification de l'utilisateur.
         * @returns {object} L'action à dispatcher pour récupérer les données de l'utilisateur.
         */
        dispatch(fetchUserData(token));
        navigate("/profile");
      } else {
        localStorage.clear();
        sessionStorage.clear();
        /**
         * @function signOut
         * @description Dispatch une action pour déconnecter l'utilisateur.
         * @returns {object} L'action à dispatcher pour déconnecter l'utilisateur.
         */
        dispatch(signOut());
        navigate("/login");
      }
    }
  }, [dispatch, navigate, token, userData]);

  if (!userData.data) {
    return null;
  }

  return (
      <div className="pageContainer">
        <main className="main bg-dark">
          {/**@function UserName
           * @description Affiche le nom de l'utilisateur.
           * @param {object} userData - Les données de l'utilisateur.
           * @returns {JSX.Element} Le composant React affichant le nom de l'utilisateur. */}
          <UserName userData={userData} />
          <h2 className="sr-only">Accounts</h2>
          {/**
           * @function AccountItem
           * @description Affiche les transactions de l'utilisateur.
           * @param {string} accountTitle - Le titre du compte.
           * @param {string} accountAmount - Le montant du compte.
           * @param {string} accountBalance - Le solde disponible du compte.
           * @returns {JSX.Element} Le composant React affichant les transactions de l'utilisateur.
           */}
          <AccountItem
              accountTitle="Argent Bank Checking (x8349)"
              accountAmount="$2,082.79"
              accountBalance="Available Balance"
          />
          <AccountItem
              accountTitle="Argent Bank Savings (x6712)"
              accountAmount="$10,928.42"
              accountBalance="Available Balance"
          />
          <AccountItem
              accountTitle="Argent Bank Credit Card (x8349)"
              accountAmount="$184.30"
              accountBalance="Current Balance"
          />
        </main>
      </div>
  );
}

export default User;
