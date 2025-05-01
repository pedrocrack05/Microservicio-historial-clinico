# Microservicio: Gestión de Historial Clínico

Este microservicio permite registrar usuarios, autenticarse con JWT y gestionar historiales clínicos (crear, consultar, actualizar y eliminar).

Incluye autenticación segura, validaciones básicas, conexión a PostgreSQL con Prisma, y rutas protegidas por JWT.


## Tecnologías utilizadas

- Node.js + TypeScript
- Express
- PostgreSQL
- Prisma ORM
- JWT (jsonwebtoken)
- Bcrypt (hash de contraseñas)
- dotenv (variables de entorno)


##  Cómo iniciar el proyecto

1. Clona el repositorio:

   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo

2. Instala dependencias:
   
   npm install

3. Crea un archivo .env basado en .env.example

   cp .env.example .env

4. Configura tu base de datos en el archivo .env

   DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/historia_clinica
   JWT_SECRET=clave_segura
   PORT=3000

5. Ejecuta las migraciones

   npx prisma migrate dev --name init

6. Inicia el servidor en desarrollo

   npm run dev

7. El servidor estara disponible en:

   http://localhost:3000


## Endpoints disponibles

### Autenticación
- `POST /auth/register` --> Registro de usuario
- `POST /auth/login` --> Login (retorna JWT)

### Historias clínicas (requiere JWT)
- `GET /histories` --> Obtener todos los historiales del usuario
- `GET /histories/:id` --> Obtener historial específico
- `POST /histories` --> Crear nuevo historial
- `PUT /histories/:id` --> Actualizar historial
- `DELETE /histories/:id` --> Eliminar historial

## Probar con Postman

1. Importa la colección de Postman ubicada en la carpeta `/postman/collection.json`
2. Ejecuta primero `POST /auth/register` para registrar un usuario
3. Luego, `POST /auth/login` para obtener el token JWT
4. Copia el token y úsalo en las rutas protegidas:
   - En Headers --> Authorization --> `Bearer TU_TOKEN`
