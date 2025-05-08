require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.post('/propiedades', async (req, res) => {
  const { titulo, descripcion, precio, tipo, ubicacion, imagenes } = req.body;

  const { data, error } = await supabase
    .from('propiedades')
    .insert([{ titulo, descripcion, precio, tipo, ubicacion, imagenes }]);

  if (error) return res.status(500).send(error.message);
  res.status(200).send(data);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
