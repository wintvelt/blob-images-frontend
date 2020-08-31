import { useEffect } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

const loadingData = atom({
    key: 'loading',
    default: false
});

export const useLoadingValue = () => useRecoilValue(loadingData);

export const useSetLoadingPath = () => {
    const setLoading = useSetRecoilState(loadingData);
    const router = useRouter();
    const setter = (path, as) => {
        const isNewRoute = (as)? as !== router.asPath : path !== router.asPath;
        setLoading(isNewRoute);
        router.push(path, as);
    };
    return setter;
};

export const resetLoadingPath = () => {
    const setLoading = useSetRecoilState(loadingData);
    const router = useRouter();
    useEffect(() => {
        setLoading(false);
        window && window.scrollTo(0,0);
    }, [router.asPath]);
}