import React, { createContext } from 'react';

export const initialUser = {
    userName: 'Wouter'
};

export const UserContext = createContext({
    user: initialUser,
    setUser: () => {}
});