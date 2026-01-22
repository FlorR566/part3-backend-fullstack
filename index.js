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
	}

	next(error);
};

morgan.token("body", function input(req, res) {
	return `{"name": "${req.body.name}", "phone": "${req.body.phone}"}`;
});

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>");
});

// app.get("/info", (request, response) => {
// 	const currDate = new Date();
// 	response.send(
// 		`<p>Phonebook has info for ${persons.length} peoples</p>
// 		<p>${currDate}</p>`
// 	);
// });

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

app.post("/api/persons", (request, response) => {
	const body = request.body;

	const missing = !body.name ? "name" : !body.phone ? "phone" : null;

	if (missing) {
		return response.status(404).json({ error: `${missing} missing` });
	}

	const person = new Person({
		name: body.name,
		phone: body.phone,
	});

	person.save().then((savedPerson) => {
		response.json(savedPerson);
	});
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

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
