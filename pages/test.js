import React from 'react';

import { useApiDataValue } from '../src/data/apiData';

const Child = () => {
    const data = useApiDataValue('groups', '/undefined');
    return <pre>
        {JSON.stringify(data, null, 2)}
    </pre>
}

const divStyle = {
    height: '300px',
    width: '700px',
    background: 'aliceblue',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export default (props) => {
    const source = 'some url';
    return <main>
        <div style={divStyle}>
            <Child />
        </div>
    </main>
}