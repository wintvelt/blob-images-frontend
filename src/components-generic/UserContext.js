import { createContext, useContext } from 'react';
import { Auth, API } from "aws-amplify";

export const initialUser = {
    profile: false,
    isAuthenticating: true,
    isAuthenticated: false,
    showLogin: false,
    showSignup: false,
    showVerify: false,
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
    const setDialog = (maybeAction) => {
        const action = maybeAction || {};
        updateUser({
            showLogin: !!action.showLogin,
            showSignup: !!action.showSignup,
            showVerify: !!action.showVerify,
        });
    }
    const login = async (username, password) => {
        try {
            await Auth.signIn(username, password);
            const user = await getUserInfo();
            setUser({
                profile: user,
                isAuthenticated: true,
                isAuthenticating: false,
                showLogin: false,
                showSignup: false,
                showVerify: false,
            });
        } catch (error) {
            setUser({
                profile: { email: username },
                isAuthenticated: false,
                isAuthenticating: false,
                showLogin: true,
                showSignup: false,
                showVerify: false,
            });
            throw error;
        }
    }
    const logout = () => {
        Auth.signOut();
        setUser({
            profile: false, isAuthenticated: false, isAuthenticating: false,
            showLogin: false, showSignup: false, showVerify: false,
        });
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
            showLogin: false, showSignup: false, showVerify: true,
        });
    }
    const confirmSignup = async (email, confirmation) => {
        const { profile } = user;
        try {            
            await Auth.confirmSignUp(email, confirmation);
            if (profile && profile.password && profile.email === email) {
                await login(email, profile.password);
            }
            setDialog();
        } catch (error) {
            throw error
        }
    }
    const saveProfile = async (name, avatar) => {
        const newProfile = { name, avatar };
        await API.put('blob-images', '/users', { body: newProfile });
        updateUser({ profile: { ...user.profile, ...newProfile } });
    }
    const resendSignup = async (email) => {
        await Auth.resendSignUp(email);
        setDialog({ showVerify: true });
    }
    return (withSetters) ?
        {
            user,
            updateUser,
            login,
            logout,
            signup,
            confirmSignup,
            resendSignup,
            saveProfile,
            setDialog,
        }
        : user;
}