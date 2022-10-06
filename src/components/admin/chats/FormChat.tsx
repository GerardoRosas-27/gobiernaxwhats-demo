import React, { ChangeEventHandler, useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Fab from '@mui/material/Fab';

import { ButtonsModel, ChatBotModel, ListModel, RowsModel } from '@models/chat-bot.model';
import { DataProps } from '@interfaces/Props';
import { TypeInputUser } from 'src/environment/var-const';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MergeIcon from '@mui/icons-material/Merge';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ReplyIcon from '@mui/icons-material/Reply';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { useChatState } from '@store/chats/chatsContext';
import RefreshIcon from '@mui/icons-material/Refresh';

const customWidth = {
    width: '100%',
    height: 'auto'
}
const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));
export const FormChat = (props: DataProps<ChatBotModel>) => {

    const { data } = props;
    const { stateChat, dispatchChat } = useChatState();
    const [dataChat, setDataChat] = useState<ChatBotModel>(data)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };




    const handleAsignado = (id: string) => {
        let result: ChatBotModel | undefined = stateChat.list.find(item => item._id === id);
        if (result) {
            dispatchChat({ type: "FILTER_CHATS", payload: { data: [dataChat, result] } });
        }

        setAnchorEl(null);
    }
    const handleSecctionAsignados = (dataChats: RowsModel[]) => {

        console.log("id slect chats:", dataChats)
        let data: ChatBotModel[] = [];
        data = stateChat.list.filter(item1 => item1._id && item1._id === dataChats.filter(item2 => item1._id && item1._id === item2.id)[0].id);
        dispatchChat({ type: "FILTER_CHATS", payload: { data } });
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setDataChat(data)
    }, [data])

    const handleChangue: ChangeEventHandler<HTMLInputElement> = (e) => {
        let name = e.target.name === 'text' ? 'text.body' : e.target.name
        setDataChat({ ...dataChat, [name]: e.target.value })
    }


    const InteractiveListButton = (dataButton: ButtonsModel) => {
        return (
            <Grid item p={2} sm={12} key={dataButton._id}>
                <Button variant="contained" component="label">
                    {dataButton.reply.title}
                </Button>
                <Fab size="small" aria-label="add" style={{ marginRight: '10px' }}>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <AutoAwesomeMotionIcon />
                    </IconButton>
                </Fab>
            </Grid>
        );
    }
    const InteractiveSectionsList = (dataSections: ListModel) => {
        return (
            <Container maxWidth="md" key={dataSections._id}>
                <Grid container direction="row" justifyContent="center" spacing={1} style={{ padding: '10px' }}>
                    <h3>{dataSections.title}</h3>
                    <Fab onClick={() => handleSecctionAsignados(dataSections.rows)} size="small" aria-label="add" style={{ marginLeft: '10px', top: '10px' }}>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <AutoAwesomeMotionIcon />
                        </IconButton>
                    </Fab>
                </Grid>

                <Grid container direction="row" justifyContent="center" spacing={1}>
                    {dataSections.rows.map(InteractiveSectionsListButton)}
                </Grid>
            </Container>
        );
    }
    const InteractiveSectionsListButton = (dataSections: RowsModel) => {
        return (
            <Grid item p={2} sm={12} key={dataSections.id}>
                <Button variant="contained" component="label" style={{ marginRight: '10px' }}>
                    {dataSections.title}
                </Button>

                <Fab size="small" aria-label="add" style={{ marginRight: '10px' }}
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    onClick={handleClick}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <MoreVertIcon />
                    </IconButton>
                </Fab>
                <MenuItems data={dataSections.id} />
            </Grid>
        );
    }

    const MenuItems = (props: DataProps<string>) => {
        const { data } = props;
        return (
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >

                <MenuItem onClick={handleClose} disableRipple>
                    <AddToPhotosIcon />
                    Crear
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <MergeIcon />
                    Asignar
                </MenuItem>
                <MenuItem onClick={() => handleAsignado(data)} disableRipple>
                    <FileCopyIcon />
                    Asignado
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <MoreHorizIcon />
                    Productos
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <ReplyIcon />
                    Disparador
                </MenuItem>

                <Divider sx={{ my: 0.5 }} />

                <MenuItem onClick={handleClose} disableRipple>
                    <EditIcon />
                    Editar
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <DeleteForeverIcon />
                    Eliminar
                </MenuItem>

            </StyledMenu>
        )
    }



    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Container maxWidth="md">
                <Grid container direction="row" spacing={1}>
                    <Grid item p={2} sm={10}>
                        <TextField style={customWidth} value={dataChat.name} name="name" onChange={handleChangue} label="Nombre" variant="standard" />
                    </Grid>



                    <Grid item p={2} sm={12}>
                        <TextField style={customWidth} value={dataChat.text && dataChat.text.body ? dataChat.text.body : ''} name="text" onChange={handleChangue} label="Mensaje" variant="standard" />
                    </Grid>

                    <Grid item p={2} sm={12}>
                        <TextField style={customWidth} value={dataChat.type} name="type" onChange={handleChangue} label="Tipo" variant="standard" />
                    </Grid>

                </Grid>
                <Grid container direction="row" justifyContent="center" spacing={2}>
                    {dataChat.type === TypeInputUser.interactive ? dataChat.interactive?.action?.buttons?.map(item => InteractiveListButton(item)) : ''}
                    {dataChat.type === TypeInputUser.interactive ? dataChat.interactive?.action?.sections?.map(item => InteractiveSectionsList(item)) : ''}

                </Grid>

            </Container>
        </Paper>
    )
}
