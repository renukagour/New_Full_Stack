# My Notes

## Package installed

1. nodemon
2. prettier
3. dotenv
4. express
5. mongoose

## Project Setup

"dev": "nodemon src/index.js"
add this in scripts tag in package.json file and type npm run dev to start server

## caution

Always Use try catch when deal with DB
we want when app load the .env file variables everywhere in program so use
import dotenv from 'dotenv'
dotenv.config({ path:'./env'}) //it not working in my app dont use path
