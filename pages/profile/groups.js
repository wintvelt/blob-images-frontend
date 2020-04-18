import React from 'react';
import Hero from '../../src/components-home/Hero';
import LoginForm from '../../src/LoginForm';
import PrivatePage from '../../src/components-profile/PrivatePage';

const GroupsMain = () => {
    return (
        <main>
            <Hero
                url='/img/album 2.jpg'
            >
                <LoginForm />
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