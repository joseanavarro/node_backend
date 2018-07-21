
# Install de app

git clone

npm install

# Run the app

DEBUG=api1:* npm start

# Basic authentication

Same username and password as 'name' in 'clients' list of company clients

for exaple:

username = Manning
password = Manning

# Available operations

Get user data filtered by user id:
http://SERVER/client/id/:clientId

For example: http://localhost:3000/client/id/55601290-8619-4f54-b831-9c6c26c52b44

--> avalible for 'user' and 'admin' roles

-----------------------------------------------------------------------------------------------------
Get user data filtered by user name:
http://SERVER/client/name/:userName

For example: http://localhost:3000/client/name/Manning

--> avalible for 'user' and 'admin' roles

-----------------------------------------------------------------------------------------------------
Get the list of policies linked to a user name:
http://SERVER/policy/name/:userName

For example: http://localhost:3000/policy/name/Manning

--> avalible for 'admin' role

-----------------------------------------------------------------------------------------------------
Get the user linked to a policy number:
http://SERVER/policy/id/:policyNumber

for example:  http://localhost:3000/policy/id/dde33fe3-b04c-4d4b-994f-c823e4908be5

--> avalible for 'admin' role



# API docs

http://localhost:3000/api-docs/