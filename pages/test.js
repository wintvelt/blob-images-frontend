import React from 'react';

import { useApiDataValue } from '../src/data/apiData';

const Child = () => {
    const data = useApiDataValue('groups', '/undefined');
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
            <Child />
        </div>
    </main>
}