import React from 'react';
import Hero from '../../src/components-home/Hero';
import PrivatePage from '../../src/components-personal/PrivatePage';

const GroupsMain = () => {
    return (
        <main>
            <Hero
                url='/img/album_2.jpg'
                title='Welcome to your groups pages'
            >
            </Hero>
        </main>
    )
};

const GroupsPage = () => {
    return <PrivatePage>
        <GroupsMain />
    </PrivatePage>
}

export default GroupsPage