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


## Uso con Docker

Este proyecto incluye un archivo `Dockerfile` y `docker-compose.yml` para facilitar el despliegue en entornos locales o productivos.

---

### Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

### Levantar el entorno completo

Esto inicia tanto el backend como PostgreSQL:

docker-compose up --build

- El backend se ejecutará en: `http://localhost:3000`
- La base de datos PostgreSQL estará en: `localhost:5432`
- Usuario/contraseña: `postgres` / `postgres`
- Base de datos: `historia_clinica`

---

### Variables de entorno en `docker-compose`

No necesitas archivo `.env` para el entorno Docker. Las variables se definen directamente dentro de `docker-compose.yml`.

Si deseas personalizarlas, puedes usar `env_file:` o `.env.docker` (opcional).

---

### Ejecutar migraciones manualmente (opcional)

Si deseas correr comandos de Prisma dentro del contenedor:

docker exec -it backend_historial npx prisma migrate dev --name init

---

### Detener los servicios

docker-compose down

---

## Archivos relevantes para Docker

Dockerfile              # Imagen de la app Node.js
docker-compose.yml      # Orquesta backend + base de datos
.dockerignore           # Ignora archivos innecesarios en la imagen

## Pruebas automatizadas

Este microservicio incluye pruebas básicas con Jest y Supertest para garantizar que las funcionalidades críticas estén operativas.

### ¿Qué se prueba?

- Registro de usuario (`POST /auth/register`)
- Inicio de sesión (`POST /auth/login`)
- Creación de historial clínico (`POST /histories` con JWT)

### Estructura

Las pruebas están ubicadas en:

src/__tests__/
├── auth.test.ts        # Pruebas de autenticación
└── histories.test.ts   # Pruebas de historial clínico

### Cómo ejecutar las pruebas

npm test

Esto ejecutará automáticamente todas las pruebas definidas en archivos que coincidan con `*.test.ts`.

### Herramientas utilizadas

- **Jest**: Framework de testing
- **ts-jest**: Soporte para TypeScript en Jest
- **Supertest**: Para simular peticiones HTTP