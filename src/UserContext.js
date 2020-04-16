import React, { createContext } from 'react';

export const initialUser = {
    user: false,
    isAuthenticating: true,
};

export const userReducer = (state, newState) => {
    return {
        ...state,
        ...newState
    }
}

export const UserContext = createContext({
    user: initialUser,
    setUser: () => {}
});