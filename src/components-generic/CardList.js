import React from 'react';

import Grid from '@material-ui/core/Grid';

const CardList = ({ list, component, addComponent, isLoading, width, spacing }) => {
    const Component = component;
    const AddComponent = addComponent;
    return <Grid container spacing={spacing || 0}>
        {list.map(item => {
            return <Grid key={item.id} item md={width || 3} xs={12}>
                <Component {...item} />
            </Grid>
        })}
        {!isLoading && addComponent && <Grid item md={width || 3} xs={12}>
            <AddComponent />
        </Grid>}
    </Grid> 
}

export default CardList;