# Tiendanube App Native Template Node

Este proyecto es una plantilla para crear una app nativa para Tiendanube, con backend en Node.js y frontend en React.

---

## Requisitos previos

- Node.js >= 16.x
- Yarn >= 1.x o npm >= 7.x
- (Opcional) XAMPP o similar si usas MySQL/localhost

---

## 1. Clonar el repositorio

```sh
git clone <URL_DEL_REPO>
cd tiendanube-app-native-template-node
```

---

## 2. Configuración de variables de entorno

### Backend (`api`)

1. Copia el archivo de ejemplo:
   ```sh
   cd api
   cp .env.example .env
   ```
2. Edita el archivo `.env` y completa los valores necesarios:
   - `CLIENT_ID` (ID de tu app en Tiendanube)
   - `CLIENT_SECRET` (secreto de tu app)
   - `CLIENT_EMAIL` (email de tu cuenta de desarrollador)
   - `TIENDANUBE_AUTENTICATION_URL` (URL de autenticación de Tiendanube)
   - `TIENDANUBE_API_URL` (URL base de la API de Tiendanube)
   - `PORT` (puerto del backend, por defecto 8000)

### Frontend (`frontend`)

1. Copia el archivo de ejemplo:
   ```sh
   cd ../frontend
   cp .env.example .env
   ```
2. Edita el archivo `.env` y completa:
   - `VITE_API_URL` (URL del backend, por ejemplo: `http://localhost:8000`)

---

## 3. Instalación de dependencias

### Backend
```sh
cd api
yarn install # o npm install
```

### Frontend
```sh
cd ../frontend
yarn install # o npm install
```

---

## 4. Inicializar la base de datos local

El backend usa un archivo `db.json` para guardar las credenciales de la tienda. Puedes copiar el ejemplo:

```sh
cd api
cp db.example.json db.json
```

Luego, cuando instales la app en una tienda, se guardará el `access_token` automáticamente.

---

## 5. Levantar el backend

Desde la carpeta `api`:
```sh
yarn start:api # o npm start, o npx ts-node src/index.ts
```

---

## 6. Levantar el frontend

Desde la carpeta `frontend`:
```sh
yarn dev # o npm run dev
```

---

## 7. Probar la app

- Accede a `http://localhost:3000` (o el puerto que indique Vite) para ver el frontend.
- El backend estará en `http://localhost:8000` (o el puerto que configuraste).
- Instala la app en una tienda de prueba de Tiendanube para obtener el `access_token`.
- Si quieres probar manualmente, puedes usar curl:
  ```sh
  curl -H "Authorization: Bearer TU_ACCESS_TOKEN" http://localhost:8000/products/total
  ```

---

## 8. Notas importantes

- El backend espera que el frontend envíe el `access_token` en el header `Authorization`.
- Para producción, deberías implementar una base de datos real y reforzar la seguridad.
- Si tienes problemas con CORS, revisa la configuración en `api/src/index.ts`.

---

## 9. Contacto y soporte

Si tienes dudas, abre un issue o contacta al equipo de desarrollo.
