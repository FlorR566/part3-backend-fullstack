# Part 3.18 – Phonebook: Database Integration

## Exercise goal

The goal of this exercise is to complete the migration to MongoDB by updating the remaining endpoints. The application now fetches all data dynamically from the database, including metadata for the information page.

Key technical objectives:

<ul> 
   <li>
      Update the <code>/info</code> orut to count documents directly from the database.
   </li> 
   <li>
      Refactor the <code>GET /api/persons/:id</code> route to use Mongoose's <code>findByID</code>.
   </li>
   <li>
      Ensure all routes use the centralized error handler for failed database operations.
   </li> 
</ul>

## The infot route

Instead of using a local array length, we use the `countDocuments()` method. This is more efficient as it performs the counting on the database side.

## Testing and Verification using Postman

<ul> 
   <li>
      <b>Dynamic Counting:</b> Verified via <code>/info</code> that the number of people displayed updates automatically when a new person is added or deleted from MongoDB Atlas. 
   </li> 
   <li>
      <b>Specific Resource Retrieval:</b> Confirmed that <code>GET /api/persons/:id</code> correctly retrieves a single contact from the database and returns a <code>404</code> if the ID exists but isn't found, or <code>400</code> if the ID format is invalid. 
   </li> 
   <li>
      <b>Resilience:</b> Verified that the <code>catch(error => next(error))</code> block correctly forwards database connection timeouts or query errors to the centralized middleware. 
   </li> 
</ul>
