
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { api } from '../config/api';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const columns = [
    { id: 'codigo', label: 'Codigo', minWidth: 50 },
    { id: 'data', label: 'Data', minWidth: 100 },
    {
        id: 'nome',
        label: 'Nome',
        minWidth: 170
    },
    {
        id: 'descricao',
        label: 'Descrição',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'botoes',
        minWidth: 100,
    },
];

export default function DataTable() {
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState([]);
    const [totalEntries, setTotalEntries] = useState(0);

    useEffect(() => {
        async function loadSurveys() {
            const { data } = await api.get('/questionarios', { params: { paginacao: page + 1 } });
            setRows(data.questionarios);
            setTotalEntries(data.totalQuestionarios)
        }
        loadSurveys()
    }, [page])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    return (
        <Paper sx={{ width: 'fit-content', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.codigo}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        if (column.id !== 'botoes') {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>)
                                        } else {
                                            return (
                                                <TableCell key={column.id} align={column.align} sx={{ display: 'flex', gap: 4, cursor: 'pointer' }}>
                                                    <EditIcon sx={{ cursor: 'pointer' }} />
                                                    <QuestionAnswerIcon />
                                                </TableCell>)
                                        }
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                rowsPerPage={10}
                count={totalEntries}
                page={page}
                onPageChange={handleChangePage}
            />
        </Paper>
    );
}