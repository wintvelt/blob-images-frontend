// HOC which fetches data and renders loading state
import React, { createContext, useContext, useState, useEffect } from 'react';

export const DataContext = createContext({
    data: {},
    setDataByKey: () => { }
});

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const getDataFrom = async (source) => {
    await timeout(3000);
    return source;
}

export const sampleData = (data, sample) => ({
    ...data,
    data: (data.data) ? sample : undefined
});

export const useApiData = (key, source) => {
    const { data, setDataByKey } = useContext(DataContext);
    const alreadyHasData = data[key] && data[key].source === source;
    const keyedData = (alreadyHasData) ? data[key] : { isLoading: true };

    const setKeyedData = (newValue) => setDataByKey(key, {
        ...newValue,
        source,
    });

    useEffect(() => {
        async function getData() {
            try {
                const result = await getDataFrom(source);
                setKeyedData({ data: result })
            } catch (_) {
                setKeyedData({ isError: true });
            }
        }
        getData();
    }, []);

    // return [keyedData, setKeyedData];
    return keyedData;
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
