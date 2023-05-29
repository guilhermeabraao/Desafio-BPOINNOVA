import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useRef, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { api } from '../config/api';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CloseIcon from '@mui/icons-material/Close';
import FormLabel from '@mui/material/FormLabel';

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

export default function AnswerSurveyFormModal({ questionario }) {
    const [open, setOpen] = useState(false);
    const [respostas, setRespostas] = useState([]);
    const [usuario, setUsuario] = useState({ cpf: '', senha: '' })
    const [openAlert, setOpenAlert] = useState(false);
    const alertMessageRef = useRef('');
    const severityRef = useRef('');


    const handleOpen = () => {
        setOpen(true);
        for (const pergunta of questionario.perguntas) {
            respostas.push({ perg_cod: pergunta.cod_perg, descricao: '', perg_descricao: pergunta.descricao });
        }
    };
    const handleClose = () => {
        setOpen(false);
        setRespostas([]);
    };


    async function HandleSubmit() {
        try {
            for (const resposta of respostas) {
                for (const array of Object.entries(resposta)) {
                    if (array.includes('')) {
                        setOpenAlert(true)
                        alertMessageRef.value = 'Preencha todos os campos!';
                        severityRef.value = 'error';
                        return;
                    }
                }

            }
            if (usuario.cpf.length !== 11 || !parseInt(usuario.cpf) > 0) {
                setOpenAlert(true)
                alertMessageRef.value = 'CPF precisa ter 11 digitos!';
                severityRef.value = 'error';
                return;
            }

            const respostasAEnviar = [];
            for (const resposta of respostas) {
                respostasAEnviar.push({ perg_cod: resposta.perg_cod, descricao: resposta.descricao })
            }
            const data = { usuario, respostas: respostasAEnviar }
            await api.post(`/questionario/${questionario.codigo}/respostas`, data)
            alertMessageRef.value = 'Respostas enviadas!';
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
            <QuestionAnswerIcon onClick={handleOpen} sx={{ cursor: 'pointer' }} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CloseIcon sx={{ position: 'relative', left: '95%', marginBottom: '10px', cursor: 'pointer' }} onClick={() => handleClose()} />
                    <form style={formStyle}>
                        <Box sx={boxStyle}>
                            <Typography id="usuariosLabel" variant="h6" component="h2">
                                Usuário
                            </Typography>
                        </Box>
                        <Box sx={boxStyle}>
                            <TextField
                                id="cpf"
                                label="CPF"
                                onChange={(event) => { usuario.cpf = event.target.value; }}
                            />
                            <TextField
                                id="senha"
                                label="Senha"
                                type='password'
                                onChange={(event) => { usuario.senha = event.target.value; }}
                            />
                        </Box>
                        <Box sx={boxStyle}>
                            <Typography id="questionárioLabel" variant="h6" component="h2">
                                Questionário
                            </Typography>
                        </Box>
                        <Box sx={boxStyle}>
                            <TextField
                                id="nome"
                                label="Questionário"
                                defaultValue={questionario.nome}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                id="descricao"
                                label="Descrição"
                                defaultValue={questionario.descricao}
                                sx={{ width: 400 }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Box>

                        <Box sx={boxStyle}>
                            <Typography id="perguntasLabel" variant="h6" component="h2">
                                Perguntas
                            </Typography>
                        </Box>
                        {respostas.map(resposta => (
                            <Box sx={{ ...boxStyle, flexDirection: 'column', alignItems: 'left' }}>
                                <FormLabel>{resposta.perg_descricao}</FormLabel>
                                <Box>

                                    <TextField
                                        required
                                        id={resposta.perg_cod}
                                        label="Resposta"
                                        sx={{ width: '100%' }}
                                        onChange={(event) => { resposta.descricao = event.target.value; }}
                                    />
                                </Box>
                            </Box>
                        )
                        )}

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