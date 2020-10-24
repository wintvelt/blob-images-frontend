import { useEffect } from 'react';
import { atom, useRecoilState, useRecoilValue, selector, DefaultValue } from 'recoil';
import { API, Auth } from 'aws-amplify';
import { useSetLoadingPath } from './loadingData';

const initialUser = {
    profile: null,
    isAuthenticating: true,
    isAuthenticated: false,
    path: '',
    error: false,
};

export const userData = atom({
    key: 'user',
    default: initialUser,
});

const userGroupsTrigger = atom({
    key: 'userGroupsTrigger',
    default: 0
});

export const userGroups = selector({
    key: 'userGroups',
    get: async ({ get }) => {
        get(userData);
        get(userGroupsTrigger);
        const response = await API.get('blob-images', '/groups');
        if (response.error) {
            throw response.error;
        }
        return response;
    },
    set: ({ set }, newValue) => {
        if (newValue instanceof DefaultValue) {
            set(userGroupsTrigger, v => v + 1);
        }
    }
});

export const userAlbums = selector({
    key: 'userAlbums',
    get: async ({ get }) => {
        get(userData);
        get(userGroupsTrigger);
        const response = await API.get('blob-images', '/albums');
        if (response.error) {
            throw response.error;
        }
        return response;
    },
});

const userToForm = (user) => ({
    id: user.SK,
    name: user.name,
    email: user.email,
    photoUrl: user.photoUrl,
    photoId: user.photoId,
    photoCount: user.photoCount,
    visitDateLast: user.visitDateLast,
    visitDatePrev: user.visitDatePrev,
    createdAt: user.createdAt
});

const authPaths = ['/login', '/signup', '/forgotpsw', '/verifysignup', '/confirmpsw'];
export const isInAuth = (path) => authPaths.includes(path);

const updateUser = (newItems = {}) => (oldUser) => ({
    ...oldUser,
    error: false,
    ...newItems,
});

// load user from session, get additional details from DB
const loadUser = async () => {
    const authUser = await Auth.currentUserInfo();
    const userId = authUser?.attributes?.sub;
    if (!userId) return {};
    try {
        const user = await API.get('blob-images', `/user`);
        return {
            ...userToForm(user),
            cognitoId: authUser.id
        };
    } catch (error) {
        const name = authUser.attributes['custom:name'];
        const email = authUser.attributes.email;
        return {
            id: userId,
            cognitoId: authUser.id,
            name,
            email,
        }
    }
}

export const useUser = () => {
    const [user, setUser] = useRecoilState(userData);
    const setUpdate = (action) => setUser(updateUser(action));
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
                path: '',
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
        location && location.reload();
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
                setUpdate({ path: '' });
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
    const saveProfile = async (name, photoId, photoUrl) => {
        let newProfile = { name };
        const filename = photoUrl && photoUrl.split('/')[2];
        if (filename) { newProfile.filename = filename }
        else if (photoId) { newProfile.photoId = photoId }
        else { newProfile.photoId = '' }
        errorHandler(async () => {
            const newUser = await API.put('blob-images', '/user', { body: newProfile });
            setUpdate({ profile: { ...user.profile, ...userToForm(newUser) } });
        });
    }
    const deleteUser = async () => {
        errorHandler(async () => {
            await API.del('blob-images', '/user');
            logout();
            setPath('');
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
        deleteUser,
    }
};

export const useUserValue = () => useRecoilValue(userData);

export const useInitialUser = () => {
    const [user, setUser] = useRecoilState(userData);
    const setUpdate = (action) => setUser(updateUser(action));
    useEffect(() => {
        const onLoad = async () => {
            const prevUser = await loadUser();
            setUpdate({
                profile: prevUser,
                isAuthenticated: !!prevUser.id,
                isAuthenticating: false,
            });
        }
        if (user.isAuthenticating) onLoad();
    }, []);
}