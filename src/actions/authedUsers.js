export const SET_AUTH_USER = 'SET_AUTHED_USER';

export function setAuthedUser (id) {
    return {
        type: SET_AUTHED_USER,
        id,
    }
}