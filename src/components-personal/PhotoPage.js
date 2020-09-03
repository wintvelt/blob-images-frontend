import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import { useRecoilValueLoadable, useResetRecoilState } from 'recoil';
import { photoState } from '../data/activeTree-Photo';
import { useUserValue } from '../data/userData';
import { useSetLoadingPath } from '../data/loadingData';
import { userPhotosState } from '../data/userData';
import { downloadFile } from '../helpers/download';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeImageUrl } from '../components-generic/imageProvider';
import { makeStyles, Icon, Button, Chip } from '@material-ui/core';

import { ImageSkeleton } from '../components-generic/Skeleton';
import Rating from '../components-generic/Rating';
import PhotoRating from '../components-personal/PhotoRating';
import PhotoPubs from '../components-personal/PhotoPubs';
import BackLinkToAlbum from '../components-generic/BackLinkToAlbum';
import { activeAlbumPhotos } from '../data/activeTree-Album';

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

const PhotoMain = () => {
    const router = useRouter();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const setLoadingPath = useSetLoadingPath();
    const reloadPhotos = useResetRecoilState(userPhotosState);
    const reloadAlbumPhotos = useResetRecoilState(activeAlbumPhotos);
    const hasAlbum = !!router.query.albumid;

    const photoId = router.query?.photoid || 'nophotoId';
    const source = `/photos/${photoId}`;
    const reloadActivePhoto = useResetRecoilState(photoState(source));
    const currentUser = useUserValue();
    const { profile } = currentUser;
    const basePhotoData = useRecoilValueLoadable(photoState(source));
    // to prevent redisplay of photo when reloaded
    useEffect(() => {
        if (basePhotoData.state !== 'loading' && photoData.state === 'loading') {
            setPhotoData(basePhotoData);
        }
    }, [basePhotoData])
    const [photoData, setPhotoData] = useState(basePhotoData);
    const isLoading = (photoData.state === 'loading');
    const photo = (photoData.state === 'hasValue') && photoData.contents;
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
        getRating();
    }, [photoId]);
    const onChangeRating = (clickedRating) => {
        const setRating = async () => {
            const ratingUpdate = (userRating.current === clickedRating) ? -clickedRating : clickedRating;
            setUserRating({ ...userRating, current: userRating.current + ratingUpdate });
            await API.put('blob-images', source + '/rating', { body: { ratingUpdate } });
            enqueueSnackbar(`Je ${(ratingUpdate > 0) ? '+1' : '-1'} inbreng over deze foto is verwerkt`);
            reloadActivePhoto();
        };
        setRating();
    };
    const photoRating = (photo.rating || 0) - userRating.initial + userRating.current;

    const onDelete = async () => {
        try {
            const path = `/photos/${photo?.PK?.slice(2)}`;
            await API.del('blob-images', path);
            enqueueSnackbar('Foto verwijderd', { variant: 'success' });
            reloadPhotos();
            hasAlbum && reloadAlbumPhotos();
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
    const currentIsOwner = photo && photo.SK?.slice(1) === profile.id;
    const photoUrlRaw = photo?.url;
    const [blur, setBlur] = useState(10);
    const [imageSize, setImageSize] = useState('');
    const photoUrl = (photo) ? makeImageUrl(photoUrlRaw, blur) : '/img/foto_not_found.jpg';

    const onImageLoad = ({ target }) => {
        if (blur) {
            setBlur(undefined);
        } else {
            setImageSize(`${target.naturalWidth} x ${target.naturalHeight}`);
        }
    };

    const photoFilename = photo.url?.split('/').slice(-1)[0];

    const onDownload = () => {
        downloadFile(photoUrl, photoFilename);
    }

    return (
        <main>
            <Grid container>
                <Grid item md={8} xs={12} className={classes.photo}>
                    <BackLinkToAlbum />
                    <ImageSkeleton src={photoUrl} className={classes.image} isLoading={isLoading}
                        onLoad={onImageLoad} withLink alt='image' />
                </Grid>
                <Grid item md={4} xs={12} className={classes.caption}>
                    <Typography variant='h5' gutterBottom>
                        door {photo.owner?.name || '-'}{'\u00A0'}
                        {currentIsOwner && <Chip size='small' label='me' />}
                    </Typography>
                    <Typography variant='body1' gutterBottom>toegevoegd op {photo.createdAt || '-'}</Typography>
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
                </Grid>
            </Grid>
            {/* <pre>{JSON.stringify(photoData, null, 2)}</pre>
            <pre>{JSON.stringify(photo, null, 2)}</pre> */}
        </main>
    )
}

export default PhotoMain;