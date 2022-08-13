import React from 'react'
import { Ui, Icon } from '@components/material-ui';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Link from 'next/link'


const Main = Ui.styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = Ui.styled(Ui.MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = Ui.styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


const drawerWidth = 240;
const HomeLayout = (components: any) => {

    const theme = Ui.useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Ui.Box sx={{ display: 'flex' }}>
            <Ui.CssBaseline />
            <AppBar position="fixed" open={open}>
                <Ui.Toolbar>
                    <Ui.IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={open ? handleDrawerClose : handleDrawerOpen}
                        edge="start"
                    >
                        {open ? <Icon.ChevronLeftIcon /> : <Icon.MenuIcon />}
                    </Ui.IconButton>
                    <Ui.Typography variant="h6" noWrap component="div">
                        Clipped drawer
                    </Ui.Typography>
                </Ui.Toolbar>
            </AppBar>
            <Ui.Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}>
                <Ui.Toolbar />
                <Ui.Box sx={{ overflow: 'auto' }}>

                    <Ui.Divider />
                    <Ui.List>
                        <Link href={'/admin/home'} >
                            <Ui.ListItem disablePadding>
                                <Ui.ListItemButton>
                                    <Ui.ListItemIcon>
                                        <Icon.InboxIcon />
                                    </Ui.ListItemIcon>
                                    <Ui.ListItemText>
                                        Inicio
                                    </Ui.ListItemText>
                                </Ui.ListItemButton>
                            </Ui.ListItem>
                        </Link>
                        <Link href={'/admin/home/flows'} >
                            <Ui.ListItem disablePadding>
                                <Ui.ListItemButton>
                                    <Ui.ListItemIcon>
                                        <Icon.InboxIcon />
                                    </Ui.ListItemIcon>
                                    <Ui.ListItemText>
                                        Flujos
                                    </Ui.ListItemText>
                                </Ui.ListItemButton>
                            </Ui.ListItem>
                        </Link>
                        <Link href={'/admin/home/users'} >
                            <Ui.ListItem disablePadding>
                                <Ui.ListItemButton>
                                    <Ui.ListItemIcon>
                                        <Icon.InboxIcon />
                                    </Ui.ListItemIcon>
                                    <Ui.ListItemText>
                                        Usuarios
                                    </Ui.ListItemText>
                                </Ui.ListItemButton>
                            </Ui.ListItem>
                        </Link>
                        <Link href={'/admin/home/customers'} >
                            <Ui.ListItem disablePadding>
                                <Ui.ListItemButton>
                                    <Ui.ListItemIcon>
                                        <Icon.InboxIcon />
                                    </Ui.ListItemIcon>
                                    <Ui.ListItemText>
                                        Cleintes
                                    </Ui.ListItemText>
                                </Ui.ListItemButton>
                            </Ui.ListItem>
                        </Link>
                    </Ui.List>
                    <Ui.Divider />
                    <Ui.List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <Ui.ListItem key={text} disablePadding>
                                <Ui.ListItemButton>
                                    <Ui.ListItemIcon>
                                        {index % 2 === 0 ? <Icon.InboxIcon /> : <Icon.MailIcon />}
                                    </Ui.ListItemIcon>
                                    <Ui.ListItemText primary={text} />
                                </Ui.ListItemButton>
                            </Ui.ListItem>
                        ))}
                    </Ui.List>
                </Ui.Box>
            </Ui.Drawer >
            <Main open={open}>
                <DrawerHeader />
                {components.children}
            </Main>


        </Ui.Box >
    )
}

export default HomeLayout;