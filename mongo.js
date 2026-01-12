// Importar Mongoose
const mongoose = require("mongoose");

// Forma simple y segura de no hardcodear credenciales
if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

// Obtener la password
const password = process.argv[2];

// URI de conexión a MongoDB Atlas
const url = `mongodb+srv://fullstack:${password}@cluster0.sminnmi.mongodb.net/noteApp?retryWrites=true&w=majority`;

// Configuración de Mongoose
mongoose.set("strictQuery", false);

// Conexión a la base
mongoose.connect(url);

// Definición del schema
const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean,
});

// Crear el modelo (clase que representa una colección)
const Note = mongoose.model("Note", noteSchema);

// //Crear objetos
// const note = new Note({
// 	content: "Mongoose makes things easy",
// 	important: true,
// });

// // Guardar objetos en la base
// note.save().then((result) => {
// 	console.log("note saved!");
// 	mongoose.connection.close();
// });

// Obtener objetos de la DB
Note.find({}).then((result) => {
	result.forEach((note) => {
		console.log(note);
	});
	mongoose.connection.close();
});

// // Restringir la búsqueda para encontrar sólo notas importantes
// Note.find({ important: true }).then((result) => {
// 	result.forEach((note) => {
// 		console.log(note);
// 	});
// 	mongoose.connection.close();
// });
