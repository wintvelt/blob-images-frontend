// HOC which fetches data and renders loading state
import React, { createContext, useContext, useState, useEffect } from 'react';
import { API } from 'aws-amplify';

import { getSampleDataFrom } from '../sampledata';

export const DataContext = createContext({
    data: {},
    setDataByKey: () => { }
});

export const useApiData = (key, source, withReload) => {
    const { data, setDataByKey } = useContext(DataContext);
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
                : await getSampleDataFrom(source);
            setKeyedData({ data: result })
        } catch (_) {
            setKeyedData({ isError: true });
        }
    }

    useEffect(() => {
        if (!alreadyHasData) {
            getData();
        }
    }, []);

    const reload = () => {
        getData();
    }

    return (withReload) ?
        [keyedData, reload]
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
