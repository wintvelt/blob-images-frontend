// HOC which fetches data and renders loading state
import React, { createContext, useContext, useState, useEffect } from 'react';

export const DataContext = createContext({ data: {} });

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const getDataFrom = async (source) => {
    await timeout(3000);
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

export const useApiData = () => {
    const { data } = useContext(DataContext);
    return data;
}

const DataProvider = ({ source, className, children }) => {
    const { isLoading, isError, data } = useData(source);
    const skeletonClass = 'pulse ' + (className || '');
    return <DataContext.Provider value={{ data }}>
        {(isLoading || isError) ?
            <div className={skeletonClass} />
            : children
        }
    </DataContext.Provider>
}

export default DataProvider; 
