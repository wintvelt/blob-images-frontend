// HOC which fetches data and renders loading state
import React, { createContext, useContext, useState, useEffect } from 'react';

export const DataContext = createContext({ data: {} });

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const getDataFrom = async (source) => {
    await timeout(10000);
    return source;
}

const useData = (source) => {
    const [data, setData] = useState({ isLoading: true });
    useEffect(() => {
        async function getData() {
            try {
                const result = await getDataFrom(source);
                setData({ data: result })
            } catch (_) {
                setData({ isError: true });
            }
        }
        getData();
    }, [])
    return data;
}

export const useApiData = (key) => {
    const context = useContext(DataContext);
    return {
        ...context,
        data: (key && context.data)? context.data[key] : context.data
    };
}

const DataProvider = ({ source, children }) => {
    const { isLoading, isError, data } = useData(source);
    return <DataContext.Provider value={{ data }}>
        {children}
    </DataContext.Provider>
}

export default DataProvider; 
