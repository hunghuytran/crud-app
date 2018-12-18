## what is the crud-auth application?

> A CRUD backend application. The app includes an authentication system.

----
## Setup
###Mongodb
Setting up the application requires a [mongodb](https://www.mongodb.com/) database. This can be done by either installing the database locally or using [mlab](https://mlab.com/), which allows the user to create a database for free.

For flexiblity, we will only go through how to create a free mongodb database on mlab.

**steps:**

1. Go to [mlab](https://mlab.com/) > Create an account > Login.
2. Press on create new, far to the right of MongoDB Deployments.
3. Choose **Sandbox (Free)** and finish creating the database.
4. Open your newly created database once it is finished.
5. Press on Users tab and create your database user.
6. Copy the url below **"To connect using a driver via the standard MongoDB URI"**. Paste and replace the **DB_URL** in **/blog-node-api/.env** .
7. Replace the **<dbuser>** and **<dbpassword>** with your database user information.
8. Save the file.

#### Package installation

In order for the application to work, you will have to install all the required nodules modules.

**Prerequirements:**

* [npm](https://www.npmjs.com)
* linux / mac terminal commands.

** To install:**
    
    cd /blog-node-api
    npm install

----
## Run
#### Server

Start the backend server by typing the following command inside the project folder:

    npm start

**Important!**

######Test will not work if the server is still active.

#### Test

Test the api endpoints by typing the following command inside the project folder:

    npm test

## Manual testing

**Requirements**

* Run Server
* Create a user dummy by removing commented section in **/blog-node-api/server.js**.

There are 6 api endpoints in total. Each one of them will be explained below in this section. Recommended app for testing manually:

** [Postman](https://www.getpostman.com)**

#### Sign in
Use post method and send username and password in JSON format for authentication.

Example:

**{
"username":"<user>"
"password":"<pass>"
}** 

    localhost:8081/auth/signin

A token, which is used for authentication, returns to the user after completion.

#### Sign out
Use delete method and send token as parameter to sign out.

Example:

    localhost:8081/auth/signout/:token

#### Create post
Use post method and send title and contents in JSON format for creating post. Token is required as parameter.

Example:

**{
"title":"<title>"
"contents":"<contents>"
}** 

    localhost:8081/api/posts/:token

#### Get all posts
Use get method to read all posts. Token is required as parameter.


    localhost:8081/api/posts/:token

#### Update a post
Use put method and send title and contents in JSON format for updating a post. Post ID and token are required as parameters. Post ID can be obtained through **Get all posts*

Example:

**{
"title":"<newTitle>"
"contents":"<newContents>"
}** 

    localhost:8081/api/posts/:id/:token

#### Delete a post
Use delete method for deleting a post. Post ID and token are required as parameters. 

    localhost:8081/api/posts/:id/:token

**IMPORTANT! PORT CAN BE DIFFERENT DEPENDING ON .env settings!**