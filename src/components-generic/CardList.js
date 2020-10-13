import React from 'react';

import Grid from '@material-ui/core/Grid';

import CardAdd from './CardAdd';

const CardList = ({ list, component, addProps, isLoading, onSelect, width, spacing }) => {
    const Component = component;
    return <Grid container spacing={spacing || 0}>
        {list.map(item => {
            return <Grid key={item.id || item.albumId} item md={width || 3} xs={12}>
                <Component {...item} />
            </Grid>
        })}
        {!isLoading && addProps && <Grid item md={width || 3} xs={12}>
            <CardAdd {...addProps} />
        </Grid>}
    </Grid>
}

export default CardList;