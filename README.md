# Part 3.12 – Phonebook with MongoDB (Full Stack Open)

## Exercise goal

In this exercise, the Phonebook application is migrated so that data is no longer stored in memory, but in **MongoDB**, using **MongoDB** **Atlas** and **Mongoose**.

The main goals are:

<ul>
   <li>
   Use a dedicated database for the Phonebook application.
   </li>
   <li>
   Connect a Node.js application to MongoDB Atlas.
   </li>
   <li>
   Define a schema and a model using Mongoose.
   </li>
   <li>
   Store and retrieve data from MongoDB.
   </li>
</ul>

## Conecting to MongoDB Atlas

The conection is done using a MongoDB Atlas connection URI, explicitly defining the database name:

```
mongodb+srv://fullstack:<password>@cluster0.sminnmi.mongodb.net/phonebookApp?retryWrites=true&w=majority
```

###

`fullstack` : database user

`<password>` : password passed via the terminal or environment variables

`phonebookApp` : database used by the application

## Schema (Mongoose)

The schema defines the structure of the documents in the `persons` collection:

```
   const personSchema = new mongoose.Schema({
      name: String,
      number: String,
   });
```

## Model

The model is used to interact with collection from the aplication code:

```
const Person = mongoose.model('Person', personSchema);
```

Using the model, it is possible to:

<ul>
   <li>
   Create new documents
   </li>
   <li>
   Save data to MongoDB
   </li>
   <li>
   Query existing fata
   </li>
   <li>
   Delete documents
   </li>
</ul>

## Testing with scripts

Before integrating MongoDB into the Express backend, a separate script can be used to:

1. Connect to the phonebookApp database.

2. Create a test document.

3. Save it to the persons collection.

4. Close the database connection.

This approach helps verify that the MongoDB connection and the Mongoose model work correctly before moving on.
