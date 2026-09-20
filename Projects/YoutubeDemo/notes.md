# Backend Notes

## Chai aur Code — "User and Video Model with Hooks and JWT"

**Current Topic:** User Model + Video Model + Mongoose Hooks + bcrypt + JWT

---

## 1. Big Picture

```
Client → Request → Server/Express → Route → Controller → Database/Model → Response → Client
```

This particular video adds two more pieces on top of that: **protecting passwords** and **connecting Videos to Users**.

Don't try to memorize everything. First understand how data moves.

---

## 2. Schema vs Model

- **Schema** = the blueprint. What fields exist, their type, required or not.
- **Model** = the tool built from that blueprint that actually talks to MongoDB (create, find, update, delete).

```js
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const User = mongoose.model("User", userSchema)
```

Think: **Schema describes it → Model works with it.**

---

## 3. Why Password Hashing?

**NEVER** store a real password directly.

Bad: `password: "renuka123"` — if the database is ever exposed, that password is exposed too.

```
User password → bcrypt → hashed password → MongoDB
```

Stored value looks like: `$2b$10$xxxxxxxxxxxxxxxxxxxxxxxx`

---

## 4. bcrypt

Used to hash a password, and later to check a password — never to "unhash" it.

**Registration:**

```
User enters password → bcrypt hashes it → hash stored in DB
```

**Login:**

```
User enters password → bcrypt compares it with stored hash → match? → login / reject
```

Important: we don't decrypt the stored password. bcrypt compares the entered password with the stored hash.

---

## 5. Mongoose `pre` Hook

Runs automatically **before** an operation — here, before saving a user.

```js
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()   // <-- important
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
```

Flow:

```js

User.save() → pre("save") runs → password gets hashed → user is saved
```

you can design custom methods in mongoose by using methods

```js
userSchema.methods.isPasswordCorrect=async function(password){

}
```

Two things to notice:

- **Regular `function()`, not an arrow function** — because inside the hook, `this` needs to refer to the current document (`this.password`). Arrow functions don't bind `this` that way.
- **`this.isModified("password")`** — only hash the password if it actually changed. Without this check, every time you update *anything* on the user (like their email), the already-hashed password would get hashed again on top of itself, and login would break.

---

## 6. JWT (JSON Web Token)

An identity pass the server hands the client after a successful login.

```
Login → Server verifies email + password → JWT generated → JWT sent to client
```

The client then sends this JWT on every future request to prove who they are.

```
Request + JWT → Server verifies token → Valid? → Allow / Reject
```

---

## 7. Access Token vs Refresh Token

- **Access Token** — sent with each request to access protected data.
- **Refresh Token** — used to get a new access token once the old one expires, without logging in again.

```
Access Token expires → Refresh Token → New Access Token
```
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))" type in console to generate random keyword
Don't go deep into refresh-token architecture yet — just understand *why* it exists.

---

## 8. Authentication vs Authorization

- **Authentication** = "Who are you?" → logging in.
- **Authorization** = "What are you allowed to do?" → e.g. can this user delete this video?

---

## 9. User ↔ Video Relationship (new in this video)

A Video belongs to a User. Instead of copying the entire user's info into every video, MongoDB stores just the user's **ID** as a reference:

## 10. Model → Controller → Route

- **Model** — database structure (User Model, Video Model)
- **Controller** — the actual logic (`registerUser()`, `loginUser()`, `uploadVideo()`)
- **Route** — the URL + HTTP method (`POST /users/register`, `GET /videos/:id`)

```
Route → Controller → Model → Database
```

---

## 11. Middleware — Simple Meaning

Middleware is a checkpoint before the controller runs — like a security check before entering a building.

```
Request → Middleware (checks JWT) → Controller
```

Middleware can check things before the request ever reaches the controller.

---

## 12. Full Flow: Register → Login → Protected Request

**Register:**

```
Client → POST /register → Validate info → Check if user exists
→ Hash password (pre-save hook) → Save user → Response
```

**Login:**

```
Client → POST /login → Find user → Compare password with bcrypt
→ Correct? → Generate JWT → Send token → Client is authenticated
```

**Protected Request (e.g. uploading a video):**

```
Client → Request + JWT → Middleware verifies JWT → Valid?
→ Controller runs → Video saved with owner: userId → Response
```

---

## 13. Core Concepts Checklist

- [ ] Schema vs Model
- [ ] Password hashing (why + bcrypt)
- [ ] `pre("save")` hook + `isModified` check
- [ ] JWT (what + why)
- [ ] Access vs Refresh token
- [ ] Authentication vs Authorization
- [ ] ObjectId reference (Video → User)
- [ ] Middleware

---

## 14. Why It Feels Overwhelming

This one video stacks a lot at once: Node.js + Express + MongoDB + Mongoose + bcrypt + JWT + Middleware + two related models. That's normal to feel heavy.

The full Chai aur Code backend project is a large, production-style app (it also covers likes, comments, subscriptions, file uploads, aggregation pipelines, etc. later). You don't need all of that for your first job — the goal isn't "finish the playlist," it's "understand backend well enough to build and explain a simple API yourself."

Break today's video down like this:

1. What is a Model?
2. Then: What is bcrypt?
3. Then: What is JWT?
4. Then: What is Middleware?
5. Then: How does Video connect to User?
6. Finally: how do they all work together?

---

## 16. Self-Check Questions

Try answering these without scrolling up:

1. What's the difference between a Schema and a Model?
2. Why shouldn't we store a plain password?
3. What does bcrypt actually do (hash vs compare)?
4. What is a `pre("save")` hook, and why check `isModified("password")` inside it?
5. What is JWT, and what's the difference between an access token and a refresh token?
6. What's the difference between authentication and authorization?
7. Why does a Video document store a User's ObjectId instead of the whole user?
8. Why is middleware needed for protected routes?

If you can answer these in your own words, this section's foundation is solid — move on.

---
