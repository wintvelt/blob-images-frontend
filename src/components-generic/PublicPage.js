import React from 'react';

import AuthDialog from '../components-login/AuthDialog';

const PublicPage = (props) => {
    return <>
        {props.children}
        <AuthDialog noClose={props.noClose}/>
    </>
}

export default PublicPage;