// Importar Mongoose
const mongoose = require("mongoose");

// Forma simple y segura de no hardcodear credenciales
if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

// Obtener la password
const password = process.argv[2];

// Obtener name
const name = process.argv[3];

// obtener phone
const phone = process.argv[4];

// URI de conexión a MongoDB Atlas
const url = `mongodb+srv://fullstack:${password}@cluster0.sminnmi.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

// Configuración de Mongoose
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
