# decentralism-server
The simple server create to interact with decentralism frontend code

## How to install
- run `db.sql` in the project root directory.
- Edit `db.js` to gear with your own db credentials. 
- Install server with the following command
```bash
npm install
```
Since the server is now in development phase, everything are setup for not blocking development life cycle, all the security features are disabled at this time.

## How to start
```bash
node index.js
```
## How to interact with the Server
Server is running on port 3579, right now there are two endpoints that are enabled to accept request from frontend side. All endpoints are designed under REST API standard.

`register` endpoint that is used to register player's email address. Accept `PUT`, `POST` and `GET` methods.

`code` endpoint to generate code to each player. It supports `GET` and `POST` methods.

## Sample of API call

Register a new player with email address associated.
```
PUT /register HTTP/1.1
Host: localhost:3579
Content-Type: application/json
Cache-Control: no-cache

{
	"addr": "aaabbd",
	"email" : "aaabbb@email.com"
}
```
You will get response back as below.
```
{
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "",
    "protocol41": true,
    "changedRows": 0
}
```
>Note: this response is directly from DB, will change with appending more useful message later.

Update a player's email address
```
POST /register HTTP/1.1
Host: localhost:3579
Content-Type: application/json
Cache-Control: no-cache

{
	"addr": "aaabbd",
	"email" : "aaabbd1@email.com"
}
```
The response returned is
```
{
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
    "protocol41": true,
    "changedRows": 1
}
```
>Note: Ditto.

Get a registered player's email
```
GET /register/aaabbd HTTP/1.1
Host: localhost:3579
Content-Type: application/json
Cache-Control: no-cache
```
The response returned is
```
{
    "address": "aaabbd",
    "code": null,
    "email": "aaabbd1@email.com"
}
```

>Node: It's a bit weird that calling an register endpoint to get a user information. Might change in the future.

Generate a referCode to a player
```
POST /code HTTP/1.1
Host: localhost:3579
Content-Type: application/json
Cache-Control: no-cache

{
	"addr": "aaabbd"
}
```
Then the response is
```
{
    "referCode": "yy3pca"
}
```

Get a player's referCode
```
GET /code/aaabbd HTTP/1.1
Host: localhost:3579
Content-Type: application/json
Cache-Control: no-cache
```
Response
```
{
    "address": "aaabbd",
    "code": "yy3pca",
    "email": "aaabbd1@email.com"
}
```
