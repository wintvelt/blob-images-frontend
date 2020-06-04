// HOC which fetches data and renders loading state
import React, { createContext, useContext, useState, useEffect } from 'react';
import { API } from 'aws-amplify';

export const DataContext = createContext({
    data: {},
    setDataByKey: () => { }
});

export const useApiData = (key, source, withReload) => {
    const { data, setDataByKey } = useContext(DataContext);
    const isEmptySource = source.includes('/new') || source.includes('/undefined');
    if (isEmptySource) return (withReload) ?
        { data: {}, reloadData: () => { } }
        : {};

    const alreadyHasData = data[key] && data[key].source === source;
    const keyedData = (alreadyHasData) ? data[key] : { isLoading: true };

    const setKeyedData = (newValue) => setDataByKey(key, {
        ...newValue,
        source,
    });

    async function getData() {
        try {
            const isRemote = (source.slice(0, 1) === '/');
            const result = (isRemote) ?
                await API.get('blob-images', source)
                : null;
            setKeyedData({ data: result })
        } catch (_) {
            setKeyedData({ isError: true });
        }
    }

    useEffect(() => {
        if (!alreadyHasData) {
            getData();
        }
    }, [source]);

    const reloadData = () => {
        // allow some time for Lambda trigger to work
        setTimeout(getData, 2000);
    }

    return (withReload) ?
        { data: keyedData.data, reloadData }
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
