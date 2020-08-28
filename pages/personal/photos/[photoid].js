import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import PrivatePage from '../../../src/components-personal/PrivatePage';
import { useRecoilValueLoadable } from 'recoil';
import { photoState } from '../../../src/data/activeTree-Photo';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeImageUrl } from '../../../src/components-generic/imageProvider';
import { makeStyles, Icon, Button, Chip } from '@material-ui/core';

import { ImageSkeleton } from '../../../src/components-generic/Skeleton';
import Rating from '../../../src/components-generic/Rating';
import PhotoRating from '../../../src/components-personal/PhotoRating';
import PhotoPubs from '../../../src/components-personal/PhotoPubs';
import { useUserValue } from '../../../src/data/userData';
import { API } from 'aws-amplify';
import { useSetLoadingPath } from '../../../src/data/loadingData';

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
    const photoId = router.query?.photoid || 'nophotoId';
    const source = `/photos/${photoId}`;
    const currentUser = useUserValue();
    const { profile } = currentUser;
    const photoData = useRecoilValueLoadable(photoState(source));
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
            enqueueSnackbar(`Je ${(ratingUpdate > 0)? '+1' : '-1'} inbreng over deze foto is verwerkt`);
        };
        setRating();
    };
    const photoRating = (photo.rating || 0) - userRating.initial + userRating.current;

    const onDelete = () => {
        alert('Deleting photo');
        enqueueSnackbar('Foto verwijderd');
        setLoadingPath('/personal/photos');
    };
    const currentIsOwner = photo && photo.SK?.slice(1) === profile.id;
    const isLoading = (photoData.state === 'loading');
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

    return (
        <main>
            <Grid container>
                <Grid item md={8} xs={12} className={classes.photo}>
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
                        <PhotoRating userRating={userRating.current} onChange={onChangeRating} disabled={!photo}/>
                    </div>
                    <div className={classes.flexLine}>
                        <Button color='primary' variant='outlined' startIcon={<Icon>cloud_download</Icon>}
                            disabled={!photo}
                            href={photoUrl} title='download deze pic' download={photo.url?.split('/').slice(-1)[0]}
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
            <pre>{JSON.stringify(photoData, null, 2)}</pre>
            <pre>{JSON.stringify(photo, null, 2)}</pre>
        </main>
    )
}

const PhotoPage = () => {
    return <PrivatePage>
        <Toolbar />
        <PhotoMain />
    </PrivatePage>
}

export default PhotoPage