start frontend: npm start
start backend: npm run dev

# Project Era-Echoes
Era-Echoes is an app where users can review restaurants.

### Setup
First, you'll need a Postgres database to connect to. Follow instructions here to setup the database and save credentials for the next step.

Next create a `.env` file inside of `backend`. It will need to contain the following environment variables (change the values for the database to match what you defined in the previous step)
```
PORT=3000
DB_USERNAME=era_echos_user
DB_PASSWORD=password
DB_DATABASE=era_echoes_auth
```

Next `cd` into `backend` and run `npm install` to install dependencies for the API.

Next, `cd` into `frontend`, and run `npm install` to install dependencies for the React app.

Finally, in separate terminals, run `npm start` in each folder so that the API and React app are running at the same time.

### API (http://localhost:3000)
| Method | Path                                 | Purpose                                   |
| ------ | ------------------------------------ | ----------------------------------------- |
| GET    | /                                    | Home page                                 |
| GET    | /capsules                              | Capsules index page                         |
| POST   | /capsules                              | Create new capsule                          |
| GET    | /capsules/:capsuleId                     | Details about a particular capsule          |
| PUT    | /capsules/:capsuleId                     | Update a particular capsule                 |
| DELETE | /capsules/:capsuleId                     | Delete a particular capsule                 |
| POST   | /capsules/:capsuleId/comments            | Create a comment about a particular capsule |
| DELETE | /capsules/:capsuleId/comments/:commentId | Delete a comment about a particular capsule |


### App (http://localhost:3000)
| Path                  | Component                 | Purpose                                                                         |
| --------------------- | ------------------------- | ------------------------------------------------------------------------------- |
| /                     | `Home.js`                 | Home page                                                                       |
| /sign-up              | `users/SignUpForm.js`     | Form for creating a new user                                                    |
| /capsules               | `capsules/CapsuleIndex.js`    | List of capsules                                                                  |
| /capsules/new           | `capsules/NewCapsuleForm.js`  | Form for creating a new capsule                                                   |
| /capsules/:capsuleId      | `capsules/CapsuleDetails.js`  | Details of a capsule, including it's comments, and a form to create a new comment |
| /capsules/:capsuleId/edit | `capsules/EditCapsuleForm.js` | Form for editing a capsule                                                        |