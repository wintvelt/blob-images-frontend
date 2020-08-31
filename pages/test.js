import React from 'react';

const Child = () => {
    const data = 'Some data';
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

const Page =  (props) => {
    const source = 'some url';
    return <main>
        <div style={divStyle}>
            <Child />
        </div>
    </main>
}

export default Page;