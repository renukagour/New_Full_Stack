# My Notes

## Package installed

1. nodemon
2. prettier
3. dotenv
4. express
5. mongoose
6. cookie-parser
7. cors - for cross origin sharing to connect fronted and backend
8. mongoose-aggregate-paginate-v2 -for mongoDB aggregation
9. bcryptjs - help to hash password
10. jsonwebtoken -jwt -make tokens to see demo go on jwt.io
11. multer — handles file uploads from the client (grabs the incoming file from the request)
12. cloudinary — cloud storage for those files. Multer catches the file locally/temporarily, then you upload it to      Cloudinary to get a permanent URL to store in MongoDB (e.g. avatar: "<https://res.cloudinary.com/>...").

## Project Setup

"dev": "nodemon src/index.js"
add this in scripts tag in package.json file and type npm run dev to start server
created file named jsconfig.json with content {
    "compilerOptions": {
        "module": "ESNext",
        "target": "ES2020",
        "moduleResolution": "node"
    },
    "exclude": [
        "node_modules"
    ]
}
 to show suggestion while using import

## caution

Always Use try catch when deal with DB
we want when app load the .env file variables everywhere in program so use
import dotenv from 'dotenv'
dotenv.config({ path:'./.env'})
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
search for BSONS
In models index:true if you want searchable more optimize
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))" type in console to generate random keyword
you can design custom methods in mongoose by using methods

```js
userSchema.methods.isPasswordCorrect=async function(password){

}
```

Access Token- short lived
Refresh Token- long lived - session storage - if access token expired user get 401 bad request so server give one end point where user can refresh access token and give refresh token and server check this refresh token and DB refresh token are same if same start session means allowed
