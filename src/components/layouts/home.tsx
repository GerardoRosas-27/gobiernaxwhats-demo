import MenuBar from '@components/admin/home/MenuBar';
import Navbar from '@components/admin/home/Navbar';
import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const HomeLayout = (components: any) => {
    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Navbar></Navbar>
                </Grid>
            </Grid>
            <Grid container>

                <Grid item xs={2} md={4} sx={{
                    height: 800,
                }}>
                    <MenuBar></MenuBar>
                </Grid>
                <Grid item xs={10} md={8}>

                    {components.children}
                </Grid>
            </Grid>
        </Box>
    )





}

export default HomeLayout;