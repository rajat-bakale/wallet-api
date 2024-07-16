# Wallet API

This project is a fully functional wallet API built with Node.js and MongoDB. It features JWT token-based session management, email verification, login with password, fake balance on signup, transfer functionality, and email notifications.

## Features

- User registration with email verification
- User login with password
- JWT token-based session management
- Fake balance assigned on signup
- Transfer functionality between users
- Email notifications for various events
- Transaction history

## Deployment

### Render Deployment

The API is deployed on Render. You can access it here https://wallet-api-x5wq.onrender.com/

### Postman Documentation 

https://documenter.getpostman.com/view/36984655/2sA3kPq59J

## Prerequisites
   - Node.js v12 or higher
   - MongoDB

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/rajat-bakale/wallet-api.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Wallet-API
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```bash
    PORT=3000
    JWT_SECRET=your_jwt_secret
    EMAIL_HOST=smtp.your-email.com
    EMAIL_PORT=587
    EMAIL_USER=your-email@example.com
    EMAIL_PASS=your-email-password
    MONGODB_URI=mongodb+srv://<username>:<password>@<clustername>.mongodb.net/<dbname>?retryWrites=true&w=majority
    ```

5. Start the server:

    ```bash
    nodemon
    ```

    The server should be running on `http://localhost:3000`.

## API Endpoints 

### Register a New User
    To register a new user, send a `POST` request to `/api/user/register` with the following JSON payload:

```json
{
  "name": "Rajat",
  "email": "rajat@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "tc": true
}
```

### Login

To login, send a `POST` request to `/api/user/login` with the following JSON payload:

```json
{
    "email": "rajat@example.com",
    "password": "password123"
}
```

If the login is successful, you will receive a JWT token in the response.

## Authentication

This API uses JWT for authentication. Include the JWT token in the `Authorization` header of requests to protected routes.

Example:

```http
Authorization: Bearer your_jwt_token
```

## Contributing

Contributions are welcome! Please create a pull request or open an issue to discuss your changes.

## License

This project is licensed under the MIT License.

## Screenshots

![user_registration](https://github.com/user-attachments/assets/e355a2e7-ed7f-4d81-9621-83a7620cdc66)
![welcome_mail](https://github.com/user-attachments/assets/1c6cdda1-b37b-4174-9314-cd97d8f1d8e2)
![user_login](https://github.com/user-attachments/assets/b9d54267-afc2-490c-8fed-886186ffa574)
![transfer amount](https://github.com/user-attachments/assets/4c1e5ffd-1e56-4749-bbf5-b9f7335bd81a)
![transaction_successful_mail](https://github.com/user-attachments/assets/81fabb8a-f233-420e-8cce-b80ad9379933)
![transaction history](https://github.com/user-attachments/assets/dd46fe79-1336-4c35-bd14-3311ca8bca9a)
![logged user info](https://github.com/user-attachments/assets/ec351701-a228-4c1d-903c-bdba0d884cb2)
![Render](https://github.com/user-attachments/assets/339bd8b6-e45a-4a76-8ebe-c08cbf02f80c)


