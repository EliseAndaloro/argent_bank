import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // import du composant Link

/**
 * @module AccountItem
 * @description Composant React permettant d'afficher les informations d'une transaction bancaire spécifique.
 * Il importe un fichier CSS pour fournir des styles pour le composant.
 */

/**
 * Props (propriétés) du composant
 * @property {string} accountTitle - Titre de la transaction.
 * @property {string} accountAmount - Montant de la transaction.
 * @property {string} accountBalance - Solde de compte après la transaction.
 */

/**
 * @function
 * @name AccountItem
 * @param {Object} props - Les propriétés du composant
 * @returns {React.Component} - Composant React pour afficher les informations de la transaction.
 */

function AccountItem({ accountTitle, accountAmount, accountBalance }) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  return (
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">{accountTitle}</h3>
          <p className="account-amount">{accountAmount}</p>
          <p className="account-amount-description">{accountBalance}</p>
        </div>
        <div className="account-content-wrapper cta">
          <Link to="/transactions">
            {" "}
            {/* Utilisation du composant Link pour la redirection */}
            <button
                className={`transaction-button ${
                    isButtonClicked ? "transaction-button-clicked" : ""
                }`}
                onClick={handleButtonClick}
            >
              View transactions
            </button>
          </Link>
        </div>
      </section>
  );
}

AccountItem.propTypes = {
  accountTitle: PropTypes.string.isRequired,
  accountAmount: PropTypes.string.isRequired,
  accountBalance: PropTypes.string.isRequired,
};

export default AccountItem;
