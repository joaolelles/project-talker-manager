const express = require('express');
const { json } = require('express/lib/response');
const fs = require('fs').promises;

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
    return JSON.parse(data)
  } catch (error) {
    console.log(error)
  }
}

app.get('/talker', async (_request, response) => {
  const read = await readFile();
  if(!read) {
    return response.status(HTTP_OK_STATUS).json([])
  }
  return response.status(HTTP_OK_STATUS).json(read)
});
