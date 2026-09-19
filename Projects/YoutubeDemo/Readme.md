# My Notes

## Package installed

1. nodemon
2. prettier
3. dotenv
4. express
5. mongoose
6. cookie-parser
7. cors - for cross origin sharing to connect fronted and backend

## Project Setup

"dev": "nodemon src/index.js"
add this in scripts tag in package.json file and type npm run dev to start server

## caution

Always Use try catch when deal with DB
we want when app load the .env file variables everywhere in program so use
import dotenv from 'dotenv'
dotenv.config({ path:'./env'}) //it not working in my app dont use path
CORS_ORIGIN=* //all allowed
origin:process.env.CORS_ORIGIN,
credentials:true
this is used in production level while using cors
cookie-parser used for CRUD operation of cookies like set or access cookie from user browser


## Tips and Info
HTTP StatusCode
Informational responses (100 - 199)
Successful responses (200 - 299)
Redirection messages (300 - 399)
Client error responses (400 - 499)
Server error responses (500 - 599)