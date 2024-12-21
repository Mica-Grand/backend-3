# Backend 3 - Coderhouse

## Proyecto AdoptMe

Backend desarrollado para una aplicación de adopción de mascotas. Este proyecto fue realizado como parte del curso **Programación Backend III: Testing y Escalabilidad Backend** de **Coderhouse**. Se han implementado las siguientes mejoras y funcionalidades adicionales:

- **Generación de datos ficticios (Mocks):** Generación de usuarios y mascotas ficticias para pruebas.
- **Tests funcionales:** Implementados con **Mocha**, **Chai** y **Supertest** para garantizar la estabilidad de los endpoints.
- **Documentación:** API documentada utilizando **Swagger (OpenAPI)**.
- **Dockerización:** Aplicación dockerizada y publicada en **Docker Hub**: [micagrand/backend-adoptme](https://hub.docker.com/r/micagrand/backend-adoptme).

### Código base

El código base se encuentra en este repositorio:  
[RecursosBackend-Adoptme](https://github.com/CoderContenidos/RecursosBackend-Adoptme)

---

## *Dependencias*

### **Dependencias principales**

- `@faker-js/faker`: Generación de datos ficticios.
- `bcrypt`: Encriptación de contraseñas.
- `dotenv`: Gestión de variables de entorno.
- `express`: Framework backend.
- `jsonwebtoken`: Autenticación con tokens JWT.
- `mongoose`: Conexión y gestión de datos en MongoDB.
- `multer`: Manejo de uploads.
- `swagger-jsdoc` y `swagger-ui-express`: Documentación de la API.

### **Dependencias de desarrollo**

- `chai`: Biblioteca de aserciones para tests.
- `cross-env`: Gestión de entornos cruzados.
- `mocha`: Framework para tests.
- `supertest`: Testing de endpoints HTTP.

---

## *Instalación*

### Desde Github

#### Requisitos Previos

- **Node.js** y **npm** instalados.
- **MongoDB** (URI configurada en un archivo `.env` para la conexión a la base de datos). Ver `env.example`.

#### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Mica-Grand/backend-3
   cd backend-3
   ```

2. **Instalar dependencias:**

```bash
npm install
```
3. **Configurar variables de entorno:**
Crear archivo **.env** en la raíz del proyecto con las URI de conexión a MongoDB. **Ver archivo env.example** (Las variables fueron enviadas en el espacio de la entrega).

```env
MONGO_URI_PROD=<uri_de_mongodb_para_producción>
MONGO_URI_TEST=<uri_de_mongodb_para_pruebas>
MONGO_URI_DEV=<uri_de_mongodb_para_desarrollo>
PORT=3000
```


3. **Ejecutar la app**

**Producción:**
```bash
npm start
```
**Desarrollo:**
```bash
npm run dev
```
**Pruebas:**
```bash
npm test
```

### Desde Docker

#### Pasos


1. **Descargar la imagen desde Docker Hub:**

```bash
docker pull micagrand/backend-adoptme:1.0
```
2. **Ejecutar la imagen: (incluir las variables, porque han sido ignoradas en la imagen)**

```bash
docker run -d -p 3000:3000 --env-file .env micagrand/backend-adoptme:1.0
```

## *Endpoints principales*

### Mocks de datos ficticios

**GET /api/mocks/mockingpets**  
Genera y devuelve una lista de 50 mascotas ficticias sin insertarlas en la base de datos.

**GET /api/mocks/mockingusers**  
Genera y devuelve una lista de 50 usuarios ficticios sin insertarlos en la base de datos.

**POST /api/mocks/generateData**  
Genera e inserta datos ficticios en la base de datos.

Query Parameters:

- users (opcional): Número de usuarios a generar (por defecto: 50).
- pets (opcional): Número de mascotas a generar (por defecto: 50). 

Ejemplo de URL:
<http://localhost:3000/api/mocks/generateData?users=10&pets=10>

### Adoptions

**GET /api/adoptions**  
Devuelve una lista de adopciones realizadas.

**GET /api/adoptions/aid**  
Devuelve la adopción con el ID especificado.
Ejemplo de URL:
<http://localhost:3000/api/adoptions/67660010c904d9582fd9d818>

**POST /api/adoptions/uid/pid**  
Crea una nueva adopción con el ID de usuario y el ID de mascota especificados
Ejemplo de URL:
<http://localhost:3000/api/adoptions/uid/pid>

### Users

**GET /api/users**  
Devuelve una lista de todos los usuarios.

**GET /api/users/uid**  
Devuelve el usuario con el ID especificado.
Ejemplo de URL:
<http://localhost:3000/api/users/67660010c904d9582fd9>

**PUT /api/users/uid**  
Actualiza el usuario con el ID especificado.
Ejemplo de URL:
<http://localhost:3000/api/users/67660010c904d9582fd9>
Ejemplo de cuerpo de solicitud:
```json
{
  "last_name": "López López",
}
```
**DELETE /api/users/uid**
Elimina el usuario con el ID especificado.
Ejemplo de URL:
<http://localhost:3000/api/users/67660010c904d9582fd9>

### Pets

**GET /api/pets**  
Devuelve una lista de todos los pets.

**GET /api/pets/pid**  
Devuelve el pet con el ID especificado.

**POST /api/pets**  
Crea un nuevo pet.
Ejemplo de cuerpo de solicitud:
```json
{
  "name": "Milo",
  "specie": "Dog",
  "birthDate": "2020-05-12",
  "adopted": false,
}
```

**POST /api/pets/withimage**  
Crea un nuevo pet con imagen.
Ejemplo de cuerpo de solicitud:
```json
{
  "name": "Milo",
  "specie": "Dog",
  "birthDate": "2020-05-12",
  "adopted": false,
  "image": "https://example.com/images/milo.jpg"
}
```
**PUT /api/pets/pid**
Actualiza el pet con el ID especificado.
Ejemplo de URL:
<http://localhost:3000/api/pets/67660010c904d9582fd>
Ejemplo de cuerpo de solicitud:
```JSON
{
   "name": "Milo Updated",
   "specie": "Cat"
   }
   ```

**DELETE /api/pets/pid**
Elimina el pet con el ID especificado.
Ejemplo de URL:
<http://localhost:3000/api/pets/67660010c904d9582fd>


### Sessions

**POST /api/sessions/register**
Registra un nuevo usuario.
Ejemplo de cuerpo de solicitud:
```json
{
  "first_name": "Mica",
  "last_name": "Grandoso",
  "email": "mica@example.com",
  "password": "Superclave1234"
}
```
**POST /api/sessions/login**
Inicia sesión con el usuario.
Ejemplo de cuerpo de solicitud:
```json
{
   "email": "mica@example.com",
   "password": "Superclave1234"
}
```

**GET /api/sessions/current**
Devuelve la información del usuario actualmente conectado.



## *Swagger API Documentation*
La API está documentada utilizando **Swagger**. 
Puedes acceder a la documentación en la ruta:
http://localhost:3000/api-docs


## *Testing*
Se han implementado tests funcionales para los endpoints principales utilizando *Mocha, Chai, y Supertest*.
### Ejecutar pruebas:
```bash
npm test
```