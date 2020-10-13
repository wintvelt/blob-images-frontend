import { useEffect } from 'react';
import { API } from 'aws-amplify';

import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { groupToForm } from './activeTree-Group';

// user groups
export const userGroupsData = atom({
    key: 'userGroupsData',
    default: { isLoading: true }
});

export const useReloadUserGroups = () => {
    const setUserGroups = useSetRecoilState(userGroupsData);
    const loadData = async () => {
        console.log(`loading user groups`);
        try {
            const groups = await API.get('blob-images', `/groups`);
            setUserGroups({ contents: groups.map(group => groupToForm(group)) });
        } catch (error) {
            setUserGroups({ hasError: error });
        }
    }
    return loadData;
}

export const useUserGroups = () => {
    const userGroups = useRecoilValue(userGroupsData);
    const reloadUserGroups = useReloadUserGroups();
    useEffect(() => {
        reloadUserGroups();
    }, []);
    return userGroups;
};