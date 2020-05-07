// HOC which fetches data and renders loading state
import React, { createContext, useContext, useState, useEffect } from 'react';

export const DataContext = createContext({
    data: {},
    setDataByKey: () => { }
});

const sampleData = {
    'myUrl/getGroup/4': {
        title: 'Foto\'s van Blob',
        subtitle: 'Laag naar de top sinds 1985',
        stats: [
            'since 8 Jan 2019',
            '6 albums',
            '492 photos',
            '19 members'
        ],
        image: '/cover_2.jpg',
        userIsAdmin: true,
    },
    'myUrl/getMembers/4': [
        { name: 'LJ van Berkestijn', avatar: '' },
        { name: 'Paul Botje', avatar: '' },
        { name: 'Dave del Canho', avatar: '' },
        { name: 'Wouter In \'t Velt', avatar: '/img/me.jpg' },
        { name: 'Fred Kleiterp', avatar: '' },
        { name: 'Michiel Ebeling', avatar: '' },
    ]
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const getDataFrom = async (source) => {
    await timeout(3000);
    return sampleData[source] || source;
}

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
