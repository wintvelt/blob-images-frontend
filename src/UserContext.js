import React, { createContext } from 'react';

export const initialUser = {
    profile: false,
    isAuthenticating: true,
    isAuthenticated: false,
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