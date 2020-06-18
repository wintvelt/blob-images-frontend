import React from 'react';

import AuthDialog from '../components-login/AuthDialog';

const PublicPage = ({ noClose, children }) => {
    return <>
        {children}
        <AuthDialog noClose={noClose} />
    </>
}

export default PublicPage;