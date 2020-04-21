import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import CardAlbum from '../../../../../../src/CardAlbum';
import PhotoGroup from '../../../../../../src/components-personal/PhotoGroup';
import Link from '../../../../../../src/UnstyledLink';
import AlbumForm from '../../../../../../src/AlbumForm';

const AlbumEditPage = (props) => {
    const { id, albumid } = props;

    return (
        <main>
            <Toolbar />
            <Container>
                <Link style={{ display: 'flex', alignItems: 'center' }}
                    title={`Back to album page`}
                    href={`/personal/groups/${id}`}
                >
                    <IconButton>
                        <Icon color='secondary'>arrow_back</Icon>
                    </IconButton>
                    <Typography>{'Foto\'s van Blob - Blob in ..ergens..'}</Typography>
                </Link>
                <Grid container spacing={4}>
                    <Grid item md={4} xs={12}>
                        <CardAlbum
                            title='Blob in Afrika'
                            description='Met ome Ari op safari'
                            stats={['432 photos', 'since 1 Jan 1985']}
                            image={{ name: 'Blob in Afrika', src: '/img/cover.jpg' }}
                            isHeader
                        />
                    </Grid>
                    <Grid item md={8}>
                        <AlbumForm />
                        <p>Group ID: {id}</p>
                        <p>Album ID: {albumid}</p>
                        <PhotoGroup />
                    </Grid>
                </Grid>
            </Container>
        </main>
    )
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { id, albumid } = params;
    return {
        props: {
            id,
            albumid
        }
    }
}

export default AlbumEditPage;