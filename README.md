# Rent a Car

CRUD / ABM implementado en Node.js para añadir, ver, actualizar y eliminar autos. Utiliza entre otros módulos:
- [multer](https://www.npmjs.com/package/multer) para opcionalmente insertar fotos de cada auto.
- [better-sqlite3](https://www.npmjs.com/package/better-sqlite3) para gestionar base de datos de SQLite.
- [jest](https://www.npmjs.com/package/jest) para pruebas unitarias.
- [eslint](https://www.npmjs.com/package/eslint) y [prettier](https://www.npmjs.com/package/prettier) en conjunto para  analizar potenciales errores y darle formato al código.

## Instrucciones de instalación
- Descargar el repositorio en su equipo.
- Correr `npm install` para instalar dependencias. Si no puede correr comandos con npm, debe instalar node.js desde este link: https://nodejs.org/es/download/.
- Crear un archivo `.env` en la raíz del proyecto, guiandose por el archivo `.env.dist` en la misma ubicación.
- Si se va a modificar el proyecto, se recomienda instalar las extensiones de eslint, prettier y jest en su IDE.
- Para correr el servidor, correr `npm run dev`. Al correr dicho comando la aplicación se ejecutará mediante Nodemon, con el cual el servidor se reiniciará al detectar cambios.
- Ir a la dirección indicada en la consola, por defecto http://localhost:3000/.

## Diagrama C4

![Level 1](https://github.com/mpaternostro/rent-a-car/raw/master/docs/c4-level-1.jpg "Level 1")

![Level 2](https://github.com/mpaternostro/rent-a-car/raw/master/docs/c4-level-2.jpg "Level 2")

![Level 3](https://github.com/mpaternostro/rent-a-car/raw/master/docs/c4-level-3.jpg "Level 3")
