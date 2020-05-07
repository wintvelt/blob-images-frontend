import React from 'react';

import Grid from '@material-ui/core/Grid';

const CardList = ({ list, component, width, spacing }) => {
    const Component = component;
    return <Grid container spacing={spacing || 0}>
        {list.map(item => {
            return <Grid key={item.id} item md={width || 3} xs={12}>
                <Component {...item} />
            </Grid>
        })}
    </Grid>
}

export default CardList;