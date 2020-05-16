import { createContext, useContext } from 'react';

export const initialUser = {
    profile: false,
    isAuthenticating: true,
    isAuthenticated: false,
};

export const UserContext = createContext({
    user: initialUser,
    setUser: () => { }
});

export const useUser = (withSet) => {
    const { user, setUser } = useContext(UserContext);
    const updateUser = (newItem) => {
        setUser((oldUser) => ({
            ...oldUser,
            ...newItem,
        }));
    }
    return (withSet) ?
        [user, updateUser]
        : user;
}