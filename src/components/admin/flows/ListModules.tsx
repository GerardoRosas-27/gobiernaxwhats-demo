import { useRouter } from 'next/router'
import { ChangeEventHandler, useEffect, useState } from 'react';
//table
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

//icons acciones
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


import { useModuleState } from "@store/modulesFlows/ModulesContext";
import { deleteModule } from "@services/front/modules.services";
import { ModulesBotModel } from "@models/modules-bot.model";

const ListModules = (): JSX.Element => {

    const router = useRouter()
    //useState table

    const { state, dispatch } = useModuleState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [valueFilter, setValueFilter] = useState('');

    const filterModules: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValueFilter(e.target.value)
    }

    //events table
    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const onDetailProduct = (data: ModulesBotModel) => {
        console.log("data: ", data);
        dispatch({ type: "SELECT_MODULE", payload: { data } });
        router.push({
            pathname: 'flows/[detail]',
            query: { detail: data._id }
        })
    }


    const onDeleteProduct = async (id: string) => {
        const response = await deleteModule(id);
        if (response.staus == 200) {
            dispatch({ type: "REMOVE_MODULE", payload: { id } });
        }
    };

    const onNewProduct = () => {
        router.push({
            pathname: 'flows/new'
        })
    }

    const onChats = (data: ModulesBotModel) => {
        console.log("data: ", data);
        dispatch({ type: "SELECT_MODULE", payload: { data } });
        router.push({
            pathname: 'chats/',
        })
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>

            <Grid container direction="row" justifyContent="flex-end" spacing={8}>
                <Grid item p={2} sm={6}>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="search">Buscar</InputLabel>
                        <OutlinedInput
                            id="search"
                            onChange={filterModules}
                            endAdornment={
                                <InputAdornment position="end">
                                    <SearchIcon></SearchIcon>
                                </InputAdornment>
                            }
                            label="Buscar"
                        />
                    </FormControl>
                </Grid>
                <Grid item p={2} sm={2}>
                    <Fab onClick={() => onNewProduct()} color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Grid>
            </Grid>

            <TableContainer sx={{ maxHeight: 800 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">id</TableCell>
                            <TableCell align="center">nombre</TableCell>
                            <TableCell align="center">principal</TableCell>
                            <TableCell align="center">Siguiente Modulo</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.list.filter(item => item.name.includes(valueFilter))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                        <TableCell align="center">{row._id}
                                        </TableCell>
                                        <TableCell align="center">{row.name}
                                        </TableCell>
                                        <TableCell >{row.principal}</TableCell>
                                        <TableCell >{row.next_module_id}</TableCell>
                                        <TableCell align="center">
                                            < Fab onClick={() => onDetailProduct(row)} size="small" color="primary" aria-label="add">
                                                <EditIcon></EditIcon>
                                            </Fab>
                                            < Fab onClick={() => onChats(row)} size="small" color="primary" aria-label="add">
                                                <WhatsAppIcon></WhatsAppIcon>
                                            </Fab>
                                            < Fab onClick={() => onDeleteProduct(row._id as string)} size="small" color="secondary" aria-label="add">
                                                <DeleteForeverIcon></DeleteForeverIcon>
                                            </Fab>
                                        </TableCell>

                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
                <style jsx>
                    {`
                img{
                 width: 30%;
                 height: auto;
                }
            `}
                </style>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={state.list.filter(item => item.name.includes(valueFilter)).length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </Paper>
    );
}

export default ListModules