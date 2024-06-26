const express = require('express');
const path = require('path');

const app = express();

// Servir los archivos estáticos de la aplicación React
app.use(express.static(path.join(__dirname, 'build')));

// Manejar cualquier solicitud que no coincida con los archivos estáticos anteriores
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configurar el puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
