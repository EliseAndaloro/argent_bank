/**
 * @file Ce fichier contient un gestionnaire d'état pour la connexion d'un utilisateur
 * @requires @reduxjs/toolkit
 */
import { createSlice } from "@reduxjs/toolkit";

/**
 * État initial de l'application
 * @typedef {Object} InitialState
 * @property {String} tokenStatus - Status du token, soit "void", "pending", "rejected" ou "resolved"
 * @property {String} dataStatus - Status des données de l'utilisateur, soit "void", "pending", "rejected" ou "resolved"
 * @property {Object} [data=null] - Les données de l'utilisateur
 * @property {Object} [error=null] - L'erreur éventuelle
 * @property {String} [token=null] - Le token de l'utilisateur
 */
const initialState = {
  tokenStatus: "void",
  dataStatus: "void",
  data: null,
  error: null,
  token: null,
};

/**
 * Objet renvoyé par la fonction createSlice
 * @typedef {Object} Slice
 * @property {Object} actions - Les actions disponibles pour mettre à jour l'état
 * @property {Function} reducer - Le réducteur pour mettre à jour l'état
 */
const { actions, reducer } = createSlice({
  name: "login",
  initialState,
  reducers: {
    /**
     * Action pour mettre à jour le status des données de l'utilisateur à "pending"
     * @function userDataFetching
     * @param {String} token - Le token de l'utilisateur
     * @returns {Object} - Le payload à passer au réducteur
     */
    userDataFetching: {
      prepare: (token) => ({
        payload: { token },
      }),
      /**
       * Réducteur pour mettre à jour le status des données de l'utilisateur à "pending"
       * @function userDataFetching.reducer
       * @param {InitialState} state - L'état actuel
       * @param {Object} action - L'action déclenchée
       * @returns {void}
       */
      reducer: (state, action) => {
        if (state.dataStatus === undefined) {
          return initialState;
        }
        if (state.dataStatus === "void") {
          state.dataStatus = "pending";
          return;
        }
        if (state.dataStatus === "rejected") {
          state.dataStatus = "pending";
          state.error = null;
          return;
        }
        if (state.dataStatus === "resolved") {
          state.dataStatus = "updating";
          return;
        }
      },
    },
    /**
     * Object représentant une action d'affichage de données utilisateur résolues.
     * @typedef {Object} userDataResolved
     * @property {function} prepare - Prépare un objet "payload" avec les données token et data.
     * @property {function} reducer - Modifie le statut de données de l'utilisateur à "resolved" et met à jour les données utilisateur dans l'état avec les données du "payload". Si l'état actuel est "undefined", il retourne l'état initial.
     */
    userDataResolved: {
      prepare: (token, data) => ({
        payload: { token, data },
      }),
      reducer: (state, action) => {
        if (state.dataStatus === undefined) {
          return initialState;
        }
        if (state.dataStatus === "pending" || state.dataStatus === "updating") {
          state.dataStatus = "resolved";
          state.data = action.payload.data;
          state.token = action.payload.token;
          return;
        }
      },
    },
    /**
     * Object qui définit une action pour la rejet de données utilisateur.
     * @typedef {Object} UserDataRejected
     * @property {function} prepare - Fonction qui prépare le payload pour l'action.
     * @param {string} token - Le jeton associé aux données rejetées.
     * @param {Object} error - L'objet d'erreur associé au rejet des données.
     * @returns {Object} - L'objet payload pour l'action.
     * @property {function} reducer - Fonction qui met à jour le state en cas de rejet de données utilisateur.
     * @param {Object} state - L'état actuel du store.
     * @param {Object} action - L'action déclenchée.
     * @returns {void}
     */
    userDataRejected: {
      prepare: (token, error) => ({
        payload: { token, error },
      }),
      reducer: (state, action) => {
        if (state.dataStatus === undefined) {
          return initialState;
        }
        if (state.dataStatus === "pending" || state.dataStatus === "updating") {
          state.dataStatus = "rejected";
          state.error = action.payload;
          state.data = null;
          return;
        }
      },
    },
    /**
     * Objet userTokenFetching qui gère l'état de la récupération du jeton d'utilisateur.
     * @typedef {Object} UserTokenFetching
     * @property {function} prepare - Prépare les données à envoyer avec l'action.
     * @param {string} userLogin - Login de l'utilisateur.
     * @returns {Object} L'objet avec les données à envoyer avec l'action.
     * @property {function} reducer - Met à jour l'état en fonction de l'action.
     * @param {Object} state - L'état actuel du store.
     * @param {Object} action - L'action à effectuer.
     */
    userTokenFetching: {
      prepare: (userLogin) => ({
        payload: { userLogin },
      }),
      reducer: (state, action) => {
        if (state.tokenStatus === undefined) {
          return initialState;
        }
        if (state.tokenStatus === "void") {
          state.tokenStatus = "pending";
          return;
        }
        if (state.tokenStatus === "rejected") {
          state.tokenStatus = "pending";
          state.error = null;
          return;
        }
        if (state.tokenStatus === "resolved") {
          state.tokenStatus = "updating";
          return;
        }
      },
    },
    /**
     * @typedef {Object} userTokenResolved
     * @property {function} prepare - Prépare les données pour la mise à jour du token.
     * @property {function} reducer - Mise à jour de l'état pour refléter la résolution réussie du token de l'utilisateur.
     * @param {string} userLogin - Le nom d'utilisateur.
     * @param {string} token - Le jeton obtenu.
     * @return {Object} - Objet avec un champ payload contenant les données du nom d'utilisateur et du jeton.
     */
    userTokenResolved: {
      prepare: (userLogin, token) => ({
        payload: { userLogin, token },
      }),
      reducer: (state, action) => {
        if (state.tokenStatus === undefined) {
          return initialState;
        }
        if (
            state.tokenStatus === "pending" ||
            state.tokenStatus === "updating"
        ) {
          state.tokenStatus = "resolved";
          state.data = action.payload;
          return;
        }
      },
    },
    /**
     * @typedef {Object} userTokenRejected
     * @property {function} prepare - Prépare un objet de type "payload" qui inclut le nom d'utilisateur et le message d'erreur.
     * @property {function} reducer - Prend en entrée un état et une action. Si l'état actuel du token est "pending" ou "updating", met à jour le statut du token en "rejected", enregistre le message d'erreur et remet les données à null.
     */
    userTokenRejected: {
      prepare: (userLogin, error) => ({
        payload: { userLogin, error },
      }),
      reducer: (state, action) => {
        if (state.tokenStatus === undefined) {
          return initialState;
        }
        if (
            state.tokenStatus === "pending" ||
            state.tokenStatus === "updating"
        ) {
          state.tokenStatus = "rejected";
          state.error = action.payload.message;
          state.data = null;
          return;
        }
      },
    },
    /**
     * L'objet userUpdateProfile représente une action pour mettre à jour le profil de l'utilisateur.
     * @typedef {Object} userUpdateProfile
     * @property {function} prepare - Prépare les données nécessaires à l'action, retourne un objet qui représente le payload de l'action.
     * @property {function} reducer - Met à jour le state en fonction de l'action dispatchée.
     */
    userUpdateProfile: {
      prepare: (token, firstName, lastName) => ({
        payload: { token, firstName, lastName },
      }),
      reducer: (state, action) => {
        state.data.firstName = action.payload.firstName;
        state.data.lastName = action.payload.lastName;
        return;
      },
    },
    /**
     * @function reset
     * @description Réinitialise l'état de l'application au state initial.
     * @property {function} reducer - La fonction qui effectue la réinitialisation de l'état.
     * @returns {object} initialState - L'état initial de l'application.
     */
    reset: {
      reducer: () => {
        return initialState;
      },
    },
  },
});

export { actions };
export default reducer;
