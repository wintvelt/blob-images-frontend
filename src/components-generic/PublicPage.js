import React from 'react';

import AuthDialog from '../components-login/AuthDialog';

const PublicPage = ({ children }) => {
    return <>
        {children}
        <AuthDialog />
    </>
}

export default PublicPage;