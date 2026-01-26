# Part 3.20 - 3.21 – Phonebook: Validation, Production Deployment &

## Exercise goal

The goal of these exercises is to finalize the application by enforcing strict data validation and ensuring the entire Full Stack project is accessible in a production environment (Render).

Key technical objectives:

<ul> 
   <li>
      Ensure phone numbers have a minimum length of 8 characters.
   </li> 
   <li>
      <code>Custom Phone Validation:</code> Implement a regex-based validator for complex phone number formats. Validate that the phone number follows the format: <b>2 or 3 digits, a hyphen, and more digits</b> (e.g., <code>09-1234556</code> or <code>040-223344</code>).
   </li>
   <li>
      <code>Frontend Error Handling:</code> Update the UI to display specific error messages returned by Mongoose validations.
   </li> 
   <li>
      <code>Production Build:</code> Deploy the integrated frontend and backend to Render.
   </li> 
</ul>

## Code Quality & Linting

To maintain clean and consistent code across the backend, **ESLint** was integrated using the latest **Flat Config** format.

Key configurations implemented:

- **Style Enforcement:** Used `@stylistic/eslint-plugin-js` to ensure 2-space indentation, single quotes, and no semicolons.
- **Error Prevention:** Enforced strict equality (`===`) and identified unused variables.
- **Build Integration:** The linting process is mandatory before deployment to ensure no stylistic errors reach production.

Commands:

- `npm run lint`: Runs the linter to check for style issues.
- `npx eslint . --fix`: Automatically fixes most stylistic inconsistencies (indentation, quotes, etc.).

## Deployment & Verification

Production URL: https://part3-phonebook-backend-hle2.onrender.com/

<ul> 
   <li>
     Integrated Build: The frontend was built and copied to the backend's <code>dist</code> folder to serve both from a single origin.
   </li> 
   <li>
      Validation Testing: 
   </li>
      <ul> 
         <li>
            Success: Numbers like <code>09-1234556</code> are saved correctly.
         </li>
         <li>
            Failure: Numbers like <code>123456</code> or <code>1-223344</code> trigger a <code>400 Bad Request</code> and show an alert in the UI.
         </li> 
      </ul>
</ul>
