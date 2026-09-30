/* global require */

const http = require("http");
const url = require("url");

const PORT = 3000;

// In-memory todo data
let todos = [
  {
    id: 1,
    title: "Learn Node.js",
    completed: false,
  },
  {
    id: 2,
    title: "Build REST API",
    completed: false,
  },
];

let nextId = 3;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  res.setHeader("Content-Type", "application/json");

  // GET /todos
  if (pathname === "/todos" && method === "GET") {
    res.writeHead(200);
    res.end(JSON.stringify(todos));
  }

  // GET /todos/:id
  else if (pathname.startsWith("/todos/") && method === "GET") {
    const id = parseInt(pathname.split("/")[2]);

    const todo = todos.find((item) => item.id === id);

    if (todo) {
      res.writeHead(200);
      res.end(JSON.stringify(todo));
    } else {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          message: "Todo not found",
        })
      );
    }
  }

  // POST /todos
  else if (pathname === "/todos" && method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        // Validate title
        if (!data.title || typeof data.title !== "string") {
          res.writeHead(400);
          res.end(
            JSON.stringify({
              message: "Title is required and must be a string",
            })
          );
          return;
        }

        const newTodo = {
          id: nextId++,
          title: data.title,
          completed:
            typeof data.completed === "boolean"
              ? data.completed
              : false,
        };

        todos.push(newTodo);

        res.writeHead(201);
        res.end(
          JSON.stringify({
            message: "Todo created successfully",
            todo: newTodo,
          })
        );
      } catch {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            message: "Invalid JSON",
          })
        );
      }
    });
  }

  // PUT /todos/:id
  else if (pathname.startsWith("/todos/") && method === "PUT") {
    const id = parseInt(pathname.split("/")[2]);

    const todo = todos.find((item) => item.id === id);

    if (!todo) {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          message: "Todo not found",
        })
      );
      return;
    }

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        if (!data.title || typeof data.title !== "string") {
          res.writeHead(400);
          res.end(
            JSON.stringify({
              message: "Title is required and must be a string",
            })
          );
          return;
        }

        todo.title = data.title;

        if (typeof data.completed === "boolean") {
          todo.completed = data.completed;
        }

        res.writeHead(200);
        res.end(
          JSON.stringify({
            message: "Todo updated successfully",
            todo,
          })
        );
      } catch {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            message: "Invalid JSON",
          })
        );
      }
    });
  }

  // DELETE /todos/:id
  else if (pathname.startsWith("/todos/") && method === "DELETE") {
    const id = parseInt(pathname.split("/")[2]);

    const index = todos.findIndex((item) => item.id === id);

    if (index === -1) {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          message: "Todo not found",
        })
      );
      return;
    }

    todos.splice(index, 1);

    res.writeHead(200);
    res.end(
      JSON.stringify({
        message: "Todo deleted successfully",
      })
    );
  }

  // Undefined route
  else {
    res.writeHead(404);
    res.end(
      JSON.stringify({
        message: "Route not found",
      })
    );
  }
});

server.listen(PORT, () => {
  console.log(`Todo API running at http://localhost:${PORT}`);
});