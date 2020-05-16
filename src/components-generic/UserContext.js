import { createContext, useContext } from 'react';
import { Auth, API } from "aws-amplify";
import { makeImageUrl } from './imageProvider';

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
    const authUser = await Auth.currentUserInfo();
    const userId = authUser.id;
    const user = await API.get('blob-images', `/users/U${userId}`);
    return {
        id: userId,
        name: user.name,
        avatar: makeImageUrl(user.avatar, 40, 40)
    };
}