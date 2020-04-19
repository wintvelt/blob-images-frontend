import React from 'react';
import GroupHeader from '../../../src/components-personal/GroupHeader';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

const GroupPage = (props) => {
    const { id } = props;

    return (
        <main>
            <Toolbar />
            <Container>
                <GroupHeader />
            </Container>
        </main>
    )
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params;
    return {
        props: {
            id
        }
    }
}

export default GroupPage