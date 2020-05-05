import React from 'react';
import GroupHeader from '../../../src/components-personal/GroupHeader';
import GroupMembers from '../../../src/components-personal/GroupMembers';
import AlbumGroup from '../../../src/components-personal/AlbumGroup';
import PrivatePage from '../../../src/components-personal/PrivatePage';

const GroupMain = () => {
    return (
        <main>
            <GroupHeader />
            <GroupMembers />
            <AlbumGroup />
        </main>
    )
}

const GroupPage = () => {
    return <PrivatePage>
        <GroupMain />
    </PrivatePage>
}

export default GroupPage