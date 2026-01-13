const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

const password = process.argv[2];

const name = process.argv[3];

const phone = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.sminnmi.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

// Conexión a la base
mongoose.connect(url);

// Definición del schema
const personSchema = new mongoose.Schema({
	name: String,
	phone: String,
});

// Crear el modelo (clase que representa una colección)
const Person = mongoose.model("Person", personSchema);

//Crear objetos
const person = new Person({
	name: name,
	phone: phone,
});

// Guardar objetos en la base
person.save().then((result) => {
	console.log(`Added ${name} number ${phone} to phonebook!`);
	mongoose.connection.close();
});
