import React from 'react';
import GroupHeader from '../../../src/components-personal/GroupHeader';
import GroupMembers from '../../../src/components-personal/GroupMembers';
import AlbumList from '../../../src/components-personal/AlbumList';
import PrivatePage from '../../../src/components-personal/PrivatePage';

const GroupMain = () => {
    return (
        <main>
            <GroupHeader />
            <GroupMembers />
            <AlbumList />
        </main>
    )
}

const GroupPage = () => {
    return <PrivatePage>
        <GroupMain />
    </PrivatePage>
}

export default GroupPage