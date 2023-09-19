import { actions } from "../app/reducer";
import SignIn from "../pages/sign-in/SignIn";
import { selectUser } from "../app/selector";

/**
 * La fonction signOut déconnecte l'utilisateur et efface les données stockées en local et en session.
 * @function
 * @param {function} dispatch - Dispatch est une fonction dépendant du contexte qui est utilisée pour déclencher une action.
 * @returns {function} - Retourne une fonction qui efface les données de l'utilisateur.export description]
 *
 */
export function signOut() {
    return (dispatch) => {
        localStorage.clear();
        sessionStorage.clear();
        dispatch(actions.reset());
    };
}

/**
 * La fonction setRemember enregistre le token de l'utilisateur et s'il souhaite être connecté automatiquement.
 * @function
 * @param {string} token - Token d'identification de l'utilisateur.
 * @param {boolean} remember - Indique si l'utilisateur souhaite être connecté automatiquement.
 *
 */
export function setRemember(token, remember) {
    localStorage.setItem("token", token);
    localStorage.setItem("isRemembered", remember);
}

/**
 * La fonction fetchUserToken envoie une demande pour récupérer le token d'un utilisateur.
 * @function
 * @async
 * @param {Object} userLogin - Contient les informations de connexion de l'utilisateur.
 * @param {function} dispatch - Dispatch est une fonction dépendant du contexte qui est utilisée pour déclencher une action.
 * @param {function} getState - Retourne l'état actuel du store.
 * @returns {Promise<string>} - Retourne le token de l'utilisateur s'il a réussi à se connecter.
 *
 */
export function fetchUserToken(userLogin) {
    return async (dispatch, getState) => {
        const tokenStatus = selectUser(getState()).tokenStatus;

        if (tokenStatus === "pending" || tokenStatus === "updating") {
            return;
        }
        dispatch(actions.userTokenFetching(userLogin));

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userLogin),
        };

        try {
            const response = await fetch(
                "http://localhost:3001/api/v1/user/login",
                options
            );

            if (response.status === 400) {
                console.log("invalid fields");
            }
            if (response.status === 401) {
                dispatch(actions.reset());
            }

            const data = await response.json();

            dispatch(actions.userTokenResolved(data.body.token));

            return data.body.token;
        } catch (error) {
            dispatch(actions.userTokenRejected(error.message));
        }
    };
}

/**
 * La fonction fetchUserData envoie une demande pour récupérer les données d'un utilisateur.
 * @function
 * @async
 * @param {string} token - Token d'identification de l'utilisateur.
 * @param {function} dispatch - Dispatch est une fonction dépendant du contexte qui est utilisée pour déclencher une action.
 * @param {function} getState - Retourne l'état actuel du store.
 * @returns {Promise<React.ReactElement>} - Retourne un élément React <SignIn /> s'il y a une erreur.
 *
 */
export function fetchUserData(token) {
    return async (dispatch, getState) => {
        const status = selectUser(getState()).dataStatus;

        if (status === "pending" || status === "updating") {
            return;
        }
        if (status === "rejected") {
            dispatch(signOut());
            return <SignIn />;
        }

        dispatch(actions.userDataFetching(token));

        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await fetch(
                "http://localhost:3001/api/v1/user/profile",
                options
            );

            if (response.status === 400) {
                console.log("invalid fields");
            }
            if (response.status === 401) {
                dispatch(signOut());
            }

            const data = await response.json();
            dispatch(actions.userDataResolved(token, data.body));
        } catch (error) {
            dispatch(actions.userDataRejected(error.message));
        }
    };
}

/**
 * La fonction updateUserData envoie une demande pour mettre à jour les données d'un utilisateur.
 * @function
 * @async
 * @param {string} token - Token d'identification de l'utilisateur.
 * @param {string} firstName - Prénom de l'utilisateur.
 * @param {string} lastName - Nom de l'utilisateur.
 * @param {function} dispatch - Dispatch est une fonction dépendant du contexte qui est utilisée pour déclencher une action.
 * @returns {Promise}
 *
 */
export function updateUserData(token, firstName, lastName) {
    return async (dispatch) => {
        const options = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ firstName, lastName }),
        };

        try {
            const response = await fetch(
                "http://localhost:3001/api/v1/user/profile",
                options
            );

            if (response.status === 400) {
                console.log("invalid fields");
            }
            if (response.status === 401) {
                dispatch(signOut());
            }

            dispatch(actions.userUpdateProfile(token, firstName, lastName));
        } catch (error) {
            dispatch(actions.userDataRejected(error.message));
        }
    };
}
