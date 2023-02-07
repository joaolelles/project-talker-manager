const express = require('express');
const fs = require('fs').promises;
const genToken = require('../utils/generate_token');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const readFile = async () => {
  try {
    const data = await fs.readFile('src/talker.json', 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

app.get('/talker', async (_request, response) => {
  const read = await readFile();
  if (!read) {
    return response.status(HTTP_OK_STATUS).json([]);
  }
  return response.status(HTTP_OK_STATUS).json(read);
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const read = await fs.readFile('src/talker.json', 'utf-8');
  const api = JSON.parse(read);
  const filterId = api.filter((el) => el.id === Number(id));
  if (filterId.length === 0) { 
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(HTTP_OK_STATUS).json(filterId[0]);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].includes(undefined)) {
    res.status(401).json({ message: 'Email ou Password não preenchido' });
  }
  const tokenGen = genToken();
  return res.status(HTTP_OK_STATUS).json({ token: tokenGen });
});