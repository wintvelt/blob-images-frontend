import React from 'react';

import { useAlbumHeaderStyles, AlbumImage, AlbumName, AlbumStats, AlbumEditButton } from './AlbumHeaderLayout';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BackLinkToGroup from '../components-generic/BackLinkToGroup';


const AlbumHeader = () => {
    const classes = useAlbumHeaderStyles();

    return <Card className={classes.card}>
        <AlbumImage />
        <BackLinkToGroup className={classes.white}/>
        <AlbumEditButton />
        <CardContent className={classes.content}>
            <Grid container>
                <Grid item md={11} xs={12}>
                    <Typography gutterBottom variant='h4'>
                        <AlbumName />
                    </Typography>
                </Grid>
                <Grid item md={1} xs={12}>
                    <AlbumStats />
                </Grid>
            </Grid>
        </CardContent>
    </Card>
}

export default AlbumHeader;