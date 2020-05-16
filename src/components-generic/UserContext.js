import { createContext, useContext } from 'react';
import { Auth } from "aws-amplify";

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

export const getUserInfo = async () => {
    const user = await Auth.currentUserInfo();
    return {
        id: user.id,
        ...user.attributes
    };
}