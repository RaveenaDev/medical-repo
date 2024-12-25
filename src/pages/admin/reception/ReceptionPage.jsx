import React from 'react'
import Grid from "@mui/material/Grid2";
import {Paper, styled, Typography} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

const ReceptionPage = () => {
    return (
        <Grid container spacing={2}>
            <Grid size={8}>
                <Grid container direction="column" spacing={2}>
                    {/* First vertically stacked item */}
                    <Grid>
                        <Item>
                            <Typography>Item 1</Typography>
                        </Item>
                    </Grid>
                    {/* Second vertically stacked item */}
                    <Grid>
                        <Item>
                            <Typography>Item 2</Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
            <Grid size={4}>
                <Item>size=4</Item>
            </Grid>
        </Grid>
    )
}
export default ReceptionPage
