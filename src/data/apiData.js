import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { API, Auth } from 'aws-amplify';

const apiData = (apiKey) => atom({
    key: apiKey,
    default: { isLoading: true },
});

const expirationMs = 3000;

export const useApiData = (apiKey, source) => {
    const [data, setData] = useRecoilState(apiData(apiKey));
    const isEmptySource = !source || source.includes('/new') || source.includes('/undefined');

    const loadData = async () => {
        try {
            await Auth.currentCredentials();
            const newApiData = await API.get('blob-images', source);
            if (!data.data || JSON.stringify(data.data) !== JSON.stringify(newApiData)) {
                setData({ data: newApiData, source, timeStamp: Date.now() });
            };
        } catch (error) {
            console.log(error.response?.data?.error);
            setData({ isError: true, error });
        }
    }
    useEffect(() => {
        if (!isEmptySource && ((!data.source || data.source !== source)
            || (!data.timeStamp || (Date.now() - data.timeStamp > expirationMs)))) {
            loadData();
        }
    }, [source]);
    return (isEmptySource) ?
        { reloadData: () => { } }
        : {
            ...data,
            reloadData: loadData
        };
};

export const useApiDataValue = (apiKey, source) => {
    const { reloadData, ...data } = useApiData(apiKey, source);
    return data;
};



