// HOC which fetches data and renders loading state
import React, { createContext, useContext, useState, useEffect } from 'react';
import { API } from 'aws-amplify';

import { getSampleDataFrom, postDataTo } from '../sampledata';

export const DataContext = createContext({
    data: {},
    setDataByKey: () => { }
});

export const useApiData = (key, source, withPost) => {
    const { data, setDataByKey } = useContext(DataContext);
    const alreadyHasData = data[key] && data[key].source === source;
    const keyedData = (alreadyHasData) ? data[key] : { isLoading: true };

    const setKeyedData = (newValue) => setDataByKey(key, {
        ...newValue,
        source,
    });

    const postKeyedData = (body) => {
        async function postData() {
            setKeyedData({ isLoading: true });
            const result = await postDataTo(source, body);
            setKeyedData({ ...keyedData, ...body });
        };
        postData();
    }

    useEffect(() => {
        async function getData() {
            try {
                const isRemote = (source.slice(0, 1) === '/');
                const result = (isRemote) ?
                    await API.get('blob-images', source)
                    : await getSampleDataFrom(source);
                setKeyedData({ data: result })
            } catch (_) {
                setKeyedData({ isError: true });
            }
        }
        getData();
    }, []);

    return (withPost) ?
        [keyedData, postKeyedData]
        : keyedData;
}

const DataProvider = ({ children }) => {
    const [dataStore, setDataStore] = useState({});
    const setDataByKey = (key, newValue) => {
        setDataStore(oldDataStore => ({
            ...oldDataStore,
            [key]: newValue
        }));
    };
    return <DataContext.Provider value={{ data: dataStore, setDataByKey }}>
        {children}
    </DataContext.Provider>
}

export default DataProvider; 
