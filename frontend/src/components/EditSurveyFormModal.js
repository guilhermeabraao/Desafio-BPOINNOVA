import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useRef, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { api } from '../config/api';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
}

const boxStyle = {
    display: 'flex',
    gap: 2,
    alignItems: 'center'
}

export default function EditSurveyFormModal({ questionario }) {
    const [open, setOpen] = useState(false);
    const [perguntas, setPerguntas] = useState([{ descricao: '', cod_perg: '' }]);
    const [openAlert, setOpenAlert] = useState(false);
    const alertMessageRef = useRef('');
    const severityRef = useRef('');


    const handleOpen = () => {
        setOpen(true);
        setPerguntas(questionario.perguntas);
    };
    const handleClose = () => {
        setOpen(false);
    };


    async function HandleSubmit() {
        if (questionario.nome === '' || questionario.descricao === '') {
            alertMessageRef.value = 'Preencha todos os campos!';
            severityRef.value = 'error';
            setOpenAlert(true)
            return;
        }
        const questionarioEditado = {
            nome: questionario.nome,
            descricao: questionario.descricao,
            perguntas: []
        };
        for (const pergunta of perguntas) {
            questionarioEditado.perguntas.push({ cod_perg: pergunta.cod_perg, descricao: pergunta.descricao })
            for (const array of Object.entries(pergunta)) {
                if (array.includes('')) {
                    setOpenAlert(true)
                    alertMessageRef.value = 'Preencha todos os campos!';
                    severityRef.value = 'error';
                    return;
                }
            }

        }
        try {
            const data = { ...questionarioEditado }
            await api.put(`/questionario/${questionario.codigo}`, data)
            alertMessageRef.value = 'Questionário criado!';
            severityRef.value = 'success';
            setOpenAlert(true);
            handleClose();
            return;
        } catch (error) {
            alertMessageRef.value = error.response.data.mensagem;
            severityRef.value = 'error';
            setOpenAlert(true)
        }


    }

    return (
        <div>
            <EditIcon onClick={handleOpen} sx={{ cursor: 'pointer' }} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CloseIcon sx={{ position: 'relative', left: '610px', marginBottom: '10px', cursor: 'pointer' }} onClick={() => handleClose()} />
                    <form style={formStyle}>
                        <Box sx={boxStyle}>
                            <TextField
                                required
                                id="nome"
                                label="Nome"
                                defaultValue={questionario.nome}
                                onChange={(event) => { questionario.nome = event.target.value; }}
                            />
                            <TextField
                                required
                                id="descricao"
                                label="Descrição"
                                defaultValue={questionario.descricao}
                                sx={{ width: 400 }}
                                onChange={(event) => { questionario.descricao = event.target.value; }}
                            />
                        </Box>

                        <Box sx={boxStyle}>
                            <Typography id="perguntasLabel" variant="h6" component="h2">
                                Perguntas
                            </Typography>
                        </Box>
                        {perguntas.map(pergunta => (
                            <Box sx={boxStyle}>
                                <TextField
                                    required
                                    id="codigo"
                                    label="Código"
                                    defaultValue={pergunta.cod_perg}
                                    sx={{ width: 100 }}
                                    onChange={(event) => { pergunta.cod_perg = event.target.value; }}
                                />
                                <TextField
                                    required
                                    id="descricao"
                                    label="Descrição"
                                    defaultValue={pergunta.descricao}
                                    sx={{ width: 520 }}
                                    onChange={(event) => { pergunta.descricao = event.target.value; }}
                                />
                            </Box>
                        ))}

                        <Button variant='contained' onClick={() => HandleSubmit()}>Enviar</Button>

                    </form>
                </Box>
            </Modal>
            {openAlert && <Snackbar open={openAlert} autoHideDuration={4000} onClose={() => setOpenAlert(false)} >
                <Alert onClose={() => setOpenAlert(false)} severity={severityRef.value} sx={{ width: '100%', position: 'relative' }}>
                    {alertMessageRef.value}
                </Alert>
            </Snackbar>}
        </div>
    );
}