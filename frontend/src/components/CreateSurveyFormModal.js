import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useRef, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { api } from '../config/api';

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

export default function CreateSurveyFormModal() {
    const [open, setOpen] = useState(false);
    const [perguntas, setPerguntas] = useState([{ descricao: '', cod_perg: '' }]);
    const [questionario, setQuestionario] = useState({ nome: '', descricao: '' });
    const [openAlert, setOpenAlert] = useState(false);
    const alertMessageRef = useRef('');
    const severityRef = useRef('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setPerguntas([{ descricao: '', cod_perg: '' }])
    };

    function HandleAddQuestion() {
        setPerguntas([...perguntas, { descricao: '', cod_perg: '' }])
        console.log(perguntas)
    }

    async function HandleSubmit() {
        if (questionario.nome === '' || questionario.descricao === '') {
            alertMessageRef.value = 'Preencha todos os campos!';
            severityRef.value = 'error';
            setOpenAlert(true)
            return;
        }
        for (const pergunta of perguntas) {
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
            const data = { ...questionario, perguntas }
            await api.post('/questionarios', data)
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
            <Button onClick={handleOpen} variant='contained'>Criar Questionário</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form style={formStyle}>
                        <Box sx={boxStyle}>
                            <TextField
                                required
                                id="nome"
                                label="Nome"
                                onChange={(event) => { questionario.nome = event.target.value; }}
                            />
                            <TextField
                                required
                                id="descricao"
                                label="Descrição"
                                sx={{ width: 400 }}
                                onChange={(event) => { questionario.descricao = event.target.value; }}
                            />
                        </Box>

                        <Box sx={boxStyle}>
                            <Typography id="perguntasLabel" variant="h6" component="h2">
                                Perguntas
                            </Typography>
                            <AddBoxIcon sx={{ cursor: 'pointer' }} onClick={() => HandleAddQuestion()} />
                        </Box>
                        {perguntas.map(pergunta => (
                            <Box sx={boxStyle}>
                                <TextField
                                    required
                                    id="codigo"
                                    label="Código"
                                    sx={{ width: 100 }}
                                    onChange={(event) => { pergunta.cod_perg = event.target.value; }}
                                />
                                <TextField
                                    required
                                    id="descricao"
                                    label="Descrição"
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