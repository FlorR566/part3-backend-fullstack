# Part 3.14 – Phonebook integration with MongoDB (Full Stack Open)

## Exercise goal

In this exercise, the backend is expanded to support **data persistence** when creating new entries.
The applicaction no longer relies on local momory; instead, every new person added via the frontend is stores permanently in **MongoDB Atlas**.

The main goals are:

<ul> 
   <li>
   Implement the <b>POST</b> route to save new entries to the database.
   </li> 
   <li>
   Handle asynchronous operations using Mongoose <b>Promises </b> (<code>.then()</code>).
   </li>
   <li>
   Ensure that data us correctly validated on the server side before being saved.</li>
   <li>
   Verify that new entries persist even after restarting the backend server.
   </li> 
</ul>

## Implementation Details

When a `POST` request is received at /api/persons, the server creates a new instance of the `Person` model and saves it:

```
const person = new Person({
  name: body.name,
  phone: body.phone,
});

person.save().then(savedPerson => {
  response.json(savedPerson);
});
```

## Server-side Validation

Basic validation was implemented to prevent saving incomplete data. If the `name` or `phone` fields are missing, the server with a `400 Bad Request` status code.
