# CRUD Mascotas

Aplicación Node.js (Express + EJS) con SQL Server (Azure) para gestionar mascotas.

## Ejecutar en local
- Copia `.env` (no se sube) con variables:
```
PORT=3000
DB_USER=...
DB_PASSWORD=...
DB_SERVER=...
DB_NAME=...
DB_PORT=1433
```
- Instala dependencias: `npm install`
- Dev: `npm run dev`
- Prod: `npm start`

## Despliegue en Azure App Service
- Configura las App Settings con las variables del `.env`.
- Asegura acceso del App Service a Azure SQL (firewall/Allow Azure services).
- Usa Deployment Center o GitHub Actions.

## Visualización del proyecto en línea
Si el enlace principal proporcionado no funciona, puedes acceder al proyecto desplegado en Azure a través del siguiente enlace alternativo:

🔗 **[crudmascotas-hubehbfddxhrcrh8.brazilsouth-01.azurewebsites.net](https://crudmascotas-hubehbfddxhrcrh8.brazilsouth-01.azurewebsites.net)**
