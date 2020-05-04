import React from 'react';

import DataProvider, { useApiData } from '../src/components-generic/DataProvider';

const Child = () => {
    const data = useApiData();
    return <pre>
        {JSON.stringify(data, null, 2)}
    </pre>
}

export default (props) => {
    const source = 'some url';
    return <main>
        <div style={{
            height: '300px',
            width: '700px',
            background: 'aliceblue',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <DataProvider source={source}>
                <Child />
            </DataProvider>
        </div>
    </main>
}