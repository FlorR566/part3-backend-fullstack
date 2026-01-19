# Part 3.14 – Phonebook integration with MongoDB (Full Stack Open)

## Exercise goal

In this exercise, the Phonebook application is refactored to fully integrate **MongoDB** into the Express backend.
The main focus is moving database logic into its **own module** and managing sensitive information securely using **environment variables**.

The main goals are:

<ul> 
   <li>
   Move the database configuration and the Mongoose model into a separate <b>module</b>.
   </li> 
   <li>
   Use <b>environment variables</b> (<code>dotenv</code>) to store sensitive information like the connection URI.
   </li>
   <li>
   Configure the backend to serve data directly from MongoDB Atlas to the frontend.</li>
   <li>
   Format the database response (<code>toJSON</code>) to match the frontend's requirements.
   </li> 
</ul>

## Environment Variables (.env)

The avoid hardcoding credentials in the code, a `.env` file is used. This file is included in .gitignore to keep it out of version control.

```
MONGODB_URI=mongodb+srv://fullstack:<password>@cluster0.sminnmi.mongodb.net/phonebookApp?retryWrites=true&w=majority

PORT=3001
```
