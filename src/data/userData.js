import { useEffect } from 'react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { API, Auth } from 'aws-amplify';

const initialUser = {
    profile: null,
    isAuthenticating: true,
    isAuthenticated: false,
    path: '',
    error: false,
};

const userData = atom({
    key: 'user',
    default: initialUser,
});

const authPaths = ['/login', '/signup', '/forgotpsw', '/verifysignup', '/confirmpsw'];
export const isInAuth = (path) => authPaths.includes(path);

const updateUser = (newItems = {}) => (oldUser) => ({
    ...oldUser,
    error: false,
    ...newItems,
});

// load user from session, get additional details from DB, or create new DB entry
const loadUser = async () => {
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

export const useUser = () => {
    const [user, setUser] = useRecoilState(userData);
    const setUpdate = (action) => setUser(updateUser(action));
    useEffect(() => {
        const onLoad = async () => {
            const newUser = await loadUser();
            setUpdate({
                profile: newUser,
                isAuthenticated: !!user.id,
                isAuthenticating: false
            });
        };
        if (user.isAuthenticating) onLoad();
    }, []);
    const errorHandler = async (lambda) => {
        try {
            await lambda();
        } catch (error) {
            setUpdate({ error });
        }
    };
    const setPath = (path) => setUpdate({ path });

    const login = async (username, password) => {
        try {
            await Auth.signIn(username, password);
            const user = await loadUser();
            setUpdate({
                profile: user,
                isAuthenticated: true,
                isAuthenticating: false,
                path: '/',
            });
        } catch (error) {
            setUpdate({
                profile: { email: username },
                isAuthenticated: false,
                isAuthenticating: false,
                error,
            });
        }
    }
    const logout = () => {
        Auth.signOut();
        setUpdate({
            ...initialUser,
            isAuthenticating: false,
        });
    }
    const signup = async (email, password, name) => {
        try {
            await Auth.signUp({
                username: email,
                password,
                attributes: { 'custom:name': name },
            });
            setUpdate({
                profile: { name, email, password },
                isAuthenticated: false,
                isAuthenticating: false,
                path: '/verifysignup',
            });
        } catch (error) {
            setUpdate({
                isAuthenticated: false,
                isAuthenticating: false,
                error,
            });
        }
    };
    const confirmSignup = async (email, confirmation) => {
        const { profile } = user;
        try {
            await Auth.confirmSignUp(email, confirmation);
            if (profile && profile.password && profile.email === email) {
                await login(email, profile.password);
                setUpdate({ path: '/' });
            } else {
                setUpdate({ path: '/login' });
            }
        } catch (error) {
            setUpdate({ error });
        };
    };
    const requestVerify = async (email) => {
        errorHandler(async () => {
            await Auth.resendSignUp(email);
            setUpdate({ path: '/verifysignup' });
        });
    };
    const forgotPassword = async (email) => {
        errorHandler(async () => {
            await Auth.forgotPassword(email);
            setUpdate({ path: '/confirmpsw' })
        });
    };
    const confirmPassword = async (email, password, confirmation) => {
        errorHandler(async () => {
            await Auth.forgotPasswordSubmit(
                email,
                confirmation,
                password
            );
            const user = await Auth.signIn(email, password);
            setUpdate({
                profile: user.attributes,
                isAuthenticated: true,
                isAuthenticating: false,
                path: ''
            });
        });
    }
    const changePassword = async (oldPassword, newPassword) => {
        errorHandler(async () => {
            const authUser = await Auth.currentAuthenticatedUser();
            await Auth.changePassword(
                authUser,
                oldPassword,
                newPassword
            );
            setUpdate({ error: false });
        });
    }
    const saveProfile = async (name, avatar) => {
        const newProfile = { name, avatar };
        errorHandler(async () => {
            await API.put('blob-images', '/users', { body: newProfile });
            setUpdate({ profile: { ...user.profile, ...newProfile } });
        });
    }
    return {
        user,
        login,
        logout,
        signup,
        requestVerify,
        confirmSignup,
        forgotPassword,
        confirmPassword,
        changePassword,
        saveProfile,
        setPath,
    }
};

export const useUserValue = () => useRecoilValue(userData);