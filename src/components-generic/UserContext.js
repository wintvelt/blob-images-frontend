import { createContext, useContext } from 'react';
import { Auth, API } from "aws-amplify";

export const initialUser = {
    profile: false,
    isAuthenticating: true,
    isAuthenticated: false,
};

export const UserContext = createContext({
    user: initialUser,
    setUser: () => { }
});

export const getUserInfo = async () => {
    const authUser = await Auth.currentUserInfo();
    const userId = authUser?.id;
    if (!userId) return {};
    try {
        const user = await API.get('blob-images', `/users/U${userId}`);
        return {
            id: userId,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        };
    } catch (error) {
        const name = authUser.attributes['custom:name'];
        const email = authUser.attributes.email;
        await API.post('blob-images', '/users', {
            body: {
                name,
                email,
            }
        });
        return {
            id: userId,
            name,
            email,
        }
    }
}

export const useUser = (withSetters) => {
    const { user, setUser } = useContext(UserContext);
    const updateUser = (newItem) => {
        setUser((oldUser) => ({
            ...oldUser,
            ...newItem,
        }));
    }
    const login = async (username, password) => {
        await Auth.signIn(username, password);
        const user = await getUserInfo();
        setUser({
            profile: user,
            isAuthenticated: true,
            isAuthenticating: false
        });
    }
    const logout = () => {
        Auth.signOut();
        setUser({ profile: false, isAuthenticated: false, isAuthenticating: false })
    }
    const signup = async (email, password, name) => {
        await Auth.signUp({
            username: email,
            password,
            attributes: {
                'custom:name': name,
            },
        });
        setUser({
            profile: { name, email, password },
            isAuthenticated: false,
            isAuthenticating: false,
        });
    }
    const confirmSignup = async (email, confirmation) => {
        const { profile } = user;
        await Auth.confirmSignUp(email, confirmation);
        if (profile && profile.password && profile.email === email) {
            await login(email, profile.password);
        }
    }
    const saveProfile = async (name, avatar) => {
        const newProfile = { name, avatar };
        await API.put('blob-images', '/users', { body: newProfile });
        updateUser({ profile: { ...user.profile, ...newProfile } });
    }
    return (withSetters) ?
        {
            user,
            updateUser,
            login,
            logout,
            signup,
            confirmSignup,
            saveProfile
        }
        : user;
}