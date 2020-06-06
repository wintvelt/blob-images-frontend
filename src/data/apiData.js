import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { API } from 'aws-amplify';

const apiData = (apiKey) => atom({
    key: apiKey,
    default: { isLoading: true },
});

const expirationMs = 3000;

export const useApiData = (apiKey, source) => {
    const [data, setData] = useRecoilState(apiData(apiKey));
    const isEmptySource = source.includes('/new') || source.includes('/undefined');
    if (isEmptySource) return { reloadData: () => { } };

    const loadData = async () => {
        try {
            const newApiData = await API.get('blob-images', source);
            if (!data.data || JSON.stringify(data.data) !== JSON.stringify(newApiData)) {
                setData({ data: newApiData, source, timeStamp: Date.now() });
            };
        } catch (error) {
            setData({ isError: true, error });
        }
    }
    useEffect(() => {
        if ((!data.source || data.source !== source)
            || (!data.timeStamp || (Date.now() - data.timeStamp > expirationMs))) {
            loadData();
        }
    }, [source]);
    return {
        ...data,
        reloadData: loadData
    };
};

export const useApiDataValue = (apiKey, source) => {
    const { reloadData, ...data } = useApiData(apiKey, source);
    return data;
};



