# Part 3.19 – Phonebook: Validation and Error Handling

## Exercise goal

The objective is to ensure data integrity by adding rules to the Mongoose Schema and handling validation errors in the backend. This prevents saving "garbage" data (like empty names or very short entries) to the database.

Key technical objectives:

<ul> 
   <li>
      Use <b>Mongoose validation</b> {required, minLength}.
   </li> 
   <li>
      Expand the <b>centralized error handler</b> to catch <code>ValidationError</code>.
   </li>
   <li>
      Ensure validation also run during <b>updates</b> (<code>PUT</code> requests)
   </li> 
</ul>

## Implementation Details

#### Schema Rules

In `models/person.js`, the schema now defines specific constraints.

```
const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true,
	},
	phone: { type: String, required: true },
});
```

#### Enforcing Rules on Update

By default Mongoose doesn't validate on `findByIdAndUpdate`. We fixed this by adding the `runValidators` option:

```
{ new: true, runValidators: true, context: "query" },
```

## Testing and Verification

<ul> 
   <li>
      <b>POST Validation:</b> Verified that trying to save a name shorter than 3 characters returns a <code>400 Bad Request</code> with a descriptive error message.
   </li> 
   <li>
      <b>PUT Validation:</b> Confirmed that updating an existing entry with invalid data is now blocked by the server.
   </li> 
   <li>
      <b>Error Middleware:</b> The <code>errorHandler</code> now correctly identifies <code>ValidationError</code> and sends the appropriate response to the frontend. 
   </li> 
</ul>
