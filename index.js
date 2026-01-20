require("dotenv").config();

const express = require("express");
const app = express();
// Importamos el módulo
const Note = require("./models/note");
const cors = require("cors");

let notes = [];

const requestLogger = (request, response, next) => {
	console.log("Method: ", request.method);
	console.log("Path: ", request.path);
	console.log("Body: ", request.body);
	console.log("---");
	next();
};

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(requestLogger);

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
	Note.find({}).then((notes) => {
		response.json(notes);
	});
});

app.get("/api/notes/:id", (request, response, next) => {
	Note.findById(request.params.id)
		.then((note) => {
			if (note) {
				response.json(note);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});

app.post("/api/notes", (request, response) => {
	const body = request.body;

	if (body.content === undefined) {
		return response.status(400).json({
			error: "content missing",
		});
	}

	const note = new Note({
		content: body.content,
		important: body.important || false,
	});

	note.save().then((savedNote) => {
		response.json(savedNote);
	});
});

app.delete("/api/notes/:id", (request, response) => {
	const id = Number(request.params.id);
	notes = notes.filter((note) => note.id !== id);

	response.status(204).end();
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

// controlador de solicitudes con endpoint desconocido
app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

const errorHandler = (error, request, response, next) => {
	console.log(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	}

	next(error);
};

// controlador de solicitudes que resulten en errores
// este debe ser el último middleware cargado, ¡también todas las rutas deben ser registradas antes que esto!
app.use(errorHandler);
