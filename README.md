# Part 3.15 – Phonebook: Deleting entries from MongoDB

## Exercise goal

In this exercise, the application's CRUD functionality is further expanded by implementing **persistent deletion**.
Instead of filtering a local array, the backend now communicates with **MongoDB Atlas** to remove specific entries permanently.

The main goals are:

<ul> 
   <li>
   Implement the <b>DELETE</b> route using Mongoose's <code>findByIdAndDelete</code> method. 
   </li> 
   <li>
      Integrate centralized <b>error handling</b> to manage malformed IDs during deletion.
   </li>
   <li>
   Verify API behavior and status codes using <b>Postman</b> before connecting the frontend.
   </li> 
</ul>

## Implementation Details

When a `DELETE` request is sent to `/api/persons/:id`, the server uses the ID from the request parameters to find and remove the document.

```
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});
```

## Testing with Postman

To ensure the backend works correctly before integrating it with the React frontend, I used **Postman** to simulate requests:

<ul> 
   <li>
   <b>Successful Deletion:</b> Verified that a valid ID returns a <code>204 No Content</code> status. 
   </li> 
   <li>
      <b>Error Handling:</b> Tested with malformed IDs to ensure the <code>errorHandler</code> middleware catches the exception and returns a <code>404 Bad Request</code> with the message "malformatted id".
   </li>
</ul>
