import express from "express";
import cors from "cors";
import morgan from "morgan";
// @ts-ignore
import dotenv from "dotenv";
import path from "path";
import { instalarScript } from './features/script/script.service';
import { readFileSync } from 'fs';
import { writeFileSync } from 'fs';
import axios from 'axios';

dotenv.config({
  path: path.resolve(".env"),
});

import { AppRoutes } from "@config";
import {
  beforeCheckClientMiddleware,
  errorHandlingMiddleware,
} from "@middlewares";

const port = process.env.PORT || 7200;
const app = express();

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(cors());
app.use(beforeCheckClientMiddleware);
app.use(AppRoutes);
app.use(errorHandlingMiddleware);
// después de inicializar `app`
app.use(express.json());

app.use('/static', express.static(path.join(__dirname, '../public')));
// 🧪 Endpoint temporal para instalar el script
app.get('/install-script', async (req, res) => {
  const dbPath = path.join(__dirname, '../db.json');
  const db = JSON.parse(readFileSync(dbPath, 'utf-8'));

  const store = db.credentials[0];
  const store_id = store.user_id;
  const access_token = store.access_token;
  console.log("➡️ Instalando script con:");
  console.log("Store ID:", store_id);
  console.log("Token:", access_token);
  console.log("User-Agent:", "lic.mannanice@gmail.com - D2A_test");
  try {
    await instalarScript(store_id, access_token);
    res.send('✅ Script instalado correctamente');
  } catch (error: any) {
    console.error('❌ Error al instalar script completo:', error?.response?.data || error?.message || error);
    res.status(500).send('Error al instalar el script');
  }
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// 🧪 Endpoint para recibir el código y guardar el token
app.get('/auth/install', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Falta el parámetro "code"');
  }

  try {
    const response = await axios.post('https://www.tiendanube.com/apps/authorize/token', {
      client_id: '19116',
      client_secret: '26f67366c359bafff6c1a73728941afb448c845a510c9a3e', // reemplazá por el tuyo
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://localhost:8000/auth/install'
    });

    const credentials = response.data;
    console.log("🔐 Token recibido:", credentials);

    const dbPath = path.join(__dirname, '../db.json');
    const dbData = { credentials: [credentials] };

    writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    console.log("✅ Guardado en db.json");

    res.send("✅ Conexión completada y token guardado en db.json");

  } catch (error: any) {
    console.error("❌ Error al intercambiar el code:", error.response?.data || error.message);
    res.status(500).send("Error al intercambiar el code por token");
  }
});

