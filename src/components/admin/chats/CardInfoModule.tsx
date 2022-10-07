import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useModuleState } from '@store/modulesFlows/ModulesContext';
import { useChatState } from '@store/chats/chatsContext';
import Fab from '@mui/material/Fab';
import RefreshIcon from '@mui/icons-material/Refresh';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function CardInfoModule() {

    const { state, dispatch } = useModuleState();
    const { stateChat, dispatchChat } = useChatState();
    const onUpdateChats = () => {
        dispatchChat({ type: "FILTER_CHATS", payload: { data: stateChat.list } })
    }

    return (
        <Container maxWidth="md" sx={{ paddingBottom: '20px' }}>
            <Card sx={{ minWidth: 275 }}>

                <CardContent>
                    <Fab onClick={() => onUpdateChats()} color="primary" aria-label="Actualizar chats">
                        <RefreshIcon />
                    </Fab>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Modulo:{state.select._id} |  Modulo siguiente: {state.select.next_module_id}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {state.select.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {state.select.principal ? 'Es principal' : 'No es principal'}
                    </Typography>
                   
                </CardContent>

            </Card>
        </Container>
    );
}
