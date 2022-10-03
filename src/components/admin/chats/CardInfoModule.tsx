import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useModuleState } from '@store/modulesFlows/ModulesContext';

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

    return (
        <Container maxWidth="md">
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Modulo:{state.select._id} |  Modulo siguiente: {state.select.next_module_id}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {state.select.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Principal: {state.select.principal}
                    </Typography>
                    <Typography variant="body2">
                        { JSON.stringify(state.select.chats)}
                    </Typography>
                </CardContent>

            </Card>
        </Container>
    );
}
