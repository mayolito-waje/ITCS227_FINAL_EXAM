# Final Exam - ITCS227LA

My E-Commerce API for my final exam. It uses modern practices to ensure that the API is secured.

## Additional Features:

- Uses `bcryptjs` to generate salts and hash passwords. It is **BAD** practice to store passwords directly to database.
- Uses `jsonwebtoken` to protect some API routes for better security. There are routes that cannot be accessed by non-admins and also by admins. This is done through token authentication.
- Hides mongoDB cloud access through the use of environment variables.
- Properly structured folders to organize the routes, controllers, models, middlewares, utilities, etc.

## API Endpoints

| **API Endpoints**           | **Usage**                                                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `POST /users`               | Register user to the database. Return user detail with bearer token.                                                  |
| `POST /users/login`         | Login user and retrieve token.                                                                                        |
| `POST /products`            | Create new product.                                                                                                   |
| `GET /products`             | Retrieve all active products (`product.isActive == true`).                                                            |
| `GET /products/:id`         | Retrieve product by id.                                                                                               |
| `PUT /products/:id`         | Update product by id. Only active products can be updated.                                                            |
| `PUT /products/:id/archive` | Archive a product (deactivate).                                                                                       |
| `POST /users/orders`        | Create new order (only for NON-admins).                                                                               |
| `GET /users/orders`         | Retrieve orders. If admin, retrieve all orders on database. If non-admin, retrieve only orders made by the non-admin. |
| `GET /users/orders/:id`     | Retrieve order by id. Only return the order if requested by the one who created the order or if the user is an admin. |
| `DELETE /users/orders/:id`  | Delete an order. You can only delete it if you are the one who created the order.                                     |
