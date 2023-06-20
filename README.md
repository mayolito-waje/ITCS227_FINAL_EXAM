# Final Exam - ITCS227LA

My E-Commerce API for my final exam. It uses modern practices to ensure that the API is secured.

## Additional Features:

- Uses bcryptjs to generate salts and hash passwords. It is **BAD** practice to store passwords directly to database.
- Uses `jsonwebtoken` to protect some API routes for better security. There are routes that cannot be accessed by non-admins and also by admins. This is done through token authentication.
- Hides mongoDB cloud access through the use of environment variables.
- Properly structured folders to organize the routes, controllers, models, middlewares, utilities, etc.
