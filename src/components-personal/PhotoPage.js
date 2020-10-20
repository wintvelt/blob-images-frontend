import React, { useState, useEffect, useMemo } from 'react';
import { API } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import { useRecoilValueLoadable, useResetRecoilState } from 'recoil';
import { photoState, usePhoto, useReloadPhoto } from '../data/activeTree-Photo';
import { useUserValue } from '../data/userData';
import { useSetLoadingPath } from '../data/loadingData';
import { downloadFile } from '../helpers/download';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ClubImage, makeImageUrl } from '../components-generic/imageProvider';
import { makeStyles, Icon, Button, Chip } from '@material-ui/core';

import Rating from '../components-generic/Rating';
import PhotoRating from '../components-personal/PhotoRating';
import PhotoPubs from '../components-personal/PhotoPubs';
import BackLinkToAlbum from '../components-generic/BackLinkToAlbum';
import { useUserAlbums } from '../data/activeTree-UserAlbums';
import { useActiveAlbum } from '../data/activeTree-Album';

const useStyles = makeStyles(theme => ({
    photo: {
        height: '640px',
        backgroundColor: '#9d8d8f30',
    },
    image: {
        width: '100%',
        objectFit: 'contain',
        height: '640px',
    },
    caption: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    flexLine: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
}));

const flexStyle2 = {
    display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)'
};
const bigIcon = { fontSize: '80px' };

const PhotoMain = () => {
    const userAlbumsData = useUserAlbums();
    const activeAlbum = useActiveAlbum();
    const router = useRouter();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const setLoadingPath = useSetLoadingPath();
    const hasAlbum = !!router.query.albumid;

    const photoId = router.query?.photoid || 'nophotoId';
    const source = `/photos/${photoId}`;
    const currentUser = useUserValue();
    const { profile } = currentUser;
    const photoData = usePhoto(photoId);
    const photo = useMemo(() => (photoData.contents), []);
    const reloadActivePhoto = useReloadPhoto(photoId);
    const isLoading = (photoData.isLoading);
    const [userRating, setUserRating] = useState({ initial: 0, current: 0 });
    useEffect(() => {
        const getRating = async () => {
            try {
                const ratingData = await API.get('blob-images', source + '/rating');
                const initialRating = ratingData?.rating || 0;
                if (initialRating) setUserRating({ initial: initialRating, current: initialRating });
            } catch (_) {
            }
        };
        if (photoId) {
            getRating();
        }
    }, [photoId]);
    const onChangeRating = (clickedRating) => {
        const setRating = async () => {
            const ratingUpdate = (userRating.current === clickedRating) ? -clickedRating : clickedRating;
            setUserRating(old => ({ ...old, current: old.current + ratingUpdate }));
            await API.post('blob-images', source + '/rating', { body: { ratingUpdate } });
            enqueueSnackbar(`Je ${(ratingUpdate > 0) ? '+1' : '-1'} inbreng over deze foto is verwerkt`);
            setTimeout(reloadActivePhoto, 2000);
        };
        setRating();
    };
    const photoRating = (photo?.rating || 0) - userRating.initial + userRating.current;

    const onDelete = async () => {
        try {
            const path = `/photos/${photo?.PK?.slice(2)}`;
            await API.del('blob-images', path);
            enqueueSnackbar('Foto verwijderd', { variant: 'success' });
            const [newPath, newAs] = (hasAlbum) ?
                [
                    '/personal/groups/[id]/albums/[albumid]',
                    `/personal/groups/${router.query.id}/albums/${router.query.albumid}`
                ]
                : ['/personal/photos', undefined];

            setLoadingPath(newPath, newAs);
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Kon je kiekje niet verwijderen', { variant: 'error' });
        }
    };
    const currentIsOwner = photo && photo.SK === profile.id;
    const photoUrlRaw = photo?.url;
    const photoUrl = (photo) ? photoUrlRaw : '/img/foto_not_found.jpg';

    const [imageSize, setImageSize] = useState('');
    const onImageLoad = ({ target }) => {
        setImageSize(`${target.naturalWidth} x ${target.naturalHeight}`);
    };

    const photoFilename = photo?.url?.split('/').slice(-1)[0];

    const onDownload = () => {
        downloadFile(makeImageUrl(photoUrl), photoFilename);
    }

    return (
        <main>
            <Grid container>
                <Grid item md={8} xs={12} className={classes.photo}>
                    <BackLinkToAlbum />
                    {(isLoading) && <div style={flexStyle2}>
                        <Icon className={'pulse-icon'} style={bigIcon}>image</Icon>
                    </div>}
                    {(photoUrl && !isLoading) &&
                        <ClubImage src={photoUrl} className={classes.image} onLoad={onImageLoad} withLink alt='foto' />}
                </Grid>
                <Grid item md={4} xs={12} className={classes.caption}>
                    <Typography variant='h5' gutterBottom>
                        door {photo?.user?.name || '-'}{'\u00A0'}
                        {currentIsOwner && <Chip size='small' label='me' />}
                    </Typography>
                    <Typography variant='body1' gutterBottom>toegevoegd op {photo?.createdAt || '-'}</Typography>
                    <Typography variant='body1' gutterBottom>pixelgrootte {imageSize || '-'}</Typography>
                    <div className={classes.flexLine}>
                        <Typography variant='body1'>rating</Typography>{'\u00A0'}
                        <Rating value={photoRating} dark />
                    </div>
                    <div className={classes.flexLine}>
                        <PhotoRating userRating={userRating.current} onChange={onChangeRating} disabled={!photo} />
                    </div>
                    <div className={classes.flexLine}>
                        <Button color='primary' variant='outlined' startIcon={<Icon>cloud_download</Icon>}
                            disabled={!photo}
                            onClick={onDownload} title='download deze pic'
                        >Download</Button>
                        {'\u00A0'}
                        {currentIsOwner &&
                            <Button startIcon={<Icon>delete</Icon>} onClick={onDelete}
                                style={{ color: 'red' }} variant='outlined' >
                                Delete
                            </Button>
                        }
                    </div>
                    <PhotoPubs photo={photo} currentIsOwner={currentIsOwner} />
                    {/* <pre>{JSON.stringify(userAlbumsData.contents || {}, null, 2)}</pre> */}
                </Grid>
            </Grid>
            {/* <pre>{JSON.stringify(photoData, null, 2)}</pre>
            <pre>{JSON.stringify(photo, null, 2)}</pre> */}
        </main>
    )
}

export default PhotoMain;