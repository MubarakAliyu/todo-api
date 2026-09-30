# To-Do App RESTful API

A simple RESTful To-Do List API built with **Node.js core modules**. This project was created as a Backend Development checkpoint to practice HTTP, RESTful routing, CRUD operations, request/response handling, JSON parsing, validation, and HTTP status codes.

## Project Overview

The API manages a list of to-do tasks stored in memory using a JavaScript array.

Each todo contains:

- `id` - unique identifier
- `title` - todo title
- `completed` - completion status, which defaults to `false`

> **Note:** Because the data is stored in memory, all todos are reset when the server is restarted.

## Technologies Used

- Node.js
- Core `http` module
- Core `url` module
- JavaScript
- JSON
- Thunder Client for API testing

No database or Express framework is required.

## Project Structure

```text
todo-api/
├── server.js
├── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/todos` | Get all todos |
| GET | `/todos/:id` | Get a single todo by ID |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/:id` | Update an existing todo |
| DELETE | `/todos/:id` | Delete a todo |

## Getting Started

### 1. Check Node.js

```bash
node --version
```

### 2. Start the server

From the project directory:

```bash
node server.js
```

The server runs at:

```text
http://localhost:3000
```

## API Examples

### Get all todos

```http
GET http://localhost:3000/todos
```

### Get a todo by ID

```http
GET http://localhost:3000/todos/1
```

### Create a todo

```http
POST http://localhost:3000/todos
Content-Type: application/json
```

Request body:

```json
{
  "title": "Complete my backend checkpoint"
}
```

When `completed` is not provided, the API automatically sets it to `false`.

### Update a todo

```http
PUT http://localhost:3000/todos/3
Content-Type: application/json
```

Request body:

```json
{
  "title": "Finish my Node.js REST API checkpoint",
  "completed": true
}
```

### Delete a todo

```http
DELETE http://localhost:3000/todos/3
```

No request body is required.

## Response Status Codes

| Status | Meaning |
|---|---|
| `200 OK` | Request completed successfully |
| `201 Created` | Todo created successfully |
| `400 Bad Request` | Invalid JSON or invalid todo data |
| `404 Not Found` | Todo or route does not exist |

## Request Handling

The project demonstrates how to handle HTTP requests using Node.js without a framework.

Important concepts include:

```js
req.method
req.url
url.parse()
req.on("data")
req.on("end")
JSON.parse()
JSON.stringify()
res.writeHead()
res.end()
```

### Request body handling

Node.js does not automatically parse incoming JSON in a raw HTTP server. The request body is collected in chunks with:

```js
req.on("data", ...)
```

and processed after the complete body is received with:

```js
req.on("end", ...)
```

The JSON string is converted into a JavaScript object with:

```js
JSON.parse(body)
```

## Testing

The API was tested using **Thunder Client** in Visual Studio Code.

Tested operations:

- `GET /todos` ✅
- `GET /todos/:id` ✅
- `POST /todos` ✅
- `PUT /todos/:id` ✅
- `DELETE /todos/:id` ✅

The delete operation was also verified by requesting the deleted todo afterward and receiving a `404 Not Found` response.

## Learning Objectives Achieved

This checkpoint demonstrates understanding of:

- RESTful route design
- CRUD operations
- HTTP methods
- URL and route parameters
- JSON request bodies
- Request validation
- HTTP status codes
- HTTP response construction
- Raw Node.js server development
- In-memory data storage
- API testing with Thunder Client

## Author

**Aliyu Mubarak**

Backend Development Checkpoint
