require("dotenv").config(); // 1. siempre arriba de todo (configuración de ambiente)

const express = require("express"); // 2. librerías de terceros
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person"); // 3. mis propios modelos

const app = express(); // 4. la inicialización de la app

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(
	morgan(function (tokens, req, res) {
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, "content-length"),
			"-",
			tokens["response-time"](req, res),
			"ms",
			tokens.method(req, res) == "POST" ? tokens.body(req, res) : null,
		].join(" ");
	}),
);

const errorHandler = (error, request, response, next) => {
	console.log(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

morgan.token("body", function input(req, res) {
	return `{"name": "${req.body.name}", "phone": "${req.body.phone}"}`;
});

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response, next) => {
	const currDate = new Date();

	Person.countDocuments({}, { hint: "_id_" })
		.then((totalPersons) => {
			response.send(
				`<p>Phonebook has info for ${totalPersons} persons</p>
		<p>${currDate}</p>`,
			);
		})
		.catch((error) => next(error));
});

app.get("/api/persons", (request, response) => {
	Person.find({}).then((persons) => {
		response.json(persons);
	});
});

app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person);
			} else {
				response.status(400).end();
			}
		})
		.catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
	const body = request.body;

	const missing = !body.name ? "name" : !body.phone ? "phone" : null;

	if (missing) {
		return response.status(400).json({ error: `${missing} missing` });
	}

	const person = new Person({
		name: body.name,
		phone: body.phone,
	});

	person
		.save()
		.then((savedPerson) => {
			response.json(savedPerson);
		})
		.catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
	const { name, phone } = request.body;

	Person.findByIdAndUpdate(
		request.params.id,
		{ name, phone },
		{ new: true, runValidators: true, context: "query" },
	)
		.then((updatedPerson) => {
			if (updatedPerson) {
				response.json(updatedPerson);
			} else {
				// Si no existe devolvemos 404 explícito
				response
					.status(404)
					.send({ error: "This person has already been deleted" });
			}
		})
		.catch((error) => next(error)); // errores de validación (400)
});

app.delete("/api/persons/:id", (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then((result) => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

// controlador de solicitudes con endpoint desconocido
app.use(unknownEndpoint);
// controlador de solicitudes que resulten en errores (siempre debe ser el último middleware cargado, también todas las rutas se deben cargar antes)
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
