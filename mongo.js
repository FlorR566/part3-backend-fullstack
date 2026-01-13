const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("Error: Plase provide the password as an argument");
	process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.sminnmi.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

// Definición del schema
const personSchema = new mongoose.Schema({
	name: String,
	phone: String,
});
// Crear el modelo (clase que representa una colección)
const Person = mongoose.model("Person", personSchema);

const run = async () => {
	try {
		// Conexión a la base
		await mongoose.connect(url);

		if (process.argv.length === 3) {
			// Obtener objetos de la DB
			Person.find({}).then((result) => {
				console.log("Phonebook:");
				result.forEach((person) => {
					console.log(`${person.name} ${person.phone}`);
				});
				mongoose.connection.close();
			});
		} else if (process.argv.length >= 5) {
			const name = process.argv[3];
			const phone = process.argv[4];

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
		}
	} catch (err) {
		console.log("Database error: ", err.message);
		process.exit(1);
	}
};

run();
