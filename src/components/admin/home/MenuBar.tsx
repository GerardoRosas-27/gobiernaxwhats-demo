import * as React from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { Ui, Icon } from '@components/material-ui';

const data = [
    { icon: <Icon.People />, label: 'Authentication' },
    { icon: <Icon.Dns />, label: 'Database' },
    { icon: <Icon.PermMedia />, label: 'Storage' },
    { icon: <Icon.Public />, label: 'Hosting' },
];

const FireNav = styled(Ui.List)<{ component?: React.ElementType }>({
    '& .MuiListItemButton-root': {
        paddingLeft: 24,
        paddingRight: 24,
    },
    '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginRight: 16,
    },
    '& .MuiSvgIcon-root': {
        fontSize: 20,
    },
});

export default function MenuBar() {
    const [open, setOpen] = React.useState(true);
    return (
        <Ui.Box sx={{ display: 'flex' }}>
            <ThemeProvider
                theme={createTheme({
                    components: {
                        MuiListItemButton: {
                            defaultProps: {
                                disableTouchRipple: true,
                            },
                        },
                    },
                    palette: {
                        mode: 'dark',
                        primary: { main: 'rgb(102, 157, 246)' },
                        background: { paper: 'rgb(5, 30, 52)' },
                    },
                })}
            >
                <Ui.Paper elevation={0} sx={{ maxWidth: 256 }}>
                    <FireNav component="nav" disablePadding>
                        <Ui.ListItemButton component="a" href="#customized-list">
                            <Ui.ListItemIcon sx={{ fontSize: 20 }}>🔥</Ui.ListItemIcon>
                            <Ui.ListItemText
                                sx={{ my: 0 }}
                                primary="Firebash"
                                primaryTypographyProps={{
                                    fontSize: 20,
                                    fontWeight: 'medium',
                                    letterSpacing: 0,
                                }}
                            />
                        </Ui.ListItemButton>
                        <Ui.Divider />
                        <Ui.ListItem component="div" disablePadding>
                            <Ui.ListItemButton sx={{ height: 56 }}>
                                <Ui.ListItemIcon>
                                    <Icon.Home color="primary" />
                                </Ui.ListItemIcon>
                                <Ui.ListItemText
                                    primary="Project Overview"
                                    primaryTypographyProps={{
                                        color: 'primary',
                                        fontWeight: 'medium',
                                        variant: 'body2',
                                    }}
                                />
                            </Ui.ListItemButton>
                            <Ui.Tooltip title="Project Settings">
                                <Ui.IconButton
                                    size="large"
                                    sx={{
                                        '& svg': {
                                            color: 'rgba(255,255,255,0.8)',
                                            transition: '0.2s',
                                            transform: 'translateX(0) rotate(0)',
                                        },
                                        '&:hover, &:focus': {
                                            bgcolor: 'unset',
                                            '& svg:first-of-type': {
                                                transform: 'translateX(-4px) rotate(-20deg)',
                                            },
                                            '& svg:last-of-type': {
                                                right: 0,
                                                opacity: 1,
                                            },
                                        },
                                        '&:after': {
                                            content: '""',
                                            position: 'absolute',
                                            height: '80%',
                                            display: 'block',
                                            left: 0,
                                            width: '1px',
                                            bgcolor: 'divider',
                                        },
                                    }}
                                >
                                    <Icon.Settings />
                                    <Icon.ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                                </Ui.IconButton>
                            </Ui.Tooltip>
                        </Ui.ListItem>
                        <Ui.Divider />
                        <Ui.Box
                            sx={{
                                bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                                pb: open ? 2 : 0,
                            }}
                        >
                            <Ui.ListItemButton
                                alignItems="flex-start"
                                onClick={() => setOpen(!open)}
                                sx={{
                                    px: 3,
                                    pt: 2.5,
                                    pb: open ? 0 : 2.5,
                                    '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                                }}
                            >
                                <Ui.ListItemText
                                    primary="Build"
                                    primaryTypographyProps={{
                                        fontSize: 15,
                                        fontWeight: 'medium',
                                        lineHeight: '20px',
                                        mb: '2px',
                                    }}
                                    secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                                    secondaryTypographyProps={{
                                        noWrap: true,
                                        fontSize: 12,
                                        lineHeight: '16px',
                                        color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                                    }}
                                    sx={{ my: 0 }}
                                />
                                <Icon.KeyboardArrowDown
                                    sx={{
                                        mr: -1,
                                        opacity: 0,
                                        transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                                        transition: '0.2s',
                                    }}
                                />
                            </Ui.ListItemButton>
                            {open &&
                                data.map((item) => (
                                    <Ui.ListItemButton
                                        key={item.label}
                                        sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                                    >
                                        <Ui.ListItemIcon sx={{ color: 'inherit' }}>
                                            {item.icon}
                                        </Ui.ListItemIcon>
                                        <Ui.ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                        />
                                    </Ui.ListItemButton>
                                ))}
                        </Ui.Box>
                    </FireNav>
                </Ui.Paper>
            </ThemeProvider>
        </Ui.Box>
    );
}
