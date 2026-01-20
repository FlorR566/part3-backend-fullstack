# Part 3.16 – Phonebook: Centralized Error Handling

## Exercise goal

The goal of this exercise is to refactor the application by moving all error handling logic into a dedicated **middleware**.
This improves code maintainability and ensures a consistent response format for different types of errors across all routes.

The main goals are:

<ul> 
   <li>
   Remove inline error handling from individual route handlers.
   </li> 
   <li>
      Implement a custom <b>error handler middleware</b> to manage specific errors like <code>CastError</code> (malformed IDs) or validation errors.
   </li>
   <li>
   Use the <code>next(error)</code> function to pass exceptions from promises to the centralized middleware. 
   </li> 
</ul>

## Implementation Details

The routes are now cleaner as they no longer need to define how to respond to an error. They simply "pass the ball" to the next middleware.

## Testing with Postman

<ul> 
   <li>
   <b>Postman:</b> Used Postman to trigger different error scenarios (like searching for a non-existent ID format) and verified that the server responds with the correct JSON error message and status code. 
   </li> 
   <li>
      <b>Code Quality:</b> This refactor follows the "Don't Repeat Yourself" (DRY) principle, making the backend more robust and easier to scale as more models or routes are added. 
   </li>
</ul>
