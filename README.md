# Part 3.20 – Phonebook: Custom Validation

## Exercise goal

The goal of this exercise is to implement complex validation rules for phone numbers. Since standard Mongoose validators (like `minLength`) aren't enough to check for specific formats (like the presence of a hyphen), we implement a **custom validator**.

Key technical objectives:

<ul> 
   <li>
      Ensure phone numbers have a minimum length of 8 characters.
   </li> 
   <li>
      Validate that the phone number follows the format: <b>2 or 3 digits, a hyphen, and more digits</b> (e.g., <code>09-1234556</code> or <code>040-223344</code>).
   </li>
   <li>
      Return a clear, user-friendly error message when validation fails.
   </li> 
</ul>
