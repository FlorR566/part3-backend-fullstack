# Part 3.17 – Phonebook: Update operation

## Exercise goal

The goal of this exercise is to implement the **update functionality** for the phonebook. This allows users to modify the phone number of an existing contact using a HTTP `PUT` request.

Key technical objectives:

<ul> 
   <li>
      Integrate the <code>findByIdAndUpdate</code> method from Mongoose.
   </li> 
   <li>
      Ensure the updated document is returned in the response.
   </li>
   <li>
      Maintain centralized error handling for the update route.
   </li> 
</ul>

## Implementation Details

The `PUT` route was implemented to handle updates based on the contact's ID.A crucial part of this implementation was using the `{ new: true }` parameter.

## Testing and Verification using Postman

<ul>
   <li><b>Postman Validation:</b> Verified that sending a <code>PUT</code> request to <code>/api/persons/:id</code> with a new number correctly updates the entry in MongoDB Atlas. 
   </li>
   <li><b>Error Handling Integration:</b> Confirmed that if an update is attempted with a malformed ID, the <b>Error Handler Middleware</b> (implemented in 3.16) correctly catches the <code>CastError</code> and returns a <code>400 Bad Request</code>. 
   </li>
   <li><b>Data Consistency:</b> Confirmed the frontend receives the updated JSON object immediately after the request, ensuring the UI stays in sync with the database. 
   </li> 
</ul>
