require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		phone: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		phone: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		phone: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		phone: "39-23-6423122",
	},
];

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
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
	})
);

morgan.token("body", function input(req, res) {
	return `{"name": "${req.body.name}", "phone": "${req.body.phone}"}`;
});

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
	const currDate = new Date();
	response.send(
		`<p>Phonebook has info for ${persons.length} peoples</p>
		<p>${currDate}</p>`
	);
});

app.get("/api/persons", (request, response) => {
	response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find((person) => person.id === id);

	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

const generateId = () => {
	const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
	return maxId + 1;
};

app.post("/api/persons", (request, response) => {
	const body = request.body;

	const missing = !body.name ? "name" : !body.phone ? "phone" : null;

	if (missing) {
		return response.status(404).json({ error: `${missing} missing` });
	}

	const existName = persons.some((p) => p.name === body.name);

	if (existName) {
		return response.status(404).json({ error: "Name must be unique." });
	}

	const person = {
		name: body.name,
		phone: body.phone,
		id: generateId(),
	};

	persons = persons.concat(person);

	response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((person) => person.id !== id);

	response.status(204).end();
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
