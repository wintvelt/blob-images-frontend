import React, { useEffect } from 'react';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { errorLog } from '../helpers/errorLog';

export const activePrivacyData = atom({
    key: 'privacyData',
    default: { isLoading: true },
});

export const useReloadPrivacy = () => {
    const setPrivacy = useSetRecoilState(activePrivacyData);
    const loadData = async (lang) => {
        try {
            const response = await fetch(`https://api-dev.clubalmanac.com/privacy/${lang}`);
            const text = await response.text();
            const lines = text.split('\n');
            setPrivacy({ contents: lines });
        } catch (error) {
            errorLog(error);
            setPrivacy({ hasError: error });
        }
    }
    return loadData;
}

export const useActivePrivacy = (lang) => {
    const privacyData = useRecoilValue(activePrivacyData);
    const reloadPrivacy = useReloadPrivacy();
    useEffect(() => {
        if (lang) reloadPrivacy(lang);
    }, [lang]);
    return {
        privacyData
    };
};

export const usePrivacyValue = () => {
    const activePrivacy = useRecoilValue(activePrivacyData);
    return activePrivacy;
};